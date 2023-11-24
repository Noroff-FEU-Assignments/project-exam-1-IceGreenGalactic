document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
      document.getElementById("errorMessage").innerHTML = "";

      const nameInput = document.getElementById("name");
      const nameLabel = document.querySelector(`label[for="name"]`);
      const nameValue = nameInput.value.trim();
      if (nameValue.length < 5) {
        nameLabel.textContent = "Name must be more than 5 characters";
        nameInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        nameInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        nameLabel.style.color = "red";

        event.preventDefault();
        return;
      } else {
        nameLabel.textContent = "";
        nameInput.style.borderColor = "";
        nameInput.style.backgroundColor = "";
        nameLabel.style.color = "";
      }

      const emailInput = document.getElementById("email");
      const emailLabel = document.querySelector(`label[for="email"]`);
      const emailValue = emailInput.value.trim();
      const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidate.test(emailValue)) {
        emailLabel.textContent = "Invalid email address";
        emailInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        emailInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        emailLabel.style.color = "red";
        event.preventDefault();
        return;
      } else {
        emailLabel.textContent = "";
        emailInput.style.borderColor = "";
        emailInput.style.backgroundColor = "";
        emailLabel.style.color = "";
      }

      const subjectInput = document.getElementById("subject");
      const subjectLabel = document.querySelector(`label[for="subject"]`);
      const subjectValue = subjectInput.value.trim();
      if (subjectValue.length < 15) {
        subjectLabel.textContent = "subject must be more than 15 characters ";
        subjectInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        subjectInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        subjectLabel.style.color = "red";
        event.preventDefault();
        return;
      } else {
        subjectLabel.textContent = "";
        subjectInput.style.borderColor = "";
        subjectInput.style.backgroundColor = "";
        subjectLabel.style.color = "";
      }

      const messageImput = document.getElementById("message");
      const messageLabel = document.querySelector(`label[for = "message"]`);
      const messageValue = messageImput.value.trim();
      if (messageValue.length < 25) {
        messageLabel.textContent =
          "Your message must be more than 25 characters";
        messageImput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        messageImput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        messageLabel.style.color = "red";
        event.preventDefault();
        return;
      } else {
        messageLabel.textContent = "";
        messageImput.style.borderColor = "";
        messageImput.style.backgroundColor = "";
        messageLabel.style.color = "";
      }

      showSuccsessMessage();
      event.preventDefault();
    });
});
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
