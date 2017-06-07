window.onload = function() {

var punctuateList = function(ingredientList) {
    const period = ".";
    console.log(ingredientList);
    if (ingredientList.length > 2) {
      var list = "";
      var len = ingredientList.length;
      for (var i = 0; i < len - 2; i++) {
        list += ingredientList[i] + ", ";
      }
      list += ingredientList[len-2] + ", and " + ingredientList[len-1] + period;
      return list;
    }
    else { //change to switch case
      if (ingredientList.length == 1) {
        return ingredientList[0]+period;
      }
      if (ingredientList.length == 2) {
        return ingredientList[0] + " and " + ingredientList[1]+period;
      }
    }
  }

  var getInstruction = function(ingredientList, time) {
    ingredientString = punctuateList(ingredientList);
    var getSimmer = function(time) {
      return "Simmer "+time+ " minutes until tender.";
    }
    if (time == "0") {
      return "Stir in "+ingredientString;
    }
    if (time == "5") {
      return "Add "+ingredientString+" "+getSimmer(time);
    }
    if (time == "15") {
      return "Add "+ingredientString+" Add 2 cups of water. "+getSimmer(time);
    }
  }

  

  // make test case
  // console.log(punctuateList(["carrots"]));
  // console.log(punctuateList(["carrots", "celery"]));
  // console.log(punctuateList(["carrots", "celery", "potatoes"]));

  var getListItem = function(item) {
    return "<li>"+item+"</li>";
  }

  var clearInstructions = function() {
    let allInstructions = $("#instructionList").children();
    for (var i = 2; i < allInstructions.length; i++) {
      allInstructions[i].remove();
    }
  }
  var renderRecipe = function(recipe) {
    var recipe = recipe.getRecipe();
    clearInstructions();
    console.log(recipe);

    var times = [15, 5, 0];
    for(var i in times) {
      time = times[i];
      if(recipe[time]) {
        ingredients = recipe[time];
        newInstruction = getInstruction(ingredients, time);
        $("#instructionList").append(getListItem(newInstruction));
      }
    }
  }

  $("#ingredients").autocomplete({
    source: function(request, response) {
       $.ajax({
        url: "./ingredients.json",
        dataType: "json",
        data: {
          term: request.term
        },
        success: function(data) {
          var re = $.ui.autocomplete.escapeRegex(request.term);
          var matcher = new RegExp( re, "i" );
          var matches = $.grep(data, function(item){
            return matcher.test(item["label"]); 
          });
          response(matches);
        }
      });
    },
    minLength: 0, 
    select: function(event, ui) { 
      var newIngredient = ui.item.label;
      var cookTime = ui.item.time;
      recipe.addIngredient(newIngredient, cookTime);
      $("#ingredientList").append(getListItem(newIngredient));
      renderRecipe(recipe);
    }
  }); 
}