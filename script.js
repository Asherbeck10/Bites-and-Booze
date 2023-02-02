let drinksImg = $(".drinks-img")
let drinksText = $(".drinks-text")
let drinksCard = $(".drinks-card")

for (let i = 0; i < result.length; i++) {
    let drinksDiv = $("<div>")

    drinksImg.attr("src", results[i].images.fixed_height.url)
    drinksDiv.append(drinkImage)

    let drinksRecipe = results[i].recipe
    drinksDiv.append(drinksRecipe)

    Object.keys($(".drinks-card")).forEach((element) => {
        if (element < 3) {
            $($(".drinks-card")[element]).attr("data-index", element)}
    let drinksIndex = $($(".drinksCard")[element]).attr("data-index")
    drinksCard[drinksIndex].append(drinksDiv)

})
}

// localStorage.setItem( , )
// localStorage.getItem( , )
