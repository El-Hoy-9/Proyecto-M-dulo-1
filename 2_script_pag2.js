// api del GTA5 para poder ver la estructura de datos de cada juego: https://api.rawg.io/api/games/3498?key=a54da435e4834c4e89349168b5099f6f

let ps5Url = "https://api.rawg.io/api/games?key=a54da435e4834c4e89349168b5099f6f&platforms=187";
let key = "?key=a54da435e4834c4e89349168b5099f6f"
let api = "https://api.rawg.io/api/games/";
let res;
let gameName;
let gameId;
//_fillForm_ rellena el select con las opciones-----------------------------------------------------
function fillForm(url){
    fetch(url)
    .then(response => response.json())
    .then(response => {
//        console.log(response)
        res = response;
        for (i = 0; i < response.results.length; i++){
            document.getElementById("gameList").innerHTML += `
            <option value="${response.results[i].id}">${response.results[i].name}</option>`
        }
        // if (res.next != null){
        //     fillForm(res.next);
        // }
    })
    .catch(err => {
        console.error(err);
        alert("game over");
    });
    /*----------------------------------------------------------AQUI//
    document.getElementById("gameList").innerHTML += `
    <option value="" selected disabled> Choose a game</option>`
    
    //----------------------------------------------------------AQUI*/
    
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

//modifica la lista de deseados-
function addToWishlist(id, name){s
    let wishlist = localStorage.getItem(`wishList`);
    let wish = JSON.parse(wishlist);
    if (wish != null){  
        let x = findWithAttr(wish, "id", id);
            if(x != -1){ 
                let temp = wish.splice(x, 1);
                wish = JSON.stringify(wish);
                localStorage.setItem(`wishList`, wish);
            }
            else{
                game = {id: null, name: null};
                game.id = id;
                game.name = name;
                wish.push(game);
                wish = JSON.stringify(wish);
                localStorage.setItem(`wishList`, wish);
            }
    }
    else{
    wish = [], game = {id: null, name: null};
    wish.push(game);
    wish[0].id = id;
    wish[0].name = name;
    wish = JSON.stringify(wish)
    localStorage.setItem(`wishList`, wish);
    }
    wishlist = localStorage.getItem(`wishList`);
    control.log(wishlist);
    if (wishlist.length == 0){
        localStorage.removeItem(`wishList`);
    }
}

//imprime la lista de deseados
function fillWishlist(){
    let wishlist = localStorage.getItem(`wishList`);
    let wishp = JSON.parse(wishlist)
console.log(wishp);
    if (wishp == null){
        document.getElementById("wishList").innerHTML += `
        <option>Wishlist empty</option>
        `}
    else{
        for (i = 0; i < wishp.length; i ++){
            document.getElementById("wishList").innerHTML += `
            <option value="${wishp[i].id}">${wishp[i].name}</option>
            `}
    }
}
//---------------------------------------------
//busca si el id de game está ya en la whislist y retorna posición (como el indexOf, -1 si no está).
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//-------------------------------------------------------------------------------------------
fillForm(ps5Url);
fillWishlist();
//ejecuta _fillgamedata_ al cambiar la opción del formulario
document.getElementById("gameList").addEventListener("change", function(){
    fillGameData(document.getElementById("gameList").value,);
})
        
//añade a la lista de deseados al hacer click
document.getElementById("addTo").addEventListener("click", function(){
    document.getElementById("wishList").innerHTML = ``
            addToWishlist(gameId, gameName);
            fillWishlist();
});




