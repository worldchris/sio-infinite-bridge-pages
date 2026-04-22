async function generateZip() {
    const btn = document.getElementById('btn-main');
    const userLink = document.getElementById('user-link').value.trim();
    const prodName = document.getElementById('prod-name').value.trim();
    const prodText = document.getElementById('prod-text').value.trim();
    const prodImg = document.getElementById('prod-img').value.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800';

    if (!userLink || !prodText || !prodName) {
        alert("Veuillez remplir les informations obligatoires.");
        return;
    }

    btn.innerText = "⏳ Création SEO en cours...";
    btn.disabled = true;

    // Mise en forme intelligente du texte brut
    const formattedContent = prodText.split('\n').map(p => p.trim() ? `<p class="mb-5">${p}</p>` : '').join('');

    // Code du mini-site final
    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName} - Offre Spéciale Numérique</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${prodName}",
      "image": "${prodImg}",
      "description": "${prodName} - Accédez à la méthode complète en version numérique.",
      "brand": { "@type": "Brand", "name": "Digital Selection" },
      "offers": {
        "@type": "Offer",
        "url": "${userLink}",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    }
    </script>
</head>
<body class="bg-white text-gray-900 antialiased font-sans">
    <main class="max-w-3xl mx-auto py-16 px-6">
        <header class="mb-12 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-8 text-gray-900 tracking-tight leading-tight">${prodName}</h1>
            <img src="${prodImg}" alt="${prodName}" class="w-full h-80 object-cover rounded-3xl shadow-2xl mb-12">
        </header>
        
        <div class="prose prose-indigo prose-lg mx-auto text-gray-700">
            ${formattedContent}
        </div>
        
        <div class="mt-16 text-center">
            <a href="${userLink}" target="_blank" rel="nofollow noopener"
               class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 px-14 rounded-2xl text-2xl shadow-2xl transition transform hover:scale-105">
               Accéder à la version numérique 🚀
            </a>
            <p class="mt-4 text-sm text-gray-400">Offre disponible immédiatement après validation</p>
        </div>
    </main>

    <footer class="mt-24 py-12 bg-gray-50 border-t">
        <div class="max-w-3xl mx-auto px-6 text-center">
            <p class="text-xs text-gray-400">
                Généré via <a href="${window.location.href}" class="underline text-indigo-400">Sio Infinite</a>
            </p>
            <p class="mt-6 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
                Avertissement : Ce site contient des liens d'affiliation. Les informations fournies ne remplacent pas l'avis d'un professionnel.
            </p>
        </div>
    </footer>
</body>
</html>`;

    try {
        const zip = new JSZip();
        zip.file("index.html", siteHtml);
        const content = await zip.generateAsync({type: "blob"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        const safeName = prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        link.download = `minisite-${safeName}.zip`;
        link.click();
    } finally {
        btn.innerText = "📥 Télécharger mon Mini-Site Pro";
        btn.disabled = false;
    }
}
