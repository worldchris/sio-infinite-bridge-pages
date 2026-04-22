async function generateZip() {
    const btn = document.getElementById('btn-main');
    const userId = document.getElementById('user-id').value;
    const prodName = document.getElementById('prod-name').value;
    const prodText = document.getElementById('prod-text').value;

    if (!userId || !prodText) {
        alert("Veuillez remplir votre ID et coller un texte.");
        return;
    }

    btn.innerText = "⏳ Génération en cours...";
    btn.disabled = true;

    // 1. Création du code du mini-site final (Le template que l'utilisateur recevra)
    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 leading-relaxed">
    <main class="max-w-2xl mx-auto py-12 px-6">
        <h1 class="text-4xl font-extrabold mb-6">${prodName}</h1>
        <div class="prose prose-lg mb-10">${prodText.replace(/\n/g, '<br>')}</div>
        
        <div class="text-center">
            <a href="${userId.includes('sa') ? 'https://systeme.io/produit?sa=' + userId : 'http://go.' + userId + '.net'}" 
               class="inline-block bg-orange-500 text-white font-bold py-4 px-10 rounded-lg text-xl shadow-xl">
               Accéder à l'offre maintenant 🚀
            </a>
        </div>
    </main>
    <footer class="mt-20 py-10 bg-gray-50 text-center text-xs text-gray-400 border-t">
        <p>Page générée via <a href="https://worldchris.github.io/sio-infinite-bridge-pages/" class="underline">Sio Infinite</a></p>
        <p class="mt-2 italic">Avertissement : Ce site contient des liens d'affiliation. Consultez un professionnel pour toute décision importante.</p>
    </footer>
</body>
</html>`;

    // 2. Création du fichier ZIP avec JSZip
    const zip = new JSZip();
    zip.file("index.html", siteHtml);
    
    // 3. Téléchargement
    const content = await zip.generateAsync({type:"blob"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `mini-site-${prodName.toLowerCase().replace(/ /g, '-')}.zip`;
    link.click();

    btn.innerText = "📥 Télécharger mon Mini-Site (ZIP)";
    btn.disabled = false;
}
