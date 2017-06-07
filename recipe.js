var recipe = new function() {
    var ingredientList = [];
    var instructionList = [];
    var cookTimes = {"0":[],"5":[],"15":[]};
    this.addInstruction = function(instruction) {
        instructionList.push(instruction);
    }

    this.getInstructions = function() {
        return instructionList;
    }

    this.addIngredient = function(ingredient, cookTime) {
        ingredientList.push(ingredient);

        cookTimes[cookTime].push(ingredient);
    }

    this.getRecipe = function() {
        var recipe = {}
        for(var i in cookTimes) {
            if (cookTimes[i].length > 0) {
                recipe[i] = cookTimes[i];
            }
        }
        return recipe;
    }
}