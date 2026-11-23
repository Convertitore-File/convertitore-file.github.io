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