import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// Função para registrar tentativas de acesso a elementos bloqueados
function logBlockedElement(element) {
    console.log(`[${new Date().toISOString()}] Elemento bloqueado: ${element.outerHTML}`);
}

// Função para verificar SVGs suspeitos
function isSuspectSvg(element) {
    if (element.tagName.toLowerCase() === 'svg') {
        const svgContent = element.outerHTML.toLowerCase();
        return svgContent.includes('lovable') || 
               svgContent.includes('badge') ||
               svgContent.includes('mask') ||
               (element.getAttribute('width') === '60' && element.getAttribute('height') === '12');
    }
    return false;
}

export async function handler(event) {
    try {
        const response = await fetch('https://lovable.ai/demo');
        const html = await response.text();
        
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Remove SVGs suspeitos
        document.querySelectorAll('svg').forEach(svg => {
            if (isSuspectSvg(svg)) {
                logBlockedElement(svg);
                svg.remove();
            }
        });

        // Script para remoção profunda de elementos
        const protectionScript = `
            (function() {
                // Remove SVGs suspeitos
                function removeSuspectSvg(element) {
                    if (element.tagName.toLowerCase() === 'svg') {
                        const svgContent = element.outerHTML.toLowerCase();
                        if (svgContent.includes('lovable') || 
                            svgContent.includes('badge') ||
                            svgContent.includes('mask') ||
                            (element.getAttribute('width') === '60' && element.getAttribute('height') === '12')) {
                            console.log('Removendo SVG suspeito');
                            element.remove();
                            return true;
                        }
                    }
                    return false;
                }

                // Remove elementos Lovable
                function removeLovableElements() {
                    // Remove elementos específicos
                    const selectors = [
                        '#lovable-badge',
                        '#lovable-badge-close',
                        '[data-lovable]',
                        '[class*="lovable"]',
                        '[id*="lovable"]',
                        'a[href*="lovable"]',
                        'svg[width="60"][height="12"]'
                    ];

                    selectors.forEach(selector => {
                        document.querySelectorAll(selector).forEach(el => {
                            console.log('Removendo elemento:', selector);
                            el.remove();
                        });
                    });

                    // Verifica SVGs
                    document.querySelectorAll('svg').forEach(removeSuspectSvg);
                }

                // Remove elementos no carregamento
                removeLovableElements();

                // Observador de mutações aprimorado
                new MutationObserver((mutations) => {
                    mutations.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) {
                                // Verifica se é um SVG suspeito
                                if (node.tagName && node.tagName.toLowerCase() === 'svg') {
                                    removeSuspectSvg(node);
                                }
                                // Remove outros elementos suspeitos
                                if (node.id && node.id.includes('lovable')) node.remove();
                                if (node.className && node.className.includes('lovable')) node.remove();
                                if (node.getAttribute('data-lovable')) node.remove();
                                
                                // Verifica elementos filhos
                                node.querySelectorAll('*').forEach(child => {
                                    if (child.tagName && child.tagName.toLowerCase() === 'svg') {
                                        removeSuspectSvg(child);
                                    }
                                });
                            }
                        });
                    });
                }).observe(document.body, { 
                    childList: true, 
                    subtree: true,
                    attributes: true,
                    characterData: true
                });

                // Intercepta createElement
                const originalCreateElement = document.createElement;
                document.createElement = function(tagName, options) {
                    const element = originalCreateElement.call(this, tagName, options);
                    if (tagName.toLowerCase() === 'svg') {
                        // Adiciona um MutationObserver específico para o SVG
                        new MutationObserver(() => {
                            removeSuspectSvg(element);
                        }).observe(element, {
                            attributes: true,
                            childList: true,
                            subtree: true
                        });
                    }
                    return element;
                };
            })();
        `;

        // Adiciona CSS para esconder elementos
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            #lovable-badge,
            #lovable-badge-close,
            [data-lovable],
            [class*="lovable"],
            [id*="lovable"],
            svg[width="60"][height="12"],
            a[href*="lovable"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
                position: absolute !important;
                overflow: hidden !important;
                clip: rect(0,0,0,0) !important;
                margin: -1px !important;
                padding: 0 !important;
                border: 0 !important;
            }
        `;
        document.head.appendChild(styleElement);

        // Adiciona o script de proteção
        const scriptElement = document.createElement('script');
        scriptElement.textContent = protectionScript;
        document.body.insertBefore(scriptElement, document.body.firstChild);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'X-Content-Type-Options': 'nosniff',
                'Referrer-Policy': 'no-referrer',
                'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            },
            body: dom.serialize()
        };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Erro: ${error.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch and process content' })
        };
    }
}
