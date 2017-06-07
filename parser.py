

# Plain text ingredients.txt => list of ingredients and times
def getIngredients():
    f = open("ingredients.txt", "r")
    ingredientList = []
    for l in f.readlines():
        temp = l.strip("\n")
        ingredient = temp.split(",")[0]
        time = temp.split(",")[1]
        ingredientList.append({"label":ingredient, "value":ingredient, "time":time})
    return ingredientList

# Sort ingredients by cook time
def sortIngredients(ingredients):
    sortedIngredients = {}
    onlyIngredients = []
    for l in ingredients:
        time = l["time"]
        ingredient = l["ingredient"]
        onlyIngredients.append(ingredient)
        if time not in sortedIngredients.keys():
            sortedIngredients[time] = [ingredient]
        else:
            sortedIngredients[time].append(ingredient)

    print onlyIngredients
    return sortedIngredients

allIngredients = getIngredients()
print allIngredients
print sortIngredients(allIngredients)
