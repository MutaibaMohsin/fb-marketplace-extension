Project Title: Facebook Marketplace Negotiator

Description:

The Facebook Marketplace Negotiator is a Chrome extension designed to streamline and automate the negotiation process on Facebook Marketplace. Users can input product details and a desired price range, and the extension will scrape relevant listings, present them in a user-friendly interface, and initiate automated negotiations with sellers. Leveraging the Groq API for AI-powered message generation, this extension aims to help users secure the best deals efficiently.

Key Features:

Product Scraping: Scrapes Facebook Marketplace listings based on user-defined search criteria (product name, price range).
Listing Display: Presents scraped listings in a clear and concise card format, including product image, name, price, and seller information.
Automated Negotiation: Initiates AI-driven negotiations with sellers, aiming to achieve a 10% discount from the listed price.
AI Message Generation: Uses the Groq API to generate polite and persuasive negotiation messages.
Negotiation Monitoring: Monitors seller responses and adjusts the negotiation strategy accordingly.
User Notifications: Provides notifications for successful negotiations or negotiation failures.
User-Friendly Interface: Easy-to-use interface for inputting search criteria and viewing negotiation progress.
Technology Stack:

JavaScript
HTML
CSS
Chrome Extensions API
Groq API
README.md
Facebook Marketplace Negotiator Extension
This Chrome extension automates the negotiation process on Facebook Marketplace, helping you secure the best deals efficiently.

Installation
Download the Repository: Download the project repository as a ZIP file and extract it to a local folder.
Enable Developer Mode: Open Google Chrome and navigate to chrome://extensions/. Enable "Developer mode" in the top right corner.
Load Unpacked: Click "Load unpacked" and select the extracted project folder.
Groq API Key: You will need a Groq API key to use the negotiation features. Place your Groq API key inside the popup.js file, replacing the placeholder.
Important Security Note: Embedding API keys directly in client-side code is a security risk. For a production environment, you'd ideally handle API calls through a secure backend server.
How to Use
Open Facebook Marketplace: Navigate to Facebook Marketplace in your Chrome browser.
Open the Extension: Click the extension icon in the Chrome toolbar.
Enter Search Criteria: Enter the product name, minimum price, and maximum price in the provided form.
Search: Click the "Search" button.
View Results: The extension will display a list of matching products with their details.
Initiate Negotiation: Click the "Negotiate" button on a product card to start the automated negotiation process.
Monitor Negotiation: The extension will display the negotiation progress and provide notifications for successful or failed negotiations.
Key Files
manifest.json: Defines the extension's metadata and permissions.
popup.html: Contains the HTML structure of the extension's popup window.
popup.js: Contains the JavaScript logic for the extension, including scraping, negotiation, and API calls.
styles.css: Contains the CSS styles for the extension's UI.
icons/: Contains the extension's icons
