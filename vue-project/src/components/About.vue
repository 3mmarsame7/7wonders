```vue
<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div class="about-page">
    <!-- ===== NAVBAR ===== -->
    <Navbar />

    <!-- ================= HERO ================= -->
    <section class="hero">

      <div class="hero-content">

        <span class="small-title">DISCOVER THE ANCIENT WORLD</span>

        <h1>
          About
          <span>7Wonders</span>
        </h1>

        <div class="gold-line"></div>

        <p>
          Welcome to 7Wonders, an interactive journey through the
          Seven Wonders of the Ancient World.
        </p>

        <p>
          Our project combines history, technology and creativity
          to bring these legendary wonders back to life.
        </p>

        <div class="features">

          <div class="feature">
            <div class="feature-icon">🏛️</div>
            <h3>Explore</h3>
            <p>Discover the stories behind every wonder.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">🧭</div>
            <h3>Learn</h3>
            <p>Explore amazing facts and historical details.</p>
          </div>

          <div class="feature">
            <div class="feature-icon">✨</div>
            <h3>Inspire</h3>
            <p>Experience the legacy of ancient civilizations.</p>
          </div>

        </div>

      </div>

      <div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85"
          alt="Ancient Pyramid"
        />
        <div class="image-overlay"></div>
      </div>

    </section>


    <!-- ================= ABOUT PROJECT ================= -->
    <section class="project-section">

      <div class="section-title">
        <span>OUR PROJECT</span>
        <h2>Why <b>7Wonders?</b></h2>
        <div class="title-line"></div>
      </div>

      <div class="project-content">

        <div class="project-text">

          <h3>
            Bringing History
            <span>To Life</span>
          </h3>

          <p>
            The Seven Wonders of the Ancient World represent some
            of humanity's greatest achievements in architecture,
            engineering and creativity.
          </p>

          <p>
            Our goal was to create a modern website where users
            can discover these incredible places in an attractive,
            simple and interactive way.
          </p>

          <div class="stats">

            <div>
              <strong>7</strong>
              <span>Wonders</span>
            </div>

            <div>
              <strong>6</strong>
              <span>Team Members</span>
            </div>

            <div>
              <strong>1</strong>
              <span>Big Project</span>
            </div>

          </div>

        </div>

        <div class="project-card">

          <div class="card-icon">🏺</div>

          <h3>Our Mission</h3>

          <p>
            To combine technology and history to create an
            enjoyable digital experience that inspires people
            to discover the wonders of the ancient world.
          </p>

        </div>

      </div>

    </section>


    <!-- ================= TEAM ================= -->
    <section class="team-section">

      <div class="section-title">

        <span>OUR TEAM</span>

        <h2>Meet The <b>Team</b></h2>

        <div class="title-line"></div>

        <p>
          Six passionate developers working together to build
          the 7Wonders experience.
        </p>

      </div>


      <div class="team-grid">

        <!-- MEMBER 1 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/basel.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>Basel Shanshan</h3>

          <span class="role">
             Frontend Developer
          </span>

          <ul>
            
            <li>Footer page</li>
            <li>About page</li>
            
          </ul>

          <div class="social">
            
            <a href="https://www.linkedin.com/in/basel-shanshan-566a22415?utm_source=share_via&utm_content=profile&utm_medium=member_ios">LinkedIn</a>
          </div>

        </div>


        <!-- MEMBER 2 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/waleed.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>mohamed waled</h3>

          <span class="role">
             Frontend Developer
          </span>

          <ul>
            <li>Home page</li>
            <li>UI-UX/Animation</li>
            
            
          </ul>

          <div class="social">
            
            <a href="https://www.linkedin.com/in/mohamed-waled-elsayed?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          </div>

        </div>


        <!-- MEMBER 3 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/amaar.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>Amaar Sameh</h3>

          <span class="role">
            Frontend Developer
          </span>

          <ul>
            <li>Team Leader</li>
          
          </ul>

          <div class="social">
           
            <a href="https://www.linkedin.com/in/ammarsame7?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          </div>

        </div>


        <!-- MEMBER 4 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/nagla.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>Nagla Wagdy</h3>

          <span class="role">
            Frontend Developer
          </span>

          <ul>
            <li>Maps</li>
            <li>Filter</li>
            <li>search</li>
            
          </ul>

          <div class="social">
            
            <a href="https://www.linkedin.com/in/ngla-wagdy-9009a3365?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          </div>

        </div>


        <!-- MEMBER 5 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/malak.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>Malak Salama</h3>

          <span class="role">
            Frontend Developer
          </span>

          <ul>
            <li>Routing</li>
          </ul>

          <div class="social">
           
            <a href="https://www.linkedin.com/in/malak-salama-7441b23b0?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          </div>

        </div>


        <!-- MEMBER 6 -->
        <div class="team-card">

          <div class="member-image">
            <img
              src="../image/meram.jpeg"
              alt="Team Member"
            />
          </div>

          <h3>meram ehab</h3>

          <span class="role">
             Frontend Developer
          </span>

          <ul>
            <li>wonder-explor</li>
          
          </ul>

          <div class="social">
            
            <a href="https://www.linkedin.com/in/meram-ehab-35317a334?utm_source=share_via&utm_content=profile&utm_medium=member_android">LinkedIn</a>
          </div>

        </div>

      </div>

    </section>


    <!-- ================= QUOTE ================= -->
    <section class="quote-section">

      <div class="quote">
        <span class="quote-mark">“</span>

        <p>
          Alone we can do so little;
          together we can do so much.
        </p>

        <small>— Helen Keller</small>

      </div>

      <div class="mission">

        <h3>Our Mission</h3>

        <p>
          We believe that technology can make history more
          accessible, interactive and inspiring for everyone.
        </p>

      </div>

    </section>


    <!-- ================= FOOTER ================= -->
    <footer>

      <span>✦</span>

      Made with passion by the
      <strong>7Wonders Team</strong>

      <span>✦</span>

    </footer>

  </div>
</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap');


/* ================= GENERAL ================= */

* {
  box-sizing: border-box;
}

.about-page {
  background: #050b12;
  color: #f4f1e8;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}


/* ================= HERO ================= */

.hero {
  min-height: 700px;
  display: flex;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 20% 40%,
      rgba(190, 130, 30, 0.12),
      transparent 35%
    ),
    #050b12;
}

.hero-content {
  width: 55%;
  padding: 120px 7%;
  position: relative;
  z-index: 2;
}

.small-title {
  color: #d99b28;
  letter-spacing: 4px;
  font-size: 13px;
  font-weight: 600;
}

.hero h1 {
  font-family: 'Cinzel', serif;
  font-size: clamp(50px, 6vw, 82px);
  line-height: 1.1;
  margin: 20px 0;
}

.hero h1 span {
  color: #d99b28;
}

.gold-line {
  width: 300px;
  height: 2px;
  background: linear-gradient(
    90deg,
    #d99b28,
    transparent
  );
  margin: 30px 0;
}

.hero-content > p {
  max-width: 560px;
  color: #b8bec6;
  line-height: 1.9;
  font-size: 16px;
}

.hero-image {
  width: 55%;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      #050b12 0%,
      rgba(5,11,18,0.7) 25%,
      rgba(5,11,18,0.1) 70%
    );
}


/* ================= FEATURES ================= */

.features {
  display: flex;
  gap: 35px;
  margin-top: 55px;
}

.feature {
  width: 150px;
}

.feature-icon {
  font-size: 30px;
  margin-bottom: 10px;
}

.feature h3 {
  font-family: 'Cinzel', serif;
  color: #d99b28;
  margin: 5px 0;
}

.feature p {
  color: #9fa7b0;
  font-size: 12px;
  line-height: 1.6;
}


/* ================= SECTION TITLE ================= */

.section-title {
  text-align: center;
  margin-bottom: 70px;
}

.section-title > span {
  color: #d99b28;
  letter-spacing: 4px;
  font-size: 13px;
}

.section-title h2 {
  font-family: 'Cinzel', serif;
  font-size: 45px;
  margin: 15px 0;
}

.section-title h2 b {
  color: #d99b28;
}

.title-line {
  width: 100px;
  height: 2px;
  background: #d99b28;
  margin: auto;
}

.section-title p {
  color: #8f98a3;
  margin-top: 20px;
}


/* ================= PROJECT ================= */

.project-section {
  padding: 120px 8%;
  background: #07111b;
}

.project-content {
  max-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 80px;
  align-items: center;
}

.project-text h3 {
  font-family: 'Cinzel', serif;
  font-size: 38px;
}

.project-text h3 span {
  color: #d99b28;
}

.project-text p {
  color: #9ca5af;
  line-height: 1.9;
  margin: 20px 0;
}

.stats {
  display: flex;
  gap: 70px;
  margin-top: 45px;
}

.stats div {
  display: flex;
  flex-direction: column;
}

.stats strong {
  color: #d99b28;
  font-family: 'Cinzel', serif;
  font-size: 42px;
}

.stats span {
  color: #858e99;
  font-size: 13px;
}

.project-card {
  padding: 45px;
  border: 1px solid rgba(217,155,40,.5);
  background: rgba(255,255,255,.025);
  border-radius: 5px;
  transition: .4s;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0,0,0,.3);
}

.card-icon {
  font-size: 45px;
}

.project-card h3 {
  color: #d99b28;
  font-family: 'Cinzel', serif;
  font-size: 28px;
}

.project-card p {
  color: #9ca5af;
  line-height: 1.8;
}


/* ================= TEAM ================= */

.team-section {
  padding: 120px 7%;
}

.team-grid {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.team-card {
  padding: 35px 30px;
  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.035),
      rgba(255,255,255,.01)
    );
  border: 1px solid rgba(217,155,40,.45);
  border-radius: 12px;
  text-align: center;
  transition: .45s;
  position: relative;
  overflow: hidden;
}

.team-card::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(217,155,40,.08);
  border-radius: 50%;
  top: -60px;
  right: -60px;
}

.team-card:hover {
  transform: translateY(-12px);
  border-color: #d99b28;
  box-shadow: 0 20px 60px rgba(0,0,0,.4);
}

.member-image {
  width: 125px;
  height: 125px;
  margin: auto;
  padding: 4px;
  border: 2px solid #d99b28;
  border-radius: 50%;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.team-card h3 {
  color: #e1a438;
  font-family: 'Cinzel', serif;
  margin: 20px 0 5px;
  font-size: 21px;
}

.role {
  color: #dce0e5;
  font-size: 13px;
}

.team-card ul {
  text-align: left;
  margin: 25px 0;
  padding-left: 20px;
  color: #8f99a4;
  line-height: 1.9;
  font-size: 13px;
}

.team-card li::marker {
  color: #d99b28;
}

.social {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social a {
  color: #d99b28;
  text-decoration: none;
  border: 1px solid rgba(217,155,40,.4);
  padding: 7px 13px;
  border-radius: 20px;
  font-size: 11px;
  transition: .3s;
}

.social a:hover {
  background: #d99b28;
  color: #050b12;
}


/* ================= QUOTE ================= */

.quote-section {
  max-width: 1100px;
  margin: 40px auto 100px;
  padding: 50px;
  border: 1px solid rgba(217,155,40,.4);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  background: rgba(255,255,255,.02);
}

.quote {
  border-right: 1px solid rgba(217,155,40,.3);
  padding-right: 40px;
}

.quote-mark {
  color: #d99b28;
  font-size: 70px;
  font-family: serif;
}

.quote p {
  color: #d99b28;
  font-family: 'Cinzel', serif;
  font-size: 24px;
  line-height: 1.5;
}

.quote small {
  color: #777f89;
}

.mission h3 {
  color: #d99b28;
  font-family: 'Cinzel', serif;
  font-size: 27px;
}

.mission p {
  color: #929ba5;
  line-height: 1.9;
}


/* ================= FOOTER ================= */

footer {
  text-align: center;
  padding: 35px;
  border-top: 1px solid rgba(255,255,255,.06);
  color: #737d88;
  font-size: 13px;
}

footer span,
footer strong {
  color: #d99b28;
}


/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

  .hero {
    min-height: auto;
  }

  .hero-content {
    width: 100%;
    padding: 90px 8%;
    background: rgba(5,11,18,.82);
  }

  .hero-image {
    width: 100%;
    opacity: .35;
  }

  .features {
    flex-wrap: wrap;
  }

  .project-content {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quote-section {
    margin-left: 20px;
    margin-right: 20px;
  }
}


@media (max-width: 600px) {

  .hero h1 {
    font-size: 48px;
  }

  .features {
    gap: 15px;
  }

  .feature {
    width: 120px;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    gap: 30px;
  }

  .quote-section {
    grid-template-columns: 1fr;
  }

  .quote {
    border-right: none;
    border-bottom: 1px solid rgba(217,155,40,.3);
    padding-right: 0;
    padding-bottom: 30px;
  }

}

</style>
```