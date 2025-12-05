document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const analyzeButton = document.getElementById("analyze-button");
  const proceedButton = document.getElementById("proceed-button");
  const goHomeButton = document.getElementById("go-home-button");
  const buttonContainer = document.getElementById("button-container");

  // Function to perform analysis
  analyzeButton.addEventListener("click", async () => {
    content.textContent = "Analyzing... Please wait...";

    try {
      // Send a request to your Flask backend (Make sure it's running)
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy_text: "Sample privacy policy text" })
      });

      const data = await response.json();

      if (data.error) {
        content.textContent = `Error: ${data.error}`;
      } else {
        // Format the policy ratings in a sophisticated way
        let formattedContent = `<strong>Final Rating:</strong> ${data.final_rating.rating} out of 5<br>${data.final_rating.explanation}`;
        formattedContent += "<ul>";

        data.ratings.forEach(item => {
          formattedContent += `<li><strong>${item.parameter}:</strong> ${item.rating} out of 5<br>${item.explanation}</li>`;
        });

        formattedContent += "</ul>";
        content.innerHTML = formattedContent;

        // Show the navigation buttons
        buttonContainer.style.display = "flex";
      }
    } catch (error) {
      content.textContent = `Error: ${error.message}`;
    }
  });

  // Function for "Proceed to Page" button
  proceedButton.addEventListener("click", () => {
    window.close(); // Close the extension popup
  });

  // Function for "Go to Chrome Home" button
  goHomeButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "chrome://newtab" }); // Open Chrome home page in a new tab
    window.close(); // Close the extension popup
  });
});
