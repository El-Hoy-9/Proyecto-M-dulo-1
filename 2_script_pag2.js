// api del GTA5 para poder ver la estructura de datos de cada juego: https://api.rawg.io/api/games/3498?key=a54da435e4834c4e89349168b5099f6f

let ps5Url = "https://api.rawg.io/api/games?key=a54da435e4834c4e89349168b5099f6f&platforms=187";
let key = "?key=a54da435e4834c4e89349168b5099f6f"
let api = "https://api.rawg.io/api/games/";
let res;
let wishlist = [{0: null}];
let gameName;
let gameId;
//_fillForm_ rellena el select con las opciones-----------------------------------------------------
function fillForm(url){
    fetch(url)
    .then(response => response.json())
    .then(response => {
        // console.log(response)
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
    document.getElementById("gameList").innerHTML += `
    <option value="" selected disabled> Choose a game</option>`
}


//imprime la lista de deseados-------------------------------------------------------------------
function fillWishlist(){
    wishlist = localStorage.getItem("wishlist");
    wishlist = JSON.parse(wishlist);
    
    for (i = 0; i < wishlist.length; i ++){
        document.getElementById("wishList") += `
        <option value="${wishlist[i].id}">${wishlist[i].name}</option>
        `}
}

//_fillGameData_ rellena los datos de cada juego------------------------------------------------------
function fillGameData(id){
    fetch(api + id + key)
    .then(response => response.json())
    .then(response => {
        document.getElementById("game-screenshot").innerHTML =`
        <img src="${response.background_image}"/>
        `
        document.getElementById("game-description").innerHTML =`
        <h3 id="gameTitle">${response.name}<h3>
        <p>${response.description_raw}</p>
        `
        gameId = id;
        gameName = response.name;
    })
}


//rellena la lista de deseados------------------------------------------------------------------
function addToWishlist(id, name){
    for(i = 0; i < wishlist.length; i++){
        
        if(wishlist[i].id === id){ 
            wishlist = wishlist.filter(wish => wish.id != id);
            localStorage.setItem(wishlist);
        }
        else{
            wishlist[i].id = id;
            wishlist[i].name = name;
            localStorage.setItem(wishlist);

        }    
    }   
}

//-------------------------------------------------------------------------------
fillForm(ps5Url); //ejecuta el _fillform_ para crear el formulario.
fillWishlist();
//ejecuta _fillgamedata_ al cambiar la opción del formulario
document.getElementById("gameList").addEventListener("change", function(){
    fillGameData(document.getElementById("gameList").value,);
})
//añade a la lista de deseados al hacer click
document.getElementById("addTo").addEventListener("click", function(){
    addToWishlist(gameId, gameName)
});

//------------------------------------------------------------------------------------------------
