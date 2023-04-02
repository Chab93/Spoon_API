//#region **** Settings ****
var apiKey = localStorage.getItem("apiKey");
var maxHits = 2;
var randomHits = 2;
var tvmhHits = 2;
var addRecipeNutrition = true;
//#endregion
//#region /////////////////////////////////|   STORE API-KEY   |/////////////////////////////////
var inputField = document.getElementById("apiKey-input");
var submitBtn = document.getElementById("submitKey");
var displayKeyP = document.getElementById("savedKey-p");
if (apiKey != null) {
    displayKeyP.innerHTML = apiKey;
}
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function () {
    //@ts-ignore
    var textInput = inputField === null || inputField === void 0 ? void 0 : inputField.value;
    if (textInput.length > 0) {
        localStorage.setItem("apiKey", textInput);
        apiKey = localStorage.getItem("apiKey");
        //@ts-ignore
        displayKeyP.innerHTML = apiKey;
        //@ts-ignore
        inputField.value = "";
    }
    //@ts-ignore
    inputField.value = "";
});
//#endregion
//#region /////////////////////////////////|   SEARCH INGREDIENTS   |/////////////////////////////////
var ingredientArray = [];
var ingredientChoices = [];
var clearIngredients = document.querySelector(".clear-ingredients");
var selectedIngredients = document.getElementById("selectedIngredients");
fetch('./commonIngredients.csv')
    .then(function (rawData) { return rawData.text(); })
    .then(function (data) {
    var ingrArr = data.split('\r\n');
    ingredientArray = ingrArr;
});
var searchWrapper = document.querySelector(".search-input");
var inputBox = searchWrapper === null || searchWrapper === void 0 ? void 0 : searchWrapper.querySelector("input");
var suggBox = searchWrapper === null || searchWrapper === void 0 ? void 0 : searchWrapper.querySelector(".autocom-box");
inputBox.onkeyup = function (event) {
    //@ts-ignore
    var userData = event.target.value;
    var emptyArray = [];
    if (userData) {
        emptyArray = ingredientArray.filter(function (data) {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
        emptyArray = emptyArray.map(function (data) {
            return "<li>".concat(data.toLowerCase(), "</li>");
        });
        searchWrapper === null || searchWrapper === void 0 ? void 0 : searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
        var allList = suggBox === null || suggBox === void 0 ? void 0 : suggBox.querySelectorAll("li");
        for (var i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onClick", "selectFromList(this)");
        }
    }
    else {
        searchWrapper === null || searchWrapper === void 0 ? void 0 : searchWrapper.classList.remove("active");
    }
};
suggBox === null || suggBox === void 0 ? void 0 : suggBox.addEventListener("click", function () {
    suggBox.innerHTML = "";
    inputBox.value = "";
});
clearIngredients === null || clearIngredients === void 0 ? void 0 : clearIngredients.addEventListener("click", function () {
    ingredientChoices.length = 0;
    selectedIngredients.innerText = "";
});
function selectFromList(element) {
    var selectUserData = element.textContent;
    if (!ingredientChoices.includes(selectUserData.toLowerCase())) {
        ingredientChoices.push(selectUserData.toLowerCase());
    }
    else {
        ingredientChoices.splice(ingredientChoices.indexOf(selectUserData.toLowerCase()), 1);
    }
    selectedIngredients.innerText = selectionFilter(ingredientChoices);
}
function showSuggestions(list) {
    var listData;
    if (!list.length) {
        listData = "";
    }
    else {
        listData = list.join('');
    }
    //@ts-ignore
    suggBox.innerHTML = listData;
}
//#endregion
//#region /////////////////////////////////|   FILTER BUTTONS CREATED HERE   |/////////////////////////////////
// Array containing all filters we want to have.
var mealTypes = [
    "Main Course",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Side Dish",
    "Dessert",
    "Appetizer",
    "Salad",
    "Bread",
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
var intolerances = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat"
];
var diets = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Low FODMAP",
    "Whole30"
];
// Create objects representing the DIV elements in the HTML code.
var mealDiv = document.getElementById("mealTypes");
var cuisineDiv = document.getElementById("cuisineTypes");
var intoleranceDiv = document.getElementById("intoleranceTypes");
var dietDiv = document.getElementById("dietTypes");
//Creates filter buttons for all meal types and appends them to selected div.
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
//Creates filter buttons for all cuisines and appends them to selected div.
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
intolerances.forEach(function (intolerance, index) {
    var tmpBtn = document.createElement("button");
    tmpBtn.textContent = intolerance;
    tmpBtn.id = intolerance;
    tmpBtn.className = "btn btn-info";
    intoleranceDiv.appendChild(tmpBtn);
    if (index + 1 == intolerances.length) {
        var tmpBtn2 = document.createElement("button");
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-intolerance";
        tmpBtn2.className = "btn btn-danger";
        intoleranceDiv.appendChild(tmpBtn2);
    }
});
diets.forEach(function (diet, index) {
    var tmpBtn = document.createElement("button");
    tmpBtn.textContent = diet;
    tmpBtn.id = diet;
    tmpBtn.className = "btn btn-info";
    dietDiv.appendChild(tmpBtn);
    if (index + 1 == diets.length) {
        var tmpBtn2 = document.createElement("button");
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-diet";
        tmpBtn2.className = "btn btn-danger";
        dietDiv.appendChild(tmpBtn2);
    }
});
//#endregion
//#region /////////////////////////////////|   EVENT LISTENERS HERE   |/////////////////////////////////
// Variable where data is stored before it is passed to HTML elements.
var cuisineChoices = [];
var intoleranceChoices = [];
var dietChoices = [];
var mealTypeChoice = "";
// HTML element to where the values are stored when we click the filter buttons.
var selectedMeal = document.getElementById("selectedMeal");
var selectedCuisines = document.getElementById("selectedCuisines");
var selectedIntolerances = document.getElementById("selectedIntolerances");
var selectedDiets = document.getElementById("selectedDiets");
// Buttons which will call the API with all selected filter parameters.
var fetchBtn = document.getElementById("call-api-btn");
var randomBtn = document.getElementById("get-random-recipe");
var tvmhBtn = document.getElementById("get-tvmh-recipe");
// HTML element where all recipes are appended, fetch button also clear previous results.
var recipeResults = document.getElementById("recipe-results");
// Event listener that looks for clicks in the entire meal div = all the buttons.
mealDiv === null || mealDiv === void 0 ? void 0 : mealDiv.addEventListener("click", function (event) {
    var btnInfo = event.target;
    if (btnInfo.nodeName == "BUTTON") {
        if (btnInfo.innerText == "Clear") {
            selectedMeal.innerText = "";
            mealTypeChoice = "";
        }
        else {
            mealTypeChoice = btnInfo.innerText.toLowerCase();
            selectedMeal.innerText = btnInfo.innerText.toLowerCase();
        }
    }
});
// Event listener that looks for clicks in the entire cuisine div = all the buttons.
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
        selectedCuisines.innerText = selectionFilter(cuisineChoices);
    }
});
// Event listener that looks for clicks in the entire intolerance div = all the buttons.
intoleranceDiv === null || intoleranceDiv === void 0 ? void 0 : intoleranceDiv.addEventListener("click", function (event) {
    var btnInfo = event.target;
    if (btnInfo.nodeName == "BUTTON") {
        if (btnInfo.innerText == "Clear") {
            intoleranceChoices.length = 0;
        }
        else {
            if (!intoleranceChoices.includes(btnInfo.innerText.toLowerCase())) {
                intoleranceChoices.push(btnInfo.innerText.toLowerCase());
            }
            else {
                intoleranceChoices.splice(intoleranceChoices.indexOf(btnInfo.innerText.toLowerCase()), 1);
            }
        }
        selectedIntolerances.innerText = selectionFilter(intoleranceChoices);
    }
});
// Event listener that looks for clicks in the entire diet div = all the buttons.
dietDiv === null || dietDiv === void 0 ? void 0 : dietDiv.addEventListener("click", function (event) {
    var btnInfo = event.target;
    if (btnInfo.nodeName == "BUTTON") {
        if (btnInfo.innerText == "Clear") {
            dietChoices.length = 0;
        }
        else {
            if (!dietChoices.includes(btnInfo.innerText.toLowerCase())) {
                dietChoices.push(btnInfo.innerText.toLowerCase());
            }
            else {
                dietChoices.splice(dietChoices.indexOf(btnInfo.innerText.toLowerCase()), 1);
            }
        }
        selectedDiets.innerText = selectionFilter(dietChoices);
    }
});
// Event listener for the Fetch button, will create the URI for API call and receive data as JSON.
fetchBtn === null || fetchBtn === void 0 ? void 0 : fetchBtn.addEventListener("click", function () {
    recipeResults.innerHTML = "";
    var apiString = "https://api.spoonacular.com/recipes/complexSearch?apiKey=".concat(apiKey, "&type=").concat(mealTypeChoice, "&cuisine=").concat(selectionFilter(cuisineChoices), "&intolerance=").concat(selectionFilter(intoleranceChoices), "&diet=").concat(selectionFilter(dietChoices), "&number=").concat(maxHits, "&addRecipeInformation=true&addRecipeNutrition=").concat(addRecipeNutrition);
    console.log(encodeURI(apiString));
    fetch(encodeURI(apiString))
        .then(function (response) { return response.json(); })
        .then(function (data) { return createRecipes(data.results, addRecipeNutrition); })
        .catch(function () { return alert("Cannot connect, check your API key."); });
});
tvmhBtn === null || tvmhBtn === void 0 ? void 0 : tvmhBtn.addEventListener("click", function () {
    recipeResults.innerHTML = "";
    var apiString = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=".concat(apiKey, "&ingredients=").concat(selectionFilter(ingredientChoices), "&ranking=2&ignorePantry=true&number=").concat(tvmhHits);
    console.log(encodeURI(apiString));
    fetch(encodeURI(apiString))
        .then(function (response) { return response.json(); })
        .then(function (data) { return createTVMHResults(data); })
        .catch(function () { return alert("Cannot connect, check your API key."); });
});
// Event listener for the Random button, will create the URI for API call and receive data as JSON.
randomBtn === null || randomBtn === void 0 ? void 0 : randomBtn.addEventListener("click", function () {
    recipeResults.innerHTML = "";
    var apiString = "https://api.spoonacular.com/recipes/random?apiKey=".concat(apiKey, "&tags=").concat(getMealTypeByTime(), "&number=").concat(randomHits);
    console.log(encodeURI(apiString));
    fetch(encodeURI(apiString))
        .then(function (response) { return response.json(); })
        .then(function (data) { return createRecipes(data.recipes, false); });
});
//#endregion
//#region /////////////////////////////////|   FUNCTIONS HERE   |/////////////////////////////////
// Takes all cuisine choices from the source array and creates a string appropriate for the API URI.
function selectionFilter(inputArray) {
    var returnString = "";
    if (inputArray.length <= 0) {
        return "";
    }
    else {
        if (inputArray.length == 1) {
            return inputArray[0];
        }
        else {
            inputArray.forEach(function (item, index) {
                if (index + 1 < inputArray.length) {
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
function getMealTypeByTime() {
    var date = new Date();
    var hours = date.getHours();
    if (hours > 3 && hours < 11) {
        return "breakfast";
    }
    else if (hours > 10 && hours < 16) {
        return "lunch";
    }
    else if (hours > 15 && hours < 23) {
        return "dinner";
    }
    else {
        return "snack";
    }
}
function fetchTimeout(time) {
    var controller = new AbortController();
    setTimeout(function () { return controller.abort(); }, time * 1000);
    return controller;
}
// Receives JSON data from fetch event handler and creates HTML objects of recipes and appends to the HTML.
function createRecipes(apiData, nutrients) {
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
                step.ingredients.forEach(function (ingr) {
                    if (ingr.name.length > 0) {
                        ingredients += ingr.name.charAt(0).toUpperCase() + ingr.name.slice(1) + ", ";
                    }
                });
            });
        });
        ingredients = ingredients.substring(0, ingredients.length - 2);
        var steps = "<b>Instructions:</b><br>";
        recipe.analyzedInstructions.forEach(function (item) {
            //@ts-ignore
            item.steps.forEach(function (step, index) {
                //@ts-ignore
                steps += "<b>Step: ".concat(step.number, "</b><br><i>").concat(step.step, "</i>");
                //@ts-ignore
                if (index + 1 < item.steps.length) {
                    steps += "<br><br>";
                }
            });
        });
        if (nutrients) {
            //@ts-ignore
            recipe.nutrition.nutrients.forEach(function (item) {
                console.log(item.name + " | " + item.amount + " " + item.unit);
            });
        }
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
        var instructions = document.createElement("p");
        instructions.innerHTML = steps;
        instructions.className = "p-instructions";
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
        tmpDiv.appendChild(instructions);
        recipeResults === null || recipeResults === void 0 ? void 0 : recipeResults.appendChild(tmpDiv);
    });
}
function createTVMHResults(apiData) {
    apiData.forEach(function (recipe) {
        var missedIngredients = "";
        var usedIngredients = "";
        var unusedIngredients = "";
        var tmpDiv = document.createElement("div");
        var title = document.createElement("h5");
        title.innerHTML = "".concat(recipe.title, "<br>ID: ").concat(recipe.id);
        var image = document.createElement("img");
        image.src = recipe.image;
        var noMissedIngr = document.createElement("h6");
        noMissedIngr.className = "ingr-h6";
        noMissedIngr.innerHTML = "Missed ingredients: ".concat(recipe.missedIngredientCount);
        recipe.missedIngredients.forEach(function (ingredient, index) {
            //@ts-ignore
            if (ingredient.name.includes("*")) {
                //@ts-ignore
                var tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                missedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);
            }
            else {
                //@ts-ignore
                missedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }
            if (index + 1 < recipe.missedIngredients.length) {
                missedIngredients += ", ";
            }
        });
        var noUsedIngr = document.createElement("h6");
        noUsedIngr.className = "ingr-h6";
        noUsedIngr.innerHTML = "Used ingredients: ".concat(recipe.usedIngredientCount);
        recipe.usedIngredients.forEach(function (ingredient, index) {
            //@ts-ignore
            if (ingredient.name.includes("*")) {
                //@ts-ignore
                var tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                usedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);
            }
            else {
                //@ts-ignore
                usedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }
            if (index + 1 < recipe.usedIngredients.length) {
                usedIngredients += ", ";
            }
        });
        var noUnusedIngr = document.createElement("h6");
        noUnusedIngr.className = "ingr-h6";
        noUnusedIngr.innerHTML = "Unused ingredients: ".concat(recipe.unusedIngredients.length);
        recipe.unusedIngredients.forEach(function (ingredient, index) {
            //@ts-ignore
            if (ingredient.name.includes("*")) {
                //@ts-ignore
                var tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                unusedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);
            }
            else {
                //@ts-ignore
                unusedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }
            if (index + 1 < recipe.unusedIngredients.length) {
                unusedIngredients += ", ";
            }
        });
        var missedIngredientsList = document.createElement("p");
        missedIngredientsList.innerHTML = missedIngredients;
        missedIngredientsList.className = "p-types";
        var usedIngredientsList = document.createElement("p");
        usedIngredientsList.innerHTML = usedIngredients;
        usedIngredientsList.className = "p-types";
        var unusedIngredientsList = document.createElement("p");
        unusedIngredientsList.innerHTML = unusedIngredients;
        unusedIngredientsList.classList.add("p-types", "unused-p");
        tmpDiv.appendChild(title);
        tmpDiv.appendChild(image);
        tmpDiv.appendChild(noMissedIngr);
        tmpDiv.appendChild(missedIngredientsList);
        tmpDiv.appendChild(noUsedIngr);
        tmpDiv.appendChild(usedIngredientsList);
        tmpDiv.appendChild(noUnusedIngr);
        tmpDiv.appendChild(unusedIngredientsList);
        recipeResults === null || recipeResults === void 0 ? void 0 : recipeResults.appendChild(tmpDiv);
    });
}
//#endregion
