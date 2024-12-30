document.addEventListener("DOMContentLoaded", function () {
  // Switch between Register and Login forms
  document
    .getElementById("switchToLogin")
    .addEventListener("click", function () {
      document.getElementById("registerForm").classList.add("hidden");
      document.getElementById("loginForm").classList.remove("hidden");
      document.getElementById("verifyForm").classList.add("hidden"); // Hide verify form
    });

  document
    .getElementById("switchToRegister")
    .addEventListener("click", function () {
      document.getElementById("loginForm").classList.add("hidden");
      document.getElementById("registerForm").classList.remove("hidden");
      document.getElementById("verifyForm").classList.add("hidden"); // Hide verify form
    });

  // Register functionality
  document.getElementById("registerBtn").addEventListener("click", function () {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const recaptchaToken = grecaptcha.getResponse();

    // Bypass reCAPTCHA validation
    console.log("Registering with:", email, password, role);

    fetch(`http://localhost:4343/api/auth/register/${role}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          document.getElementById("registerForm").classList.add("hidden");
          document.getElementById("loginForm").classList.remove("hidden");
        } else {
          alert("Registration failed");
        }
      })
      .catch((error) => {
        alert("Registration failed");
      });
  });

  // Login functionality
  document.getElementById("loginBtn").addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const recaptchaToken = grecaptcha.getResponse();

    // Bypass reCAPTCHA validation
    console.log("Logging in with:", email, password);

    fetch("http://localhost:4343/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, recaptchaToken }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mfaRequired) {
          document.getElementById("loginForm").classList.add("hidden");
          document.getElementById("verifyForm").classList.remove("hidden");
        } else {
          alert("Login successful");
        }
      })
      .catch((error) => {
        alert("Login failed");
      });
  });

  // MFA Verification functionality
  document.getElementById("verifyBtn").addEventListener("click", function () {
    const email = document.getElementById("loginEmail").value;
    const mfaCode = document.getElementById("mfaCode").value;

    fetch("http://localhost:4343/api/auth/verify-mfa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mfaCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("MFA Verification successful!");
          document.getElementById("verifyForm").classList.add("hidden");
          document.getElementById("loginForm").classList.remove("hidden");
        } else {
          alert("Verification failed");
        }
      })
      .catch((error) => {
        alert("Verification failed");
      });
  });
});
