function verifyID() {
    const fileInput = document.getElementById('idUpload');
    if (fileInput.files.length === 0) {
        document.getElementById('verificationStatus').innerHTML = "❌ No file selected!";
        return;
    }

    document.getElementById('verificationStatus').innerHTML = "✅ ID Verified! Redirecting...";
    setTimeout(() => {
        window.location.href = "complaint.html";
    }, 2000);
}

function submitComplaint() {
    const complaintText = document.getElementById('complaintText').value;
    const complaintImage = document.getElementById('complaintImage');

    if (complaintText.trim() === "" || complaintImage.files.length === 0) {
        alert("Please enter a complaint and upload an image.");
        return;
    }

    const refNumber = Math.floor(Math.random() * 90000) + 10000;
    localStorage.setItem("refNumber", refNumber);

    alert("Complaint submitted successfully!");
    window.location.href = "status.html";
}

window.onload = function () {
    if (document.getElementById('refNumber')) {
        document.getElementById('refNumber').textContent = localStorage.getItem("refNumber") || "N/A";
    }

    if (document.getElementById('trackingRef')) {
        document.getElementById('trackingRef').textContent = localStorage.getItem("refNumber") || "N/A";
    }

    let progress = document.getElementById("progress");
    let statusText = document.getElementById("statusText");
    let progressWidth = 0;

    function updateProgress() {
        if (progressWidth < 100) {
            progressWidth += 25;
            progress.style.width = progressWidth + "%";
        }

        if (progressWidth === 25) {
            statusText.textContent = "Status: Under Review";
        } else if (progressWidth === 50) {
            statusText.textContent = "Status: In Progress";
        } else if (progressWidth === 75) {
            statusText.textContent = "Status: Almost Done";
        } else if (progressWidth === 100) {
            statusText.textContent = "Status: Resolved!";
        }
    }

    setInterval(updateProgress, 3000);
};
