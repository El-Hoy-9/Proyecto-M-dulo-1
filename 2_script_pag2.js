// api del GTA5 para poder ver la estructura de datos de cada juego: https://api.rawg.io/api/games/3498?key=a54da435e4834c4e89349168b5099f6f

let ps5Url = "https://api.rawg.io/api/games?key=a54da435e4834c4e89349168b5099f6f&platforms=187";
let key = "?key=a54da435e4834c4e89349168b5099f6f"
let api = "https://api.rawg.io/api/games/";
let res;
let gameName;
let gameId;

//_fillForm_ rellena el select con las opciones( de momento sólo los 20 primeros juegos)
//Todavía no se por qué rellena una opción vacía entre las opciones de los juegos.
// quería poner un alert con una foto de game over para el .catch, pero de momento sólo de texto que parece jodido de hacer.
function fillForm(url){
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            res = response;
            for (i = 0; i < response.results.length; i++){
                document.getElementById("gameList").innerHTML += `
                <option value="${response.results[i].id}">${response.results[i].name}</option>`
            }
            if (res.next != null){
                fillForm(res.next);
            }
		})
		.catch(err => {
			console.error(err);
			alert("game over");
		});
}

//_fillGameData_ rellena los datos de cada juego, de momento sólo he puesto foto y descripción
function fillGameData(id){
	fetch(api + id + key)
        .then(response => response.json())
        .then(response => {
            document.getElementById("game-screenshot").innerHTML =`
			<img src="${response.background_image}"/>
            <img src="${response.background_image_additional}"/>
			`
			document.getElementById("game-description").innerHTML =`
            <h3 id="gameTitle">${response.name}<h3>
			<p>${response.description_raw}</p>
            <a href="${response.website}"target="_blank">${response.website}</a>
            <h2>${response.rating + "/" + response.rating_top}</h2>
            `
            gameId = id;
            gameName = response.name;
        })
}

fillForm(ps5Url); //ejecuta el _fillform_ para crear el formulario.
//ejecuta _fillgamedata_ al cambiar la opción del formulario
document.getElementById("gameList").addEventListener("change", function(){
    fillGameData(document.getElementById("gameList").value,);
})




//  document.getElementById("wishList").innerHTML += `
//  <option value=${id}>${name}<option>
function addToWishlist(id, name){
    localStorage.setItem(gameId, id);
    localStorage.setItem(gameName,name);
}
function fillWishlist(id, name){
    document.getElementById("wishList") += `
    <option value="${id}">${name}</option>
    `
}

document.getElementById("addTo").addEventListener("click", function(){
    addToWishlist(gameId, gameName)
});
