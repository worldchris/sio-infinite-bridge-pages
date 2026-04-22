async function generateZip() {
    const btn = document.getElementById('btn-main');
    const inputLink = document.getElementById('user-link').value.trim();
    const prodName = document.getElementById('prod-name').value.trim();
    const prodText = document.getElementById('prod-text').value.trim();
    const prodImg = document.getElementById('prod-img').value.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800';

    // TES LIENS STRATÉGIQUES
    const sioLink = "https://systeme.io/fr?sa=sa16047325683a6745455482376be9c81d";
    const toolLink = "https://worldchris.github.io/sio-infinite-bridge-pages/";
    
    // Fail-safe : si pas d'ID, c'est toi qui touches
    const finalLink = (inputLink.length < 10) ? sioLink : inputLink;

    if (!prodText || !prodName) { alert("Veuillez remplir les informations."); return; }

    btn.innerText = "⏳ Génération Premium en cours...";
    btn.disabled = true;

    const formattedContent = prodText.split('\n').map(p => p.trim() ? `<p class="mb-6">${p}</p>` : '').join('');

    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName} | Accès Exclusif</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; }
        h1 { font-family: 'Playfair Display', serif; }
        .card { background: white; border-radius: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08); }
    </style>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${prodName}",
      "image": "${prodImg}",
      "description": "${prodName} - Solution numérique premium.",
      "brand": { "@type": "Brand", "name": "Digital Life" },
      "offers": { "@type": "Offer", "url": "${finalLink}", "priceCurrency": "EUR" }
    }
    </script>
</head>
<body class="py-12 px-4 md:py-24">
    <main class="max-w-4xl mx-auto card overflow-hidden border border-slate-100">
        <img src="${prodImg}" alt="${prodName}" class="w-full h-96 object-cover shadow-inner">
        <div class="p-8 md:p-16">
            <h1 class="text-4xl md:text-6xl text-slate-900 mb-10 leading-tight">${prodName}</h1>
            <div class="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                ${formattedContent}
            </div>
            <div class="mt-16 text-center">
                <a href="${finalLink}" target="_blank" rel="nofollow noopener"
                   class="inline-block bg-gradient-to-br from-indigo-600 to-violet-700 text-white font-bold py-6 px-16 rounded-3xl text-2xl shadow-2xl shadow-indigo-200 transition transform hover:scale-105 active:scale-95">
                   Accéder Maintenant 🚀
                </a>
                <p class="mt-6 text-slate-400 text-sm font-medium uppercase tracking-widest">Version numérique • Accès immédiat</p>
            </div>
        </div>
    </main>

    <footer class="mt-20 max-w-3xl mx-auto text-center px-6">
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 text-sm font-semibold">
            <a href="${sioLink}" target="_blank" class="text-indigo-600 hover:text-indigo-800 transition">Découvrez l'outil marketing tout-en-un</a>
            <span class="hidden md:block text-slate-300">|</span>
            <a href="${toolLink}" target="_blank" class="text-slate-500 hover:text-slate-800 transition">Générer votre page gratuitement</a>
        </div>
        <p class="text-[10px] text-slate-300 uppercase tracking-[0.2em] leading-loose">
            Note : Ce site contient des liens d'affiliation. Aucune information ici ne constitue un avis médical ou financier.
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
        link.download = `pack-${safeName}.zip`;
        link.click();
    } catch (e) {
        alert("Erreur de génération.");
    } finally {
        btn.innerText = "📥 Télécharger mon Pack Premium (ZIP)";
        btn.disabled = false;
    }
}
