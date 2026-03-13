const API = "http://localhost:5000/api";
let currentCoords = { lat: 17.3850, lng: 78.4867 }; // Default Hyderabad

// Initialize user context
const currentUser = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", () => {
    // UI Setup based on Auth
    if (currentUser) {
        if (document.getElementById("navPoints")) {
            document.getElementById("navPoints").style.display = "flex";
            document.getElementById("userPointsDisplay").innerText = currentUser.points || 0;
        }
    }

    // Initialize Pages
    if (document.getElementById("recentIssuesList")) {
        getUserLocation();
    }
    
    if (document.getElementById("registerForm")) initRegister();
    if (document.getElementById("loginForm")) initLogin();
    if (document.getElementById("issueForm")) initReporting();
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            currentCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            loadFeed();
        }, () => loadFeed());
    } else {
        loadFeed();
    }
}

async function loadFeed() {
    const params = new URLSearchParams({
        lat: currentCoords.lat,
        lng: currentCoords.lng
    });
    
    try {
        const res = await fetch(`${API}/issues?${params}`);
        const issues = await res.json();
        renderFeed(issues);
    } catch (err) {
        console.error("Feed load error:", err);
    }
}

function renderFeed(issues) {
    const list = document.getElementById("recentIssuesList");
    if (!list) return;

    if (issues.length === 0) {
        list.innerHTML = "<p>No issues found in your area.</p>";
        return;
    }

    list.innerHTML = issues.map(issue => {
        const statusClass = issue.status === 'Resolved' ? 'status-resolved' : 
                          issue.status === 'In Progress' ? 'status-progress' : 'status-pending';
        
        return `
            <div class="issue-card" onclick="showIssueDetail('${issue._id}')">
                <span class="status-badge ${statusClass}">${issue.status}</span>
                <div class="card-img-wrapper">
                    <img src="${issue.image ? '/uploads/' + issue.image : 'https://placehold.co/600x400?text=Reported+Issue'}" alt="issue">
                </div>
                <div class="card-content">
                    <h3>${issue.title}</h3>
                    <div class="card-location">
                        <i class="fas fa-location-dot"></i>
                        <span>${issue.location || 'Unknown Area'}</span>
                    </div>
                    <div class="card-footer">
                        <span class="card-category">${issue.category}</span>
                        <span class="card-points">+${issue.rewardPoints || 10} Pts</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function showIssueDetail(id) {
    const res = await fetch(`${API}/issues`); 
    const issues = await res.json();
    const issue = issues.find(i => i._id === id);

    const modal = document.getElementById("detailModal");
    const body = document.getElementById("modalBody");

    // Format Date
    const date = new Date(issue.createdAt || Date.now()).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    // Determine Department
    const deptMap = { 'Pothole': 'Roads & Highways', 'Street Light': 'Electrical Dept', 'Water Leakage': 'Water Board', 'Garbage': 'Sanitation Dept' };
    const dept = deptMap[issue.category] || 'General Administration';

    body.innerHTML = `
        <div class="detail-view">
            <div class="detail-main">
                <div class="detail-header">
                    <h2>${issue.title}</h2>
                    <div class="card-location" style="font-size: 1.1rem;">
                        <i class="fas fa-location-dot"></i>
                        <span>${issue.location}</span>
                    </div>
                </div>
                
                <img src="${issue.image ? '/uploads/' + issue.image : 'https://placehold.co/1200x600?text=Issue+Image'}">
                
                <div class="detail-info-grid">
                    <div class="info-item">
                        <label>Status</label>
                        <span class="${issue.status === 'Resolved' ? 'status-resolved' : 'status-pending'}">${issue.status}</span>
                    </div>
                    <div class="info-item">
                        <label>Reported Date</label>
                        <span>${date}</span>
                    </div>
                    <div class="info-item">
                        <label>Department</label>
                        <span>${dept}</span>
                    </div>
                    <div class="info-item">
                        <label>Category</label>
                        <span>${issue.category}</span>
                    </div>
                </div>

                <div class="detail-desc">
                    <h3 style="margin-bottom: 10px;">Description</h3>
                    <p>${issue.description}</p>
                </div>
            </div>

            <aside class="detail-sidebar">
                <div style="background: #f1f5f9; padding: 25px; border-radius: 20px; position: sticky; top: 100px;">
                    <h3 style="margin-bottom: 20px;">Issue Location</h3>
                    <div id="detailMap" style="height: 250px; background: #cbd5e1; border-radius: 12px; display:flex; align-items:center; justify-content:center;">
                        <i class="fas fa-map-marked-alt fa-3x" style="color:white;"></i>
                    </div>
                    <p style="margin-top: 15px; font-size: 0.9rem; color: var(--secondary);">
                        Coordinates: ${issue.lat ? issue.lat.toFixed(4) : 'N/A'}, ${issue.lng ? issue.lng.toFixed(4) : 'N/A'}
                    </p>

                    ${issue.status !== 'Resolved' ? `
                        <div class="solve-section" style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                            <h4>Solve & Earn Pts</h4>
                            <p style="font-size: 0.85rem; margin-bottom: 15px;">Resolved this locally? Link your proof here for validation.</p>
                            <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="toggleSolveForm()">Solve Issue</button>
                        </div>
                    ` : ''}
                </div>
            </aside>
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
    document.getElementById("detailModal").style.display = "none";
    document.body.style.overflow = "auto";
}

// Logic for Auth and Reporting remains similar but updated for new UI
function initRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role")?.value || 'user'
        };
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.success) {
            window.location.href = "login.html";
        } else alert(data.message);
    });
}

function initLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "index.html";
        } else alert(data.message);
    });
}

function initReporting() {
    const form = document.getElementById("issueForm");
    if (!form) return;
    
    // Voice recording logic inside here if needed...
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", document.getElementById("title").value);
        formData.append("category", document.getElementById("category").value);
        formData.append("description", document.getElementById("description").value);
        formData.append("location", document.getElementById("location").value);
        formData.append("lat", currentCoords.lat);
        formData.append("lng", currentCoords.lng);
        if (currentUser) formData.append("reporterId", currentUser.id);
        
        const imgFile = document.getElementById("image").files[0];
        if (imgFile) formData.append("image", imgFile);

        const res = await fetch(`${API}/report`, {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            window.location.href = "index.html";
        }
    });
}