/**
 * ==========================================================================
 * Universal PDF Converter - JavaScript (v2.2)
 * Logica avanzata, gestione file, parsing XML C#, menu mobile e rimozione file
 * ==========================================================================
 */

'use strict';

// Configurazione globale dell'applicazione
const AppConfig = {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    acceptedTypes: {
        images: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/bmp'],
        text: ['text/plain', 'text/html', 'text/css', 'application/json', 'text/csv', 'application/xml', 'text/xml'],
    },
    supportedExtensions: {
        images: /\.(jpg|jpeg|png|webp|gif|svg|bmp|ico)$/i,
        text: /\.(txt|cs|html|json|csv|py|js|php|rb|java|go|rs|ts|tsx|jsx|xml)$/i,
    }
};

// Mappatura dei membri della documentazione C# XML
const CSHARP_MEMBER_TYPES = {
    'T': 'Classe / Tipo',
    'M': 'Metodo',
    'P': 'Proprietà',
    'F': 'Campo',
    'E': 'Evento'
};

// Stato globale dell'applicazione
const AppState = {
    darkMode: false,
    reducedMotion: false,
    currentFile: null
};

/**
 * Inizializzazione all'avvio del DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    initReducedMotion();
    initDarkModeToggle();
    initMobileMenu();
    initFileHandling();
    initNavbarScroll();
    initActiveNavHighlight();
    initSmoothScroll();
    initEntranceAnimations();
    updateCopyrightYear();

    // Event listener globale per il pulsante di stampa PDF
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', handlePrintPDF);
    }
});

/**
 * Rileva le preferenze di accessibilità per il movimento ridotto
 */
function initReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    AppState.reducedMotion = mediaQuery.matches;

    const applyMotionPreference = (prefersReduced) => {
        AppState.reducedMotion = prefersReduced;
        document.documentElement.style.setProperty(
            '--transition-speed',
            prefersReduced ? '0.01s' : '0.3s'
        );
    };

    applyMotionPreference(AppState.reducedMotion);

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', (e) => applyMotionPreference(e.matches));
    }
}

/**
 * Aggiorna la visibilità delle icone sole/luna in base allo stato darkMode
 */
function syncThemeIcons() {
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const themeToggle = document.getElementById('themeToggle');

    if (moonIcon && sunIcon) {
        moonIcon.style.display = AppState.darkMode ? 'none' : 'block';
        sunIcon.style.display = AppState.darkMode ? 'block' : 'none';
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label',
            AppState.darkMode ? 'Attiva tema chiaro' : 'Attiva tema scuro'
        );
    }
}

/**
 * Gestione della Dark Mode con sincronizzazione Navbar
 */
function initDarkModeToggle() {
    const savedTheme = localStorage.getItem('pdf-converter-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        AppState.darkMode = true;
    }

    syncThemeIcons();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            AppState.darkMode = !AppState.darkMode;
            document.body.classList.toggle('dark-mode', AppState.darkMode);
            localStorage.setItem('pdf-converter-theme', AppState.darkMode ? 'dark' : 'light');
            syncThemeIcons();
        });
    }
}

/**
 * Gestione Menu Mobile responsive (#mobileMenuBtn + #navLinks)
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (!mobileMenuBtn || !navLinks) return;

    const setMenuState = (open) => {
        navLinks.classList.toggle('open', open);
        mobileMenuBtn.setAttribute('aria-expanded', String(open));
        mobileMenuBtn.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');

        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = open ? 'fas fa-times' : 'fas fa-bars';
        }
    };

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !navLinks.classList.contains('open');
        setMenuState(isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            setMenuState(false);
            mobileMenuBtn.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
            setMenuState(false);
        }
    });
}

/**
 * Resetta lo stato del convertitore rimuovendo il file corrente
 */
function resetConverter() {
    AppState.currentFile = null;

    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';

    const printBtn = document.getElementById('printBtn');
    if (printBtn) printBtn.style.display = 'none';

    const fileTypeBadge = document.getElementById('fileTypeBadge');
    if (fileTypeBadge) fileTypeBadge.style.display = 'none';

    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-file-alt" style="font-size: 2rem; margin-bottom: 10px; opacity: 0.5;"></i>
                <p style="font-size: 0.9rem;">Nessun file selezionato. L'anteprima apparirà qui.</p>
            </div>
        `;
    }
}
window.resetConverter = resetConverter;

/**
 * Collega gli eventi del pulsante "Rimuovi" dentro l'anteprima corrente
 */
function bindRemoveFileButton() {
    const removeBtn = document.getElementById('removeFileBtn');
    if (!removeBtn) return;

    removeBtn.addEventListener('click', () => {
        resetConverter();
    });
}

/**
 * Header comune con pulsante di rimozione file per le anteprime
 */
function createFileInfoHeader(fileName) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                <i class="fas fa-file-alt" style="color: var(--primary); flex-shrink: 0;"></i>
                <span style="font-weight: 600; font-size: 0.95rem; color: var(--text); overflow: hidden; text-overflow: ellipsis;">${escapeHtml(fileName)}</span>
            </div>
            <button type="button" id="removeFileBtn" style="
                background: rgba(220, 38, 38, 0.1);
                color: var(--error);
                border: 1px solid rgba(220, 38, 38, 0.25);
                padding: 6px 12px;
                border-radius: var(--radius-sm);
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                flex-shrink: 0;
                transition: all var(--transition-speed);
            ">
                <i class="fas fa-trash-alt"></i> Rimuovi
            </button>
        </div>
    `;
}

/**
 * Gestione avanzata del caricamento file (Sfoglia & Drag-and-Drop)
 */
function initFileHandling() {
    const fileInput = document.getElementById('fileInput');
    const converterArea = document.querySelector('.converter-area');
    const output = document.getElementById('output');
    const printBtn = document.getElementById('printBtn');

    if (!converterArea || !fileInput || !output) return;

    converterArea.addEventListener('click', (e) => {
        if (e.target.tagName !== 'LABEL' && !e.target.closest('label')) {
            fileInput.click();
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
        converterArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            converterArea.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        converterArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            converterArea.classList.remove('drag-over');
        }, false);
    });

    converterArea.addEventListener('drop', (e) => {
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles[0]) {
            processFile(droppedFiles[0]);
        }
    });

    function processFile(file) {
        AppState.currentFile = file;

        if (file.size > AppConfig.maxFileSize) {
            showErrorState(
                file.name,
                `Il file supera la dimensione massima consentita (${AppConfig.maxFileSize / (1024 * 1024)}MB).`
            );
            return;
        }

        if (!isValidFileType(file)) {
            showErrorState(file.name, 'Formato file non supportato. Carica immagini, file di codice o XML C#.');
            return;
        }

        showLoadingState();

        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;

            if (printBtn) printBtn.style.display = 'none';
            output.innerHTML = '';

            try {
                if (isImageFile(file)) {
                    renderImagePreview(file, content);
                } else if (isCSharpXmlFile(file)) {
                    renderCSharpXmlDocumentation(content);
                } else {
                    renderTextFileContent(file.name, content);
                }

                bindRemoveFileButton();

                const fileTypeBadge = document.getElementById('fileTypeBadge');
                if (fileTypeBadge) fileTypeBadge.style.display = 'inline-block';

                const delay = AppState.reducedMotion ? 0 : 250;
                setTimeout(() => {
                    if (printBtn) printBtn.style.display = 'block';
                }, delay);
            } catch (error) {
                console.error('Errore di elaborazione file:', error);
                showErrorState(file.name, 'Errore durante la lettura o il parsing del file.');
            }
        };

        reader.onerror = () => {
            showErrorState(file.name, 'Errore nella lettura del file da parte del browser.');
        };

        if (isImageFile(file)) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }
}

/**
 * Validatori dei formati file
 */
function isImageFile(file) {
    return AppConfig.supportedExtensions.images.test(file.name) || AppConfig.acceptedTypes.images.includes(file.type);
}

function isCSharpXmlFile(file) {
    const fileName = file.name.toLowerCase();
    return fileName.endsWith('.xml') || file.type === 'application/xml' || file.type === 'text/xml';
}

function isValidFileType(file) {
    return isImageFile(file) || isCSharpXmlFile(file) || AppConfig.supportedExtensions.text.test(file.name);
}

/**
 * Stati UI (Loading ed Errore)
 */
function showLoadingState() {
    const output = document.getElementById('output');
    if (!output) return;

    output.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--muted); width: 100%;">
            <i class="fas fa-spinner fa-pulse" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 16px;"></i>
            <p>Elaborazione e conversione del file in corso...</p>
        </div>
    `;
}

function showErrorState(fileName, message) {
    const output = document.getElementById('output');
    const printBtn = document.getElementById('printBtn');
    const fileTypeBadge = document.getElementById('fileTypeBadge');

    if (printBtn) printBtn.style.display = 'none';
    if (fileTypeBadge) fileTypeBadge.style.display = 'none';
    if (!output) return;

    output.innerHTML = `
        <div style="padding: 30px; text-align: center; color: var(--error); width: 100%;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 12px;"></i>
            <h3 style="margin-bottom: 8px;">Attenzione</h3>
            <p>${escapeHtml(message)}</p>
            <small style="display: block; margin-top: 12px; color: var(--muted);">File: ${escapeHtml(fileName)}</small>
        </div>
    `;
}

/**
 * Funzioni di Rendering Anteprima
 */
function renderImagePreview(file, dataUrl) {
    const output = document.getElementById('output');
    if (!output) return;

    output.innerHTML = `
        <div style="width: 100%; text-align: left;">
            ${createFileInfoHeader(file.name)}
            <div style="text-align: center; margin-top: 12px;">
                <img src="${dataUrl}" alt="${escapeHtml(file.name)}" style="max-width: 100%; max-height: 450px; border-radius: var(--radius-sm); border: 1px solid var(--border); box-shadow: var(--shadow-sm);">
            </div>
        </div>
    `;
}

function renderTextFileContent(fileName, content) {
    const output = document.getElementById('output');
    if (!output) return;

    output.innerHTML = `
        <div style="width: 100%; text-align: left;">
            ${createFileInfoHeader(fileName)}
            <div class="code-output-container" style="background: var(--background); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 20px; overflow-x: auto;">
                <pre style="white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.9rem; line-height: 1.6; margin: 0; color: var(--text);">${escapeHtml(content)}</pre>
            </div>
        </div>
    `;
}

function renderCSharpXmlDocumentation(xmlString) {
    const output = document.getElementById('output');
    if (!output) return;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
        renderTextFileContent(AppState.currentFile ? AppState.currentFile.name : 'documento.xml', xmlString);
        return;
    }

    const assemblyName = xmlDoc.querySelector('assembly > name')?.textContent || 'Documentazione C#';
    const members = xmlDoc.querySelectorAll('members > member');

    let html = `
        <div style="width: 100%; text-align: left;">
            ${createFileInfoHeader(AppState.currentFile ? AppState.currentFile.name : 'documento.xml')}
            <div style="border-bottom: 2px solid var(--border); padding-bottom: 12px; margin-bottom: 20px;">
                <h3 style="font-size: 1.2rem; color: var(--primary); font-family: var(--font-hero);">Documentazione Tecnica C#</h3>
                <p style="font-size: 0.85rem; color: var(--muted); margin-top: 4px;">Assembly: <strong>${escapeHtml(assemblyName)}</strong> &bull; ${members.length} elementi</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; max-height: 450px; overflow-y: auto; padding-right: 4px;">
    `;

    if (members.length === 0) {
        html += `<p style="text-align: center; color: var(--muted); padding: 20px;">Nessun membro XML trovato in questo file.</p>`;
    } else {
        members.forEach((m) => {
            const fullName = m.getAttribute('name') || '';
            const prefix = fullName.split(':')[0];
            const cleanName = fullName.includes(':') ? fullName.substring(fullName.indexOf(':') + 1) : fullName;
            const label = CSHARP_MEMBER_TYPES[prefix] || 'Elemento';

            const summary = m.querySelector('summary')?.textContent.trim() || 'Nessuna descrizione disponibile.';
            const returns = m.querySelector('returns')?.textContent.trim();
            const params = m.querySelectorAll('param');

            html += `
                <div style="background: var(--background); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 4px;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap;">
                        <span style="background: var(--primary-light); color: var(--primary); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${escapeHtml(label)}</span>
                        <code style="font-weight: 600; font-size: 0.95rem; color: var(--text);">${escapeHtml(cleanName)}</code>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--muted); line-height: 1.5; margin-bottom: 12px;">${escapeHtml(summary)}</p>
            `;

            if (params.length > 0) {
                html += `
                    <div style="margin-top: 10px; border-top: 1px dashed var(--border); padding-top: 10px;">
                        <strong style="font-size: 0.85rem; color: var(--text); display: block; margin-bottom: 6px;">Parametri:</strong>
                        <ul style="list-style-type: none; padding-left: 0;">
                `;
                params.forEach((p) => {
                    html += `<li style="font-size: 0.85rem; margin-bottom: 4px;"><code style="color: var(--primary);">${escapeHtml(p.getAttribute('name') || '')}</code>: ${escapeHtml(p.textContent.trim())}</li>`;
                });
                html += `</ul></div>`;
            }

            if (returns) {
                html += `
                    <div style="margin-top: 10px; border-top: 1px dashed var(--border); padding-top: 10px; font-size: 0.85rem;">
                        <strong>Valore restituito:</strong> ${escapeHtml(returns)}
                    </div>
                `;
            }

            html += `</div>`;
        });
    }

    html += `</div></div>`;
    output.innerHTML = html;
}

/**
 * Funzione di utilità per escape HTML sicuro
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Sistema di stampa e salvataggio PDF avanzato ottimizzato per file di testo e codice
 */
function handlePrintPDF() {
    const printArea = document.getElementById('output');
    if (!printArea || !printArea.innerHTML.trim()) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Impossibile aprire la finestra di stampa. Controlla le impostazioni dei popup del browser.');
        return;
    }

    const cloneArea = printArea.cloneNode(true);
    const removeBtn = cloneArea.querySelector('#removeFileBtn, button');
    if (removeBtn) removeBtn.remove();

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <title>Stampa / Esportazione PDF - Convertitore File</title>
            <style>
                @page {
                    size: A4;
                    margin: 15mm;
                }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    color: #0f172a;
                    background: #ffffff;
                    line-height: 1.5;
                    padding: 10px;
                    margin: 0;
                }
                h3 {
                    font-size: 16px;
                    margin-bottom: 8px;
                    color: #0f172a;
                }
                span {
                    font-size: 12px;
                    color: #64748b;
                }
                .code-output-container, pre {
                    background: #f8fafc !important;
                    border: 1px solid #e2e8f0 !important;
                    border-radius: 6px;
                    padding: 15px;
                    white-space: pre-wrap !important;
                    word-break: break-word !important;
                    overflow: visible !important;
                    max-height: none !important;
                    height: auto !important;
                }
                pre {
                    font-family: monospace;
                    font-size: 11pt !important;
                    line-height: 1.5;
                    color: #0f172a !important;
                }
                div {
                    page-break-inside: auto;
                }
                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }
            </style>
        </head>
        <body>
            ${cloneArea.innerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => { window.close(); }, 500);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

/**
 * Animazioni di entrata e Intersezioni (Intersection Observer)
 */
function initEntranceAnimations() {
    if (AppState.reducedMotion) return;

    const animatedElements = document.querySelectorAll('.feature-card, .step-item, .testimonial-card, .about-stat');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Effetto Navbar allo scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * Evidenziazione link attivo nella navbar in base alla sezione visibile
 */
function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('.navbar .nav-links a[href^="#"]');
    if (!navLinks.length) return;

    const sections = Array.from(navLinks)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!sections.length) return;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, {
        rootMargin: '-25% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
}

/**
 * Smooth Scroll per i link interni del menu, CTA e pulsante "Torna su"
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: AppState.reducedMotion ? 'auto' : 'smooth'
                });
                return;
            }

            const targetSection = document.querySelector(href);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({
                    behavior: AppState.reducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Aggiornamento automatico Anno Copyright nel footer preservando il markup interno
 */
function updateCopyrightYear() {
    const currentYear = String(new Date().getFullYear());
    const copyrightTextNode = document.querySelector('.footer-bottom > p');

    if (copyrightTextNode) {
        copyrightTextNode.textContent = copyrightTextNode.textContent.replace(/2026/g, currentYear);
    }
}