# Universal PDF Converter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/convertitore-file/universal-pdf-converter?style=social)](https://github.com/convertitore-file/universal-pdf-converter)
[![Twitter: @cipriano_salvatore](https://img.shields.io/badge/@cipriano_salvatore-Twitter-1DA1F2?style=social)](https://twitter.com/cipriano_salvatore)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fconvertitore-file.github.io%2F)](https://convertitore-file.github.io/)

## 📝 Descrizione

**Universal PDF Converter** è un'applicazione web moderna e intuitiva che ti permette di caricare vari tipi di file e visualizzarli o convertirli in PDF. L'interfaccia è progettata per essere immediata: basta trascinare un file o selezionarlo per ottenere un'anteprima, e se possibile stamparlo direttamente in PDF.

L'applicazione gestisce attualmente:

- **🖼️ Immagini** (JPG, PNG, WEBP, GIF, SVG, SVGZ, BMP, ICO)
- **💻 File di testo e codice** (.txt, .cs, .html, .json, .csv, .py, .js, .php, .rb, .java, .go, .rs, .ts, .tsx, .jsx)
- **📚 Documentazione C#** con rendering strutturato di membri (classi, metodi, proprietà, campi)
- **📄 File XML** generici

Quando possibile, appare un pulsante "Stampa PDF" che salva la visualizzazione corrente come PDF tramite il browser.

## ✨ Caratteristiche

| Funzionalità | Descrizione |
|-------------|-------------|
| **Caricamento grafico** | Trascina e rilascia o clicca per scegliere un file |
| **Anteprima immediata** | Visualizzazione di immagini e testo con highlight sintattico |
| **Rendering C# XML** | Strutturato con classi, metodi, proprietà, campi e parametri |
| **Stampa in PDF** | Pulsante integrato per salvare qualsiasi visualizzazione come PDF |
| **Design responsive** | Funziona perfettamente su desktop e dispositivi mobili |
| **Tema chiaro/scuro** | Supporto completo per entrambi i modi |
| **Animazioni fluide** | Entrate animate e interazioni hover |
| **Accessibilità** | ARIA label, focus management, keyboard navigation |

## 🚀 Come Usare

### Installazione Locale

1. **Clona il repository**
   ```bash
   git clone https://github.com/convertitore-file/universal-pdf-converter.git
   ```

2. **Apri l'applicazione**
   ```bash
   cd universal-pdf-converter
   open index.html
   ```
   Oppure semplicemente apri `index.html` con qualsiasi browser moderno.

3. **Utilizzo**
   - Nella barra superiore, premi il pulsante **📂 Scegli un file** o trascina un file nell'area designata
   - L'applicazione rileverà automaticamente il tipo di file e mostrerà un'anteprima:
     - **Immagini**: anteprima thumbnail visualizzata
     - **Testo/Codice**: contenuto visualizzato con highlighting sintattico
     - **XML C#**: struttura tecnica con membri, parametri e valori di ritorno
   - Se disponibile, premi il pulsante **🖨️ Salva come PDF** per salvare la pagina come PDF

### 🌐 Demo Online

Puoi provare l'applicazione direttamente online: [https://convertitore-file.github.io/](https://convertitore-file.github.io/)

## 🛠️ Tecnologie Utilizzate

- **HTML5** – Struttura della pagina
- **CSS3** – Stile, layout e regole per la stampa PDF (`@media print`)
- **Vanilla JavaScript** – Logica di lettura file, anteprima e manipolazione DOM
- **Google Fonts** (Outfit, Space Grotesk, Press Start 2P) – Aspetto visivo
- **Font Awesome** – Icone
- **Responsive Design** – Mobile-first approach
- **Print CSS** – Regole per la stampa browser

## 📦 Formati Supportati

| Tipo | Estensioni |
|------|------------|
| **Immagini** | .jpg, .jpeg, .png, .webp, .gif, .svg, .bmp, .ico |
| **Testo/Codice** | .txt, .cs, .html, .json, .csv, .py, .js, .php, .rb, .java, .go, .rs, .ts, .tsx, .jsx |
| **C# XML** | .xml (con struttura doc > members > member) |
| **Generici** | .xml (senza struttura C# specifica) |

## 📸 Screenshot

![Universal PDF Converter - Homepage](https://via.placeholder.com/800x450/1e3a8a/ffffff?text=Universal+PDF+Converter+Homepage)

![Universal PDF Converter - Image Preview](https://via.placeholder.com/800x450/1e3a8a/ffffff?text=Image+Preview)

![Universal PDF Converter - Code Preview](https://via.placeholder.com/800x450/1e3a8a/ffffff?text=Code+Preview)

![Universal PDF Converter - C# XML](https://via.placeholder.com/800x450/1e3a8a/ffffff?text=C%23+XML+Preview)

## 🎯 Browser Support

| Browser | Versione |
|---------|----------|
| Chrome | Ultima versione |
| Firefox | Ultima versione |
| Safari | Ultima versione |
| Edge | Ultima versione |
| Opera | Ultima versione |

L'applicazione funziona su qualsiasi browser moderno che supporta ES6+ e File API.

## �ributing

Contributi sono benvenuti! Ecco come puoi aiutare:

1. **Fork** il repository
2. Crea un nuovo branch (`git checkout -b feature/AmazingFeature`)
3. Committa le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una **Pull Request**

### Linee Guida per i Contributi

- Segui lo stile di codice esistente
- Aggiungi commenti per funzioni complesse
- Mantieni il design responsive
- Aggiungi test manuali per i nuovi formati supportati
- Aggiorna la documentazione di conseguenza

## 📄 Licenza

Questo progetto è rilasciato sotto la licenza **MIT**. Vedi il file `LICENSE` per maggiori dettagli.

Copyright (c) 2026 Cipriano Salvatore

## 👤 Autore

**Cipriano Salvatore**

- GitHub: [@cipriano-salvatore](https://github.com/cipriano-salvatore)
- Twitter: [@cipriano_salvatore](https://twitter.com/cipriano_salvatore)
- Email: [cipriano.salvatore@example.com](mailto:cipriano.salvatore@example.com)

---

⭐ **Se ti piace questo progetto, considera di dargli una stellina su GitHub!**