// Schéma JSON-LD pour le SEO
document.addEventListener("DOMContentLoaded", function () {
  // Schéma pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Vitalia - Centre d'Amincissement",
    url: "https://centrevitalia.com/",
    logo: "https://centrevitalia.com/assets/logo.svg",
    image: "https://centrevitalia.com/assets/hero.svg",
    description:
      "Centre d'amincissement professionnel en Tunisie, spécialisé en Cellu M6, lipocryolyse, I.motion et omeoenergetica. Solutions d'amincissement personnalisées sous supervision professionnelle par Expert Anis Jday.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "48 Avenue Othman Ibn Affen Menzah VIII, Bloc B Medical 3eme étage",
      addressLocality: "Menzah VIII",
      addressRegion: "Tunis",
      postalCode: "2091",
      addressCountry: "TN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.8065",
      longitude: "10.1815",
    },
    telephone: "+21671719065",
    email: "contact@vitalia.tn",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/vitaliatunisie",
      "https://www.instagram.com/vitalia_tunisie",
      "https://twitter.com/vitalia_tunisie",
      "https://www.linkedin.com/company/vitalia-tunisie",
    ],
  };

  // Schéma pour Expert Anis Jday
  const expertSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Expert Anis Jday",
    image: "https://vitalia.tn/assets/team/dr-anis-jday.jpg",
    description:
      "Référence en amincissement professionnel et nutrition en Tunisie avec plus de 15 ans d'expérience",
    url: "https://vitalia.tn/dr-anis-jday.html",
    jobTitle: "Expert en nutrition professionnelle",
    worksFor: {
      "@type": "HealthAndBeautyBusiness",
      name: "Vitalia - Centre d'Amincissement",
      url: "https://vitalia.tn/",
    },
    knowsAbout: ["Weight Management", "Nutrition", "Wellness Programs"],
    availableService: [
      {
        "@type": "Service",
        name: "Programmes d'amincissement personnalisés",
      },
      {
        "@type": "Service",
        name: "Entretien en nutrition professionnelle",
      },
      {
        "@type": "Service",
        name: "Programmes de bien-être métabolique",
      },
    ],
  };

  // Schéma pour les services
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Services d'amincissement Vitalia",
    url: "https://vitalia.tn/services.html",
    description:
      "Solutions d'amincissement personnalisées incluant perte de poids, raffermissement, bien-être et suivi sur mesure",
    about: {
      "@type": "HealthAndBeautyBusiness",
      name: "Vitalia - Centre d'Amincissement",
      url: "https://vitalia.tn/",
    },
    mainContentOfPage: [
      {
        "@type": "Service",
        name: "Programme de perte de poids",
        description:
          "Solutions personnalisées pour une perte de poids saine et durable",
        provider: "Suivi personnalisé par des experts",
      },
      {
        "@type": "Service",
        name: "Raffermissement",
        description:
          "Techniques avancées pour raffermir votre corps et tonifier votre peau",
        provider: "Résultats visibles et durables",
      },
    ],
  };

  // Injecter les schémas dans le document
  const injectSchema = (schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  };

  // Déterminer la page actuelle et injecter les schémas appropriés
  const currentURL = window.location.pathname;

  // Injecter le schéma de l'organisation sur toutes les pages
  injectSchema(organizationSchema);

  // Injecter des schémas spécifiques en fonction de la page
  if (
    currentURL.includes("dr-anis-jday") ||
    currentURL === "/dr-anis-jday.html"
  ) {
    injectSchema(expertSchema);
  } else if (
    currentURL.includes("services") ||
    currentURL === "/services.html"
  ) {
    injectSchema(servicesSchema);
  }
});
