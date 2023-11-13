document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
      document.getElementById("errorMessage").innerHTML = "";

      const nameInput = document.getElementById("name");
      const nameValue = nameInput.value.trim();
      if (nameValue.length < 5) {
        document.querySelector(`label[for="name"]`).textContent =
          "Name must be more than 5 characters";
        nameInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        nameInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";

        event.preventDefault();
        return;
      } else {
        document.querySelector(`label[for=name]`).textContent = "";
        nameInput.style.borderColor = "";
        nameInput.style.backgroundColor = "";
      }

      const emailInput = document.getElementById("email");
      const emailValue = emailInput.value.trim();
      const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailValidate.test(emailValue)) {
        document.querySelector(`label[for="email"]`).textContent =
          "Invalid email address";
        emailInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        emailInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        event.preventDefault();
        return;
      } else {
        document.querySelector(`label[for=email]`).textContent = "";
        emailInput.style.borderColor = "";
        emailInput.style.backgroundColor = "";
      }

      const subjectInput = document.getElementById("subject");
      const subjectValue = subjectInput.value.trim();
      if (subjectValue.length < 15) {
        document.querySelector(`label[for="subject"]`).textContent =
          "subject must be more than 15 characters ";
        subjectInput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        subjectInput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        event.preventDefault();
        return;
      } else {
        document.querySelector(`label[for=subject]`).textContent = "";
        subjectInput.style.borderColor = "";
        subjectInput.style.backgroundColor = "";
      }

      const messageImput = document.getElementById("message");
      const messageValue = messageImput.value.trim();
      if (messageValue.length < 25) {
        document.querySelector(`label[for = "message"]`).textContent =
          "Your message must be more than 25 characters";
        messageImput.style.borderColor = " rgba(174, 12, 6, 0.6)";
        messageImput.style.backgroundColor = " rgba(174, 12, 6, 0.1)";
        event.preventDefault();
        return;
      } else {
        document.querySelector(`label[for=message]`).textContent = "";
        messageImput.style.borderColor = "";
        messageImput.style.backgroundColor = "";
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
  formContainer.appendChild(successMessage);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
  document.getElementById("submitButton").textContent = "Sendt";
  document.getElementById("submitButton").setAttribute("disabled", true);
}
