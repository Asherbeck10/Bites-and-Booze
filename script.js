// event listener for search ingredient
document.getElementById("search-button").addEventListener("click", function (event) {
    let ingredient = document.getElementById("search-input").value;
    event.preventDefault();

});




//DRINKS API FETCH REQUEST

let drinksArray = [
    "bloody mary",
    "margarita",
    "old fashion",
    "cosmopolitan",
    "mojito",
    "manhattan",
    "negroni",
    "martini",
    "daquiri",
    "whiskey sour",
    "aperol spritz"
]

let randomDrinkName = Math.floor(Math.random() * drinksArray.length)
let randomDrinkToFetch = drinksArray[randomDrinkName]

fetch(`https://api.api-ninjas.com/v1/cocktail?name=${randomDrinkToFetch}`, {
    headers: { "X-Api-Key": "CfJQv3R+BxbzJOddyAAf0Q==5OY3UNveRQnDlPxQ" }
})
    .then(response => response.json())
    .then(drinkData => {

        console.log(drinkData)

    })


fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${randomDrinkToFetch}&app_id=6a6f70fe&app_key=0c1404a45b625cc5ad95d2d0ce41787d&health=alcohol-cocktail&imageSize=REGULAR`)
    .then(response => response.json())
    .then(drinkImage => {
        console.log(drinkImage)
        console.log(drinkImage.hits[0].recipe.images.REGULAR.url)

    })
