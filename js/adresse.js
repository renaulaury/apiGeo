//Sélectionne l'élément html avec la class cp
const inputCP = document.querySelector(".cp");

// Sélection html de la map
const mapContainer = document.querySelector('#map');
let map;

//Sélectionne l'élément html avec la class ville
const selectVille = document.querySelector(".ville");

//Add ecouteur d'event input (pdt la saisie) au champ de cp
inputCP.addEventListener("input", () => {

    //Récup valeur entrée dans le champ de cp
    let value = inputCP.value;

    //Vide le contenu actuel de la liste de sélection de ville
    selectVille.innerText = null;

    //effectue requete fetch vers api de geo avec cp saisie
    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,centre,codesPostaux,codeRegion&format=json&geometry=centre`)

    //convertit reponse en format json
    .then((response) => response.json())

    //une fois que les données json sont dispos
    .then((data) => {

        //affiche datas dans console
        console.log(data);

        //parcours chaque objet ville dans les datas récupérées
        data.forEach((ville) => {

            //crée new element d option html
            let option = document.createElement("option");

            //definit valeur de l option comme le code de la ville
            // option.value = `${ville.code}`;
            option.innerHTML = `${ville.nom} (${ville.code})`;

            //definit text affiché de l option comme le nom de la ville
            // option.innerHTML = `${ville.nom}`;

            //définit coordonnées de la ville
            option.value = `${ville.centre.coordinates}`;
            
            //Ajoute option a la liste de selection de ville
            selectVille.appendChild(option);
        })
    })
})

// Quand une ville est sélectionnée dans la liste déroulante
selectVille.addEventListener("change", (event) => {
    const coordinates = event.target.value.split(","); // Récupérer les coordonnées (format "long,lat")
    const lat = parseFloat(coordinates[1]);
    const lng = parseFloat(coordinates[0]);

    // Trouve le nom de la ville en utilisant le texte de l'option sélectionnée
    const ville = event.target.selectedOptions[0].innerText.split(" ")[0];


    // Appelle la fonction pour mettre à jour la carte
    updateMap(lat, lng, ville);
});