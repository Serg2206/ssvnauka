/**
 * KIMI-ssv Language Switcher
 * Lightweight language indicator for MARIA Medical Center
 * Languages: uk, ru, en, bg
 */

(function() {
    'use strict';
    
    const LANGUAGES = ['uk', 'ru', 'en', 'bg'];
    const DEFAULT_LANG = 'ru';
    
    /**
     * Detect current language from URL path
     * e.g. /uk/index.html -> uk, /ru/ -> ru
     */
    function detectLangFromURL() {
        const path = window.location.pathname;
        const match = path.match(new RegExp('^\\/?(' + LANGUAGES.join('|') + ')\\b'));
        return match ? match[1] : DEFAULT_LANG;
    }
    
    /**
     * Highlight active language button
     */
    function highlightActiveLang(lang) {
        document.querySelectorAll('.lang-switcher a.lang-btn').forEach(link => {
            const isActive = link.dataset.lang === lang;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'true');
                link.setAttribute('tabindex', '-1'); /* skip active link in tab order */
            } else {
                link.removeAttribute('aria-current');
                link.removeAttribute('tabindex');
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Detect and highlight on page load
    const currentLang = detectLangFromURL();
    highlightActiveLang(currentLang);
    
    // Save preferred language for root redirect
    try {
        localStorage.setItem('maria-lang', currentLang);
    } catch (e) { /* ignore */ }
    
    // Expose utilities for other scripts
    window.getCurrentLang = function() { return currentLang; };
    
})();