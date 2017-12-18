//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// DATA CONTROLLER >>>

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var dataController = (function(){
    
    //// VARIABLES ////
    var recipes = {
        latkes: [
                [4, ' lbs ', 'Potato'],
                [1, ' medium ', 'Onion'],
                [4, ' ', 'Egg'],
                [1, ' Tbsp ', 'Garlic']
            ],
        oatmeal: [
                [1.5, ' Cup ', 'Oats'],
                [3, ' Cup ', 'Water'],
                [0.5, ' Cup ', 'Strawberry']
        ]
    };
    
    var recipeQueue = [recipes.latkes, recipes.oatmeal, recipes.latkes];
    
    var allIngredients = [];
    
    var compiledIngredients = [];
    
    var concatIngredList = [];
    
    //// FUNCTIONS ////
    function loadIngredients(){
        recipeQueue.forEach(function(cur){
            cur.forEach(function(cur){
                allIngredients.push(cur);
        
            });
            });
    // console.log(allIngredients);
    };
    
    function compileIngredients(){
        var talliedIngredients = [];
        
        allIngredients.forEach(function(cur){
            var thisIngredient = cur[2];
            var howMany = 0;
            var tempMatch = false;
            var pushArray = '';
            
            if(!(talliedIngredients.includes(thisIngredient))){
                 allIngredients.forEach(function(cur){
              tempMatch = cur.includes(thisIngredient);
                if(tempMatch){
                    howMany++;
                    talliedIngredients.push(thisIngredient);
                   // console.log(thisIngredient);
                };
            });
                pushArray = [(cur[0] * howMany), cur[1], cur[2]];
            
            compiledIngredients.push(pushArray);
            };
            
            
        });
        // console.log(talliedIngredients);
        console.log(compiledIngredients);
    };
    
    function concatIngred(){
        compiledIngredients.forEach(function(cur){
            var tempString = (cur[0] + cur[1] + cur[2]);
            concatIngredList.push(tempString);
        });
        // console.log(concatIngredList);
    };
    
    function processRecipes(){
    loadIngredients();
    compileIngredients();
    concatIngred();
    };
    
    return {
       processRecipes: processRecipes
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

var appController = (function(dataCtrl, UICtrl){
    
    //// VARIABLES ////
    
    
    //// FUNCTIONS ////
    function innit(){
        dataCtrl.processRecipes();
    }
    
    return {
       innit: innit
    }
})(dataController, UIController);

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

