//#region **** Settings ****
let apiKey: string | null = localStorage.getItem("apiKey");
const maxHits: number = 2;
const randomHits: number = 2;
const tvmhHits: number = 2;
//#endregion

//#region /////////////////////////////////|   INTERFACES   |/////////////////////////////////

//Main Recipe interface
interface Recipe  {
    id: number;

    title: string;
    summary: string;
    image: string;

    readyInMinutes: number;
    servings: number;

    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;

    cuisines: string[];
    dishTypes: string[];
    diets: string[];

    analyzedInstructions: string[];
}

//TVMH result recipe interface
interface RecipeTVMH {
    id: number;

    title: string;
    image: string;

    missedIngredientCount: number;
    missedIngredients: string[];

    usedIngredientCount: number;
    usedIngredients: string[];

    unusedIngredients: string[];
}
//#endregion


//#region /////////////////////////////////|   STORE API-KEY   |/////////////////////////////////

const inputField: HTMLElement | null = document.getElementById("apiKey-input");
const submitBtn: HTMLElement | null = document.getElementById("submitKey");
const displayKeyP: HTMLElement | null = document.getElementById("savedKey-p");

if(apiKey != null){
    displayKeyP!.innerHTML = apiKey;
}

submitBtn?.addEventListener("click", () => {
    //@ts-ignore
    const textInput: string | undefined = inputField?.value;

    if(textInput!.length > 0){
        localStorage.setItem("apiKey", textInput!)
        apiKey = localStorage.getItem("apiKey");
        //@ts-ignore
        displayKeyP!.innerHTML = apiKey;
        //@ts-ignore
        inputField!.value = "";
    }
    
    //@ts-ignore
    inputField!.value = "";
})

//#endregion


//#region /////////////////////////////////|   SEARCH INGREDIENTS   |/////////////////////////////////

let ingredientArray: string[] = [];
let ingredientChoices: string[] = [];
const clearIngredients = document.querySelector(".clear-ingredients");
const selectedIngredients = document.getElementById("selectedIngredients");

fetch('./commonIngredients.csv')
    .then((rawData) => rawData.text())
    .then((data) => {
        const ingrArr: string[] = data.split('\r\n');
        ingredientArray = ingrArr;
    });

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper?.querySelector("input");
const suggBox = searchWrapper?.querySelector(".autocom-box");

inputBox!.onkeyup = (event) => {
    //@ts-ignore
    let userData = event.target.value;
    let emptyArray: string[] = [];

    if(userData){
        emptyArray = ingredientArray.filter((data) => {
            return data.toLowerCase().startsWith(userData.toLowerCase());
        });
        emptyArray = emptyArray.map((data) => {
            return `<li>${data.toLowerCase()}</li>`;
        });

        searchWrapper?.classList.add("active");
        showSuggestions(emptyArray);

        let allList: NodeListOf<HTMLLIElement> | undefined = suggBox?.querySelectorAll("li");
        for(let i = 0; i < allList!.length; i++){
            allList![i].setAttribute("onClick", "selectFromList(this)");
        }

    } else{
        searchWrapper?.classList.remove("active");
    }
}

suggBox?.addEventListener("click", () => {
    suggBox.innerHTML = "";
    inputBox!.value = "";
})

clearIngredients?.addEventListener("click", () => {
    ingredientChoices.length = 0;
    selectedIngredients!.innerText = "";
})

function selectFromList(element: HTMLLIElement){
    let selectUserData: string | null = element.textContent;

    if(!ingredientChoices.includes(selectUserData!.toLowerCase())){
        ingredientChoices.push(selectUserData!.toLowerCase());
    } else{
        ingredientChoices.splice(ingredientChoices.indexOf(selectUserData!.toLowerCase()), 1)
    }

    selectedIngredients!.innerText = selectionFilter(ingredientChoices);
}

function showSuggestions(list: string[]){
    let listData;
    if(!list.length){
        listData = "";
    } else{
        listData = list.join('');
    }
    //@ts-ignore
    suggBox.innerHTML = listData;
}
//#endregion


//#region /////////////////////////////////|   FILTER BUTTONS CREATED HERE   |/////////////////////////////////

// Array containing all filters we want to have.
const mealTypes: string[] = [
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
const cuisines: string[] = [
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
const intolerances: string[] = [
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
]
const diets: string[] = [
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
]

// Create objects representing the DIV elements in the HTML code.
const mealDiv: HTMLElement | null = document.getElementById("mealTypes");
const cuisineDiv: HTMLElement | null = document.getElementById("cuisineTypes");
const intoleranceDiv: HTMLElement | null = document.getElementById("intoleranceTypes");
const dietDiv: HTMLElement | null = document.getElementById("dietTypes");

//Creates filter buttons for all meal types and appends them to selected div.
mealTypes.forEach((meal: string, index: number) => {
    const tmpBtn = document.createElement("button");

    tmpBtn.textContent = meal;
    tmpBtn.id = meal;
    tmpBtn.className = "btn btn-info";
    mealDiv!.appendChild(tmpBtn);

    if(index + 1 == mealTypes.length){
        const tmpBtn2 = document.createElement("button");
        
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-meal";
        tmpBtn2.className = "btn btn-danger";
        mealDiv!.appendChild(tmpBtn2);
    }
})

//Creates filter buttons for all cuisines and appends them to selected div.
cuisines.forEach((cuisine: string, index: number) => {
    const tmpBtn = document.createElement("button");

    tmpBtn.textContent = cuisine;
    tmpBtn.id = cuisine;
    tmpBtn.className = "btn btn-info";
    cuisineDiv!.appendChild(tmpBtn);

    if(index + 1 == cuisines.length){
        const tmpBtn2 = document.createElement("button");
        
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-cuisine";
        tmpBtn2.className = "btn btn-danger";
        cuisineDiv!.appendChild(tmpBtn2);
    }
})

intolerances.forEach((intolerance: string, index: number) => {
    const tmpBtn = document.createElement("button");

    tmpBtn.textContent = intolerance;
    tmpBtn.id = intolerance;
    tmpBtn.className = "btn btn-info";
    intoleranceDiv!.appendChild(tmpBtn);

    if(index + 1 == intolerances.length){
        const tmpBtn2 = document.createElement("button");
        
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-intolerance";
        tmpBtn2.className = "btn btn-danger";
        intoleranceDiv!.appendChild(tmpBtn2);
    }
})

diets.forEach((diet: string, index: number) => {
    const tmpBtn = document.createElement("button");

    tmpBtn.textContent = diet;
    tmpBtn.id = diet;
    tmpBtn.className = "btn btn-info";
    dietDiv!.appendChild(tmpBtn);

    if(index + 1 == diets.length){
        const tmpBtn2 = document.createElement("button");
        
        tmpBtn2.textContent = "Clear";
        tmpBtn2.id = "clear-diet";
        tmpBtn2.className = "btn btn-danger";
        dietDiv!.appendChild(tmpBtn2);
    }
})
//#endregion


//#region /////////////////////////////////|   EVENT LISTENERS HERE   |/////////////////////////////////
// Variable where data is stored before it is passed to HTML elements.
let cuisineChoices: string[] = [];
let intoleranceChoices: string[] = [];
let dietChoices: string[] = [];
let mealTypeChoice: string = "";

// HTML element to where the values are stored when we click the filter buttons.
const selectedMeal: HTMLElement | null = document.getElementById("selectedMeal");
const selectedCuisines: HTMLElement | null = document.getElementById("selectedCuisines");
const selectedIntolerances: HTMLElement | null = document.getElementById("selectedIntolerances");
const selectedDiets: HTMLElement | null = document.getElementById("selectedDiets");

// Buttons which will call the API with all selected filter parameters.
const fetchBtn: HTMLElement | null = document.getElementById("call-api-btn");
const randomBtn: HTMLElement | null = document.getElementById("get-random-recipe");
const tvmhBtn: HTMLElement | null = document.getElementById("get-tvmh-recipe");

// HTML element where all recipes are appended, fetch button also clear previous results.
const recipeResults: HTMLElement | null = document.getElementById("recipe-results");

// Event listener that looks for clicks in the entire meal div = all the buttons.
mealDiv?.addEventListener("click", (event) => {

    const btnInfo: HTMLButtonElement = (event.target as HTMLButtonElement);

    if (btnInfo.nodeName == "BUTTON"){
        if(btnInfo.innerText == "Clear"){
            selectedMeal!.innerText = "";
            mealTypeChoice = "";
        } else{
            mealTypeChoice = btnInfo.innerText.toLowerCase();
            selectedMeal!.innerText = btnInfo.innerText.toLowerCase();
        }
    }
})

// Event listener that looks for clicks in the entire cuisine div = all the buttons.
cuisineDiv?.addEventListener("click", (event) => {
    const btnInfo: HTMLButtonElement = (event.target as HTMLButtonElement);

    if (btnInfo.nodeName == "BUTTON"){
        if(btnInfo.innerText == "Clear"){
            cuisineChoices.length = 0;
        } else {
            if(!cuisineChoices.includes(btnInfo.innerText.toLowerCase())){
                cuisineChoices.push(btnInfo.innerText.toLowerCase());
            } else{
                cuisineChoices.splice(cuisineChoices.indexOf(btnInfo.innerText.toLowerCase()), 1)
            }
        }

        selectedCuisines!.innerText = selectionFilter(cuisineChoices);
    }
})

// Event listener that looks for clicks in the entire intolerance div = all the buttons.
intoleranceDiv?.addEventListener("click", (event) => {
    const btnInfo: HTMLButtonElement = (event.target as HTMLButtonElement);

    if (btnInfo.nodeName == "BUTTON"){
        if(btnInfo.innerText == "Clear"){
            intoleranceChoices.length = 0;
        } else {
            if(!intoleranceChoices.includes(btnInfo.innerText.toLowerCase())){
                intoleranceChoices.push(btnInfo.innerText.toLowerCase());
            } else{
                intoleranceChoices.splice(intoleranceChoices.indexOf(btnInfo.innerText.toLowerCase()), 1)
            }
        }

        selectedIntolerances!.innerText = selectionFilter(intoleranceChoices);
    }
})

// Event listener that looks for clicks in the entire diet div = all the buttons.
dietDiv?.addEventListener("click", (event) => {
    const btnInfo: HTMLButtonElement = (event.target as HTMLButtonElement);

    if (btnInfo.nodeName == "BUTTON"){
        if(btnInfo.innerText == "Clear"){
            dietChoices.length = 0;
        } else {
            if(!dietChoices.includes(btnInfo.innerText.toLowerCase())){
                dietChoices.push(btnInfo.innerText.toLowerCase());
            } else{
                dietChoices.splice(dietChoices.indexOf(btnInfo.innerText.toLowerCase()), 1)
            }
        }

        selectedDiets!.innerText = selectionFilter(dietChoices);
    }
})

// Event listener for the Fetch button, will create the URI for API call and receive data as JSON.
fetchBtn?.addEventListener("click", () => {

    recipeResults!.innerHTML = "";

    let apiString: string = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${mealTypeChoice}&cuisine=${selectionFilter(cuisineChoices)}&intolerance=${selectionFilter(intoleranceChoices)}&diet=${selectionFilter(dietChoices)}&number=${maxHits}&addRecipeInformation=true`;
    console.log(encodeURI(apiString))

    fetch(encodeURI(apiString))
        .then((response) => response.json())
        .then((data) => createRecipes(data.results))
        .catch(() => alert("Cannot connect, check your API key."))
})

tvmhBtn?.addEventListener("click", () => {

    recipeResults!.innerHTML = "";

    let apiString: string = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${selectionFilter(ingredientChoices)}&ranking=2&ignorePantry=true&number=${tvmhHits}`
    console.log(encodeURI(apiString))

    fetch(encodeURI(apiString))
        .then((response) => response.json())
        .then((data) => createTVMHResults(data))
        .catch(() => alert("Cannot connect, check your API key."))

})

// Event listener for the Random button, will create the URI for API call and receive data as JSON.
randomBtn?.addEventListener("click", () => {
    recipeResults!.innerHTML = "";

    let apiString: string = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&tags=${getMealTypeByTime()}&number=${randomHits}`;
    console.log(encodeURI(apiString))

    fetch(encodeURI(apiString))
        .then((response) => response.json())
        .then((data) => createRecipes(data.recipes))
})


//#endregion


//#region /////////////////////////////////|   FUNCTIONS HERE   |/////////////////////////////////

// Takes all cuisine choices from the source array and creates a string appropriate for the API URI.
function selectionFilter(inputArray: string[]){
    let returnString: string = "";

    if(inputArray.length <= 0){
        return "";
    } else{
        if(inputArray.length == 1){
            return inputArray[0];
        } else{
            inputArray.forEach((item: string, index: number) => {
                if(index + 1 < inputArray.length){
                    returnString += `${item},`;
                } else{
                    returnString += item;
                }
            });

            return returnString.toLowerCase();
        }
    }
}

function getMealTypeByTime(){

    const date: Date = new Date();
    const hours: number = date.getHours();

    if(hours > 3 && hours < 11){
        return "breakfast";
    } else if(hours > 10 && hours < 16){
        return "lunch";
    } else if(hours > 15 && hours < 23){
        return "dinner";
    } else{
        return "snack";
    }
}

function fetchTimeout(time: number){
    let controller: AbortController = new AbortController();
    setTimeout(() => controller.abort(), time * 1000);
    return controller;
}

// Receives JSON data from fetch event handler and creates HTML objects of recipes and appends to the HTML.
function createRecipes(apiData: Recipe[]){

    apiData.forEach((recipe) => {
        const tmpDiv = document.createElement("div");
        const title = document.createElement("h5");
        title.innerHTML = `${recipe.title}<br>ID: ${recipe.id}`

        const summary = document.createElement("p");
        summary.innerHTML = recipe.summary.substring(0, 300) + "....";

        const ready = document.createElement("p");
        ready.innerHTML = "<b>Ready in minutes:</b> " + recipe.readyInMinutes.toString();
        ready.className = "ready-p";

        const image = document.createElement("img");
        image.src = recipe.image;

        const list = document.createElement("ul");

        const vegetarian = document.createElement("li");
        vegetarian.innerText = recipe.vegetarian ? "Vegeterian: Yes" : "Vegeterian: No";
        vegetarian.className = recipe.vegetarian ? "true-green" : "false-red";

        const vegan = document.createElement("li");
        vegan.innerText = recipe.vegan ? "Vegan: Yes" : "Vegan: No";
        vegan.className = recipe.vegan ? "true-green" : "false-red";

        const glutenFree = document.createElement("li");
        glutenFree.innerText = recipe.glutenFree ? "Gluten Free: Yes" : "Gluten Free: No";
        glutenFree.className = recipe.glutenFree ? "true-green" : "false-red";

        const dairyFree = document.createElement("li");
        dairyFree.innerText = recipe.dairyFree ? "Dairy Free: Yes" : "Dairy Free: No";
        dairyFree.className = recipe.dairyFree ? "true-green" : "false-red";

        let mealTypes: string = "<b>Meal types:</b> ";
        let cuisines: string = "<b>Cuisines:</b> ";
        let diets: string = "<b>Diets:</b> ";

        recipe.dishTypes.forEach((dish: string, index: number) =>{
            mealTypes += dish.charAt(0).toUpperCase() + dish.slice(1);

            if(index + 1 < recipe.dishTypes.length){
                mealTypes += ", ";
            }
        })

        recipe.cuisines.forEach((cuisine: string, index: number) => {
            cuisines += cuisine.charAt(0).toUpperCase() + cuisine.slice(1);

            if(index + 1 < recipe.cuisines.length){
                cuisines += ", ";
            }
        })

        recipe.diets.forEach((diet: string, index: number) => {
            diets += diet.charAt(0).toUpperCase() + diet.slice(1);

            if(index + 1 < recipe.diets.length){
                diets += ", ";
            }
        })

        let ingredients: string = "<b>Ingredients:</b><br>";

        
        recipe.analyzedInstructions.forEach((item) => {
            //@ts-ignore
            item.steps.forEach((step) => {
                //@ts-ignore
                step.ingredients.forEach((ingr, index: number) => {
                    if(ingr.name.length > 0){
                        ingredients += ingr.name.charAt(0).toUpperCase() + ingr.name.slice(1) + ", ";
                    }
                    
                })
            })
        })

        ingredients = ingredients.substring(0, ingredients.length - 2);

        const dishTypes = document.createElement("p");
        dishTypes.innerHTML = mealTypes;
        dishTypes.className = "p-types";

        const cuisineList = document.createElement("p");
        cuisineList.innerHTML = cuisines;
        cuisineList.className = "p-types";

        const dietList = document.createElement("p");
        dietList.innerHTML = diets;
        dietList.className = "p-types";

        const ingredientList = document.createElement("p");
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
        recipeResults?.appendChild(tmpDiv);
    })
}

function createTVMHResults(apiData: RecipeTVMH[]){
    console.log(apiData);

    apiData.forEach((recipe) => {

        let missedIngredients: string = "";
        let usedIngredients: string = "";
        let unusedIngredients: string = "";

        const tmpDiv = document.createElement("div");
        const title = document.createElement("h5");
        title.innerHTML = `${recipe.title}<br>ID: ${recipe.id}`

        const image = document.createElement("img");
        image.src = recipe.image;

        const noMissedIngr = document.createElement("h6");
        noMissedIngr.className = "ingr-h6";
        noMissedIngr.innerHTML = `Missed ingredients: ${recipe.missedIngredientCount}`;

        recipe.missedIngredients.forEach((ingredient: string, index: number) => {
            //@ts-ignore
            if(ingredient.name.includes("*")){
                //@ts-ignore
                const tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                missedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);

            } else{
                //@ts-ignore
                missedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }

            if(index + 1 < recipe.missedIngredients.length){
                missedIngredients += ", ";
            }
        })

        const noUsedIngr = document.createElement("h6");
        noUsedIngr.className = "ingr-h6";
        noUsedIngr.innerHTML = `Used ingredients: ${recipe.usedIngredientCount}`;

        recipe.usedIngredients.forEach((ingredient: string, index: number) => {
            //@ts-ignore
            if(ingredient.name.includes("*")){
                //@ts-ignore
                const tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                usedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);

            } else{
                //@ts-ignore
                usedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }

            if(index + 1 < recipe.usedIngredients.length){
                usedIngredients += ", ";
            }
        })

        const noUnusedIngr = document.createElement("h6");
        noUnusedIngr.className = "ingr-h6";
        noUnusedIngr.innerHTML = `Unused ingredients: ${recipe.unusedIngredients.length}`;

        recipe.unusedIngredients.forEach((ingredient: string, index: number) => {
            //@ts-ignore
            if(ingredient.name.includes("*")){
                //@ts-ignore
                const tmpIngredient = ingredient.name.substring(0, ingredient.name.indexOf("*") - 1);
                unusedIngredients += tmpIngredient.charAt(0).toUpperCase() + tmpIngredient.slice(1);

            } else{
                //@ts-ignore
                unusedIngredients += ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
            }

            if(index + 1 < recipe.usedIngredients.length){
                unusedIngredients += ", ";
            }
        })

        const missedIngredientsList = document.createElement("p");
        missedIngredientsList.innerHTML = missedIngredients;
        missedIngredientsList.className = "p-types";

        const usedIngredientsList = document.createElement("p");
        usedIngredientsList.innerHTML = usedIngredients;
        usedIngredientsList.className = "p-types";

        const unusedIngredientsList = document.createElement("p");
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
        recipeResults?.appendChild(tmpDiv);
    })
}
//#endregion

















