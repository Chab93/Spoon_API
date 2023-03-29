//Settings
var apiKey = "f4780df1170f41749bd24df676766198";
var maxHits = 2;
var mealTypes = [
    "Main Course",
    "Dinner",
    "Lunch",
    "Side Dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
    "Breakfast",
    "Soup",
    "Beverage",
    "Sauce",
    "Marinade",
    "Fingerfood",
    "Snack",
    "Drink"
];
var cuisines = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese"
];
var cuisineChoices = [];
var mealTypeChoice = "";
var mealDiv = document.getElementById("mealTypes");
var selectedMeal = document.getElementById("selectedMeal");
var cuisineDiv = document.getElementById("cuisineTypes");
var selectedCuisines = document.getElementById("selectedCuisines");
var fetchBtn = document.getElementById("call-api-btn");
var recipeResults = document.getElementById("recipe-results");
function createRecipes(apiData) {
    apiData.forEach(function (recipe) {
        var tmpDiv = document.createElement("div");
        var title = document.createElement("h5");
        title.innerHTML = "".concat(recipe.title, "<br>ID: ").concat(recipe.id);
        var summary = document.createElement("p");
        summary.innerHTML = recipe.summary.substring(0, 300) + "....";
        var ready = document.createElement("p");
        ready.innerHTML = "<b>Ready in minutes:</b> " + recipe.readyInMinutes.toString();
        ready.className = "ready-p";
        var image = document.createElement("img");
        image.src = recipe.image;
        var list = document.createElement("ul");
        var vegetarian = document.createElement("li");
        vegetarian.innerText = recipe.vegetarian ? "Vegeterian: Yes" : "Vegeterian: No";
        vegetarian.className = recipe.vegetarian ? "true-green" : "false-red";
        var vegan = document.createElement("li");
        vegan.innerText = recipe.vegan ? "Vegan: Yes" : "Vegan: No";
        vegan.className = recipe.vegan ? "true-green" : "false-red";
        var glutenFree = document.createElement("li");
        glutenFree.innerText = recipe.glutenFree ? "Gluten Free: Yes" : "Gluten Free: No";
        glutenFree.className = recipe.glutenFree ? "true-green" : "false-red";
        var dairyFree = document.createElement("li");
        dairyFree.innerText = recipe.dairyFree ? "Dairy Free: Yes" : "Dairy Free: No";
        dairyFree.className = recipe.dairyFree ? "true-green" : "false-red";
        var mealTypes = "<b>Meal types:</b> ";
        var cuisines = "<b>Cuisines:</b> ";
        var diets = "<b>Diets:</b> ";
        recipe.dishTypes.forEach(function (dish, index) {
            mealTypes += dish.charAt(0).toUpperCase() + dish.slice(1);
            if (index + 1 < recipe.dishTypes.length) {
                mealTypes += ", ";
            }
        });
        recipe.cuisines.forEach(function (cuisine, index) {
            cuisines += cuisine.charAt(0).toUpperCase() + cuisine.slice(1);
            if (index + 1 < recipe.cuisines.length) {
                cuisines += ", ";
            }
        });
        recipe.diets.forEach(function (diet, index) {
            diets += diet.charAt(0).toUpperCase() + diet.slice(1);
            if (index + 1 < recipe.diets.length) {
                diets += ", ";
            }
        });
        var ingredients = "<b>Ingredients:</b><br>";
        recipe.analyzedInstructions.forEach(function (item) {
            //@ts-ignore
            item.steps.forEach(function (step) {
                //@ts-ignore
                step.ingredients.forEach(function (ingr, index) {
                    if (ingr.name.length > 0) {
                        ingredients += ingr.name.charAt(0).toUpperCase() + ingr.name.slice(1) + ", ";
                    }
                });
            });
        });
        ingredients = ingredients.substring(0, ingredients.length - 2);
        console.log(ingredients);
        var dishTypes = document.createElement("p");
        dishTypes.innerHTML = mealTypes;
        dishTypes.className = "p-types";
        var cuisineList = document.createElement("p");
        cuisineList.innerHTML = cuisines;
        cuisineList.className = "p-types";
        var dietList = document.createElement("p");
        dietList.innerHTML = diets;
        dietList.className = "p-types";
        var ingredientList = document.createElement("p");
        ingredientList.innerHTML = ingredients;
        ingredientList.className = "p-ingredients";
        list.appendChild(vegetarian);
        list.appendChild(vegan);
        list.appendChild(glutenFree);
        list.appendChild(dairyFree);
        tmpDiv.appendChild(title);
        tmpDiv.appendChild(summary);
        tmpDiv.appendChild(ready);
        tmpDiv.appendChild(image);
        tmpDiv.appendChild(list);
        tmpDiv.appendChild(dishTypes);
        tmpDiv.appendChild(cuisineList);
        tmpDiv.appendChild(dietList);
        tmpDiv.appendChild(ingredientList);
        recipeResults === null || recipeResults === void 0 ? void 0 : recipeResults.appendChild(tmpDiv);
    });
}
fetchBtn === null || fetchBtn === void 0 ? void 0 : fetchBtn.addEventListener("click", function () {
    recipeResults.innerHTML = "";
    var apiString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=".concat(apiKey, "&cuisine=").concat(cuisineFilter(), "&type=").concat(mealTypeChoice, "&number=").concat(maxHits, "&addRecipeInformation=true");
    console.log(encodeURI(apiString));
    fetch(encodeURI(apiString))
        .then(function (response) { return response.json(); })
        .then(function (data) { return createRecipes(data.results); });
});
mealDiv === null || mealDiv === void 0 ? void 0 : mealDiv.addEventListener("click", function (event) {
    var btnInfo = event.target;
    if (btnInfo.nodeName == "BUTTON") {
        if (btnInfo.innerText == "Clear") {
            selectedMeal.innerText = "";
        }
        else {
            mealTypeChoice = btnInfo.innerText.toLowerCase();
            selectedMeal.innerText = btnInfo.innerText.toLowerCase();
        }
    }
});
cuisineDiv === null || cuisineDiv === void 0 ? void 0 : cuisineDiv.addEventListener("click", function (event) {
    var btnInfo = event.target;
    if (btnInfo.nodeName == "BUTTON") {
        if (btnInfo.innerText == "Clear") {
            cuisineChoices.length = 0;
        }
        else {
            if (!cuisineChoices.includes(btnInfo.innerText.toLowerCase())) {
                cuisineChoices.push(btnInfo.innerText.toLowerCase());
            }
            else {
                cuisineChoices.splice(cuisineChoices.indexOf(btnInfo.innerText.toLowerCase()), 1);
            }
        }
        selectedCuisines.innerText = cuisineFilter();
    }
});
mealTypes.forEach(function (meal, index) {
    var tmpBtn = document.createElement("button");
    tmpBtn.textContent = meal;
    tmpBtn.id = meal;
    tmpBtn.className = "btn btn-info";
    mealDiv.appendChild(tmpBtn);
    if (index + 1 == mealTypes.length) {
        var tmpBtn2 = document.createElement("button");
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-meal";
        tmpBtn2.className = "btn btn-danger";
        mealDiv.appendChild(tmpBtn2);
    }
});
cuisines.forEach(function (cuisine, index) {
    var tmpBtn = document.createElement("button");
    tmpBtn.textContent = cuisine;
    tmpBtn.id = cuisine;
    tmpBtn.className = "btn btn-info";
    cuisineDiv.appendChild(tmpBtn);
    if (index + 1 == cuisines.length) {
        var tmpBtn2 = document.createElement("button");
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-cuisine";
        tmpBtn2.className = "btn btn-danger";
        cuisineDiv.appendChild(tmpBtn2);
    }
});
function cuisineFilter() {
    var returnString = "";
    if (cuisineChoices.length <= 0) {
        return "";
    }
    else {
        if (cuisineChoices.length == 1) {
            return cuisineChoices[0];
        }
        else {
            cuisineChoices.forEach(function (item, index) {
                if (index + 1 < cuisineChoices.length) {
                    returnString += "".concat(item, ",");
                }
                else {
                    returnString += item;
                }
            });
            return returnString.toLowerCase();
        }
    }
}
