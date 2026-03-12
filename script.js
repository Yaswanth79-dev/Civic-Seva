const API = "http://localhost:5000/api";

if (document.getElementById("issueForm")) {
    document.getElementById("issueForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title");
        const category = document.getElementById("category");
        const location = document.getElementById("location");
        const description = document.getElementById("description");
        const image = document.getElementById("image");

        const formData = new FormData();

        formData.append("title", title.value);
        formData.append("category", category.value);
        formData.append("location", location.value);
        formData.append("description", description.value);
        formData.append("image", image.files[0]);

        await fetch(API + "/report", {
            method: "POST",
            body: formData
        });

        alert("Issue Submitted Successfully");
    });
}

if (document.getElementById("map") && document.getElementById("location")) {
    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 17.385044, lng: 78.486671 },
            zoom: 12
        });

        let marker;

        map.addListener("click", (e) => {
            if (marker) marker.setMap(null);

            marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });

            document.getElementById("location").value =
                e.latLng.lat() + "," + e.latLng.lng();
        });
    }

    initMap();
}

if (document.getElementById("departmentIssues")) {
    async function loadDepartmentIssues() {
        const res = await fetch(API + "/issues");
        const issues = await res.json();
        let html = "";

        issues.forEach(issue => {
            html += `
            <div class="issueCard">
                <h3>${issue.title}</h3>
                <p>${issue.description}</p>
                <p><b>Location:</b> ${issue.location}</p>
                <p><b>Status:</b> ${issue.status}</p>
                <button onclick="resolveIssue('${issue._id}')">
                Mark Resolved
                </button>
            </div>
            `;
        });

        document.getElementById("departmentIssues").innerHTML = html;
    }

    loadDepartmentIssues();
}

async function resolveIssue(id) {
    await fetch(API + "/resolve/" + id, {
        method: "PUT"
    });

    alert("Issue Resolved");
    location.reload();
}

if (document.getElementById("map") && !document.getElementById("location")) {
    async function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 17.3850, lng: 78.4867 },
            zoom: 12
        });

        const res = await fetch(API + "/issues");
        const issues = await res.json();

        issues.forEach(issue => {
            if (issue.location) {
                const coords = issue.location.split(",");
                const marker = new google.maps.Marker({
                    position: {
                        lat: parseFloat(coords[0]),
                        lng: parseFloat(coords[1])
                    },
                    map: map
                });

                const info = new google.maps.InfoWindow({
                    content: `
                        <h3>${issue.title}</h3>
                        <p>${issue.description}</p>
                        <p>Status: ${issue.status}</p>
                    `
                });

                marker.addListener("click", () => {
                    info.open(map, marker);
                });
            }
        });
    }

    initMap();
}

if (document.getElementById("totalIssues")) {

    async function loadStats() {

        const res = await fetch(API + "/issues");
        const issues = await res.json();

        const total = issues.length;
        const resolved = issues.filter(i => i.status === "Resolved").length;
        const pending = total - resolved;

        document.getElementById("totalIssues").innerText = total;
        document.getElementById("resolvedIssues").innerText = resolved;
        document.getElementById("pendingIssues").innerText = pending;

    }

    loadStats();

}

async function loadIssues() {
    const res = await fetch(API + "/issues");
    const issues = await res.json();
    let html = "";
    issues.forEach(issue => {
        html += `
        <div class="issueCard">
            <h3>${issue.title}</h3>
            <p>${issue.description}</p>
            <p><b>Category:</b> ${issue.category}</p>
            <p><b>Status:</b> ${issue.status}</p>
        </div>
        `;
    });
    document.getElementById("issuesList").innerHTML = html;
}

if (document.getElementById("issuesList")) {
    loadIssues();
}

if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(API + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        alert(data.message);
        if (data.message === "User Registered") {
            window.location.href = "login.html";
        }
    });
}

if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const res = await fetch(API + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }
    });
}

const currentUser = JSON.parse(localStorage.getItem("user"));
if (currentUser && document.getElementById("welcomeUser")) {
    document.getElementById("welcomeUser").innerText = "Welcome " + currentUser.name;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}