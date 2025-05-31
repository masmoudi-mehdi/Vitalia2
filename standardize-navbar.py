#!/usr/bin/env python3
"""
Script pour standardiser la navbar sur toutes les pages HTML du site Vitalia
Applique la structure de navbar optimisée avec accessibilité et touch targets
"""

import os
import re
from pathlib import Path

# Pages à traiter (exclut index.html qui est différent et home.html qui est déjà fait)
PAGES_TO_UPDATE = [
    'testimonials.html',
    'blog.html', 
    'contact.html',
    'dr-anis-jday.html'
]

# CSS à ajouter dans le head
CSS_LINKS = '''    <link rel="stylesheet" href="css/mobile-accessibility-2025.css" />
    <link rel="stylesheet" href="css/navbar-emergency-fix.css" />'''

# Skip link à ajouter après <body>
SKIP_LINK = '''    <!-- Skip link pour accessibilité -->
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    '''

# Nouvelle structure de navbar
NAVBAR_TEMPLATE = '''        <nav>
          <ul
            class="nav-menu"
            id="nav-menu"
            role="navigation"
            aria-label="Menu principal"
          >
            <li><a href="index.html"{active_home}>Accueil</a></li>
            <li><a href="services.html"{active_services}>Services</a></li>
            <li><a href="about.html"{active_about}>À propos</a></li>
            <li><a href="testimonials.html"{active_testimonials}>Témoignages</a></li>
            <li><a href="blog.html"{active_blog}>Blog</a></li>
            <li><a href="contact.html"{active_contact}>Contact</a></li>
          </ul>
          <button
            class="mobile-menu-btn"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded="false"
            aria-controls="nav-menu"
          >
            <i class="fas fa-bars"></i>
            <span class="sr-only">Menu</span>
          </button>
        </nav>'''

def get_active_page(filename):
    """Détermine quelle page est active pour marquer le lien correspondant"""
    active_map = {
        'testimonials.html': 'testimonials',
        'blog.html': 'blog',
        'contact.html': 'contact',
        'dr-anis-jday.html': 'about'  # Dr Jday est dans la section À propos
    }
    return active_map.get(filename, '')

def update_css_links(content, filename):
    """Ajoute les liens CSS manquants"""
    # Cherche la ligne avec responsive.css
    pattern = r'(\s*<link rel="stylesheet" href="css/responsive\.css" />)'
    
    if re.search(pattern, content):
        # Ajoute les nouveaux CSS après responsive.css
        replacement = r'\1\n' + CSS_LINKS
        content = re.sub(pattern, replacement, content)
        print(f"✅ CSS links ajoutés à {filename}")
    else:
        print(f"⚠️ Impossible de trouver responsive.css dans {filename}")
    
    return content

def add_skip_link(content, filename):
    """Ajoute le skip link après <body>"""
    pattern = r'(\s*</head>\s*<body>)'
    
    if re.search(pattern, content):
        replacement = r'\1\n' + SKIP_LINK
        content = re.sub(pattern, replacement, content)
        print(f"✅ Skip link ajouté à {filename}")
    else:
        print(f"⚠️ Impossible de trouver </head><body> dans {filename}")
    
    return content

def update_navbar(content, filename):
    """Met à jour la structure de la navbar"""
    active_page = get_active_page(filename)
    
    # Prépare les classes active
    active_classes = {
        'active_home': ' class="active"' if active_page == 'home' else '',
        'active_services': ' class="active"' if active_page == 'services' else '',
        'active_about': ' class="active"' if active_page == 'about' else '',
        'active_testimonials': ' class="active"' if active_page == 'testimonials' else '',
        'active_blog': ' class="active"' if active_page == 'blog' else '',
        'active_contact': ' class="active"' if active_page == 'contact' else ''
    }
    
    navbar_html = NAVBAR_TEMPLATE.format(**active_classes)
    
    # Pattern pour matcher l'ancienne navbar
    pattern = r'(\s*<nav>\s*<ul class="nav-menu">.*?</nav>)'
    
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, navbar_html, content, flags=re.DOTALL)
        print(f"✅ Navbar mise à jour dans {filename}")
    else:
        print(f"⚠️ Impossible de trouver la navbar dans {filename}")
    
    return content

def add_main_content_wrapper(content, filename):
    """Ajoute l'ID main-content et la balise main"""
    # Trouve la première section après le header
    pattern = r'(\s*</header>\s*)(.*?)(\s*<!-- Page Banner -->|\s*<section)'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        before_section = match.group(1)
        between = match.group(2)
        section_start = match.group(3)
        
        # Ajoute main avec id
        replacement = before_section + between + '\n    <main id="main-content">' + section_start
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        print(f"✅ Balise main ajoutée à {filename}")
    else:
        print(f"⚠️ Impossible de trouver l'endroit pour ajouter main dans {filename}")
    
    return content

def close_main_before_footer(content, filename):
    """Ferme la balise main avant le footer"""
    pattern = r'(\s*</section>\s*)(.*?)(\s*<!-- Footer -->)'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        end_section = match.group(1)
        between = match.group(2)
        footer_comment = match.group(3)
        
        replacement = end_section + '\n    </main>' + between + footer_comment
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        print(f"✅ Balise main fermée dans {filename}")
    else:
        print(f"⚠️ Impossible de fermer main dans {filename}")
    
    return content

def process_file(filename):
    """Traite un fichier HTML"""
    print(f"\n🔄 Traitement de {filename}...")
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Applique toutes les transformations
        content = update_css_links(content, filename)
        content = add_skip_link(content, filename)
        content = update_navbar(content, filename)
        content = add_main_content_wrapper(content, filename)
        content = close_main_before_footer(content, filename)
        
        # Sauvegarde le fichier
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ {filename} traité avec succès!")
        
    except Exception as e:
        print(f"❌ Erreur lors du traitement de {filename}: {e}")

def main():
    """Fonction principale"""
    print("🚀 Standardisation de la navbar - Vitalia 2025")
    print("=" * 50)
    
    # Vérifie que nous sommes dans le bon répertoire
    if not os.path.exists('css/style.css'):
        print("❌ Erreur: Veuillez exécuter ce script depuis la racine du projet")
        return
    
    # Traite chaque page
    for page in PAGES_TO_UPDATE:
        if os.path.exists(page):
            process_file(page)
        else:
            print(f"⚠️ Fichier {page} non trouvé, ignoré")
    
    print("\n🎉 Standardisation terminée!")
    print("\n📋 Résumé des modifications appliquées:")
    print("• CSS d'accessibilité mobile ajoutés")
    print("• Skip link pour navigation clavier")
    print("• Navbar avec attributs ARIA complets")
    print("• Bouton mobile avec feedback tactile")
    print("• Structure sémantique avec <main>")
    print("• Touch targets 44x44px minimum")

if __name__ == "__main__":
    main()
