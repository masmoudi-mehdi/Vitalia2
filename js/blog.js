document.addEventListener("DOMContentLoaded", () => {
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogPosts = document.querySelectorAll('.post-card');
    const featuredPost = document.querySelector('.featured-post');

    function filterPosts(category) {
        // Gérer l'état actif des boutons de catégorie
        categoryTags.forEach(tag => {
            tag.classList.remove('active');
            if (tag.textContent === category || (category === 'Tous les articles' && tag.classList.contains('all'))) {
                tag.classList.add('active');
            }
        });

        // Si "Tous les articles" est sélectionné, afficher tous les posts
        if (category === 'Tous les articles') {
            blogPosts.forEach(post => {
                post.style.opacity = '0';
                setTimeout(() => {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                    }, 50);
                }, 300);
            });
            if (featuredPost) {
                featuredPost.style.opacity = '0';
                setTimeout(() => {
                    featuredPost.style.display = 'block';
                    setTimeout(() => {
                        featuredPost.style.opacity = '1';
                    }, 50);
                }, 300);
            }
            return;
        }

        // Filtrer les posts selon la catégorie
        blogPosts.forEach(post => {
            const postCategory = post.querySelector('.post-category').textContent;
            if (postCategory === category) {
                post.style.opacity = '0';
                setTimeout(() => {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                post.style.opacity = '0';
                setTimeout(() => {
                    post.style.display = 'none';
                }, 300);
            }
        });

        // Gérer l'article en vedette
        if (featuredPost) {
            const featuredCategory = featuredPost.querySelector('.post-category').textContent;
            if (featuredCategory === category) {
                featuredPost.style.opacity = '0';
                setTimeout(() => {
                    featuredPost.style.display = 'block';
                    setTimeout(() => {
                        featuredPost.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                featuredPost.style.opacity = '0';
                setTimeout(() => {
                    featuredPost.style.display = 'none';
                }, 300);
            }
        }
    }

    // Ajouter les écouteurs d'événements aux boutons de catégorie
    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.textContent;
            filterPosts(category);
        });
    });

    // Initialiser avec "Tous les articles"
    filterPosts('Tous les articles');
});