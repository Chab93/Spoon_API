//Settings
const apiKey: string = "f4780df1170f41749bd24df676766198";
const maxHits: number = 2;

const mealTypes: string[] = [
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

let cuisineChoices: string[] = [];

let mealTypeChoice: string = "";

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

const mealDiv: HTMLElement | null = document.getElementById("mealTypes");
const selectedMeal: HTMLElement | null = document.getElementById("selectedMeal");

const cuisineDiv: HTMLElement | null = document.getElementById("cuisineTypes");
const selectedCuisines: HTMLElement | null = document.getElementById("selectedCuisines");

const fetchBtn: HTMLElement | null = document.getElementById("call-api-btn");

const recipeResults: HTMLElement | null = document.getElementById("recipe-results");



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

        console.log(ingredients);

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


fetchBtn?.addEventListener("click", () => {

    recipeResults!.innerHTML = "";

    let apiString: string = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${cuisineFilter()}&type=${mealTypeChoice}&number=${maxHits}&addRecipeInformation=true`;
    console.log(encodeURI(apiString))

    fetch(encodeURI(apiString))
        .then((response) => response.json())
        .then((data) => createRecipes(data.results))
})

mealDiv?.addEventListener("click", (event) => {

    const btnInfo: HTMLButtonElement = (event.target as HTMLButtonElement);

    if (btnInfo.nodeName == "BUTTON"){
        if(btnInfo.innerText == "Clear"){
            selectedMeal!.innerText = "";
        } else{
            mealTypeChoice = btnInfo.innerText.toLowerCase();
            selectedMeal!.innerText = btnInfo.innerText.toLowerCase();
        }
    } 
})

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

        selectedCuisines!.innerText = cuisineFilter();
    }
})

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


function cuisineFilter(){
    let returnString: string = "";

    if(cuisineChoices.length <= 0){
        return "";
    } else{
        if(cuisineChoices.length == 1){
            return cuisineChoices[0];
        } else{
            cuisineChoices.forEach((item: string, index: number) => {
                if(index + 1 < cuisineChoices.length){
                    returnString += `${item},`;
                } else{
                    returnString += item;
                }
            });

            return returnString.toLowerCase();
        }
    }
}
