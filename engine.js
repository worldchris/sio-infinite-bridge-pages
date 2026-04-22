async function generateZip() {
    const btn = document.getElementById('btn-main');
    const userLink = document.getElementById('user-link').value;
    const prodName = document.getElementById('prod-name').value;
    const prodText = document.getElementById('prod-text').value;

    if (!userLink || !prodText || !prodName) {
        alert("Veuillez remplir tous les champs (Lien, Titre et Texte HTML).");
        return;
    }

    btn.innerText = "⏳ Génération en cours...";
    btn.disabled = true;

    // Création du code du mini-site final
    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 leading-relaxed">
    <main class="max-w-3xl mx-auto py-12 px-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900">${prodName}</h1>
        
        <div class="prose prose-lg mx-auto mb-12 text-gray-700">
            ${prodText}
        </div>
        
        <div class="text-center mt-12 mb-8">
            <a href="${userLink}" 
               class="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-12 rounded-full text-2xl shadow-2xl transition transform hover:scale-105">
               Accéder à la version numérique maintenant 🚀
            </a>
        </div>
    </main>
    <footer class="mt-20 py-10 bg-gray-50 text-center text-xs text-gray-500 border-t">
        <p>Propulsé par <a href="https://worldchris.github.io/sio-infinite-bridge-pages/" class="text-blue-500 hover:underline">Sio Infinite Bridge Pages</a></p>
        <p class="mt-3 italic max-w-2xl mx-auto px-4">Avertissement légal : Ce site propose des contenus à but informatif et éducatif, intégrant des liens d'affiliation. Aucune information présentée ici ne doit être interprétée comme un avis médical ou professionnel. Veuillez consulter un spécialiste certifié pour toute question spécifique.</p>
    </footer>
</body>
</html>`;

    // Création du fichier ZIP
    const zip = new JSZip();
    zip.file("index.html", siteHtml);
    
    // Téléchargement
    const content = await zip.generateAsync({type:"blob"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `minisite-${prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.zip`;
    link.click();

    btn.innerText = "📥 Télécharger mon Mini-Site (ZIP)";
    btn.disabled = false;
}
