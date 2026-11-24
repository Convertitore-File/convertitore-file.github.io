# CHANGELOG - Universal PDF Converter

## v2.2.1 - 2026-11-24

### Bug Fixes

#### [CSSOM] Print popup button removal
- **Problem**: `querySelector('#removeFileBtn, button')` only removed the first matching button, leaving residual UI elements in the print window
- **Solution**: Replaced with `querySelectorAll` + `forEach` to remove all matching elements
- **File**: `script.js` (handlePrintPDF function)

#### [XML Parsing] TypeError on missing `<returns>` element
- **Problem**: `m.querySelector('returns')?.textContent.trim()` threw TypeError when `<returns>` element was absent from C# XML documentation members
- **Solution**: Added secondary optional chaining: `?.textContent?.trim()` safely returns `null` instead of throwing
- **File**: `script.js` (renderCSharpXmlDocumentation function)

#### [Validation] Redundant file type check
- **Problem**: `isValidFileType()` called both `isCSharpXmlFile()` and `AppConfig.supportedExtensions.text.test()`, causing `.xml` files to be validated twice with overlapping logic
- **Solution**: Removed `isCSharpXmlFile()` check since `supportedExtensions.text.test` already includes `.xml` in its regex pattern
- **File**: `script.js` (isValidFileType function)

#### [UI] Dark mode preference priority
- **Problem**: Initial dark mode only checked `localStorage` vs system preference, not respecting manually-set user preferences (light mode saved being overridden by dark system theme)
- **Solution**: Reorganized logic to: saved preference > system preference > default light mode, giving users control over their theme choice
- **File**: `script.js` (initDarkModeToggle function)

#### [Print] Popup window compatibility
- **Problem**: `document.write()` without prior `document.open()` call is unreliable in modern browsers with popup blockers, potentially resulting in empty print windows
- **Solution**: Added explicit `printWindow.document.open()` call before writing HTML content to ensure consistent popup behavior
- **File**: `script.js` (handlePrintPDF function)

#### [Cosmetic] Copyright year replacement scope
- **Problem**: `replace(/2026/g, currentYear)` replaced **all** occurrences of "2026" in the copyright text, risking unintended substitution of version numbers or other references
- **Solution**: Changed to `replace('2026', currentYear)` which replaces only the first occurrence, standard practice for year updates
- **File**: `script.js` (updateCopyrightYear function)

---

## v2.2.0 - 2026-11-24 (Initial Release)

### Features
- Universal PDF Converter web application with drag-and-drop file conversion
- Support for images, text/code files, and C# XML documentation
- Client-side processing (100% in browser, no server upload)
- Dark mode with system preference synchronization
- Responsive design for mobile and desktop
- Smooth animations and accessibility features

### Supported Formats
- **Images**: JPG, PNG, WEBP, GIF, SVG, BMP, ICO
- **Text/Code**: .txt, .cs, .html, .json, .csv, .py, .js, .php, .rb, .java, .go, .rs, .ts, .tsx, .jsx
- **C# XML Documentation**: Structured member rendering

### Browser Support
- Chrome (Latest), Firefox (Latest), Safari (Latest), Edge (Latest), Opera (Latest)

---

*Changelog generated automatically from code review analysis. For detailed per-change context, refer to the individual bug fix entries above.*