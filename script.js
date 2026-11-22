const tipoMembro = { 'T': 'Classe / Tipo', 'M': 'Metodo', 'P': 'Proprietà', 'F': 'Campo' };

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const output = document.getElementById("output");
    const printBtn = document.getElementById("printBtn");
    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    // 1. GESTIONE IMMAGINI (JPG, PNG, WEBP, GIF, SVG, ecc.)
    if (file.type.startsWith('image/')) {
        reader.onload = function(event) {
            output.innerHTML = `
                <div class="file-preview" style="text-align: center;">
                    <img src="${event.target.result}" alt="${file.name}" style="max-width: 100%; height: auto; border-radius: 4px;">
                </div>
            `;
            printBtn.style.display = "inline-block";
        };
        reader.readAsDataURL(file);
        return;
    }

    // 2. GESTIONE FILE TESTO, CODICE E XML
    reader.onload = function(event) {
        const content = event.target.result;

        // Se è un XML, controlla se è una documentazione C#
        if (fileName.endsWith('.xml')) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(content, "text/xml");

            if (xmlDoc.querySelector("doc > members")) {
                renderCSharpDoc(xmlDoc);
                return;
            }
        }

        // Per tutti gli altri file di testo/codice (.txt, .cs, .html, .json, .csv, .py, ecc.)
        renderPlainText(file.name, content);
    };

    reader.readAsText(file);
});

// Funzione per file generici di testo o codice sorgente
function renderPlainText(fileName, content) {
    // Escaping dei caratteri HTML per evitare che file .html o .xml vengano interpretati come tag
    const escapedContent = content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const html = `
        <header>
            <h1>${fileName}</h1>
            <div class="subtitle">Convertito il ${new Date().toLocaleDateString('it-IT')}</div>
        </header>
        <div class="card">
            <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 13px; line-height: 1.5; margin: 0;">${escapedContent}</pre>
        </div>
    `;

    document.getElementById("output").innerHTML = html;
    document.getElementById("printBtn").style.display = "inline-block";
}

// La tua funzione originale per la documentazione XML di C#
function renderCSharpDoc(xml) {
    const assemblyName = xml.querySelector("assembly > name")?.textContent || "Progetto C#";
    const members = xml.querySelectorAll("members > member");

    let html = `
        <header>
          <h1>Documentazione Tecnica</h1>
          <div class="subtitle">Progetto / Assembly: <strong>${assemblyName}</strong> &bull; Generato il ${new Date().toLocaleDateString('it-IT')}</div>
        </header>
      `;

    members.forEach(m => {
        const fullName = m.getAttribute("name") || "";
        const prefix = fullName.split(":")[0];
        const cleanName = fullName.substring(fullName.indexOf(":") + 1);
        const label = tipoMembro[prefix] || "Elemento";

        const summary = m.querySelector("summary")?.textContent.trim() || "Nessuna descrizione.";
        const returns = m.querySelector("returns")?.textContent.trim();
        const params = m.querySelectorAll("param");

        html += `
          <div class="card">
            <div class="badge">${label}</div>
            <div class="member-name">${cleanName}</div>
            <div class="summary">${summary}</div>
        `;

        if (params.length > 0) {
            html += `<table><tr><th>Parametro</th><th>Descrizione</th></tr>`;
            params.forEach(p => {
                html += `<tr><td><code>${p.getAttribute("name")}</code></td><td>${p.textContent.trim()}</td></tr>`;
            });
            html += `</table>`;
        }

        if (returns) {
            html += `<div class="returns"><strong>Valore restituito:</strong> ${returns}</div>`;
        }

        html += `</div>`;
    });

    document.getElementById("output").innerHTML = html;
    document.getElementById("printBtn").style.display = "inline-block";
}