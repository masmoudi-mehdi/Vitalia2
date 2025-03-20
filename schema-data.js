// Schéma JSON-LD pour le SEO
document.addEventListener("DOMContentLoaded", function () {
  // Schéma pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Vitalia - Centre d'Amincissement",
    url: "https://vitalia.tn/",
    logo: "https://vitalia.tn/assets/logo.svg",
    image: "https://vitalia.tn/assets/hero.svg",
    description:
      "Centre d'amincissement médicalisé en Tunisie, spécialisé en Cellu M6, lipocryolyse, I.motion et omeoenergetica. Solutions d'amincissement personnalisées sous supervision médicale par Dr. Anis Jday.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Avenue Habib Bourguiba",
      addressLocality: "Tunis",
      addressRegion: "Tunis",
      postalCode: "1000",
      addressCountry: "TN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.8065",
      longitude: "10.1815",
    },
    telephone: "+21671234567",
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

  // Schéma pour le Dr. Anis Jday
  const doctorSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Anis Jday",
    image: "https://vitalia.tn/assets/team/dr-anis-jday.jpg",
    description:
      "Référence en amincissement médical et nutrition en Tunisie avec plus de 15 ans d'expérience",
    url: "https://vitalia.tn/dr-anis-jday.html",
    jobTitle: "Médecin spécialiste en nutrition médicale",
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Vitalia - Centre d'Amincissement",
      url: "https://vitalia.tn/",
    },
    medicalSpecialty: ["Weight Management", "Nutrition", "Obesity Medicine"],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Programmes d'amincissement personnalisés",
      },
      {
        "@type": "MedicalProcedure",
        name: "Consultation en nutrition médicale",
      },
      {
        "@type": "MedicalProcedure",
        name: "Traitement des troubles métaboliques",
      },
    ],
  };

  // Schéma pour les services
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Services d'amincissement Vitalia",
    url: "https://vitalia.tn/services.html",
    description:
      "Solutions d'amincissement personnalisées incluant perte de poids, raffermissement, bien-être et suivi sur mesure",
    about: {
      "@type": "MedicalBusiness",
      name: "Vitalia - Centre d'Amincissement",
      url: "https://vitalia.tn/",
    },
    mainContentOfPage: [
      {
        "@type": "MedicalProcedure",
        name: "Programme de perte de poids",
        description:
          "Solutions personnalisées pour une perte de poids saine et durable",
        followup: "Suivi personnalisé par des experts",
      },
      {
        "@type": "MedicalProcedure",
        name: "Raffermissement",
        description:
          "Techniques avancées pour raffermir votre corps et tonifier votre peau",
        followup: "Résultats visibles et durables",
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
    injectSchema(doctorSchema);
  } else if (
    currentURL.includes("services") ||
    currentURL === "/services.html"
  ) {
    injectSchema(servicesSchema);
  }
});
