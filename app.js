//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// DATA CONTROLLER >>>

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
var calendarController = (function(){
 
//// VARIABLES ////
    var mealSchedule = [];
    
    
    
    
//// FUNCTION ////
    function generateMonth(howManyWks, recipesObj){
        var recipes = recipesObj;
        var weeks = [];
        console.log(howManyWks);
        // console.log(Object.values(recipes.breakfast));
        //1. Gen weeks for howManyWks
        for(var i = 0; i < 4; i++){                
            //1. Gen Breakfast
        var breakfastObj =  recipes.breakfast;
        var breakfastArray = genWeek(breakfastObj);
                    
            //2. Gen Lunches
        var lunchObj = recipes.lunch;
        var lunchArray = genWeek(lunchObj);
                    
            //3. Gen dinners
        var dinnerObj = recipes.dinner;
        var dinnerArray = genWeek(dinnerObj);
            
            weeks.push([breakfastArray, lunchArray, dinnerArray]);
        };
        //2. push schedule to mealSchedule
        mealSchedule = weeks;
        console.log(mealSchedule);
        
        return weeks;
    };
    
    function genWeek(someObj){
        var weekArray = [];
                for(var i = 0; i < 7; i++){
                    
                   var tempRandom = (Math.round(Math.random()) * (someObj.length - 1))
                    weekArray.push(someObj[tempRandom]);
                   };
        return weekArray;
    };
    
return {
    generateMonth: generateMonth
}    
})();


var dataController = (function(){
    
    //// VARIABLES ////
    var recipes = {
        breakfast: [
            ['latkes',
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
            ['Oatmeal',
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
            ]
        ],
        lunch: [
            ['pollo',
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
            ['soup',
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
            ]
        ],
        dinner: [
            ['pasta',
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
            ['Moose',
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
            ]
        ]
        
    };
    
    var recipeQueue = [recipes.breakfast[0], recipes.breakfast[1], recipes.breakfast[0]];
    
   
    
    
    
    //// FUNCTIONS ////
    
 function processrecipes(recipeArray){
    var allIngredients = loadIngredients(recipeArray);
    var compiledIngredients = compileIngredients(allIngredients);
    
    var listArray = concatIngred(compiledIngredients);
        return listArray;
    };
    
    function loadIngredients(recipeArray){
        var returnArray = [];
        recipeArray.forEach(function(cur){
            var sliceArray = cur.slice(1);
                        
            sliceArray.forEach(function(cur){
                returnArray.push(cur);

            });
            });
return returnArray};
    
    function compileIngredients(someArray){
        var talliedIngredients = [];
        var returnArray = [];
        
        someArray.forEach(function(cur){
            // console.log(cur);
            var thisIngredient = cur[2];
            var howMany = 0;
            var tempMatch = false;
            var pushArray = '';
            
            if(!(talliedIngredients.includes(thisIngredient))){
                 someArray.forEach(function(cur){
              tempMatch = cur.includes(thisIngredient);
                if(tempMatch){
                    howMany++;
                    talliedIngredients.push(thisIngredient);
                   // console.log(thisIngredient);
                };
            });
                pushArray = [(cur[0] * howMany), cur[1], cur[2]];
            
            returnArray.push(pushArray);
            };
            
            
        });
        // console.log(talliedIngredients);
        // console.log(compiledIngredients);
        return returnArray
    };
    
    function concatIngred(someArray){
        var concatIngredList = [];
        someArray.forEach(function(cur){
            var tempString = (cur[0] + cur[1] + cur[2]);
            concatIngredList.push(tempString);
        });
        // console.log(concatIngredList);
        return concatIngredList;
    };
    

    
    return {
       processrecipes: processrecipes,
        recipes: recipes
    }
})();



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// UI CONTROLLER >>>

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var UIController = (function(){
    
    //// VARIABLES ////
    
    
    //// FUNCTIONS ////
    function listToArray(nodeList){
        var tempList, newArray;
        tempList = nodeList;
        newArray = [];
        console.log(newArray);
        
        for (i = 0; i < nodeList.length; i++){
            newArray[i] = nodeList[i];
        };
        return newArray;
    };
    
    return {
       
    }
})();



//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// APP CONTROLLER >>>

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var appController = (function(calCtrl, dataCtrl, UICtrl){
    
    //// VARIABLES ////
    var monthRecipes = [];
    
    //// FUNCTIONS ////
    function innit(){
        var breakfastArray = dataCtrl.processrecipes(dataCtrl.recipes.breakfast);
        monthRecipes = calCtrl.generateMonth(2, dataCtrl.recipes);
        weeklyShoppingList();
    }
    
    function weeklyShoppingList(){
        var weeklyLists = [];
        var breakfastOrder = [];
        var lunchOrder = [];
        var dinnerOrder = [];
        monthRecipes.forEach(function(cur, index){
            var ingredientList = [];
            var shoppingList = '';
            
            cur.forEach(function(cur){
                cur.forEach(function(cur){
                    ingredientList.push(cur);
            
                });
            });
            
            var shoppingList = dataCtrl.processrecipes(ingredientList);
            console.log(ingredientList);
            console.log(shoppingList);
            
            ingredientList = [];
            shoppingList = '';
            // console.log(shoppingList);
            
            cur[0].forEach(function(cur){
                breakfastOrder.push(cur[0]);
            });
            
            cur[1].forEach(function(cur){
                lunchOrder.push(cur[0]);
            });
            
            cur[2].forEach(function(cur){
                dinnerOrder.push(cur[0]);
            });
            
        });
        // console.log(breakfastOrder);
    };
    
    return {
       innit: innit
    }
})(calendarController, dataController, UIController);

appController.innit();







//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// CODE Tools >>>

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


//// XXXXXXXXXXX ////


// START... //// xxTITLExx xxDescriptionxx //////////////// M.M.

// ...END //// xxTITLExx xxDescriptionxx //////////////// M.M.

