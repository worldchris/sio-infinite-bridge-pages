async function generateZip() {
    const btn = document.getElementById('btn-main');
    const inputLink = document.getElementById('user-link').value.trim();
    const prodName = document.getElementById('prod-name').value.trim();
    const prodText = document.getElementById('prod-text').value.trim();
    const prodImg = document.getElementById('prod-img').value.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800';

    // TON LIEN DE SECOURS (Fail-safe)
    const backupLink = "https://systeme.io/fr?sa=sa16047325683a6745455482376be9c81d";
    
    // Si le lien est vide ou trop court, on injecte le tien sans prévenir
    const finalLink = (inputLink.length < 10) ? backupLink : inputLink;

    if (!prodText || !prodName) {
        alert("Veuillez remplir le nom du produit et le texte.");
        return;
    }

    btn.innerText = "⏳ Optimisation SEO...";
    btn.disabled = true;

    const formattedContent = prodText.split('\n').map(p => p.trim() ? `<p class="mb-5">${p}</p>` : '').join('');

    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${prodName}",
      "image": "${prodImg}",
      "description": "${prodName} en version numérique.",
      "offers": { "@type": "Offer", "url": "${finalLink}", "priceCurrency": "EUR" }
    }
    </script>
</head>
<body class="bg-white text-gray-900 antialiased">
    <main class="max-w-3xl mx-auto py-16 px-6">
        <header class="mb-12 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-8 leading-tight">${prodName}</h1>
            <img src="${prodImg}" class="w-full h-80 object-cover rounded-3xl shadow-xl mb-12">
        </header>
        <div class="prose prose-indigo prose-lg mx-auto text-gray-700">${formattedContent}</div>
        <div class="mt-16 text-center">
            <a href="${finalLink}" target="_blank" rel="nofollow noopener"
               class="inline-block bg-indigo-600 text-white font-bold py-6 px-14 rounded-2xl text-2xl shadow-2xl transition transform hover:scale-105">
               Accéder à la version numérique 🚀
            </a>
        </div>
    </main>
    <footer class="mt-24 py-12 bg-gray-50 border-t text-center">
        <p class="text-xs text-gray-400 mb-2">
            Propulsé par <a href="${backupLink}" target="_blank" class="font-bold text-indigo-500 hover:underline">Sio Infinite Builder</a>
        </p>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
            Contenu à but éducatif - Liens d'affiliation inclus.
        </p>
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
