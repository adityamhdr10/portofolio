// KONFIGURASI EMAILJS - GANTI 3 NILAI INI
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "3J9Xegzz4tWYv2Gdr", // Dari Account > API Keys
  SERVICE_ID: "service_m282ers", // Dari Email Services
  TEMPLATE_ID: "template_uvgm4as", // Dari Email Templates
};

// Inisialisasi EmailJS
(function () {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Fungsi alert
function showAlert(message, type) {
  const alertDiv = document.getElementById("form-alert");
  alertDiv.textContent = message;
  alertDiv.className = `form-alert ${type}`;
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 5000);
}

// Fungsi loading button
function setButtonLoading(isLoading) {
  const submitBtn = document.getElementById("submit-btn");
  if (isLoading) {
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
}

// Handler form
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    setButtonLoading(true);
    document.getElementById("form-alert").style.display = "none";

    emailjs
      .sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, this)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          showAlert(
            "✅ Message sent successfully! I'll get back to you soon.",
            "success"
          );
          document.getElementById("contact-form").reset();
          setButtonLoading(false);
        },
        function (error) {
          console.error("FAILED...", error);
          showAlert(
            "❌ Failed to send message. Please try again or contact me directly via email.",
            "error"
          );
          setButtonLoading(false);
        }
      );
  });

// Validasi email
document.getElementById("from_email").addEventListener("blur", function () {
  const email = this.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    this.style.borderColor = "rgba(244, 67, 54, 0.5)";
    showAlert("⚠️ Please enter a valid email address", "error");
  } else {
    this.style.borderColor = "rgba(255, 255, 255, 0.2)";
  }
});
