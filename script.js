let cardsEl = document.querySelector('#food-cards');
let drinksArray = [
    "Aperol Spritz",
    "Alexander",
    "Americano",
    "Angel Face",
    "Aviation",
    "Bacardi",
    "Bellini",
    "Between The Sheets",
    "Black Russian",
    "Bloody Mary",
    "Boulevardier",
    "Bramble",
    "Caipirinha",
    "Casino",
    "Champagne Cocktail",
    "Clover Club",
    "Corpse Reviver #2",
    "Cosmopolitan",
    "Cuba Libre",
    "Daiquiri",
    "Dark And Stormy",
    "Derby",
    "El Presidente",
    "French 75",
    "Gin Fizz",
    "Golden Dream",
    "Grasshopper",
    "Greyhound",
    "Harvey Wallbanger",
    "Horse's Neck",
    "Irish Coffee",
    "Jack Rose",
    "John Collins",
    "Kamikaze",
    "Kir",
    "Long Island Iced Tea",
    "Mai Tai",
    "Margarita",
    "Martini",
    "Manhattan",
    "Mimosa",
    "Mint Julep",
    "Monkey Gland",
    "Mojito",
    "Moscow Mule",
    "Negroni",
    "Old Fashioned",
    "Paradise",
    "Pisco Sour",
    "Pink Lady",
    "Piña Colada",
    "Planter's Punch",
    "Ramos Gin Fizz",
    "Rob Roy",
    "Rose",
    "Rusty Nail",
    "Sazerac",
    "Sea Breeze",
    "Sex On The Beach",
    "Singapore Sling",
    "Screwdriver",
    "Sidecar",
    "Stinger",
    "Tequila Sunrise",
    "Tom Collins",
    "Tuxedo",
    "Vampiro",
    "Whiskey Sour",
    "White Lady",
    "Yellow Bird"
];

//APIs
let drinksURL = "https://api.api-ninjas.com/v1/cocktail?name=";
let drinkKey = "Qi651/P1cNZMlzbO7KcHFw==j6GIGW3DJULCUbIq";
let foodURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
let foodKey = "&app_key=8655a5154efa47cd96813434d7914422";
let foodId = "&app_id=630342ea";

// A function to show the modal.
function showModal() {
    let myModal = new bootstrap.Modal(document.getElementById('modal'));
    myModal.show();
}

// Event listener to display food cards.
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

// A function to fetch food recipes.
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
        .then(function (recipes) {

            //creating 3 cards
            for (let i = 0; i < 3; i++) {

                let img = recipes.hits[i].recipe.image;
                let foodLabel = recipes.hits[i].recipe.label;
                let cuisineType = recipes.hits[i].recipe.cuisineType[0];
                let ingredient = recipes.hits[i].recipe.ingredientLines;
                // let ingredientList = ingredient.join(", ");
                let calories = Math.round(recipes.hits[i].recipe.calories);
                let dishType = recipes.hits[i].recipe.dishType;

                let newDiv = document.createElement('div');
                newDiv.classList.add("card");
                newDiv.innerHTML = `
                    <img class="card-img-top" src="${img}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${foodLabel}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Cuisine: ${cuisineType}</li>
                        <li class="list-group-item">Calories per recipe: ${calories}</li>
                        <li class="list-group-item">Dish type: ${dishType}</li>
                    </ul>
                    <div class="card-body">
                        <ul>
                            ${ingredient.map(ingredient => {
                    return `<li>${ingredient}</li>`
                }).join("")}   
                        </ul>
                    </div>`;
                cardsEl.appendChild(newDiv);
            }
        })
}

// A function to shuffle the drinks array.
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Event listener to display drink cards.
document.querySelector(".drink-btn").addEventListener("click", function () {
    document.getElementById("drink-cards").innerHTML = "";
    shuffleArray(drinksArray);

    for (let index = 0; index < drinksArray.length && index < 3; index++) {
        // let randomDrinkName = Math.floor((Math.random() * drinksArray.length));
        // let randomDrinkToFetch = drinksArray[randomDrinkName];
        let drinkAPI = drinksURL + drinksArray[index];
        // let foodAPI = foodURL + randomDrinkToFetch + foodId + foodKey + "&dishType=alcohol cocktail";
        let foodAPI = foodURL + drinksArray[index] + foodId + foodKey + "&dishType=alcohol cocktail";

        Promise.all([
            fetch(foodAPI),
            fetch(drinkAPI, {
                headers: {
                    "X-Api-Key": "Qi651/P1cNZMlzbO7KcHFw==j6GIGW3DJULCUbIq"
                }
            })
        ])
            .then(function (response) {
                return Promise.all(response.map(function (response) {
                    return response.json();
                }))
            })

            .then(function (results) {
                let image = results[0];
                let drinksData = results[1];
                let divCard = document.createElement("div");
                divCard.classList.add("card");
                divCard.innerHTML = `
                <img class="card-img-top" src="${image.hits[0].recipe.image}"></img>
                <div class="card-body">
                <h5 class="card-title">${drinksArray[index]}</h5>
                <ul>
                ${drinksData[0].ingredients.map(ingredient => {
                    return `<li>${ingredient}</li>`
                }).join("")}   
            </ul>
                <p class="card-text"> Instructions: ${drinksData[0].instructions} </p>
                <p class="card-text"> Calories: ${Math.round(image.hits[0].recipe.calories)} Kcal. </p>
                </div>`;
                document.getElementById("drink-cards").appendChild(divCard);
            });
    }
});