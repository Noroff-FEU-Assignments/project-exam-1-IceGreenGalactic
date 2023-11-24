let lastErrorMessage = "";

export function showError(message) {
  if (message !== lastErrorMessage) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";

    const errorText = document.createElement("p");
    errorText.innerHTML = message;

    errorContainer.appendChild(errorText);
    document.body.appendChild(errorContainer);
    lastErrorMessage = message;
  }
}

export function hideError() {
  const errorContainer = document.querySelector(".error-container");
  if (errorContainer) {
    document.body.removeChild(errorContainer);
    lastErrorMessage = "";
  }
}

export function displayConsoleError() {
  const originalConsoleError = console.error;
  console.error = function () {
    originalConsoleError.apply(console, arguments);
    if (!arguments[0]?.includes("showError")) {
      showError(Array.from(arguments).join(""));
    }
  };
}
