

let dishSearch="pizza"
foodSearch(dishSearch)

function foodSearch(dishSearch) {
    
let cardsEl=document.querySelector('#food-cards')
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
       
        let img=recipes.hits[i].recipe.image
        let foodLabel=recipes.hits[i].recipe.label
        let cuisineType=recipes.hits[i].recipe.cuisineType[0]
        let ingredient=recipes.hits[i].recipe.ingredientLines
        let ingredientList=JSON.stringify(ingredient)
        let calories=Math.round(recipes.hits[i].recipe.calories)
        let dishType=recipes.hits[i].recipe.dishType
        
     
        let newDiv=document.createElement('div');
        newDiv.innerHTML=`<div class="card" style="width: 18rem;">
    <img src="${img}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${foodLabel}</h5>
    <p class="card-text"></p>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Cuisine: ${cuisineType}</li>
    <li class="list-group-item">Calories per recipe: ${calories}</li>
    <li class="list-group-item">Dish type: ${dishType}</li>
    </ul>
    <div class="card-body">
    ${ingredientList}
    </div>
    </div>`
    cardsEl.appendChild(newDiv)
    }
    })        
}  
        
   


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

let randomDrinkName = Math.floor(Math.random()*drinksArray.length)
let randomDrinkToFetch = drinksArray[randomDrinkName] 

fetch(`https://api.api-ninjas.com/v1/cocktail?name=${randomDrinkToFetch}`, {
headers: { "X-Api-Key": "CfJQv3R+BxbzJOddyAAf0Q==5OY3UNveRQnDlPxQ"}})
.then(response => response.json())
.then (drinkData=> {

    console.log(drinkData)

})


fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${randomDrinkToFetch}&app_id=6a6f70fe&app_key=0c1404a45b625cc5ad95d2d0ce41787d&health=alcohol-cocktail&imageSize=REGULAR`)
.then(response => response.json())
.then (drinkImage => {
    console.log(drinkImage)
    console.log(drinkImage.hits[0].recipe.images.REGULAR.url)

})
