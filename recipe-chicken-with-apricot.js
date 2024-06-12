document.addEventListener("DOMContentLoaded", function() {
    
    const slider = document.getElementById("serveSlider");
    const servingsDisplay = document.getElementById("servingsDisplay");
    const unitSwitch = document.getElementById("unitSwitch");
    const unitLabel = document.getElementById("unitLabel");

    
    let isMetric = true;

    
    const conversionFactors = {
        'metric cup': 250,
        '1/4 cup': 62.5,
        '1/3 cup': 83.3,
        '1/2 cup': 125,
        'tsp': 3,
        'tbs': 15,
    };
    
    const ingredients = [
        { ingredient: 'Red Royale potatoes', quantity: '3', amount: 'N/A' },
        { ingredient: 'olive oil', quantity: '2 tbs', amount: conversionFactors['tbs'] * 2 + ' g' },
        { ingredient: 'garlic clove, crushed', quantity: '1', amount: 'N/A' },
        { ingredient: 'smoked paprika', quantity: '1 tsp', amount: conversionFactors['tsp'] + ' g' },
        { ingredient: 'Coles RSPCA Approved Chicken Breast Fillets', quantity: 'N/A', amount: '1 kg' },
        { ingredient: 'apricot halves in juice, drained, finely chopped', quantity: 'N/A', amount: '410 g' },
        { ingredient: 'pistachios, toasted, finely chopped', quantity: '¼ cup', amount: conversionFactors['1/4 cup'] + ' g' },
        { ingredient: 'finely chopped flat-leaf parsley', quantity: '⅓ cup', amount: conversionFactors['1/3 cup'] + ' g' },
        { ingredient: 'long red chilli, seeded, finely chopped', quantity: '1', amount: 'N/A' },
        { ingredient: 'lime juice', quantity: '1 tbs', amount: conversionFactors['tbs'] + ' g' },
        { ingredient: 'Mixed salad leaves', quantity: 'to serve', amount: 'N/A' }
    ];
    
    function formatAmount(amountInGrams) {
        if (isMetric) {
            if (amountInGrams >= 1000) {
                return (amountInGrams / 1000).toFixed(1) + ' kg';
            } else {
                return amountInGrams.toFixed(1) + ' g';
            }
        } else {
            const amountInOunces = amountInGrams / 28.3495;
            return amountInOunces.toFixed(1) + ' oz';
        }
    }

    function populateIngredientsTable() {
        const tableBody = document.querySelector('#ingredients-table tbody');
        tableBody.innerHTML = '';

        ingredients.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.ingredient}</td>
                <td>${item.quantity}</td>
                <td>${item.amount}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    function updateAmount() {
        const servings = parseInt(slider.value);
        servingsDisplay.textContent = `Servings: ${servings}`;

        ingredients.forEach(item => {
            if (item.ingredient === 'Coles RSPCA Approved Chicken Breast Fillets') {
                const amountInGrams = 1000 * servings / 4;
                item.amount = formatAmount(amountInGrams); 
            } else {
                if (!isNaN(parseFloat(item.quantity))) {
                    item.quantity = Math.round(parseFloat(item.quantity) * servings / 4);
                }
                if (!isNaN(parseFloat(item.amount)) && item.amount !== 'N/A') {
                    const amountInGrams = parseFloat(item.amount.split(' ')[0]) * servings / 4;
                    item.amount = formatAmount(amountInGrams);
                }
            }
        });
        populateIngredientsTable();
    }
    
    function toggleUnits() {
        isMetric = !isMetric;
        unitLabel.textContent = isMetric ? 'Metric (grams)' : 'Imperial (ounces)';
        updateAmount();
    }
    
    slider.addEventListener('input', updateAmount);    
    unitSwitch.addEventListener('change', toggleUnits);
    
    populateIngredientsTable();
});