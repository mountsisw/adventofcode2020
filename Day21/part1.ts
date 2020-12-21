// @ts-check

import { doPart, PuzzlePart } from "../aocFW.js";

window.onload = function () { doPart(new PuzzleSolution()); };

class Food
{
    public ingredients: Array<string>;
    public allergins: Array<string>;
    constructor ()
    {
        this.ingredients = new Array();
        this.allergins = new Array();
    }
}

class Ingredient
{
    public allergins: Array<string>;
    constructor(public name: string)
    {
        this.allergins = new Array();
    }
}

class PuzzleSolution extends PuzzlePart
{
    private foods: Array<Food>;
    private ingredientsWithAllergins: Array<string>;

    // called after a file is selected, prior to processing
    public init(inputElement: HTMLDivElement, outputElement: HTMLDivElement, answerElement: HTMLDivElement)
    {
        super.init(inputElement, outputElement, answerElement);
        this.foods = new Array();
        this.ingredientsWithAllergins = new Array();
    }

    // called once per record (line) in the input file
    public processRecord(record: string) : Boolean
    {
        if (record.length > 0)
        {
            this.inputDisplay.innerText = record;
            let fields = record.split(" (contains ");
            let food = new Food();
            let names = fields[0].split(" ");
            names.forEach((value) => { food.ingredients.push(value); });
            names = fields[1].split(", ");
            names.forEach((value) =>
            {
                if (value.substr(value.length - 1, 1) == ")") value = value.substr(0, value.length - 1);
                food.allergins.push(value);
            });
            this.outputDisplay.innerText = String(food.ingredients.length) + " ingredients and " + 
                String(food.allergins.length) + " allergins";
            this.foods.push(food);
        }
        return true;
    }

    // called after all records are read in
    public displayAnswer()
    {
        let allerginFound: boolean;
        do {
            allerginFound = false;
            // easy case
            this.foods.forEach((food) => 
            {
                if (food.ingredients.length == 1 && food.allergins.length == 1)
                {
                    this.recordAllergin(food.ingredients[0], food.allergins[0]);
                    allerginFound = true;
                }
            });
            // only choice across two items
            if (allerginFound == false)
            {
                for (let loop1 = 0; loop1 < this.foods.length; loop1++)
                {
                    let firstFood = this.foods[loop1];
                    for (let loop2 = 0; loop2 < firstFood.allergins.length; loop2++)
                    {
                        let suspectAllergin = firstFood.allergins[loop2];
                        let suspectIngredients = firstFood.ingredients.concat();
                        for (let loop3 = loop1 + 1; loop3 < this.foods.length; loop3++)
                        {
                            let secondFood = this.foods[loop3];
                            if (secondFood.allergins.includes(suspectAllergin))
                            {
                                suspectIngredients = suspectIngredients.filter(value => secondFood.ingredients.includes(value));
                                if (suspectIngredients.length == 1)
                                {
                                    this.recordAllergin(suspectIngredients[0], suspectAllergin);
                                    allerginFound = true;
                                }
                            }
                            if (allerginFound) break;
                        }
                        if (allerginFound) break;
                    }
                    if (allerginFound) break;
                }
            }
            // build inverse tree
            if (allerginFound == false)
            {

            }
        } while (allerginFound == true);
        let allowedIngredients = new Array();
        this.foods.forEach((food) => 
        {
            if (food.allergins.length == 0) allowedIngredients = allowedIngredients.concat(food.ingredients);
        });
        this.answerDisplay.innerText = "Cleared ingredients appear " + allowedIngredients.length + " times";
    }

    private recordAllergin(ingredientName: string, allerginName: string)
    {
        this.foods.forEach((food) => 
        {
            if (food.ingredients.includes(ingredientName))
                food.ingredients.splice(food.ingredients.indexOf(ingredientName), 1);
            if (food.allergins.includes(allerginName))
                food.allergins.splice(food.allergins.indexOf(allerginName), 1);
        });
        this.ingredientsWithAllergins.push(ingredientName);
    }
}