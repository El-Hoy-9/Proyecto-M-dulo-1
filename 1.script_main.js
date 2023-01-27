let ps5Url = "https://api.rawg.io/api/games?key=a54da435e4834c4e89349168b5099f6f&platforms=187";

function apiMain()
    fetch()
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));