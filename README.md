The Privacy Policy Analyzer is a Chrome extension that uses AI to analyze and evaluate the privacy policies of websites. It provides insights into the data collection and usage practices of websites, helping users make informed decisions about their online privacy. The extension communicates with a backend server powered by Flask and leverages a language model for analysis.

Features: Analyze Privacy Policies: Extracts and evaluates the text of website privacy policies. Ratings and Explanations: Provides structured ratings (out of 5) for parameters like data collection, data privacy, and data sharing. Star Rating Visualization: Displays an overall rating in the form of stars, including support for half-stars. Interactive Buttons: Allows users to proceed to the website or navigate to the Google homepage directly from the extension. Table Format Display: Presents detailed analysis results in a clear, tabular format.

Technology Stack: Frontend:s HTML/CSS: For the popup UI and layout. JavaScript: For interactivity and dynamic rendering in popup.js and content.js. Backend: Flask: Handles requests and communicates with the language model for policy analysis. Python: Core backend logic.

Installation: Clone the Repository: git clone https://github.com/shrujal24/Privacy-Policy-Analyzer

Set Up the Backend: Install Python dependencies: pip install flask flask-cors

Run the Flask backend: python main.py

Set Up the Chrome Extension: Open Chrome and navigate to chrome://extensions/. Enable "Developer mode" in the top-right corner. Click on "Load unpacked" and select the folder containing the manifest.json file.

Usage: Open a website whose privacy policy you want to analyze. Click on the Privacy Policy Analyzer extension icon in the toolbar. Click the "Analyze" button to initiate the analysis. View the overall rating as stars and a detailed breakdown in the table. Use the "Proceed to Website" or "Go to Google Homepage" buttons for navigation.

Known Issues: Half-star rendering may not work consistently in some older browsers. Performance may vary for websites with very long or complex privacy policies.

Future Enhancements: Add multi-language support for privacy policy analysis. Improve the accuracy of the AI model. Support for downloading analysis reports. Add a dark mode for the extension UI.
