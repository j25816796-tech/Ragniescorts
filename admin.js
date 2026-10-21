const USERNAME = "admin";
const PASSWORD = "RaginiDemo!2026";

const PROFILE_KEY = "ragini_profiles";
const ENQUIRY_KEY = "ragini_enquiries";

const $ = id => document.getElementById(id);

function getProfiles() {
  return JSON.parse(
    localStorage.getItem(PROFILE_KEY) || "[]"
  );
}

function saveProfiles(profiles) {
  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profiles)
  );
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

// LOGIN
$("loginForm").onsubmit = function(event) {
  event.preventDefault();

  if (
    $("username").value === USERNAME &&
    $("password").value === PASSWORD
  ) {
    sessionStorage.setItem("raginiAdmin", "yes");
    showDashboard();
  } else {
    $("loginError").textContent =
      "Incorrect username or password.";
  }
};

function showDashboard() {
  $("loginPanel").classList.add("hidden");
  $("dashboard").classList.remove("hidden");
  renderDashboard();
}

if (sessionStorage.getItem("raginiAdmin") === "yes") {
  showDashboard();
}

// LOGOUT
$("logoutBtn").onclick = function() {
  sessionStorage.removeItem("raginiAdmin");
  location.reload();
};

// CLEAR FORM
function clearForm() {
  $("profileForm").reset();
  $("profileId").value = "";
  $("formTitle").textContent = "Add New Profile";
}

$("resetForm").onclick = clearForm;

// ADD OR EDIT PROFILE
$("profileForm").onsubmit = function(event) {
  event.preventDefault();

  const profiles = getProfiles();

  const id = $("profileId").value;
  const age = Number($("pAge").value);

  if (!Number.isInteger(age) || age < 18 || age > 99) {
    alert("Only verified adults aged 18+ can be listed.");
    return;
  }

  const oldProfile = profiles.find(p => p.id === id);

  const profile = {
    id: id || String(Date.now()),
    name: $("pName").value.trim(),
    age: age,
    city: $("pCity").value.trim(),
    area: $("pArea").value.trim(),
    role: $("pRole").value,
    bio: $("pBio").value.trim(),
    featured: $("pFeatured").checked,
    created: oldProfile ? oldProfile.created : Date.now()
  };

  if (
    !profile.name ||
    !profile.city ||
    !profile.bio
  ) {
    alert("Please complete all required fields.");
    return;
  }

  if (id) {
    saveProfiles(
      profiles.map(p => p.id === id ? profile : p)
    );
  } else {
    saveProfiles([...profiles, profile]);
  }

  clearForm();
  renderDashboard();

  alert("Profile saved successfully!");
};

// EDIT PROFILE
window.editProfile = function(id) {
  const profile = getProfiles().find(p => p.id === id);

  if (!profile) return;

  $("profileId").value = profile.id;
  $("pName").value = profile.name;
  $("pAge").value = profile.age;
  $("pCity").value = profile.city;
  $("pArea").value = profile.area;
  $("pRole").value = profile.role;
  $("pBio").value = profile.bio;
  $("pFeatured").checked = !!profile.featured;

  $("formTitle").textContent = "Edit Profile";

  window.scrollTo(0, 0);
};

// DELETE PROFILE
window.deleteProfile = function(id) {
  if (!confirm("Are you sure you want to delete this profile?")) {
    return;
  }

  saveProfiles(
    getProfiles().filter(p => p.id !== id)
  );

  renderDashboard();
};

// RENDER DASHBOARD
function renderDashboard() {
  const profiles = getProfiles();

  $("profileTable").innerHTML = `
    <table class="admin-list">
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Location</th>
        <th>Actions</th>
      </tr>

      ${profiles.map(p => `
        <tr>
          <td>${escapeHTML(p.name)}</td>
          <td>${Number(p.age)}</td>
          <td>
            ${escapeHTML(p.area)},
            ${escapeHTML(p.city)}
          </td>
          <td>
            <button
              class="secondary"
              onclick="editProfile('${escapeHTML(p.id)}')">
              Edit
            </button>

            <button
              class="secondary"
              onclick="deleteProfile('${escapeHTML(p.id)}')">
              Delete
            </button>
          </td>
        </tr>
      `).join("")}
    </table>
  `;

  renderEnquiries();
}

// SHOW ENQUIRIES
function renderEnquiries() {
  const enquiries = JSON.parse(
    localStorage.getItem(ENQUIRY_KEY) || "[]"
  );

  if (!enquiries.length) {
    $("enquiryList").innerHTML =
      "<p>No enquiries yet.</p>";
    return;
  }

  $("enquiryList").innerHTML = `
    <table class="admin-list">
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>Email</th>
        <th>Message</th>
      </tr>

      ${enquiries.map(e => `
        <tr>
          <td>${escapeHTML(e.profile)}</td>
          <td>${escapeHTML(e.name)}</td>
          <td>${escapeHTML(e.email)}</td>
          <td>${escapeHTML(e.message)}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

// EXPORT CSV
$("exportBtn").onclick = function() {
  const enquiries = JSON.parse(
    localStorage.getItem(ENQUIRY_KEY) || "[]"
  );

  const rows = [
    ["Date", "Profile", "Name", "Email", "Message"],
    ...enquiries.map(e => [
      e.date,
      e.profile,
      e.name,
      e.email,
      e.message
    ])
  ];

  const csv = rows.map(row =>
    row.map(value =>
      '"' + String(value ?? "").replace(/"/g, '""') + '"'
    ).join(",")
  ).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ragini-enquiries.csv";
  link.click();

  URL.revokeObjectURL(url);
};
