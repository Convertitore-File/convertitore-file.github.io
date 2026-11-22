# Convertitore Universale in PDF

## Descrizione

**Convertitore Universale in PDF** è una semplice applicazione web che permette di caricare diversi tipi di file e visualizzarli o convertirli in PDF. L'interfaccia è stata pensata per essere intuitiva e immediata: basta trascinare un file o selezionarlo tramite il pulsante per ottenere una preview e, se possibile, stamparlo direttamente in formato PDF.

L'applicazione gestisce attualmente:

- **Immagini** (JPG, PNG, WEBP, GIF, SVG, ecc.)
- **File di testo e codice sorgente** (.txt, .cs, .html, .json, .csv, .py, ecc.)
- **File XML** di documentazione C#, con rendering strutturato dei membri (classi, metodi, proprietà, campi)

Quando possibile, compare un pulsante "Stampa PDF" che permette di salvare la visualizzazione corrente come PDF tramite il browser.

## Caratteristiche

- Caricamento file via interfaccia grafica
- Anteprima immediata di immagini e testo
- Rendering speciale per la documentazione XML di C# (evidenziazione di classi, metodi, proprietà, campi con descrizioni, parametri e valori di ritorno)
- Pulsante di stampa PDF visibile solo quando il tipo di file lo permette
- Design responsive, funzionante su desktop e dispositivi mobili
- Stile pulito con barra laterale e schede per la presentazione del contenuto

## Tecnologie utilizzate

- **HTML5** – struttura della pagina
- **CSS3** – styling, layout e regole per la stampa PDF (`@media print`)
- **JavaScript vanilla** – logica di lettura dei file, preview e manipolazione DOM
- **Font Google** (Outfit, Press Start 2P) e **Font Awesome** – per l'aspetto visivo
- **Licenza MIT** – gratuita e open source

## Come utilizzare

1. Clona o scarica questo repository sul tuo computer.
2. Apri il file `index.html` con qualsiasi browser moderno (Chrome, Firefox, Edge, Safari).
3. Nella barra in alto premi il pulsante **📂 Scegli un file** o trascina un file nell'area.
4. L'applicazione rileverà automaticamente il tipo di file e mostrerà una preview:
   - Per le immagini: verrà visualizzata la miniatura.
   - Per i file di testo/codice: il contenuto verrà visualizzato con evidenziazione HTML.
   - Per i file XML C#: verrà generata una struttura tecnica con membri, parametri e valori di ritorno.
5. Se disponibile, premi il pulsante **🖨️ Salva come PDF** per stampare la pagina corrente in PDF.

Non è richiesto alcun'installazione di dipendenze o build step: l'applicazione è pronta all'uso.

## Licenza

Questo progetto è rilasciato sotto la licenza **MIT**. Vedi il file `LICENSE` per maggiori dettagli.

## Autore

*Sviluppato da Cipriano Salvatore* – 2026