/* JavaScript functionality for the home page */

function homePageFunctions() {
    const carousel = document.querySelector('.featuredrecipes .carousel');
    const container = document.querySelector(".featuredrecipes .container");
    const arrowBtns = container.querySelectorAll("i");

    // Function to create recipe cards
    const createRecipeCards = (recipes, container) => {
        recipes.forEach(recipe => {
            const recipeCard = generateRecipeCard(recipe);
            container.appendChild(recipeCard);
        });
    };

    // Function to generate HTML for a recipe card
    const generateRecipeCard = (recipe) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="img"><img src="${recipe.image}" alt="${recipe.title}" draggable="false" class="img"></div>
            <div class="box">
                <div class="boxcontent">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.description}</p>
                    <a href="${recipe.link}" class="view button">View Recipe</a>
                </div>
            </div>
        `;
        return card;
    };

    // Function to create recipe carousel
    const createRecipeCarousel = (recipes, carouselContainer, cardPerView) => {
        recipes.forEach(recipe => {
            const recipeCard = generateRecipeCard(recipe);
            carouselContainer.appendChild(recipeCard);
        });

        const carouselChildrens = [...carouselContainer.children];
        insertCopiesForInfiniteScroll(carouselContainer, carouselChildrens, cardPerView);
    };

    // Function to insert copies for infinite scrolling
    const insertCopiesForInfiniteScroll = (carousel, carouselChildrens, cardPerView) => {
        carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

        carouselChildrens.slice(0, cardPerView).forEach(card => {
            carousel.insertAdjacentHTML("beforeend", card.outerHTML);
        });

        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    };

    // Function to create advice items
    const createAdviceItems = (adviceList, containerId) => {
        const container = document.getElementById(containerId);
        adviceList.forEach(advice => {
            const item = generateAdviceItem(advice);
            container.appendChild(item);
        });
    };

    // Function to generate HTML for an advice item
    const generateAdviceItem = (advice) => {
        const item = document.createElement('div');
        item.classList.add('adviceitem');
        item.innerHTML = `
            <img src="${advice.image}" alt="${advice.title}">
            <h3>${advice.title}</h3>
            <p class="summary">${advice.text.split(' ').slice(0, 10).join(' ')}...</p>
            <p class="full-text">${advice.text}</p>
            <a href="javascript:void(0);" class="read-more">Read More &#9654;</a>
        `;
        item.querySelector('.read-more').addEventListener('click', () => {
            item.querySelector('.full-text').style.display = 'block';
            item.querySelector('.summary').style.display = 'none';
            item.querySelector('.read-more').style.display = 'none';
        });
        return item;
    };

    // Featured recipes data object
    const featuredRecipesData = {
        recipes: [
            { title: 'Avocado Toast', image: 'images/avocado.jpg', description: 'Perfect to start your day', link: 'recipe.html' },
            { title: 'Four Bean Curry', image: 'images/beandish.jpeg', description: 'The ideal Winter warmer', link: 'recipe.html' },
            { title: 'Canapes', image: 'images/canapes.jpg', description: 'For the nibblers of the world', link: 'recipe.html' },
            { title: 'Dessert', image: 'images/dessert.jpg', description: 'Because who doesn\'t love something sweet', link: 'recipe.html' },
        ],
        container: carousel,
        cardPerView: 3
    };

    // Advice tips data object
    const adviceListData = {
        adviceList: [
            { title: 'How to store pavlova', image: 'images/tips1.jpg', text: 'Pavlovas and meringues in general can be tricky when it comes to storing them. They are easily affected by humidity and moisture, so you want to keep them as dry as possible until the last moment. Its best to cook your pavlova as close to when you want to eat it as possible. If kept very carefully, they can last up to two days.', link: '#' },
            { title: 'The secret to crispy pork crackling', image: 'images/tips2.jpg', text: 'The great thing about crispy pork crackling is how it contrasts with the juicy, tender meat. The recipe below includes a stuffing that not only helps keep the pork succulent inside, but it also adds amazing flavour. Plus, there are glazed apples and seasonal fruits to serve alongside the pork, which provide that delicious sweet and savoury balance that make pork roasts so fantastic.', link: '#' },
            { title: ' How to choose, store and freeze passionfruit', image: 'images/tips3.jpg', text: 'Whole passionfruit can be stored at room temperature, they will keep for about 2 weeks. They can also be stored in a plastic bag or sealed container in the fridge to keep them from dehydrating. Passionfruit will keep for 1 month in the fridge. Store any cut passionfruit in the fridge.', link: '#' },
            { title: 'How to poach eggs easily', image: 'images/tips4.jpg', text: 'Three easy ways to poach eggs! Learn how to poach eggs using the whirlpool method, in a frypan and in the oven and how much time it takes to perfectly poach eggs. Plus get more tips about how to poach eggs without vinegar and lots of recipes with poached eggs', link: '#' },
            { title: 'The best fluffy pancake recipe', image: 'images/tips5.jpg', text: 'Stale old ingredients such as flour and baking powder won’t give you the best pancakes. Check your baking powder is in date, old baking powder quickly loses its raising power, and you’ll end up with dense, flat pancakes.', link: '#' },
            { title: 'The different types of rice', image: 'images/tips6.jpg', text: 'Discover the different types of rice. A guide to basmati rice, arborio risotto rice, jasmine rice, koshihikari sushi rice, spanish rice, wild rice and parboiled rice. Also find out what the difference is between short grain, medium grain and long grain rice, and what the difference is between white rice and brown rice.', link: '#' },
            { title: 'Which potatoes are best for roasting, mashing, baking and more', image: 'images/tips7.jpg', text: 'Potatoes are a fantastic kitchen staple that can be cooked in so many delicious ways, but when it comes to choosing the perfect potato for your mash, roast, stew or salad, do you know which is best? Find out the difference between waxy and floury potatoes, as well as the best varieties to choose for mashing, baking, roasting and more.', link: '#' }
        ],
        containerId: 'advicelist'
    };

    // Initialize the page
    createRecipeCarousel(featuredRecipesData.recipes, featuredRecipesData.container, featuredRecipesData.cardPerView);
    createAdviceItems(adviceListData.adviceList, adviceListData.containerId);

    // Add event listeners
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const firstCardWidth = carousel.querySelector(".card").offsetWidth;
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth * 3 : firstCardWidth * 3;
        });
    });

    carousel.addEventListener("mousedown", handleDragStart);
    carousel.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragStop);
    carousel.addEventListener("scroll", handleInfiniteScroll);

    // Event handlers
    let isDragging = false;
    let startX, startScrollLeft;

    function handleDragStart(e) {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    function handleDragging(e) {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    function handleDragStop() {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    function handleInfiniteScroll() {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    }

    const adviceListContainer = document.getElementById('advicelist');
    const slidePrevBtn = document.getElementById('slideprev');
    const slideNextBtn = document.getElementById('slidenext');
    
    let currentPosition = 0;
    const slideWidth = adviceListContainer.offsetWidth;
    
    slidePrevBtn.addEventListener('click', () => {
      currentPosition += slideWidth / 5; // Adjust this value to make the slider move slower
      currentPosition = Math.min(currentPosition, 0);
      adviceListContainer.style.transform = `translateX(${currentPosition}px)`;
    });
    
    slideNextBtn.addEventListener('click', () => {
      currentPosition -= slideWidth / 5; // Adjust this value to make the slider move slower
      currentPosition = Math.max(currentPosition, -((adviceListContainer.children.length - 1) * slideWidth));
      adviceListContainer.style.transform = `translateX(${currentPosition}px)`;
    });

    // Event listeners for breakfast, lunch and dinner buttons
    const breakfastButton = document.getElementById('breakfastButton');
    const lunchButton = document.getElementById('lunchButton');
    const dinnerButton = document.getElementById('dinnerButton');
    const contributeButton = document.getElementById('contributeButton');
    
    breakfastButton.addEventListener('click', function() {
        window.location.href = 'recipelist.html'; // Navigate to breakfast.html
    });
    
    lunchButton.addEventListener('click', function() {
        window.location.href = 'lunch.html'; // Navigate to lunch.html
    });
    
    dinnerButton.addEventListener('click', function() {
        window.location.href = 'dinner.html'; // Navigate to dinner.html
    });

    contributeButton.addEventListener('click', function() {
        window.location.href = 'contribute.html'; // Navigate to contributionForm.html
    });
}

// Call the homePageFunctions when DOM is loaded
document.addEventListener("DOMContentLoaded", homePageFunctions);
