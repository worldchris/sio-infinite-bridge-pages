async function generateZip() {
    const btn = document.getElementById('btn-main');
    const userLink = document.getElementById('user-link').value.trim();
    const prodName = document.getElementById('prod-name').value.trim();
    const prodText = document.getElementById('prod-text').value.trim();

    if (!userLink || !prodText || !prodName) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    btn.innerText = "⏳ Création du ZIP...";
    btn.disabled = true;

    // Mise en forme du texte (sécurité si l'IA n'a pas mis de HTML)
    const formattedContent = prodText.includes('<') ? prodText : prodText.replace(/\n/g, '<br>');

    // Code du mini-site final que l'utilisateur va héberger
    const siteHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prodName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 antialiased">
    <main class="max-w-3xl mx-auto py-16 px-6">
        <h1 class="text-4xl md:text-6xl font-black mb-10 text-center">${prodName}</h1>
        <div class="prose prose-lg mx-auto mb-12 text-gray-700">${formattedContent}</div>
        <div class="text-center mt-12">
            <a href="${userLink}" target="_blank" class="inline-block bg-indigo-600 text-white font-bold py-5 px-12 rounded-full text-2xl shadow-2xl transition transform hover:scale-105">
               Accéder à l'offre maintenant 🚀
            </a>
        </div>
    </main>
    <footer class="mt-24 py-10 bg-gray-50 border-t text-center">
        <p class="text-xs text-gray-400">
            Page générée via <a href="https://worldchris.github.io/sio-infinite-bridge-pages/" class="underline text-indigo-400">Sio Infinite Builder</a>
        </p>
        <p class="mt-4 text-[10px] text-gray-300 px-6 italic">
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
        link.download = `site-${prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.zip`;
        link.click();
    } catch (e) {
        alert("Erreur lors de la création du ZIP.");
    } finally {
        btn.innerText = "📥 Télécharger mon Mini-Site (ZIP)";
        btn.disabled = false;
    }
}
