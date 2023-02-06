let cardsEl = document.querySelector('#food-cards')

// Modal function
function showModal() {
    let myModal = new bootstrap.Modal(document.getElementById('modal'));
    myModal.show();
}

// event listener for search ingredient
document.getElementById("search-button").addEventListener("click", function (event) {
    let dishSearch = document.getElementById("search-input").value;
    event.preventDefault();
    cardsEl.innerHTML = ``

    if (dishSearch === "") {
        showModal();
    } else {

        foodSearch(dishSearch)
    }
});

// food search function

function foodSearch(dishSearch) {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2a8fd49437mshbdf1ea1b79875a2p1a77e9jsn52c0b56f707a',
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    };

    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${dishSearch}`, options)
        .then(response => response.json())
        .then(function (recipes) {console.log(recipes)
            if (recipes.more===false) {
                showModal()
                
            }


            //creating 3 cards
            for (let i = 0; i < 3; i++) {

                let img = recipes.hits[i].recipe.image
                let foodLabel = recipes.hits[i].recipe.label
                let cuisineType = recipes.hits[i].recipe.cuisineType[0]
                let ingredient = recipes.hits[i].recipe.ingredientLines
                let ingredientList =(ingredient).join()
                let calories = Math.round(recipes.hits[i].recipe.calories)
                let dishType = recipes.hits[i].recipe.dishType


                let newDiv = document.createElement('div');
                newDiv.innerHTML = `<div class="card" style="width: 25rem;">
    <img src="${img}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${foodLabel}</h5>
    <p class="card-text"></p>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Cuisine: ${cuisineType}</li>
    <li class="list-group-item">Calories per recipe: ${calories}</li>
    <li class="list-group-item">Dish type: ${dishType}</li>
    <li class="list-group-item">Dish type: ${ingredientList}</li>
    
    </ul>

    </div>`
                cardsEl.appendChild(newDiv)
            }
        })
}


//DRINKS API FETCH REQUEST
let drinksURL = "https://api.api-ninjas.com/v1/cocktail?name="
let drinkKey = "Qi651/P1cNZMlzbO7KcHFw==j6GIGW3DJULCUbIq"
let foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q="
let foodKey = "&app_key=8655a5154efa47cd96813434d7914422"
let foodId = "&app_id=630342ea"
let drinkAPI
let foodAPI


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
    }
}
)
