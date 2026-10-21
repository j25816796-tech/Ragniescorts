:root {
  --black: #0c0b0a;
  --panel: #191511;
  --gold: #c9a45c;
  --pale: #ead29b;
  --white: #f5f0e7;
  --muted: #aaa096;
  --line: #393027;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--black);
  color: var(--white);
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

.header, .footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 7%;
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 22px Georgia, serif;
  letter-spacing: 3px;
}

.brand-logo, .logo-circle {
  width: 43px;
  height: 43px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--gold);
  font: 27px Georgia, serif;
}

.brand small {
  display: block;
  font: 9px Arial, sans-serif;
  color: var(--muted);
}

nav {
  display: flex;
  gap: 24px;
  font-size: 13px;
}

nav a:hover {
  color: var(--gold);
}

.hero {
  min-height: 530px;
  padding: 80px 10%;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  align-items: center;
  background:
    radial-gradient(ellipse at 80% 45%, #392a18, transparent 42%),
    #100e0b;
}

.gold-text {
  color: var(--gold);
  letter-spacing: 3px;
  font-size: 11px;
}

.hero h1 {
  font: clamp(42px, 6vw, 75px)/1.1 Georgia, serif;
}

.hero h1 span {
  color: var(--pale);
}

.hero-content > p:not(.gold-text) {
  max-width: 520px;
  color: #c4b9aa;
}

.gold-btn, .outline-btn {
  display: inline-block;
  padding: 13px 21px;
  margin-top: 15px;
  border: 1px solid var(--gold);
  cursor: pointer;
  font-size: 12px;
}

.gold-btn {
  background: var(--gold);
  color: #17110a;
  font-weight: bold;
}

.outline-btn {
  background: transparent;
  color: var(--pale);
}

.hero-note {
  margin-top: 22px;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 2px;
}

.hero-art {
  height: 320px;
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--gold);
}

.hero-letter {
  width: 250px;
  height: 250px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font: 145px Georgia, serif;
  box-shadow: 0 0 0 25px #c9a45c0b;
}

.trust-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 25px 10%;
  border-block: 1px solid var(--line);
  background: #11100e;
}

.trust-section div {
  text-align: center;
  border-right: 1px solid var(--line);
}

.trust-section div:last-child {
  border: 0;
}

.trust-section h3 {
  color: var(--pale);
  font: 22px Georgia, serif;
  margin-bottom: 0;
}

.trust-section p {
  color: var(--muted);
  font-size: 12px;
}

.profiles-section, .about-section {
  padding: 75px 8%;
}

.section-heading {
  text-align: center;
}

.section-heading h2, .about-section h2 {
  font: 42px Georgia, serif;
}

.section-heading p {
  color: var(--muted);
}

.search-area {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
  margin: 30px 0;
}

.search-area input, .search-area select {
  padding: 13px;
  background: var(--panel);
  color: var(--white);
  border: 1px solid var(--line);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.profile-card {
  background: var(--panel);
  border: 1px solid var(--line);
}

.profile-card h3 {
  color: var(--pale);
  font: 24px Georgia, serif;
}

.profile-card .info {
  padding: 18px;
}

.about-section {
  background: #15120e;
  border-block: 1px solid var(--line);
}

.about-section p {
  max-width: 780px;
  color: #bcb2a6;
}

.contact-section {
  padding: 50px 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer {
  border-top: 1px solid var(--line);
  border-bottom: 0;
  color: var(--muted);
  font-size: 11px;
}

.age-screen, .modal {
  position: fixed;
  inset: 0;
  z-index: 10;
  background: #000d;
  display: grid;
  place-items: center;
  padding: 20px;
}

.age-card, .modal-content {
  position: relative;
  background: #171411;
  border: 1px solid #765c32;
  padding: 32px;
  max-width: 450px;
  width: 100%;
  text-align: center;
}

.age-card p {
  color: var(--muted);
}

.empty-state {
  color: var(--muted);
  text-align: center;
}

.pagination {
  text-align: center;
  margin: 30px;
}

.hidden {
  display: none !important;
}

.close-btn {
  position: absolute;
  right: 12px;
  top: 5px;
  background: none;
  color: var(--gold);
  border: 0;
  font-size: 28px;
}

@media(max-width:760px) {
  .header {
    flex-wrap: wrap;
    gap: 18px;
  }

  nav {
    gap: 12px;
    flex-wrap: wrap;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 55px 7%;
  }

  .trust-section {
    grid-template-columns: 1fr 1fr;
  }

  .search-area, .profile-grid {
    grid-template-columns: 1fr;
  }

  .contact-section {
    display: block;
  }
}
