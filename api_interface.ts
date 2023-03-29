// Interface defining all properties we want to access from the API.
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

export { Recipe };