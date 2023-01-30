// api del GTA5 para poder ver la estructura de datos de cada juego: https://api.rawg.io/api/games/3498?key=a54da435e4834c4e89349168b5099f6f

let ps5Url = "https://api.rawg.io/api/games?key=a54da435e4834c4e89349168b5099f6f&platforms=187";
let key = "?key=a54da435e4834c4e89349168b5099f6f"
let api = "https://api.rawg.io/api/games/";

//_fillForm_ rellena el select con las opciones( de momento sólo los 20 primeros juegos)
//Todavía no se por qué rellena una opción vacía entre las opciones de los juegos.
// quería poner un alert con una foto de game over para el .catch, pero de momento sólo de texto que parece jodido de hacer.
function fillForm(url){
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)
           // debugger
            for (i = 0; i < response.results.length; i++)
            document.querySelector("select").innerHTML += `
            <option value=${response.results[i].id}>${response.results[i].name}<option>`
		})
		.catch(err => {
			console.error(err)
			alert("game over")
		});
   
}

//_fillGameData_ rellena los datos de cada juego, de momento sólo he puesto foto y descripción
function fillGameData(id){
	fetch(api + id + key)
        .then(response => response.json())
        .then(response => {
            document.getElementById("game-screenshot").innerHTML =`
			<img src="${response.background_image}"/>
			`
			document.getElementById("game-description").innerHTML =`
			<p>${response.description_raw}</p>
            `
        })
}

fillForm(ps5Url); //ejecuta el _fillform_ para crear el formulario.

//ejecuta _fillgamedata_ al cambiar la opción del formulario
document.querySelector("select").addEventListener("change", function(){
	fillGameData(document.querySelector("select").value,);
})
