getCocktails();



function getCocktails() {
    fetch('/api/cocktails')
        .then(function(response) {
            return response.json();
        })
        .then(function(cocktails) {
            populateCocktails(cocktails);
        });
}

function populateCocktails(data) {
    console.log(data);
}