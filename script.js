let drinksURL = "https://api.api-ninjas.com/v1/cocktail?name="
let drinkKey = "Qi651/P1cNZMlzbO7KcHFw==j6GIGW3DJULCUbIq"
let foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q="
let foodKey = "&app_key=8655a5154efa47cd96813434d7914422"
let foodId = "&app_id=630342ea"
let drinkAPI
let foodAPI

//DRINKS API FETCH REQUEST

let drinksArray = [
    "Alexander", 
    "Americano", 
    "Angel Face", 
    "Aviation", 
    "Bacardi", 
    "Between The Sheets", 
    "Casino", 
    "Clover Club", 
    "Daiquiri", 
    "Derby",
    "John Collins", 
    "Manhattan", 
    "Monkey Gland", 
    "Negroni", 
    "Old Fashioned", 
    "Paradise", 
    "Ramos Gin Fizz", 
    "Rusty Nail", 
    "Sazerac", 
    "Screwdriver", 
    "Sidecar", 
    "Stinger", 
    "Tuxedo", 
    "Whiskey Sour", 
    "White Lady", 
    "Bellini", 
    "Black Russian", 
    "Bloody Mary", 
    "Caipirinha", 
    "Champagne Cocktail", 
    "Cosmopolitan", 
    "Cuba Libre", 
    "French 75",  
    "Golden Dream", 
    "Grasshopper", 
    "Harvey Wallbanger", 
    "Irish Coffee", 
    "Kir", 
    "Long Island Iced Tea", 
    "Mai Tai", 
    "Margarita", 
    "Mimosa", 
    "Mint Julep", 
    "Mojito", 
    "Moscow Mule",  
    "Rose", 
    "Sea Breeze", 
    "Sex On The Beach", 
    "Singapore Sling", 
    "Tequila Sunrise", 
    "Bramble", 
    "Martini", 
    "Kamikaze", 
    "Pisco Sour", 
    "Vampiro", 
    "Yellow Bird", 
    "Daquiri", 
    "Aperol spritz" 
]

$(".drink-btn").on("click", function () {
    $(".drinks-card").empty()
    for (let x = 0; x < drinksArray.length && x < 3; x++) {
        let randomDrinkName = Math.floor((Math.random() * drinksArray.length))
        console.log(randomDrinkName++)
        let randomDrinkToFetch = drinksArray[randomDrinkName]
        console.log(randomDrinkToFetch)

        drinkAPI = drinksURL + randomDrinkToFetch
        foodAPI = foodURL + randomDrinkToFetch + foodId + foodKey

        Promise.all([
            fetch(foodAPI),
            fetch(drinkAPI, { headers: { "X-Api-Key": "Qi651/P1cNZMlzbO7KcHFw==j6GIGW3DJULCUbIq" } })])
            .then(function (response) {
                return Promise.all(response.map(function (response) {
                    return response.json();
                }));
            })
            .then(function (results) {
                console.log(results)
                let image = results[0];
                let drinksData = results[1]

                $(".drinks-card").css("display", "flex");

                //console.log(drinksData[0].name)
                let drinkName = $("<p>").text(drinksData[0].name)
                drinkName.css("text-align", "center")

                let drinkImage = $("<img>")
                //console.log(image.hits[0].recipe.images.REGULAR.url)
                drinkImage.attr("src", image.hits[0].recipe.image)

                //console.log(drinksData[0].ingredients)
                let ingredients = $("<p>").text("Ingredients: " + drinksData[0].ingredients)

                //console.log(drinksData[0].instructions)
                let instructions = $("<p>").text("Instructions: " + (drinksData[0].instructions))

                //console.log(Math.round(image.hits[0].recipe.calories)
                let drinkCalories = $("<p>").text("Calories: " + Math.round(image.hits[0].recipe.calories) + "Kcal")

                $(".drinks-card").eq(x).append(drinkName, drinkImage, ingredients, instructions, drinkCalories)
            })
    }}
)