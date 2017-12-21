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
    }
    
    
   
    
    function writeCalendar(someYear, someMonth, mealsObj){
        var testDate = new Date(someYear, someMonth, 1);
        var monthLength = testDate.monthDays();
        var whichDay = testDate.getDay();
        
        var monthArray = [];
        var weekLists = [];
        
        for(var i = 0; i < mealsObj.breakfastOrder.length; i++){
            var tempArray = [];
            console.log(mealsObj.breakfastOrder);
            
        tempArray = [weekdays[whichDay], mealsObj.breakfastOrder[i], mealsObj.lunchOrder[i], mealsObj.dinnerOrder[i]];
            
            monthArray.push(tempArray);
            
            if(whichDay === 0){
                
                weekLists.push(mealsObj.weeklyLists[weekLists.length]);
            };
            
            whichDay = updateWeekDay(whichDay);
        };
                
        console.log(monthArray);
        console.log(weekLists);
        
        return{
            monthArray: monthArray,
            weekLists: weekLists
        };
        
    };
    
    
    
    function generateMonth(howManyWks, recipesObj, someDateArray){
        
        var tempDate = new Date(someDateArray[0], someDateArray[1], 1);
        var startDay = tempDate.getDay();
        var monthLength = tempDate.monthDays();
        var remainder = monthLength % 7;
        
        
        
        var recipes = recipesObj;
        var weeks = [];
        console.log(weeks);
        
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

        /* var tempNum = weeks.length;
         for(var i = 0; i < 3; i++){
             weeks[0][i].splice(0, startDay);
        weeks[(weeks.length - 1)][i].splice(remainder);
         };*/
             
   mealSchedule = weeks;
        
        
        return weeks;
    };
    
    function genWeek(someObj){
        var weekArray = [];
        var usedRecipes = [];
                for(var i = 0; i < 7; i = i + 0){
                    
                   var tempRandom = (Math.round(Math.random()) * (someObj.length - 1));
                    if(8 - i >= someObj[tempRandom][1]){
                       if(usedRecipes.includes(someObj[tempRandom][0]) && (someObj[tempRandom][1] > 3)){
                        break;
                    } else {
                        console.log(!usedRecipes.includes(someObj[tempRandom][0]));
                        usedRecipes.push(someObj[tempRandom][0]);
                        for(var a = 0; a < someObj[tempRandom][1]; a++){
                            if(i < 7){
                                weekArray.push(someObj[tempRandom]);
                                i++
                            }
                        };
                    }
                    } else {
                        console.log('Had ' + (7 - i) + ' days left and the meal served ' + someObj[tempRandom][1]);
                    };
                    console.log(i);
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
            ['latkes', 1,
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
            ['Oatmeal', 1,
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
            ]
        ],
        lunch: [
            ['pollo', 1,
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
            ['soup', 1,
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
            ]
        ],
        dinner: [
            ['Golden Cauliflower Cream Soup', 3,
                [5, ' cup ', 'Kale'],
                [1, ' head ', 'Cauliflower'],
                [3, ' large ', 'Carrots'],
                [2, ' cup ', 'raw Cashew'],
                [2, ' cloves ', 'Garlic'],
                [2, ' Tbsp ', 'No-salt Seasoning'],
                [0.5, ' tsp ', 'Ground Nutmeg']
            ],
            ['Split Pea Sweet Potato Soup', 1,
                [32, 'oz ', 'Veggie Broth'],
                [2.25, ' Cup ', 'Dry Split Peas'],
                [2, ' Med ', 'Sweet Potatoes'],
                [1.5, ' Cup ', 'Oats'],
                [1, ' Med ', 'Onion'],
                [2, ' Med ', 'Carrots'],
                [2, ' Stalks ', 'Celery'],
                [1, ' tsp ', 'Liquid Aminos'],
                [0.25, ' tsp ', 'Garlic Powder']
            ],
            ['Indian Red Lentil Stew', 2,
                [1, ' med ', 'onion'],
                [3, ' med ', 'Carrots'],
                [2, ' stalks ', 'Celery'],
                [2, ' ', 'Parsnips'],
                [1, ' 8oz can ', 'Diced Tomatoes'],
                [0.33, ' cup ', 'Nutritional Yeast'],
                [1, ' Tbsp ', 'Garlic Powder'],
                [3, ' Tbsp ', 'Dried Dill Weed'],
                [16, 'oz ', 'Split Red Lentils'],
                [32, 'oz ', 'Veggie Stock']
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
            var sliceArray = cur.slice(2); 
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
    var htmlStrings = {
        ids: {
            mealCalendar: 'mealCalendar',
            weeklyGrocery: 'weeklyGrocery',
            dateInput: 'dateInput'
        }
    };
    
    //// FUNCTIONS ////
    
    function genCalTable(monthObj){
        var compiledHtml = '';
        var tableArray = [];
        var dayCount = -1;
        var weekCount = 0;
        
        var weekListArray = [];
        var dailyMealArray = [];
        var weekOfMeals = [];
        
        monthObj.weekLists.forEach(function(cur){
            
            var weekGroceries = ('<div><h3>Week ' + cur.index + ' Shopping List</h3><p>');
            cur.forEach(function(cur){
                weekGroceries += (cur + '<br/>');
                });
            
            weekListArray.push(weekGroceries);
            
            });
            console.log(weekListArray);
        
        monthObj.monthArray.forEach(function(cur){
            var dayMeals = '';

            dayMeals += '<td><h4>' + cur[0] + '</h4><br/>' + cur[1] + '<hr/>' + cur[2] + '<hr/>' + cur[3] + '</td>'
            
            dailyMealArray.push(dayMeals);





        });

        console.log(dailyMealArray);
            var tempMealHold = '';
            var i = 0;
        dailyMealArray.forEach(function(cur){
        tempMealHold += cur;
        if(i === 6){
            i = 0;
            weekOfMeals.push(tempMealHold);
            tempMealHold = '';
        } else {
            i++;
        };
            
            
        });
        
        console.log(weekOfMeals);
        
        for(var i = 0; i < weekListArray.length; i++){
            tableArray.push([weekListArray[i], weekOfMeals[i]]);
        }
     
        
        tableArray.forEach(function(cur){
            
        document.querySelector('#' + htmlStrings.ids.mealCalendar).innerHTML += '<tr>' + cur[1] + '</tr>';
            
            document.querySelector('#' + htmlStrings.ids.weeklyGrocery).innerHTML += cur[0];
        });
        
                

    };
    
    
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
        
        genCalTable: genCalTable,
        htmlStrings: htmlStrings
       
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
        
        var dateNums= [2018, 0];
        monthRecipes = calCtrl.generateMonth(5, dataCtrl.recipes, dateNums);
        var shoppingList = weeklyShoppingList(dateNums[0], dateNums[1]);
        var calObj = calCtrl.writeCalendar(dateNums[0], dateNums[1], shoppingList);
        UICtrl.genCalTable(calObj);
    }
    
    function weeklyShoppingList(someYear, someMonth){
        var monthDate = new Date(someYear, someMonth, 1);
        var monthLength = monthDate.monthDays();
        
        var weeklyLists = [];
        var breakfastOrder = [];
        var lunchOrder = [];
        var dinnerOrder = [];
        console.log(monthRecipes);
        monthRecipes.forEach(function(cur, index){
            var ingredientList = [];
            var shoppingList = '';
            
            cur.forEach(function(cur){
                cur.forEach(function(cur){
                    ingredientList.push(cur);
            
                });
            });
            
            var shoppingList = dataCtrl.processrecipes(ingredientList);
            
            
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
        
        /* var remainder = monthLength % 7;
        
        if(remainder !== 0){
            var cutoutNum = weeklyLists.length - remainder;
            weeklyLists[weeklyLists.length - 1].length = cutoutNum;
        }*/
        console.log(weeklyLists);
        console.log(breakfastOrder);
        

        
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

