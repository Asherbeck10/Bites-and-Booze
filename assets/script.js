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
let drinkHistory = [];
let moodAsFoods = {
    Calm: "Green",
    Cheerful: "Yellow",
    Content: "Green",
    Elegant: "Purple",
    Energetic: "Red",
    Enthusiastic: "Orange",
    Excited: "Red",
    Happy: "Yellow",
    Innocent: "White",
    Luxurious: "Purple",
    Meditative: "Purple",
    Mysterious: "Black",
    Optimistic: "Yellow",
    Peaceful: "Blue",
    Passionate: "Red",
    Playful: "Pink",
    Pure: "White",
    Reliable: "Brown",
    Rejuvenating: "Green",
    Romantic: "Pink",
    Sad: "Blue",
    Serene: "Blue",
    Sophisticated: "Black",
    Sturdy: "Brown",
    Trustworthy: "Blue",
    Warm: "Orange"
}
let colorAsDishes = {
    Red: ["Pizza", "Lasagna", "Tomato Soup", "Gazpacho", "Watermelon", "Red Pepper Hummus"],
    Green: ["Sushi", "Green salad", "Green Smoothie", "Matcha Latte", "Guacamole"],
    Yellow: ["Tacos", "Biryani", "Pasta", "Curry", "Paella", "Fish and chips", "Fried chicken", "Lemon Chicken", "Yellow Curry", "Yellow Rice", "Yellow"],
    Brown: ["Pad Thai", "Hamburger", "Ramen", "Peking duck", "Falafel", "Pho", "Beef Wellington", "Poutine", "Chocolate Smoothie", "Brown Rice"],
    Black: ["Black Rice", "Black Bean Soup", "Squid ink", "Black sesame"],
    White: ["Fried Rice", "Moussaka", "Chiles en nogada", "Spaghetti carbonara", "Beef stroganoff", "Crepes", "Cauliflower Rice", "Coconut Milk", "Garlic Mashed Potatoes"],
    Orange: ["Tandoori chicken", "Shrimp scampi", "Carrot", "Pumpkin Soup", "Sweet Potato Fries", "Orange Juice"],
    Pink: ["Ceviche", "Pink Grapefruit", "Strawberry Yogurt", "Pink Lemonade", "Watermelon Salsa", "Salmon"],
    Purple: ["Beets", "Purple", "Purple Potato Salad", "Purple cabbage", "Purple Smoothie"],
    Blue: ["Blueberries", "Blueberry Muffins", "Blackberry smoothie"]
};

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

// A function to get dishes from local storage.
function loadFromLocalStorage() {
    let dishSearch = localStorage.getItem("lastSearchedFood");

    if (dishSearch !== null) {
        foodSearch(dishSearch);
    }
}

// Event listener to display food cards.
document.getElementById("search-button").addEventListener("click", function (event) {
    let dishSearch = document.getElementById("search-input").value;
    event.preventDefault();
    cardsEl.innerHTML = ``

    if (dishSearch === "") {

        showModal();
    } else {

        foodSearch(dishSearch);
        localStorage.setItem("lastSearchedFood", dishSearch);
    }
});

// A function to display the dishes on cards.
function displayDishCards(recipes) {
    cardsEl.setAttribute("style", "visibility: hidden; opacity: 0;");
    for (let index = 0; index < 3; index++) {

        let img = recipes.hits[index].recipe.image;
        let foodLabel = recipes.hits[index].recipe.label;
        let cuisineType = recipes.hits[index].recipe.cuisineType[0];
        let ingredient = recipes.hits[index].recipe.ingredientLines;
        let calories = Math.round(recipes.hits[index].recipe.calories);
        let dishType = recipes.hits[index].recipe.dishType;
        let recipeLink = recipes.hits[index].recipe.url;

        let newDiv = document.createElement('div');
        newDiv.classList.add("card");
        newDiv.innerHTML = `
            <img class="card-img-top" src="${img}" alt="food image of ${foodLabel}">
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
                <div style="text-align:center">
                <button class="btn drink-btn">
                <a href="${recipeLink}" target="blank" style="color:white; text-decoration:none; border:none">View full instructions</a>
                </button>
                </div>
            </div>`;
        cardsEl.appendChild(newDiv);



    }
    setTimeout(() => {
        cardsEl.setAttribute("style", "visibility: visible; opacity: 1;");
    }, 500);
}

// A function to fetch food recipes.
function foodSearch(dishSearch) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '47e6d4f5a8msh3bf3f52ec4ae6dfp1b820bjsn8fdebc238bd5',
            'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
        }
    };

    fetch(`https://edamam-recipe-search.p.rapidapi.com/search?q=${dishSearch}`, options)
        .then(response => response.json())
        .then(function (recipes) {
            if (recipes.more === false) {
                showModal();
            } else {
                displayDishCards(recipes);
            }
        })
}

// A function to shuffle an array.
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// A function to display a mood list.
function displayMoodList() {
    for (const key in moodAsFoods) {
        document.getElementById("mood-list").innerHTML += `
            <option value="${moodAsFoods[key]}">${key}</option>
            `;
    }
}

// A function to fetch drinks.
function fetchDrink(drinkName) {
    let drinkAPI = drinksURL + drinkName;
    let foodAPI = foodURL + drinkName + foodId + foodKey + "&dishType=alcohol cocktail";

    return Promise.all([
        fetch(foodAPI, {
            headers: {
                "Accept-Language": "en"
            }
        }),
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
        }).then(function (responses) {
            let image = responses[0];
            let drinksData = responses[1];
            let divCard = document.createElement("div");
            divCard.classList.add("card");
            divCard.innerHTML = `
    <img class="card-img-top" src="${image.hits[0].recipe.image}"></img>
    <div class="card-body">
    <h5 class="card-title">${drinkName}</h5>
    <ul>
    ${drinksData[0].ingredients.map(ingredient => {
                return `<li>${ingredient}</li>`
            }).join("")}   
</ul>
    <p class="card-text"> Instructions: ${drinksData[0].instructions} </p>
    <p class="card-text"> Calories: ${Math.round(image.hits[0].recipe.calories)} Kcal. </p>
    </div>`;
            document.getElementById("drink-cards").appendChild(divCard);
        })
}

// Event listener to convert each mood into a dish and display it as cards.
document.getElementById("mood-list").addEventListener("change", function (event) {
    cardsEl.innerHTML = "";
    let color = event.target.value;
    let dishesArray = colorAsDishes[color];
    shuffleArray(dishesArray);
    foodSearch(dishesArray[0]);
});

// Event listener to display drink cards.
document.querySelector(".drink-btn").addEventListener("click", function () {
    document.getElementById("drink-cards").innerHTML = "";
    document.getElementById("drink-cards").setAttribute("style", "visibility: hidden; opacity: 0;");
    shuffleArray(drinksArray);
    drinkHistory = [];

    for (let index = 0; index < drinksArray.length && index < 3; index++) {
        let drinkName = drinksArray[index];
        fetchDrink(drinkName)

        drinkHistory.push(drinkName);
        // console.log(drinkHistory);
        localStorage.setItem("drinkHistory", JSON.stringify(drinkHistory));
    }

    setTimeout(() => {
        document.getElementById("drink-cards").setAttribute("style", "visibility: visible; opacity: 1;");
    }, 1500)
});

// A function to get drinks from local storage.
function getLastDrink() {
    document.getElementById("drink-cards").setAttribute("style", "visibility: hidden; opacity: 0;");
    if (localStorage.getItem("drinkHistory")) {
        drinkHistory = JSON.parse(localStorage.getItem("drinkHistory"))
    }
    for (let d = 0; d < drinkHistory.length && d < 3; d++) {
        let drinkName = drinkHistory[d];
        fetchDrink(drinkName)

    }
    setTimeout(() => {
        document.getElementById("drink-cards").setAttribute("style", "visibility: visible; opacity: 1;");
    }, 1500)
}

getLastDrink();
displayMoodList();
loadFromLocalStorage();