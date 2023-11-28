document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
      document.getElementById("errorMessage").innerHTML = "";

      const nameInput = document.getElementById("name");
      const nameLabel = document.querySelector(`label[for="name"]`);
      const nameValue = nameInput.value.trim();
      if (nameValue.length < 5) {
        setErrorMessage(
          nameLabel,
          "Name must be more than 5 characters",
          nameInput,
          event
        );
      } else {
        resetErrorMessages(nameInput, nameLabel);
      }

      const emailInput = document.getElementById("email");
      const emailLabel = document.querySelector(`label[for="email"]`);
      const emailValue = emailInput.value.trim();
      const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidate.test(emailValue)) {
        setErrorMessage(emailLabel, "Invalid email address", emailInput, event);
      } else {
        resetErrorMessages(emailInput, emailLabel);
      }

      const subjectInput = document.getElementById("subject");
      const subjectLabel = document.querySelector(`label[for="subject"]`);
      const subjectValue = subjectInput.value.trim();
      if (subjectValue.length < 15) {
        setErrorMessage(
          subjectLabel,
          "subject must be more than 15 characters",
          subjectInput,
          event
        );
      } else {
        resetErrorMessages(subjectInput, subjectLabel);
      }

      const messageInput = document.getElementById("message");
      const messageLabel = document.querySelector(`label[for = "message"]`);
      const messageValue = messageInput.value.trim();
      if (messageValue.length < 25) {
        setErrorMessage(
          messageLabel,
          "Your message must be more than 25 characters",
          messageInput,
          event
        );
      } else {
        resetErrorMessages(messageInput, messageLabel);
      }
      if (document.querySelectorAll(".form-error-message").length > 0) {
        event.preventDefault();
      } else {
        showSuccsessMessage();
      }
    });
});

function resetErrorMessages(input, label) {
  label.textContent = "";
  label.classList.remove("form-error-message");
  input.style.borderColor = "";
  input.style.backgroundColor = "";
  label.style.color = "initial";

  event.preventDefault();
}
function showSuccsessMessage() {
  const successMessage = document.createElement("div");
  successMessage.textContent = "Thank you for your message";
  successMessage.className = "success-message";
  const formContainer = document.querySelector(".text-container-index");
  const form = document.querySelector(".form-container");
  form.style.backgroundColor = "rgb(61, 98, 2, 10%)";
  formContainer.appendChild(successMessage);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
  document.getElementById("submitButton").textContent = "Sendt";
  document.getElementById("submitButton").setAttribute("disabled", true);
}

function setErrorMessage(label, errorMessage, input, event) {
  if (errorMessage && event) {
    label.textContent = errorMessage;
    label.classList.add("form-error-message");
    input.style.borderColor = "rgba(174, 12, 6, 0.6)";
    input.style.backgroundColor = "rgba(174, 12,6, 0.1)";
    label.style.color = "rgba(174,12,6,0.6)";
    event.preventDefault();
  } else {
    resetErrorMessages(input, label);
    showSuccsessMessage();
  }
}
