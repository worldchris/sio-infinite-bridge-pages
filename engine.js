async function generateZip() {
    const btn = document.getElementById('btn-main');
    const userLink = document.getElementById('user-link').value.trim();
    const prodName = document.getElementById('prod-name').value.trim();
    const prodText = document.getElementById('prod-text').value.trim();

    if (!userLink || !prodText || !prodName) {
        alert("Veuillez remplir tous les champs avant de générer le site.");
        return;
    }

    btn.innerText = "⏳ Création du pack en cours...";
    btn.disabled = true;

    // Préparation du contenu : on gère les sauts de ligne si l'utilisateur n'a pas mis de HTML
    const formattedContent = prodText.includes('<p>') || prodText.includes('</h2>') 
        ? prodText 
        : prodText.split('\n').map(para => para.trim() ? `<p class="mb-4">${para}</p>` : '').join('');

    // Création du code source du mini-site
    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 antialiased">
    <main class="max-w-3xl mx-auto py-16 px-6">
        <header class="mb-12 text-center">
            <h1 class="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">${prodName}</h1>
            <div class="h-1 w-20 bg-indigo-600 mx-auto"></div>
        </header>
        
        <div class="prose prose-indigo prose-lg mx-auto text-gray-700 leading-relaxed">
            ${formattedContent}
        </div>
        
        <div class="mt-16 text-center">
            <a href="${userLink}" target="_blank" rel="noopener"
               class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 rounded-full text-2xl shadow-2xl transition transform hover:scale-105">
               Accéder au programme maintenant 🚀
            </a>
            <p class="mt-6 text-sm text-gray-400">Paiement sécurisé et accès immédiat</p>
        </div>
    </main>

    <footer class="mt-24 py-12 bg-gray-50 border-t border-gray-100">
        <div class="max-w-3xl mx-auto px-6 text-center">
            <p class="text-xs text-gray-400">
                Propulsé par <a href="${window.location.href}" class="underline">Sio Infinite Builder</a>
            </p>
            <p class="mt-4 text-[10px] text-gray-400 uppercase tracking-widest leading-loose">
                Avertissement : Ce site contient des liens d'affiliation. Les informations sont fournies à titre éducatif et ne remplacent pas l'avis d'un professionnel.
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
        
        // Nom du fichier nettoyé
        const safeName = prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        link.download = `site-${safeName}.zip`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Erreur ZIP:", error);
        alert("Une erreur est survenue lors de la création du fichier.");
    } finally {
        btn.innerText = "📥 Télécharger mon Mini-Site (ZIP)";
        btn.disabled = false;
    }
}
