// scripts.js

// Sample recipe data
const recipes = [
    { id: 1, title: 'Pancakes', image: 'images/pancakesdark.jpg', link: 'pancakes.html' },
    { id: 2, title: 'Salad', image: 'images/summersalad.jpg', link: 'salad.html' },
    { id: 3, title: 'Pizza', image: 'images/pizza.jpg', link: 'pizza.html' },
    // Add more recipes as needed
];

// Load saved ratings and favorites from localStorage
const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};

// Initialize the recipe list
document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('a');
        recipeDiv.className = 'recipe-item';
        recipeDiv.href = recipe.link; // Link to the recipe page
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-actions">
                <p>Rating: <span class="rating">${savedRatings[recipe.id] || 0}</span></p>
                <button onclick="increaseRating(event, ${recipe.id})">Rate</button>
                <span class="favorite" onclick="toggleFavorite(event, ${recipe.id})">
                    ${savedFavorites[recipe.id] ? '❤️' : '♡'}
                </span>
            </div>
        `;
        recipeList.appendChild(recipeDiv);
    });
});

// Function to increase the rating
function increaseRating(event, recipeId) {
    event.preventDefault(); // Prevent link navigation
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    ratings[recipeId] = (ratings[recipeId] || 0) + 1;
    localStorage.setItem('ratings', JSON.stringify(ratings));
    document.querySelectorAll('.recipe-item').forEach(item => {
        if (item.querySelector('button').onclick.toString().includes(`increaseRating(event, ${recipeId})`)) {
            item.querySelector('.rating').textContent = ratings[recipeId];
        }
    });
}

// Function to toggle favorite status
function toggleFavorite(event, recipeId) {
    event.preventDefault(); // Prevent link navigation
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    favorites[recipeId] = !favorites[recipeId];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    document.querySelectorAll('.recipe-item').forEach(item => {
        if (item.querySelector('.favorite').onclick.toString().includes(`toggleFavorite(event, ${recipeId})`)) {
            item.querySelector('.favorite').textContent = favorites[recipeId] ? '❤️' : '♡';
        }
    });
}