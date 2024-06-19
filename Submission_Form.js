
    let recipe = {
    author: "",
    recipeTitle: "",
    recipeDescription: "",
    duration: 0,
    steps: 0,
    _ingredients: [],
    _ingredientsRaw: [],
    _steps: [],
    _stepsRaw: []
}


    function setUpImageUploadEvents() {
    // image upload handling
    document.getElementById('image-upload').addEventListener('change', function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            document.getElementById('image-preview').src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }, false);

    // image url handling
    document.getElementById('image-url').addEventListener('input', function (event) {
    var url = event.target.value;
    document.getElementById('image-preview').src = url;
}, false);
}
    function setUpSubmitRecipeEvent() {

    const modal = document.getElementById("submit-modal");
    const span = document.getElementsByClassName("close")[0];
    const modalText = document.getElementById("modal-text");
    const confirmSubmit = document.getElementById("confirm-submit");

    confirmSubmit.addEventListener("click", function () {
    modal.style.display = "none";
    recipe.recipeTitle = sanitize(recipe.recipeTitle);
    recipe.author = sanitize(recipe.author);
    recipe.recipeDescription = sanitize(recipe.recipeDescription);
    alert("Submission sent");
});

    let submit = document.getElementById("submit-recipe");
    submit.addEventListener("click", function (e) {
    e.preventDefault();

    recipe.recipeTitle = document.getElementById("title").value;
    recipe.author = document.getElementById("author").value;
    recipe.recipeDescription = document.getElementById("description").value;

    if (recipe.recipeTitle && recipe.author && recipe.recipeDescription && recipe._ingredients.length && recipe._steps.length) {
    modalText.innerHTML = "";

    // Create an img element and set its src attribute to the image source in the preview section
    let img = document.createElement("img");
    img.src = document.getElementById("image-preview").src;
    img.style.width = "100%"; // or another desired width
    modalText.appendChild(img);

    let title = document.createElement('h2');
    title.innerHTML = recipe.recipeTitle;
    modalText.appendChild(title);

    let authorP = document.createElement('p');
    authorP.innerHTML = "By: " + recipe.author;
    modalText.appendChild(authorP);

    let descP = document.createElement('p');
    descP.innerHTML = recipe.recipeDescription;
    modalText.appendChild(descP);

    let ingredientsLabel = document.createElement('h3');
    ingredientsLabel.textContent = "Ingredients:";
    modalText.appendChild(ingredientsLabel);

    let ingredientsUl = document.createElement('ul');

    recipe._ingredients.forEach(ingredient => {
    let li = document.createElement('li');
    li.innerHTML = ingredient; // <- changed
    ingredientsUl.appendChild(li);
});

    modalText.appendChild(ingredientsUl);

    let stepsLabel = document.createElement('h3');
    stepsLabel.textContent = "Steps:";
    modalText.appendChild(stepsLabel);

    let stepsOl = document.createElement('ol');

    recipe._steps.forEach(step => {
    let li = document.createElement('li');
    li.innerHTML = step; // <- changed
    stepsOl.appendChild(li);
});

    modalText.appendChild(stepsOl);

    confirmSubmit.style.display = "inline-block";
} else {
    modalText.textContent = "Please fill all the fields";

    confirmSubmit.style.display = "none";
}

    modal.style.display = "block";

    span.onclick = function () {
    modal.style.display = "none";
}
});

    window.onclick = function (event) {
    if (event.target === modal) {
    modal.style.display = "none";
}
}
}
    function setUpKeyDownEvents() {
    document.getElementById("ingredient-input").addEventListener("keydown", function(event){
        if(event.key === "Enter") {
            event.preventDefault(); // to prevent form submission on enter
            addIngredient(event);
        }
    });
    document.getElementById("step-input").addEventListener("keydown", function(event){
    if(event.key === "Enter") {
    event.preventDefault(); // to prevent form submission on enter
    addStep(event);
}
});
}

    setUpSubmitRecipeEvent();
    setUpKeyDownEvents();
    setUpImageUploadEvents();

    //set up complete



    function addIngredient(event) {
    addToList(event, "ingredient-input", "ingredient-list", recipe._ingredients, recipe._ingredientsRaw);
}
    function addStep(event) {
    addToList(event, "step-input", "step-list", recipe._steps, recipe._stepsRaw);
}

    function addToList(event, inputElementId, listElementId, listArray, listArrayRaw) {
    event.preventDefault();
    let input = document.getElementById(inputElementId).value;

    //Check if the input value is not empty or white spaces
    if(input.trim().length > 0){
    let listDisplay = document.getElementById(listElementId);
    let newListEntry = processInput(input);
    listArray.push(newListEntry);
    listArrayRaw.push(input);
    updateListDisplay(listArray, listDisplay);
}
}

    function updateListDisplay(listObject, listElement){
    // recreate a list from scratch provided the data object that represents it
    listElement.innerHTML = "";
    for(let i = 0; i < listObject.length; i++)
{
    let li = document.createElement('li');
    let div = document.createElement('div');  // Create a container
    div.innerHTML = listObject[i];            // Put your content in the container
    div.contentEditable = "true";             // Make only the container editable

    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'delete-button'; // Add class name to the delete button
    deleteButton.addEventListener('click', function(){
    listObject.splice(i, 1); // Remove this item from your array
    updateListDisplay(listObject, listElement); // Re-render the list
});

    li.appendChild(div);       // Add the container to your list item
    li.appendChild(deleteButton); // Add the delete button to your list item (not inside the container)
    listElement.appendChild(li);
}
}

    function processInput(input) {
    // Prevent code injection
    input = sanitize(input);



    // Replace fractions
    let fractions = {
    '1/2': '½',
    '1/3': '⅓',
    '2/3': '⅔',
    '1/4': '¼',
    '3/4': '¾',
    '1/5': '⅕',
    '2/5': '⅖',
    '3/5': '⅗',
    '4/5': '⅘',
    '1/6': '⅙',
    '5/6': '⅚',
    '1/8': '⅛',
    '3/8': '⅜',
    '5/8': '⅝',
    '7/8': '⅞'
};
    Object.keys(fractions).forEach((key) => {
    // This will replace all fractions found in the string using regex
    let regex = new RegExp(`\\b${key}\\b`, 'g');
    input = input.replace(regex, fractions[key]);
});


    /* commented out for failing to copy capitalisation at sentence start
    
    // emphasize special terms
    let cookingTerms = ["braise", "poach", "caramelize", "sear", "saute", "deglaze", "emulsify", "flambe",
    "rehydrate", "parboil", "puree", "roast", "scald", "truss", "zest", "julienne", "marinate", "broil",
    "blanch", "fillet", "brine", "confection", "garnish", "infuse", "temper", "whip", "knead"];

    
    cookingTerms.forEach((term) => {
    let regex = new RegExp(`\\b${term}\\b`, 'gi');
    input = input.replace(regex, `<em>${term}</em>`);
});

    */



    // Detect and properly format temperatures
    let tempFormats = ['C', 'F'];

    tempFormats.forEach((tempFormat) => {
    let regex = new RegExp(`(\\d+)\\s*\\°?\\s*${tempFormat}\\b`, 'gi');
    input = input.replace(regex, (match, p1) => `${p1}°${tempFormat}`);
});


    // Provide conversions in a tooltip for each temperature detected with the degree symbol
    let celsius = { abbr: 'C', conversion: (v) => (v * 9/5) + 32, tooltip: 'Fahrenheit' };
    let fahrenheit = { abbr: 'F', conversion: (v) => (v - 32) * 5/9, tooltip: 'Celsius' };

    let temps = [celsius, fahrenheit];

    temps.forEach((temp) => {
    let regex = new RegExp(`(-?\\d+)\\s*\\°\\s*${temp.abbr}\\b`, 'gi');
    input = input.replace(regex, (match, p1) => {
    let convertedTemp = temp.conversion(Number(p1)).toFixed(0);
    let formattedTemp = `${p1}°${temp.abbr}`;
    let tooltipTemp = `${convertedTemp}°${temp.tooltip}`;
    return `<abbr title="${tooltipTemp}">${formattedTemp}</abbr>`;
});
});



    // Bold measurement units
    let units = [
{ abbr: 'tsp', full: 'Teaspoon' },
{ abbr: 'Tbs', full: 'Tablespoon' },
{ abbr: 'tbsp', full: 'Tablespoon' },
{ abbr: 'fl oz', full: 'Fluid Ounce' },
{ abbr: 'pt', full: 'Pint' },
{ abbr: 'qt', full: 'Quart' },
{ abbr: 'gal', full: 'Gallon' },
{ abbr: 'mL', full: 'Milliliter' },
{ abbr: 'ml', full: 'Milliliter' },
{ abbr: 'L', full: 'Liter' },
{ abbr: 'g', full: 'Gram' },
{ abbr: 'kg', full: 'Kilogram' },
{ abbr: 'oz', full: 'Ounce' },
{ abbr: 'lb', full: 'Pound' },
{ abbr: 'pch', full: 'Pinch' },
{ abbr: 'ds', full: 'Dash' },
{ abbr: 'smid', full: 'Smidgen' },
{ abbr: 'dr', full: 'Drop' },
{ abbr: 'ssp', full: 'Saltspoon/spoonful' },
{ abbr: 'csp', full: 'Coffeespoon' },
{ abbr: 'dsp', full: 'Dessert Spoon' },
{ abbr: 'wgf', full: 'Wineglass' },
{ abbr: 'gi', full: 'Gills' },
{ abbr: 'pk', full: 'Peck' },
{ abbr: 'pcs', full: 'Piece' },
{ abbr: 'sl', full: 'Slice' },
{ abbr: 'bn', full: 'Bunch' },
{ abbr: 'hd', full: 'Head (for lettuce)' },
{ abbr: 'cl', full: 'Clove (for garlic)' },
{ abbr: 'sp', full: 'Sprig (for herbs)' }
    ];

    units.forEach((unit) => {
    let regex = new RegExp(`((^|\\W)|\\d)(${unit.abbr}s?(?![a-zA-Z]))`, 'gi');
    input = input.replace(regex, `$1<abbr title="${unit.full}"><strong>$3</strong></abbr>`);
});


    return input;
}

    function sanitize(input) {
    let temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}
