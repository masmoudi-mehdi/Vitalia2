/**
 * Script de validation des améliorations d'espacement
 * Vitalia - Centre d'Amincissement
 */

// Fonction pour vérifier les styles CSS appliqués
function validateSpacingImprovements() {
    console.log('🔍 Validation des améliorations d\'espacement...');
    
    // Vérifier que le fichier CSS est chargé
    const spacingStylesheet = Array.from(document.styleSheets).find(sheet => 
        sheet.href && sheet.href.includes('spacing-improvements.css')
    );
    
    if (spacingStylesheet) {
        console.log('✅ Fichier spacing-improvements.css chargé avec succès');
    } else {
        console.warn('⚠️ Fichier spacing-improvements.css non trouvé');
        return false;
    }
    
    // Vérifier les variables CSS
    const rootStyles = getComputedStyle(document.documentElement);
    const containerPaddingMobile = rootStyles.getPropertyValue('--container-padding-mobile').trim();
    const containerPaddingTablet = rootStyles.getPropertyValue('--container-padding-tablet').trim();
    const containerPaddingDesktop = rootStyles.getPropertyValue('--container-padding-desktop').trim();
    
    console.log('📱 Variables d\'espacement détectées:');
    console.log(`   Mobile: ${containerPaddingMobile || 'Non défini'}`);
    console.log(`   Tablette: ${containerPaddingTablet || 'Non défini'}`);
    console.log(`   Desktop: ${containerPaddingDesktop || 'Non défini'}`);
    
    // Vérifier l'espacement du container principal
    const container = document.querySelector('.container');
    if (container) {
        const containerStyles = getComputedStyle(container);
        const paddingLeft = containerStyles.paddingLeft;
        const paddingRight = containerStyles.paddingRight;
        
        console.log('📦 Espacement du container principal:');
        console.log(`   Padding gauche: ${paddingLeft}`);
        console.log(`   Padding droite: ${paddingRight}`);
        
        // Vérifier que l'espacement n'est pas le défaut (16px)
        if (paddingLeft !== '16px' && paddingRight !== '16px') {
            console.log('✅ Espacement du container amélioré');
        } else {
            console.warn('⚠️ L\'espacement du container semble inchangé');
        }
    }
    
    // Vérifier l'espacement responsive
    const screenWidth = window.innerWidth;
    let expectedPadding;
    
    if (screenWidth < 768) {
        expectedPadding = '20px'; // 1.25rem
        console.log('📱 Mode mobile détecté');
    } else if (screenWidth < 992) {
        expectedPadding = '32px'; // 2rem
        console.log('📱 Mode tablette détecté');
    } else if (screenWidth < 1200) {
        expectedPadding = '40px'; // 2.5rem
        console.log('🖥️ Mode desktop détecté');
    } else {
        expectedPadding = '48px'; // 3rem
        console.log('🖥️ Mode large desktop détecté');
    }
    
    console.log(`   Espacement attendu: ${expectedPadding}`);
    
    // Vérifier les sections spécifiques
    const sectionsToCheck = [
        '#hero',
        '#home-services',
        '#about-preview',
        '#footer'
    ];
    
    sectionsToCheck.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            const sectionContainer = section.querySelector('.container');
            if (sectionContainer) {
                const styles = getComputedStyle(sectionContainer);
                console.log(`📄 Section ${selector}:`);
                console.log(`   Padding: ${styles.paddingLeft} | ${styles.paddingRight}`);
            }
        }
    });
    
    return true;
}

// Fonction pour tester la responsivité
function testResponsiveSpacing() {
    console.log('📱 Test de la responsivité...');
    
    const breakpoints = [
        { width: 320, name: 'Mobile petit' },
        { width: 480, name: 'Mobile standard' },
        { width: 768, name: 'Tablette' },
        { width: 992, name: 'Desktop' },
        { width: 1200, name: 'Large Desktop' }
    ];
    
    // Simuler différentes tailles d'écran (conceptuel)
    breakpoints.forEach(bp => {
        console.log(`🔍 ${bp.name} (${bp.width}px):`);
        // Dans un vrai test, on changerait la taille de la fenêtre
        // Ici on affiche juste les informations
        if (bp.width < 768) {
            console.log('   Espacement attendu: 20px (mobile)');
        } else if (bp.width < 992) {
            console.log('   Espacement attendu: 32px (tablette)');
        } else if (bp.width < 1200) {
            console.log('   Espacement attendu: 40px (desktop)');
        } else {
            console.log('   Espacement attendu: 48px (large desktop)');
        }
    });
}

// Fonction pour générer un rapport
function generateSpacingReport() {
    console.log('📊 Génération du rapport d\'espacement...');
    
    const report = {
        timestamp: new Date().toISOString(),
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent,
        improvements: {
            cssLoaded: false,
            containerSpacing: false,
            responsiveSpacing: false,
            sectionsOptimized: false
        }
    };
    
    // Vérifications
    const spacingStylesheet = Array.from(document.styleSheets).find(sheet => 
        sheet.href && sheet.href.includes('spacing-improvements.css')
    );
    report.improvements.cssLoaded = !!spacingStylesheet;
    
    const container = document.querySelector('.container');
    if (container) {
        const styles = getComputedStyle(container);
        report.improvements.containerSpacing = styles.paddingLeft !== '16px';
    }
    
    console.log('📋 Rapport d\'espacement:', report);
    return report;
}

// Exécution automatique quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Démarrage de la validation des améliorations d\'espacement');
    
    setTimeout(() => {
        validateSpacingImprovements();
        testResponsiveSpacing();
        generateSpacingReport();
        
        console.log('✨ Validation terminée. Vérifiez les logs ci-dessus pour les détails.');
    }, 500); // Petit délai pour s'assurer que tous les CSS sont chargés
});

// Fonction utilitaire pour les développeurs
window.VitaliaSpacingValidator = {
    validate: validateSpacingImprovements,
    testResponsive: testResponsiveSpacing,
    generateReport: generateSpacingReport
};
