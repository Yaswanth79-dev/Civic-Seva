const multer = require("multer");
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/civicseva")
    .then(() => console.log("Database Connected"));

/* USER MODEL */

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    role: { type: String, default: "user" }, // user, department, government
    departmentType: String, // Roads, Water, Electrical (if role is department)
    points: { type: Number, default: 0 }
});

const User = mongoose.model("User", UserSchema);


/* ISSUE MODEL */

const IssueSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    image: String,
    voiceDescription: String,
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        default: "Submitted"
    },
    solvedImage: String,
    solvedDescription: String,
    solverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rewardPoints: { type: Number, default: 10 },
    createdAt: { type: Date, default: Date.now }
});

const Issue = mongoose.model("Issue", IssueSchema);


/* REGISTER */
app.post("/api/register", async (req, res) => {
    const { name, email, phone, password, role, departmentType } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        phone,
        password: hashed,
        role: role || "user",
        departmentType
    });

    await user.save();
    res.json({ success: true, message: "User Registered" });
});


/* LOGIN */
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            points: user.points,
            departmentType: user.departmentType
        }
    });
});


/* REPORT ISSUE */
app.post("/api/report", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'voice', maxCount: 1 }]), async (req, res) => {
    const { title, category, description, location, lat, lng, reporterId } = req.body;

    let detectedCategory = category;
    if (description.toLowerCase().includes("hole")) detectedCategory = "Pothole";
    if (description.toLowerCase().includes("light")) detectedCategory = "Street Light";

    const issue = new Issue({
        title,
        category: detectedCategory,
        description,
        location,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        reporterId,
        image: req.files['image'] ? req.files['image'][0].filename : null,
        voiceDescription: req.files['voice'] ? req.files['voice'][0].filename : null
    });

    await issue.save();

    // Notify appropriate department (simplified)
    await transporter.sendMail({
        from: "pyaswanth2005@gmail.com",
        to: "pyaswanth2005@gmail.com",
        subject: `New ${detectedCategory} Reported`,
        text: `Issue: ${title}\nDescription: ${description}\nLocation: ${location}`
    }).catch(err => console.log("Mail error:", err));

    res.json({ success: true, message: "Issue reported successfully" });
});


/* GET ISSUES */
app.get("/api/issues", async (req, res) => {
    const { lat, lng, category, role, dept } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (role === 'department' && dept) {
        // Map common department names to categories
        const deptMap = { 'Roads': 'Pothole', 'Electrical': 'Street Light', 'Water': 'Water Leakage' };
        if (deptMap[dept]) query.category = deptMap[dept];
    }

    let issues = await Issue.find(query).sort({ createdAt: -1 });

    // Simple distance sorting if coordinates provided
    if (lat && lng) {
        issues = issues.sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2));
            const distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2));
            return distA - distB;
        });
    }

    res.json(issues);
});


/* EMAIL NOTIFICATION SETUP */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "pyaswanth2005@gmail.com",
        pass: "pyaswanth2005"
    }
});


/* RESOLVE ISSUE */

/* SOLVE ISSUE */
app.post("/api/solve/:id", upload.single("solvedImage"), async (req, res) => {
    const { solverId, solvedDescription } = req.body;
    
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) return res.status(404).json({ message: "Issue not found" });

        issue.status = "Resolved";
        issue.solverId = solverId;
        issue.solvedDescription = solvedDescription;
        issue.solvedImage = req.file ? req.file.filename : null;
        await issue.save();

        // Reward points to solver
        const solver = await User.findById(solverId);
        if (solver) {
            solver.points = (solver.points || 0) + (issue.rewardPoints || 10);
            await solver.save();
        }

        res.json({ success: true, message: "Issue solved! Rewards added.", points: solver ? solver.points : 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* GET USER PROFILE */
app.get("/api/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json({ message: "User not found" });
    }
});


app.listen(5000, () => {

    console.log("Server running on port 5000");

});