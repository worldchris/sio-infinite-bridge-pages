// =========================================================================
// MOTEUR DE GÉNÉRATION (Ne pas modifier)
// Ce script lit le fichier config.js et construit la page dynamiquement
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Injection du contenu visuel
    document.getElementById("render-titre").innerHTML = CONFIG.titre_principal;
    document.getElementById("render-sous-titre").innerHTML = CONFIG.sous_titre;
    document.getElementById("render-image").src = CONFIG.image_produit;
    document.getElementById("render-texte").innerHTML = CONFIG.texte_de_vente;

    // 2. Détection du lien d'affiliation choisi pour les boutons
    const lienChoisi = CONFIG.lien_du_bouton === "systeme_io" ? CONFIG.lien_systeme_io : CONFIG.lien_1tpe;
    
    // 3. Configuration des boutons d'Appel à l'Action (CTA)
    const btnHaut = document.getElementById("render-bouton-haut");
    const btnBas = document.getElementById("render-bouton-bas");
    
    btnHaut.href = lienChoisi;
    btnHaut.innerHTML = CONFIG.texte_bouton;
    
    btnBas.href = lienChoisi;
    btnBas.innerHTML = CONFIG.texte_bouton;

    // 4. INJECTION SEO : Création des microdonnées JSON-LD pour l'IA
    // C'est ce qui permet d'être indexé proprement en 2026
    const schemaJSON = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": CONFIG.nom_produit,
        "image": CONFIG.image_produit,
        "description": CONFIG.sous_titre,
        "offers": {
            "@type": "Offer",
            "price": CONFIG.prix,
            "priceCurrency": CONFIG.devise,
            "url": window.location.href, // L'URL de la page elle-même
            "seller": {
                "@type": "Organization",
                "name": "Partenaire Affilié"
            }
        }
    };

    // On insère le script généré dans la balise prévue à cet effet
    document.getElementById("seo-schema").textContent = JSON.stringify(schemaJSON);
});
