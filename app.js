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
    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    
//// FUNCTION ////
    Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}
    function updateWeekDay(startNum){
        if(startNum < 6){
            startNum++;
        } else {
            startNum = 0;
        }
        
        return startNum;
    
    
    function shapeWeekLists(someArray, startDay, someLength){
        var tempArray = someArray;
        var remainder = tempArray.length % someLength;
        
        tempArray[0].splice(0, startDay);
        tempArray[(tempArray.length - 1)].splice(remainder);
        
        console.log(tempArray);
    };
    
    
    function writeCalendar(someYear, someMonth, mealsObj){
        var testDate = new Date(someYear, someMonth, 1);
        var monthLength = testDate.monthDays();
        var whichDay = testDate.getDay();
        
        var monthArray = [];
        var weekLists = [];
        
        for(var i = 0; i < monthLength; i++){
            var tempArray = [];
            
        tempArray = [weekdays[whichDay], mealsObj.breakfastOrder[i], mealsObj.lunchOrder[i], mealsObj.dinnerOrder[i]];
            
            monthArray.push(tempArray);
            
            if(whichDay === 0 || i === (monthLength - 1)){
                
                weekLists.push(mealsObj.weeklyLists[weekLists.length]);
            };
            
            whichDay = updateWeekDay(whichDay);
        }
        
        shapeWeekLists(mealsObj.weeklyLists, whichDay, monthLength);
        
        console.log(monthArray);
        console.log(weekLists);
        // calendar dates
    
        
        
        // meals per day
        
        
        // weekly food list
        
    };
    
    
    
    function generateMonth(howManyWks, recipesObj, someDateArray){
        
        var tempDate = new Date(someDateArray[0], someDateArray[1], 1);
        var startDay = tempDate.getDay();
        var monthLength = tempDate.monthDays();
        var remainder = monthLength % 7;
        
        
        
        var recipes = recipesObj;
        var weeks = [];
        console.log(howManyWks);
        var length = 7;
        // console.log(Object.values(recipes.breakfast));
        //1. Gen weeks for howManyWks
        for(var i = 0; i < 5; i++){                
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
                console.log(weeks);

        var tempNum = weeks.length;
         for(var i = 0; i < 3; i++){
             weeks[0][i].splice(0, startDay);
        weeks[(weeks.length - 1)][i].splice(remainder);
         };
        console.log(weeks);
             
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
        console.log(weekArray);
        return weekArray;
        
    };
    
return {
    generateMonth: generateMonth,
    writeCalendar: writeCalendar
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
        var dateNums= [2018, 0]
        var breakfastArray = dataCtrl.processrecipes(dataCtrl.recipes.breakfast);
        monthRecipes = calCtrl.generateMonth(2, dataCtrl.recipes, dateNums);
        var shoppingList = weeklyShoppingList(dateNums[0], dateNums[1]);
        calCtrl.writeCalendar(dateNums[0], dateNums[1], shoppingList);
    }
    
    function weeklyShoppingList(someYear, someMonth){
        var monthDate = new Date(someYear, someMonth, 1);
        var monthLength = monthDate.monthDays();
        
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
            
            
            cur[0].forEach(function(cur){
                breakfastOrder.push(cur[0]);
            });
            
            cur[1].forEach(function(cur){
                lunchOrder.push(cur[0]);
            });
            
            cur[2].forEach(function(cur){
                dinnerOrder.push(cur[0]);
            });
            
            weeklyLists.push(shoppingList);
            
        });
        
        var remainder = monthLength % 7;
        
        if(remainder !== 0){
            var cutoutNum = weeklyLists.length - remainder;
            weeklyLists[weeklyLists.length - 1].length = cutoutNum;
        }
        
        console.log(breakfastOrder);
        console.log(lunchOrder);
        console.log(dinnerOrder);
        console.log(weeklyLists);
        
        return {
            weeklyLists: weeklyLists,
            breakfastOrder: breakfastOrder,
            lunchOrder: lunchOrder,
            dinnerOrder: dinnerOrder
        }
    };
    
    function populateCal(){
        
    }
    
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

