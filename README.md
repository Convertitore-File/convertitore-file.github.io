# Universal PDF Converter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Description

**Universal PDF Converter** is a modern and intuitive web application that allows you to upload various file types and view or convert them to PDF. The interface is designed to be immediate: simply drag and drop a file or select one to get a preview, and if possible print it directly to PDF.

The application currently handles the following:

- **🖼️ Images** (JPG, PNG, WEBP, GIF, SVG, SVGZ, BMP, ICO)
- **💻 Text and code files** (.txt, .cs, .html, .json, .csv, .py, .js, .php, .rb, .java, .go, .rs, .ts, .tsx, .jsx)
- **📚 C# documentation** with structured member rendering (classes, methods, properties, fields)
- **📄 Generic XML files**

When available, a "Print PDF" button appears that saves the current view as PDF via the browser.

## ✨ Features

| Feature | Description |
| ------- | ----------- |
| **Graphical Upload** | Drag and drop or click to select a file |
| **Immediate Preview** | Image and text preview with syntax highlighting |
| **C# XML Rendering** | Structured with classes, methods, properties, fields and parameters |
| **PDF Print** | Integrated button to save any view as PDF |
| **Responsive Design** | Works perfectly on desktop and mobile devices |
| **Light/Dark Theme** | Full support for both modes |
| **Smooth Animations** | Entrance animations and hover interactions |
| **Accessibility** | ARIA labels, focus management, keyboard navigation |

## 🚀 How to Use

### Local Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/convertitore-file/universal-pdf-converter.git
   ```

2. **Open the application**

   ```bash
   cd universal-pdf-converter
   open index.html
   ```

   Or simply open `index.html` with any modern browser.

3. **Usage**

   - In the top toolbar, press the **📂 Choose a file** button or drag a file into the designated area
   - The application will automatically detect the file type and show a preview:
     - **Images**: thumbnail preview displayed
     - **Text/Code**: content displayed with syntax highlighting
     - **C# XML**: technical structure with members, parameters and return values
   - If available, press the **🖨️ Save as PDF** button to save the page as PDF

### 🌐 Online Demo

You can try the application directly online: [https://convertitore-file.github.io/](https://convertitore-file.github.io/)

## 🛠️ Technologies Used

- **HTML5** – Page structure
- **CSS3** – Styling, layout and PDF print rules (`@media print`)
- **Vanilla JavaScript** – File reading logic, preview and DOM manipulation
- **Google Fonts** (Outfit, Space Grotesk, Press Start 2P) – Visual appearance
- **Font Awesome** – Icons
- **Responsive Design** – Mobile-first approach
- **Print CSS** – Browser print rules

## 📦 Supported Formats

| Type | Extensions |
| ---- | ---------- |
| **Images** | .jpg, .jpeg, .png, .webp, .gif, .svg, .bmp, .ico |
| **Text/Code** | .txt, .cs, .html, .json, .csv, .py, .js, .php, .rb, .java, .go, .rs, .ts, .tsx, .jsx |

## 🎯 Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome | Latest |
| Firefox | Latest |
| Safari | Latest |
| Edge | Latest |
| Opera | Latest |

The application works on any modern browser that supports ES6+ and File API.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments for complex functions
- Maintain responsive design
- Add manual tests for new supported formats
- Update documentation accordingly

## 📄 License

This project is released under the **MIT** License. See the `LICENSE` file for more details.

Copyright (c) 2026 Cipriano Salvatore

## 👤 Author

**Cipriano Salvatore**

- GitHub: [@cipriano-salvatore](https://github.com/cipriano-salvatore)
- Email: [cipriano.salvatore@outlook](mailto:cipriano.salvatore@outlook.com)

⭐ **If you like this project, consider giving it a star on GitHub!**

---

## 🌐 Deployment

### GitHub Pages

This project is designed to be hosted on [GitHub Pages](https://pages.github.io/). To deploy:

1. Push your changes to the `main` branch
2. Go to repository Settings > Pages
3. Set the source branch to `main` and folder to `/ (root)`
4. Your site will be available at `https://convertitore-file.github.io/`

### Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm start

# Or simply open index.html in any modern browser
```

### PWA Support

The website can be installed as a Progressive Web App. Consider adding a `manifest.json` and service worker for offline capabilities and home screen addition.

## 📱 PWA Manifest (da aggiungere)

```json
{
  "name": "Universal PDF Converter",
  "short_name": "PDF Converter",
  "description": "Convert various file types to PDF directly in the browser",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1e3a8a",
  "icons": [
    {
      "src": "img/Logo.jpeg",
      "sizes": "192x192",
      "type": "image/jpeg"
    }
  ]
}
```

## 🔒 Sicurezza

- Tutte le elaborazioni avvengono **interamente nel browser** (client-side)
- Nessun file viene caricato su server esterni
- Supporto per HTTPS obbligatorio per la funzionalità File API
- Privacy policy disponibile nella pagina dedicata

## 📊 Analytics (opzionale)

Per monitorare l'utilizzo del sito, è possibile integrare:
- Google Analytics (con configurazione privacy-friendly)
- Plausible.io (leggero e privacy-first)
- Statistiche GitHub Pages built-in

## 🌐 Browser Compatibility

Testato su:
- Chrome (ultima versione)
- Firefox (ultima versione)
- Safari (ultima versione)
- Edge (ultima versione)
- Opera (ultima versione)

L'applicazione funziona su qualsiasi browser moderno che supporta ES6+ e File API.

## 📬 Contatti e Supporto

- **GitHub Issues**: Segnalare bug e feature request
- **Email**: cipriano.salvatore@example.com
- **Discussions**: Per domande generali e supporto

## ⭐ Sponsorship

Se trovi utile questo progetto, considera di sponsorizzarlo per aiutare a mantenere e migliorare l'applicazione:

[![Sponsor](https://img.shields.io/github/sponsors/cipriano-salvatore?style=flat-square)](https://github.com/sponsors/cipriano-salvatore)