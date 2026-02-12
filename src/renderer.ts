console.log("Renderer  est prêt")

// Écouteur d'événements qui assure que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('Electron est prêt')
})

document.getElementById('bonjourBtn')?.addEventListener('click', () => {
    alert("Bonjour")
})