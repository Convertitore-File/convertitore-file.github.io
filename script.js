const tipoMembro = { 'T': 'Classe / Tipo', 'M': 'Metodo', 'P': 'Proprietà', 'F': 'Campo' };

document.getElementById('xmlFileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(event.target.result, "text/xml");
        renderDoc(xmlDoc);
    };
    reader.readAsText(file);
});

function renderDoc(xml) {
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