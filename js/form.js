/**
 * Vitalia - Centre d'Amincissement
 * Contact Form Script
 * Version: 1.1
 */

document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    hideMessages();

    if (validateForm(contactForm)) {
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      try {
        submitButton.disabled = true;
        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        const formData = new FormData(contactForm);
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content,
          },
          body: formData,
        });

        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();
        if (data.success) {
          showSuccessMessage();
          contactForm.reset();
        } else {
          throw new Error(data.message || "Erreur lors de l'envoi");
        }
      } catch (error) {
        showErrorMessage(error.message);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });

  // Add input validation on blur
  const inputs = contactForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    if (input.type !== "checkbox") {
      input.addEventListener("blur", () => validateInput(input));
    }
  });
}

function validateInput(input) {
  const errorMessage = input.parentElement.querySelector(".error-message");
  if (errorMessage) errorMessage.remove();
  input.classList.remove("error");

  if (input.hasAttribute("required") && !input.value.trim()) {
    return showError(input, "Ce champ est obligatoire");
  }

  switch (input.type) {
    case "email":
      if (input.value.trim() && !isValidEmail(input.value.trim())) {
        return showError(input, "Veuillez entrer une adresse email valide");
      }
      break;
    case "tel":
      if (input.value.trim() && !isValidPhone(input.value.trim())) {
        return showError(
          input,
          "Veuillez entrer un numéro de téléphone valide"
        );
      }
      break;
  }
  return true;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9\s\+\-\(\)]{8,20}$/.test(phone);
}

function showError(input, message) {
  input.classList.add("error");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
  return false;
}

function hideMessages() {
  document.getElementById("form-success")?.classList.remove("show");
  document.getElementById("form-error")?.classList.remove("show");
}

function showSuccessMessage() {
  const successElement = document.getElementById("form-success");
  if (successElement) {
    successElement.classList.add("show");
    setTimeout(() => successElement.classList.remove("show"), 5000);
  }
}

function showErrorMessage(
  message = "Une erreur est survenue. Veuillez réessayer."
) {
  const errorElement = document.getElementById("form-error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
    setTimeout(() => errorElement.classList.remove("show"), 5000);
  }
}
