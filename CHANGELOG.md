# CHANGELOG - Universal PDF Converter

## v2.2.2 - 2026-11-24

### Improvements

#### [Accessibilità] Skip link e navigazione
- **Problem**: Mancanza di attributi aria-label per la navigazione da tastiera e screen reader
- **Solution**: Aggiunti `aria-label` su tutti i link di navigazione (Saltare al convertitore, Caratteristiche, Come funziona, Informazioni, Contatti) e sullo skip link principale
- **File**: `index.html` - Aggiunte etichette descriptive per migliore accessibilità WCAG

#### [Accessibilità] Focus-visible styling
- **Problem**: Stile focus inconsistente sui pulsanti e elementi interattivi, non visibile correttamente su tutti i browser
- **Solution**: Aggiunti stili `:focus-visible` personalizzati su `.btn`, `.btn-primary`, `.btn-secondary` con outline 2px e offset. Aggiunto `.skip-link:focus-visible` con outline gialla visibile
- **File**: `Style/style.css` - Migliorie focus per conformità accessibility

#### [Accessibilità] Gesture touch e `:active`
- **Problem**: Comportamenti hover sui dispositivi touch non ottimizzati, trasformazioni non appropriate su touch
- **Solution**: Aggiunti media query `(hover: none) and (pointer: coarse)` per disabilitare trasformazioni hover su dispositivi touch e aggiunto effetto `:active` scale su button, card e preview row
- **File**: `Style/style.css` - Miglioramenti UX per mobile touch devices

#### [Accessibilità] Aree di caricamento Drag-and-Drop
- **Problem**: Area drag-and-drop priva di attributi ARIA e feedback tastiera
- **Solution**: Aggiunto `aria-label="Area di caricamento file"`, `role="region"`, `tabindex="0"`, `aria-label` sull'input file, e testo nascosto `.sr-only` per istruzioni tastiera (Premere Invio o Spazio per sfogliare)
- **File**: `index.html` - Accessibilità drag-and-drop area

#### [SEO] Metadati hreflang e robots
- **Problem**: Mancanza di hreflang tags e meta robots per indicizzazione multilingua
- **Solution**: Aggiunti `link rel="alternate" hreflang="it"` e `hreflang="en"`, oltre a `meta name="robots"` con `max-snippet` e `max-image-preview`
- **File**: `index.html` - Miglior SEO e internazionalizzazione

#### [SEO] Struttura heading e title
- **Problem**: Heading hierarchy non ottimizzata e section mancanti di `aria-labelledby`
- **Solution**: Aggiunti `id="about-title"`, `id="privacy-title"`, `id="terms-title"` e collegati agli `aria-labelledby` sui respectivi `<section>` e `<main>` elements
- **File**: `index.html`, `pages/privacy.html`, `pages/termini.html` - Migliore struttura semantica

#### [UX] Drag-and-Drop keyboard support
- **Problem**: Nessun modo per attivare il file input tramite tastiera oltre il click sul label
- **Solution**: Aggiunto `converterArea.addEventListener('keydown')` per gestire Spazio e Invio come trigger alternativo per aprire il selettore file
- **File**: `script.js` - Accessibilità da tastiera

#### [UX] Enhanced loading state
- **Problem**: Stato di caricamento generico senza informazioni sul file in corso di elaborazione
- **Solution**: Migliorato `showLoadingState()` per includere il nome del file e un messaggio aggiuntivo sul processing locale nel browser
- **File**: `script.js` - Migliore user experience durante l'attesa

#### [CSS] Focus-ready skip link
- **Problem**: Skip link focus non stilato in modo distintivo
- **Solution**: Aggiunti stili `.sr-only.focusable:focus-visible` per rendere lo skip link visibile quando focalizzato, con position: static e background contrastato
- **File**: `Style/style.css` - Accessibilità skip link

---

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

*Changelog generated from code review analysis. For detailed per-change context, refer to the individual bug fix and improvement entries above.*