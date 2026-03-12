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
    email: String,
    phone: String,
    password: String

});

const User = mongoose.model("User", UserSchema);


/* ISSUE MODEL */

const IssueSchema = new mongoose.Schema({

    title: String,
    category: String,
    description: String,
    location: String,
    image: String,

    status: {
        type: String,
        default: "Submitted"
    }

});

const Issue = mongoose.model("Issue", IssueSchema);


/* REGISTER */

app.post("/api/register", async (req, res) => {

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashed

    });

    await user.save();

    res.json({ message: "User Registered" });

});


/* LOGIN */

app.post("/api/login", async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.json({ success: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) {
        return res.json({ success: false, message: "Wrong password" });
    }

    res.json({
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });

});


/* REPORT ISSUE */

app.post("/api/report", upload.single("image"), async (req, res) => {

    let detectedCategory = req.body.category;

    if (req.body.description.toLowerCase().includes("hole"))
        detectedCategory = "Pothole";

    if (req.body.description.toLowerCase().includes("light"))
        detectedCategory = "Street Light";

    const issue = new Issue({
        title: req.body.title,
        category: detectedCategory,
        description: req.body.description,
        location: req.body.location,
        image: req.file ? req.file.filename : null
    });

    await issue.save();

    await transporter.sendMail({
        from: "pyaswanth2005@gmail.com",
        to: "pyaswanth2005@gmail.com",
        subject: "New Civic Issue Reported",
        text: "A new issue has been reported in Civic Seva. Please login to dashboard."
    });

    res.json({ message: "Issue submitted with image" });

});


/* GET ISSUES */

app.get("/api/issues", async (req, res) => {

    const issues = await Issue.find();

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

app.put("/api/resolve/:id", async (req, res) => {

    const issue = await Issue.findByIdAndUpdate(req.params.id, {
        status: "Resolved"
    });

    const mailOptions = {
        from: "pyaswanth2005@gmail.com",
        to: "pyaswanth2005@gmail.com", // Replace with intended recipient
        subject: "Issue Resolved Status Update",
        text: `The following issue has been marked as resolved:
        
Title: ${issue.title}
Location: ${issue.location}
Description: ${issue.description}

Thank you for maintaining our civic infrastructure.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    res.json({ message: "Issue resolved and notification sent" });

});


app.listen(5000, () => {

    console.log("Server running on port 5000");

});