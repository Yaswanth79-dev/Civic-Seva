const translations = {
    en: {
        app_title: "Civic Seva",
        home: "Home",
        report: "Report Issue",
        issues: "Issues",
        map: "Map",
        admin: "Admin",
        logout: "Logout",
        welcome: "Welcome",
        register: "Register",
        login: "Login",
        nearest_issues: "Nearest Issues",
        details: "Show Details",
        solve: "Solve Issue",
        solve_proof: "Upload Proof (After Solving)",
        solve_desc: "Describe what you did",
        submit: "Submit",
        voice_record: "Start Recording",
        voice_stop: "Stop Recording",
        category: "Category",
        location: "Location",
        points: "Reward Points",
        pothole: "Pothole",
        light: "Street Light",
        garbage: "Garbage",
        water: "Water Leakage"
    },
    hi: {
        app_title: "नागरिक सेवा",
        home: "होम",
        report: "मुद्दा रिपोर्ट करें",
        issues: "मुद्दे",
        map: "नक्शा",
        admin: "एडमिन",
        logout: "लॉगआउट",
        welcome: "स्वागत है",
        register: "पंजीकरण",
        login: "लॉगिन",
        nearest_issues: "निकटतम मुद्दे",
        details: "विवरण दिखाएं",
        solve: "मुद्दा हल करें",
        solve_proof: "प्रमाण अपलोड करें (हल करने के बाद)",
        solve_desc: "बताएं आपने क्या किया",
        submit: "जमा करें",
        voice_record: "रिकॉर्डिंग शुरू करें",
        voice_stop: "रिकॉर्डिंग बंद करें",
        category: "श्रेणी",
        location: "स्थान",
        points: "पुरस्कार अंक",
        pothole: "गड्ढा",
        light: "स्ट्रीट लाइट",
        garbage: "कचरा",
        water: "पानी का रिसाव"
    },
    te: {
        app_title: "సివిక్ సేవా",
        home: "హోమ్",
        report: "సమస్యను నివేదించండి",
        issues: "సమస్యలు",
        map: "మ్యాప్",
        admin: "అడ్మిన్",
        logout: "లాగ్అవుట్",
        welcome: "స్వాగతం",
        register: "రిజిస్టర్",
        login: "లాగిన్",
        nearest_issues: "దగ్గరలోని సమస్యలు",
        details: "వివరాలు చూపించు",
        solve: "సమస్యను పరిష్కరించండి",
        solve_proof: "నిరూపణను అప్‌లోడ్ చేయండి",
        solve_desc: "మీరు ఏమి చేసారో వివరించండి",
        submit: "సమర్పించు",
        voice_record: "రికార్డింగ్ ప్రారంభించండి",
        voice_stop: "రికార్డింగ్ ఆపండి",
        category: "వర్గం",
        location: "ప్రాంతం",
        points: "రివార్డ్ పాయింట్లు",
        pothole: "గుంత",
        light: "వీధి దీపం",
        garbage: "చెత్త",
        water: "నీటి లీకేజీ"
    }
};

let currentLang = localStorage.getItem("lang") || "en";

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateLanguage(currentLang);
});
