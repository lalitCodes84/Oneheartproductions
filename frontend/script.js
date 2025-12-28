/************************************
 * MOBILE NAVIGATION TOGGLE
 ************************************/
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

/************************************
 * FOOTER YEAR
 ************************************/
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/************************************
 * FORM SUBMIT — CONFIRMATION FLOW
 ************************************/
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 🔄 Button loading state (UX fix)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.innerHTML = "Submitting…";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    const data = Object.fromEntries(new FormData(form));

    if (!data.name || !data.email) {
      alert("Please enter name and email.");

      // restore button if validation fails
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      return;
    }

    let emailSent = false;

    try {
      const res = await fetch("https://onehp-backend.onrender.com/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result && result.success === true) {
        emailSent = true;
      }
    } catch (err) {
      console.warn("Backend error (email may not send):", err);
    }

    // 📲 WhatsApp fallback (always useful)
    const waText = encodeURIComponent(
`New Enquiry - 1 Heart Productions
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "NA"}
Event Type: ${data.type || "NA"}
Business Type: ${data.businessType || "NA"}
Message: ${data.message || "NA"}`
    );
    window.open(`https://wa.me/919170727478?text=${waText}`, "_blank");

    form.reset();
    showThankYouScreen(emailSent);
  });
}

/************************************
 * THANK YOU SCREEN (STATUS AWARE)
 ************************************/
function showThankYouScreen(emailSent) {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="section" style="min-height:70vh; display:flex; align-items:center;">
      <div class="container" style="text-align:center;">
        <h1 style="font-size:2rem; margin-bottom:1rem;">
          ${emailSent ? "Thank you! 🎉" : "Thank you! ✨"}
        </h1>
        <p style="color:#9ca3af; font-size:1.1rem;">
          ${
            emailSent
              ? "Your enquiry has been sent successfully.<br>Our team will get back to you soon."
              : "We’ve received your enquiry.<br>Our team will contact you shortly."
          }
        </p>
        <p style="margin-top:1.2rem; font-size:0.9rem; color:#6b7280;">
          Redirecting to home page…
        </p>
      </div>
    </section>
  `;

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3500);
}

/************************************
 * HERO BACKGROUND SLIDER (FIXED)
 ************************************/
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero-slider");
  if (!hero) return;

  const images = [
  "images/Gemini_Generated_Image_cg6ph0cg6ph0cg6p.png",
  "images/Gemini_Generated_Image_mru7dnmru7dnmru7.png",
  "images/Gemini_Generated_Image_tgpbh1tgpbh1tgpb.png",
  "images/Gemini_Generated_Image_y6pksey6pksey6pk.png",
  "images/Poster.png",
];


  let index = 0;

  hero.style.backgroundImage =
    `linear-gradient(rgba(2,6,23,0.75), rgba(2,6,23,0.75)), url(${images[0]})`;

  setInterval(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage =
      `linear-gradient(rgba(2,6,23,0.75), rgba(2,6,23,0.75)), url(${images[index]})`;
  }, 1900);
});
