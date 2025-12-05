// Function to create and display the modal on the webpage
function createPrivacyAnalyzerModal() {
  if (sessionStorage.getItem("privacyAnalyzerShown")) {
      return; // If the modal has been shown, do not display it again
  }
  sessionStorage.setItem("privacyAnalyzerShown", "true");

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "10000";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const modal = document.createElement("div");
  modal.style.backgroundColor = "#ffffff";
  modal.style.borderRadius = "10px";
  modal.style.padding = "20px";
  modal.style.width = "80%";
  modal.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
  modal.style.textAlign = "center";
  modal.style.overflowY = "auto";
  modal.style.maxHeight = "80vh";

  const title = document.createElement("h2");
  title.textContent = "Privacy Analyzer";
  title.style.marginBottom = "10px";
  title.style.fontSize = "1.5rem";
  title.style.color = "#2c3e50";
  modal.appendChild(title);

  // Placeholder for star rating
  const starRatingContainer = document.createElement("div");
  starRatingContainer.style.marginBottom = "20px";
  starRatingContainer.style.fontSize = "24px"; // Size of the stars
  starRatingContainer.style.color = "#f1c40f"; // Gold color for stars
  starRatingContainer.style.display = "flex";
  starRatingContainer.style.justifyContent = "center";
  modal.appendChild(starRatingContainer);

  const contentBox = document.createElement("div");
  contentBox.style.color = "#555";
  contentBox.style.fontSize = "1rem";
  contentBox.style.lineHeight = "1.6";
  contentBox.style.marginBottom = "20px";
  modal.appendChild(contentBox);

  const analyzeButton = document.createElement("button");
  analyzeButton.textContent = "Analyze";
  analyzeButton.style.backgroundColor = "#3498db";
  analyzeButton.style.color = "#fff";
  analyzeButton.style.border = "none";
  analyzeButton.style.padding = "10px 20px";
  analyzeButton.style.borderRadius = "5px";
  analyzeButton.style.cursor = "pointer";
  analyzeButton.style.marginBottom = "15px";
  analyzeButton.onclick = async () => {
      contentBox.textContent = "Analyzing... Please wait.";

      try {
          const policyText = document.body.innerText; // Simplified policy text extraction
          const response = await fetch("http://localhost:8000/analyze", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ policy_text: policyText }),
          });

          const data = await response.json();
          if (data.error) {
              contentBox.textContent = `Error: ${data.error}`;
          } else {
              // Display the overall star rating
              const overallRating = data.final_rating.rating;
              renderStarRating(starRatingContainer, overallRating);

              const table = document.createElement("table");
              table.style.width = "100%";
              table.style.borderCollapse = "collapse";
              table.style.marginTop = "15px";

              const headerRow = document.createElement("tr");

              const header1 = document.createElement("th");
              header1.textContent = "Parameter";
              header1.style.border = "1px solid #ddd";
              header1.style.padding = "8px";
              header1.style.backgroundColor = "#f2f2f2";
              header1.style.textAlign = "left";

              const header2 = document.createElement("th");
              header2.textContent = "Description";
              header2.style.border = "1px solid #ddd";
              header2.style.padding = "8px";
              header2.style.backgroundColor = "#f2f2f2";
              header2.style.textAlign = "left";

              const header3 = document.createElement("th");
              header3.textContent = "Rating";
              header3.style.border = "1px solid #ddd";
              header3.style.padding = "8px";
              header3.style.backgroundColor = "#f2f2f2";
              header3.style.textAlign = "center";

              const header4 = document.createElement("th");
              header4.textContent = "Indicator";
              header4.style.border = "1px solid #ddd";
              header4.style.padding = "8px";
              header4.style.backgroundColor = "#f2f2f2";
              header4.style.textAlign = "center";

              headerRow.appendChild(header1);
              headerRow.appendChild(header2);
              headerRow.appendChild(header3);
              headerRow.appendChild(header4);
              table.appendChild(headerRow);

              data.ratings.forEach((item) => {
                  const row = document.createElement("tr");

                  const parameterCell = document.createElement("td");
                  parameterCell.textContent = item.parameter;
                  parameterCell.style.border = "1px solid #ddd";
                  parameterCell.style.padding = "8px";

                  const descriptionCell = document.createElement("td");
                  descriptionCell.textContent = item.explanation;
                  descriptionCell.style.border = "1px solid #ddd";
                  descriptionCell.style.padding = "8px";

                  const ratingCell = document.createElement("td");
                  ratingCell.textContent = `${item.rating} / 5`;
                  ratingCell.style.border = "1px solid #ddd";
                  ratingCell.style.padding = "8px";
                  ratingCell.style.textAlign = "center";

                  const indicatorCell = document.createElement("td");
                  indicatorCell.style.border = "1px solid #ddd";
                  indicatorCell.style.padding = "8px";
                  indicatorCell.style.textAlign = "center";

                  const dot = document.createElement("span");
                  dot.style.display = "inline-block";
                  dot.style.width = "16px";
                  dot.style.height = "16px";
                  dot.style.borderRadius = "50%";
                  dot.style.backgroundColor = getRatingColor(item.rating);

                  indicatorCell.appendChild(dot);
                  row.appendChild(parameterCell);
                  row.appendChild(descriptionCell);
                  row.appendChild(ratingCell);
                  row.appendChild(indicatorCell);
                  table.appendChild(row);
              });

              const finalRatingRow = document.createElement("tr");

              const finalRatingCell1 = document.createElement("td");
              finalRatingCell1.textContent = "Final Rating";
              finalRatingCell1.style.border = "1px solid #ddd";
              finalRatingCell1.style.padding = "8px";
              finalRatingCell1.style.fontWeight = "bold";

              const finalRatingCell2 = document.createElement("td");
              finalRatingCell2.colSpan = "3"; // Spans the rest of the columns
              finalRatingCell2.textContent = `${data.final_rating.rating} out of 5: ${data.final_rating.explanation}`;
              finalRatingCell2.style.border = "1px solid #ddd";
              finalRatingCell2.style.padding = "8px";

              finalRatingRow.appendChild(finalRatingCell1);
              finalRatingRow.appendChild(finalRatingCell2);
              table.appendChild(finalRatingRow);

              contentBox.innerHTML = ""; // Clear previous content
              contentBox.appendChild(table);
          }
      } catch (error) {
          contentBox.textContent = `Error: ${error.message}`;
      }
  };
  modal.appendChild(analyzeButton);

  // Create container for buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "space-between";
  buttonContainer.style.marginTop = "20px";

  const proceedButton = document.createElement("button");
  proceedButton.textContent = "Proceed to Website";
  proceedButton.style.backgroundColor = "#27ae60";
  proceedButton.style.color = "#fff";
  proceedButton.style.border = "none";
  proceedButton.style.padding = "10px 20px";
  proceedButton.style.borderRadius = "5px";
  proceedButton.style.cursor = "pointer";
  proceedButton.style.marginRight = "10px";
  proceedButton.onclick = () => {
      overlay.remove();
  };

  const googleButton = document.createElement("button");
  googleButton.textContent = "Go to Google Homepage";
  googleButton.style.backgroundColor = "#e74c3c";
  googleButton.style.color = "#fff";
  googleButton.style.border = "none";
  googleButton.style.padding = "10px 20px";
  googleButton.style.borderRadius = "5px";
  googleButton.style.cursor = "pointer";
  googleButton.onclick = () => {
      window.location.href = "https://www.google.com"; // Navigate to Google in the current tab
  };

  buttonContainer.appendChild(proceedButton);
  buttonContainer.appendChild(googleButton);
  modal.appendChild(buttonContainer);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// Function to render the star rating
function renderStarRating(container, rating) {
  container.innerHTML = ""; // Clear existing stars

  for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.style.fontSize = "30px"; // Adjust star size
      star.style.margin = "0 5px"; // Add spacing between stars
      star.style.display = "inline-block";
      star.style.position = "relative";
      star.style.color = "#e0e0e0"; // Default color for empty stars

      if (i <= Math.floor(rating)) {
          // Fully filled star
          star.style.color = "#f1c40f"; // Gold for full stars
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
          // Half star
          const halfStar = document.createElement("span");
          halfStar.textContent = "★";
          halfStar.style.position = "absolute";
          halfStar.style.left = "0";
          halfStar.style.width = "50%";
          halfStar.style.overflow = "hidden";
          halfStar.style.color = "#f1c40f"; // Gold for half-filled part
          star.appendChild(halfStar);
      }

      container.appendChild(star);
  }
}

// Function to determine dot color based on the rating
function getRatingColor(rating) {
  if (rating >= 4) {
      return "green"; // Green for ratings 4-5
  } else if (rating >= 2) {
      return "yellow"; // Yellow for ratings 2-3
  } else {
      return "red"; // Red for rating 1
  }
}

createPrivacyAnalyzerModal();
