import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome
const fontAwesomeCDN = document.createElement("link");
fontAwesomeCDN.rel = "stylesheet";
fontAwesomeCDN.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesomeCDN);

// Add Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&display=swap";
document.head.appendChild(googleFonts);

// Set page title
const titleTag = document.createElement("title");
titleTag.textContent = "Nepali Cultural Events - Registration Platform";
document.head.appendChild(titleTag);

// Add custom styles to make it look like the design
const style = document.createElement("style");
style.textContent = `
  :root {
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Open Sans', sans-serif;
    --color-primary: #E53E3E;
    --color-secondary: #DD6B20;
    --color-accent: #805AD5;
  }
  
  body {
    font-family: var(--font-body);
  }
  
  .font-heading {
    font-family: var(--font-heading);
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
