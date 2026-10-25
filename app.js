const PROFILE_KEY = "ragini_profiles";
const ENQUIRY_KEY = "ragini_enquiries";

const demoProfiles = [
  {
    id: "1",
    name: "Aanya",
    image: "aanya.jpeg",
    age: 27,
    city: "Delhi",
    area: "Aerocity",
    role: "Professional Event Host",
    bio: "Fictional demo profile for professional event hosting and public social occasions.",
    featured: true,
    created: 3
  },
  {
    id: "2",
    name: "Meera",
    age: 29,
    city: "Delhi",
    area: "South Delhi",
    role: "Social Event Host",
    bio: "Fictional sample profile for cultural gatherings and professional events.",
    featured: true,
    created: 2
  },
  {
    id: "3",
    name: "Kiara",
    age: 26,
    city: "Gurugram",
    area: "Cyber City",
    role: "Professional Event Host",
    bio: "Fictional demo listing for non-sexual public events and social occasions.",
    featured: false,
    created: 1
  }
];

const $ = id => document.getElementById(id);

function getProfiles() {
  let saved = localStorage.getItem(PROFILE_KEY);

  if (!saved) {
    localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(demoProfiles)
    );

    return demoProfiles;
  }

  return JSON.parse(saved);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

let currentPage = 1;
const perPage = 6;

function renderProfiles() {
  const grid = $("profileGrid");

  if (!grid) return;

  let profiles = getProfiles();

  const search = $("searchInput").value.toLowerCase();
  const location = $("locationFilter").value;

if (location === "Aerocity") {
  window.location.href = "aerocity.html?v=2";
  return;
}
  const sort = $("sortFilter").value;

 const locations = [
  "Delhi",
  "Dwarka",
  "Aerocity",
  "Mahipalpur",
  "Janakpuri",
  "Uttam Nagar",
  "Adarsh Colony",
  "Anand Vihar",
  "Ashok Nagar",
  "Azadpur",
  "Bawana",
  "Mayapuri",
  "Saket",
  "Munirka",
  "Pari Chowk",
  "Safdarjung",
  "South Extension",
  "Rohini",
  "Paschim Vihar",
  "Mukherjee Nagar",
  "Chanakyapuri",
  "Chandni Chowk",
  "Chawri Bazar",
  "Chhattarpur",
  "Connaught Place",
  "Rajendra Nagar",
  "RK Puram",
  "Vasant Kunj",
  "Vasant Vihar",
  "Karol Bagh",
  "Lajpat Nagar",
  "Paharganj",
  "Pitampura",
  "Dhaula Kuan",
  "Dilshad Garden",
  "Govindpuri",
  "Green Park",
  "Nehru Place",
  "Nizamuddin",
  "Okhla",
  "Vikaspuri",
  "Rajouri Garden",
  "Tilak Nagar",
  "Kamla Nagar",
  "Hauz Khas",
  "Kalkaji",
  "Malviya Nagar",
  "Mehrauli",
  "Patel Nagar",
  "Mayur Vihar",
  "Manesar",
  "Gurgaon",
  "IGI Airport",
  "Noida",
  "Greater Noida",
  "Faridabad",
  "New Friends Colony",
  "Shahdara",
  "Swaroop Nagar",
  "Indirapuram",
  ...profiles.map(p => p.city).filter(Boolean)
];

const uniqueLocations = [...new Set(locations)];
uniqueLocations.sort();

  const locationSelect = $("locationFilter");
  const previousLocation = locationSelect.value;

  locationSelect.innerHTML =
    '<option value="">All Locations</option>' +
    uniqueLocations.map(city =>
      `<option value="${escapeHTML(city)}">${escapeHTML(city)}</option>`
    ).join("");

  locationSelect.value = previousLocation;

  profiles = profiles.filter(profile => {
    const searchable = (
      profile.name + " " +
      profile.city + " " +
      profile.area + " " +
      profile.role + " " +
      profile.bio
    ).toLowerCase();

    return (
      searchable.includes(search) &&
      (!location || profile.city === location)
    );
  });

  if (sort === "name") {
    profiles.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sort === "newest") {
    profiles.sort((a, b) =>
      b.created - a.created
    );
  }

  if (sort === "featured") {
    profiles.sort((a, b) =>
      Number(b.featured) - Number(a.featured)
    );
  }

  const totalPages = Math.ceil(profiles.length / perPage);

  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * perPage;

  const visibleProfiles = profiles.slice(
    start,
    start + perPage
  );

  grid.innerHTML = visibleProfiles.map(profile => `
    <article class="profile-card">
      <div class="portrait">
        ${escapeHTML(profile.name.charAt(0))}
      </div>

      <div class="info">
        <h3>
          ${escapeHTML(profile.name)}, ${Number(profile.age)}
        </h3>

        <div class="meta">
          ${escapeHTML(profile.role)}
          · ${escapeHTML(profile.area)}, ${escapeHTML(profile.city)}
        </div>

        <p>${escapeHTML(profile.bio)}</p>

        <button
          class="textbtn"
          onclick="viewProfile('${escapeHTML(profile.id)}')">
          View Profile →
        </button>
      </div>
    </article>
  `).join("");

  $("resultCount").textContent =
    profiles.length + " profiles";

  $("emptyState").classList.toggle(
    "hidden",
    profiles.length > 0
  );

  $("pagination").innerHTML =
    Array.from({ length: totalPages }, (_, index) => `
      <button
        class="${currentPage === index + 1 ? "active" : ""}"
        onclick="changePage(${index + 1})">
        ${index + 1}
      </button>
    `).join("");
}

function changePage(page) {
  currentPage = page;
  renderProfiles();
}

function viewProfile(id) {
  const profile = getProfiles().find(p => p.id === id);

  if (!profile) return;

  $("modalContent").innerHTML = `
    <p class="gold-text">
      ${escapeHTML(profile.role)}
    </p>

    <h2>
      ${escapeHTML(profile.name)}, ${Number(profile.age)}
    </h2>

    <p>
      ${escapeHTML(profile.area)},
      ${escapeHTML(profile.city)}
    </p>

    <p>${escapeHTML(profile.bio)}</p>

    <p class="notice">
      Enquiries must remain respectful and within
      the person's stated boundaries.
    </p>

    <form class="enquiry-form" id="enquiryForm">
      <input name="name" placeholder="Your name" required>

      <input
        name="email"
        type="email"
        placeholder="Your email"
        required>

      <textarea
        name="message"
        placeholder="Your enquiry"
        required></textarea>

      <button class="gold-btn">Submit Enquiry</button>
    </form>
  `;

  $("profileModal").classList.remove("hidden");

  $("enquiryForm").onsubmit = function(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const enquiries = JSON.parse(
      localStorage.getItem(ENQUIRY_KEY) || "[]"
    );

    enquiries.push({
      profile: profile.name,
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      date: new Date().toISOString()
    });

    localStorage.setItem(
      ENQUIRY_KEY,
      JSON.stringify(enquiries)
    );

    $("modalContent").innerHTML = `
      <h2>Thank You!</h2>
      <p>Your enquiry has been saved in this browser demo.</p>
      <p class="notice">
        No email has been sent.
      </p>
    `;
  };
}

document.addEventListener("DOMContentLoaded", function() {
  if (!$("profileGrid")) return;

  $("year").textContent = new Date().getFullYear();

  if (sessionStorage.getItem("ragini18") === "yes") {
    $("ageScreen").classList.add("hidden");
  }

  $("enterBtn").onclick = function() {
    sessionStorage.setItem("ragini18", "yes");
    $("ageScreen").classList.add("hidden");
  };

  $("leaveBtn").onclick = function() {
    $("ageScreen").innerHTML =
      "<div class='age-card'><h2>Access unavailable</h2></div>";
  };

  $("searchInput").addEventListener("input", function() {
    currentPage = 1;
    renderProfiles();
  });

  $("locationFilter").addEventListener("change", function() {
    currentPage = 1;
    renderProfiles();
  });

  $("sortFilter").addEventListener("change", function() {
    currentPage = 1;
    renderProfiles();
  });

  $("closeModal").onclick = function() {
    $("profileModal").classList.add("hidden");
  };

  $("profileModal").onclick = function(event) {
    if (event.target.id === "profileModal") {
      $("profileModal").classList.add("hidden");
    }
  };

  renderProfiles();
});

window.changePage = changePage;
window.viewProfile = viewProfile;
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll("#home .hero-slide");
  let current = 0;

  if (slides.length > 1) {
    setInterval(function () {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4000);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (!menuButton || !nav) return;

  menuButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("menu-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    });
  });
});
