<template>
  <footer class="footer">

    <div class="gold-line"></div>

    <div class="footer-container">

      <!-- BRAND -->
      <div class="footer-brand">

        <div class="logo">
          <div class="logo-icon">🏛️</div>

          <div>
            <h2>
              Ancient<span>Wonders</span>
            </h2>

            <small>
              EXPLORE • DISCOVER • HISTORY
            </small>
          </div>
        </div>

        <p>
          Discover the Seven Wonders of the Ancient World
          and explore the incredible history, architecture,
          and civilizations behind them.
        </p>

        <div class="socials">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>

      </div>


      <!-- EXPLORE -->
      <div class="footer-column">

        <h3>Explore</h3>

        <RouterLink to="/">
          <span>01</span>
          Home
        </RouterLink>

        <RouterLink to="/wonders">
          <span>02</span>
          Wonders
        </RouterLink>

        <RouterLink to="/about">
          <span>03</span>
          About
        </RouterLink>

      </div>


      <!-- SEVEN ANCIENT WONDERS -->
      <div class="footer-column wonders-column">

        <h3>Seven Ancient Wonders</h3>

        <!-- 1 -->
        <a
          href="https://www.google.com/search?q=Great+Pyramid+of+Giza"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇪🇬</span>

          <div>
            <strong>Great Pyramid of Giza</strong>
            <small>Egypt</small>
          </div>
        </a>


        <!-- 2 -->
        <a
          href="https://www.google.com/search?q=Hanging+Gardens+of+Babylon"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇮🇶</span>

          <div>
            <strong>Hanging Gardens of Babylon</strong>
            <small>Babylon, Iraq</small>
          </div>
        </a>


        <!-- 3 -->
        <a
          href="https://www.google.com/search?q=Statue+of+Zeus+at+Olympia"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇬🇷</span>

          <div>
            <strong>Statue of Zeus</strong>
            <small>Olympia, Greece</small>
          </div>
        </a>


      </div>


      <!-- COUNTRIES -->
      <div class="footer-column">

        <!-- 4 -->
        <a
          href="https://www.google.com/search?q=Temple+of+Artemis+at+Ephesus"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇹🇷</span>

          <div>
            <strong>Temple of Artemis</strong>
            <small>Ephesus, Turkey</small>
          </div>
        </a>


        <!-- 5 -->
        <a
          href="https://www.google.com/search?q=Mausoleum+at+Halicarnassus"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇹🇷</span>

          <div>
            <strong>Mausoleum at Halicarnassus</strong>
            <small>Halicarnassus, Turkey</small>
          </div>
        </a>


        <!-- 6 -->
        <a
          href="https://www.google.com/search?q=Colossus+of+Rhodes"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇬🇷</span>

          <div>
            <strong>Colossus of Rhodes</strong>
            <small>Rhodes, Greece</small>
          </div>
        </a>


        <!-- 7 -->
        <a
          href="https://www.google.com/search?q=Lighthouse+of+Alexandria"
          target="_blank"
          rel="noopener noreferrer"
          class="wonder-link"
        >
          <span class="flag">🇪🇬</span>

          <div>
            <strong>Lighthouse of Alexandria</strong>
            <small>Alexandria, Egypt</small>
          </div>
        </a>

      </div>

    </div>


    <!-- BOTTOM -->
    <div class="footer-bottom">

      <p>
        © 2026
        <strong>Ancient Wonders</strong>.
        All rights reserved.
      </p>

      <p>
        Built with
        <span class="heart">♥</span>
        using Vue.js
      </p>

    </div>

  </footer>
</template>


<style scoped>

/* ========================= */
/* FOOTER */
/* ========================= */

.footer {
  position: relative;

  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(244, 201, 93, 0.08),
      transparent 30%
    ),

    radial-gradient(
      circle at 10% 90%,
      rgba(244, 201, 93, 0.05),
      transparent 30%
    ),

    #050914;

  color: white;

  overflow: hidden;
}


/* ========================= */
/* GOLD LINE */
/* ========================= */

.gold-line {
  height: 2px;

  width: 100%;

  background: linear-gradient(
    90deg,
    transparent,
    #dcae52,
    #f4d27a,
    #dcae52,
    transparent
  );
}


/* ========================= */
/* CONTAINER */
/* ========================= */

.footer-container {

  max-width: 1250px;

  margin: auto;

  padding: 80px 25px 60px;

  display: grid;

  grid-template-columns:
    1.5fr
    0.8fr
    2fr
    1fr;

  gap: 40px;
}


/* ========================= */
/* LOGO */
/* ========================= */

.logo {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 25px;
}


.logo-icon {

  width: 52px;
  height: 52px;

  display: flex;

  align-items: center;

  justify-content: center;

  border:
    1px solid
    rgba(244, 201, 93, 0.45);

  border-radius: 15px;

  font-size: 25px;

  background:
    rgba(244, 201, 93, 0.05);
}


.logo h2 {

  margin: 0;

  font-size: 26px;
}


.logo h2 span {

  color: #f4c95d;
}


.logo small {

  display: block;

  margin-top: 5px;

  color: #64748b;

  font-size: 8px;

  letter-spacing: 2px;
}


/* ========================= */
/* DESCRIPTION */
/* ========================= */

.footer-brand > p {

  max-width: 380px;

  color: #8995a8;

  font-size: 14px;

  line-height: 1.8;
}


/* ========================= */
/* SOCIAL */
/* ========================= */

.socials {

  display: flex;

  gap: 10px;

  margin-top: 25px;
}


.socials a {

  width: 38px;
  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  border:
    1px solid
    rgba(255, 255, 255, 0.1);

  color: #aeb8c9;

  text-decoration: none;

  transition: 0.3s;
}


.socials a:hover {

  background: #f4c95d;

  color: #111827;

  border-color: #f4c95d;

  transform: translateY(-5px);
}


/* ========================= */
/* COLUMN TITLES */
/* ========================= */

.footer-column h3 {

  margin-bottom: 25px;

  color: white;

  font-size: 16px;
}


.footer-column h3::after {

  content: "";

  display: block;

  width: 28px;

  height: 2px;

  margin-top: 10px;

  background: #f4c95d;
}


/* ========================= */
/* NAVIGATION */
/* ========================= */

.footer-column > a:not(.wonder-link):not(.country-link) {

  display: block;

  margin-bottom: 15px;

  color: #8995a8;

  text-decoration: none;

  font-size: 14px;

  transition: 0.3s;
}


.footer-column > a:not(.wonder-link):not(.country-link) span {

  color: #f4c95d;

  margin-right: 10px;

  font-size: 11px;
}


.footer-column > a:not(.wonder-link):not(.country-link):hover {

  color: #f4c95d;

  transform: translateX(5px);
}


/* ========================= */
/* WONDER LINKS */
/* ========================= */

.wonder-link {

  display: flex !important;

  align-items: center;

  gap: 12px;

  margin-bottom: 14px !important;

  padding: 8px;

  border-radius: 10px;

  text-decoration: none;

  transition: 0.3s;
}


.wonder-link:hover {

  background:
    rgba(244, 201, 93, 0.06);

  transform: translateX(5px);
}


.wonder-link .flag {

  width: 32px;

  font-size: 23px;

  text-align: center;
}


.wonder-link strong {

  display: block;

  color: #cbd5e1;

  font-size: 13px;

  font-weight: 600;
}


.wonder-link small {

  display: block;

  margin-top: 3px;

  color: #64748b;

  font-size: 11px;
}


.wonder-link:hover strong {

  color: #f4c95d;
}


/* ========================= */
/* COUNTRIES */
/* ========================= */

.country-link {

  display: flex !important;

  align-items: center;

  gap: 12px;

  margin-bottom: 15px !important;

  color: #8995a8 !important;

  text-decoration: none;

  font-size: 14px;

  transition: 0.3s;
}


.country-link span {

  font-size: 23px;

  width: 30px;

  text-align: center;
}


.country-link:hover {

  color: #f4c95d !important;

  transform: translateX(5px);
}


/* ========================= */
/* BOTTOM */
/* ========================= */

.footer-bottom {

  max-width: 1250px;

  margin: auto;

  padding: 22px 25px;

  border-top:
    1px solid
    rgba(255, 255, 255, 0.07);

  display: flex;

  justify-content: space-between;

  align-items: center;
}


.footer-bottom p {

  margin: 0;

  color: #64748b;

  font-size: 12px;
}


.footer-bottom strong {

  color: #aeb8c9;
}


.heart {

  color: #f4c95d;
}


/* ========================= */
/* TABLET */
/* ========================= */

@media (max-width: 1050px) {

  .footer-container {

    grid-template-columns:
      1fr
      1fr;

  }

}


/* ========================= */
/* MOBILE */
/* ========================= */

@media (max-width: 600px) {

  .footer-container {

    grid-template-columns: 1fr;

    padding-top: 60px;

  }


  .footer-bottom {

    flex-direction: column;

    gap: 10px;

    text-align: center;

  }

}

</style>