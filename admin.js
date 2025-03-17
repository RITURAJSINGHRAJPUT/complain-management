document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin.html";
    }
    loadComplaints();
});

function loadComplaints() {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let tableBody = document.querySelector("#complaintTable tbody");
    tableBody.innerHTML = "";

    complaints.forEach((complaint, index) => {
        let row = `<tr>
            <td>${complaint.refNo}</td>
            <td>${complaint.complaint}</td>
            <td>${complaint.image ? `<img src="${complaint.image}" width="50">` : "No Image"}</td>
            <td>${complaint.status}</td>
            <td>
                <button onclick="updateStatus(${index}, 'In Progress')" class="btn">In Progress</button>
                <button onclick="updateStatus(${index}, 'Resolved')" class="btn resolve">Resolved</button>
            </td>
            <td>
                <button onclick="deleteComplaint(${index})" class="btn delete">❌ Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function updateStatus(index, newStatus) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints[index].status = newStatus;
    localStorage.setItem("complaints", JSON.stringify(complaints));
    loadComplaints();
}

function deleteComplaint(index) {
    if (confirm("Are you sure you want to delete this complaint?")) {
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.splice(index, 1);
        localStorage.setItem("complaints", JSON.stringify(complaints));
        loadComplaints();
    }
}

function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin.html";
}
