/* JavaScript functionality for the home page */
document.addEventListener('DOMContentLoaded', () => {
    const adviceList = [
        { title: 'How to store pavlova', image: 'tips1.jpg', text: 'Pavlovas and meringues in general can be tricky when it comes to storing them. They are easily affected by humidity and moisture, so you want to keep them as dry as possible until the last moment. Its best to cook your pavlova as close to when you want to eat it as possible. If kept very carefully, they can last up to two days.', link: '#' },
        { title: 'The secret to crispy pork crackling', image: 'tips2.jpg', text: 'The great thing about crispy pork crackling is how it contrasts with the juicy, tender meat. The recipe below includes a stuffing that not only helps keep the pork succulent inside, but it also adds amazing flavour. Plus, there are glazed apples and seasonal fruits to serve alongside the pork, which provide that delicious sweet and savoury balance that make pork roasts so fantastic.', link: '#' },
        { title: ' How to choose, store and freeze passionfruit', image: 'tips3.jpg', text: 'Whole passionfruit can be stored at room temperature, they will keep for about 2 weeks. They can also be stored in a plastic bag or sealed container in the fridge to keep them from dehydrating. Passionfruit will keep for 1 month in the fridge. Store any cut passionfruit in the fridge.', link: '#' },
        { title: 'How to poach eggs easily', image: 'tips4.jpg', text: 'Three easy ways to poach eggs! Learn how to poach eggs using the whirlpool method, in a frypan and in the oven and how much time it takes to perfectly poach eggs. Plus get more tips about how to poach eggs without vinegar and lots of recipes with poached eggs', link: '#' },
        { title: 'The best fluffy pancake recipe', image: 'tips5.jpg', text: 'Stale old ingredients such as flour and baking powder won’t give you the best pancakes. Check your baking powder is in date, old baking powder quickly loses its raising power, and you’ll end up with dense, flat pancakes.', link: '#' },
        { title: 'The different types of rice', image: 'tips6.jpg', text: 'Discover the different types of rice. A guide to basmati rice, arborio risotto rice, jasmine rice, koshihikari sushi rice, spanish rice, wild rice and parboiled rice. Also find out what the difference is between short grain, medium grain and long grain rice, and what the difference is between white rice and brown rice.', link: '#' },
        { title: 'Which potatoes are best for roasting, mashing, baking and more', image: 'tips7.jpg', text: 'Potatoes are a fantastic kitchen staple that can be cooked in so many delicious ways, but when it comes to choosing the perfect potato for your mash, roast, stew or salad, do you know which is best? Find out the difference between waxy and floury potatoes, as well as the best varieties to choose for mashing, baking, roasting and more.', link: '#' }
    ];


    const createAdviceItems = (adviceList, containerId) => {
        const container = document.getElementById(containerId);
        adviceList.forEach(advice => {
            const item = document.createElement('div');
            item.classList.add('advice-item');
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
            container.appendChild(item);
        });
    };

    const slideAdvice = () => {
        const adviceContainer = document.getElementById('advice-list');
        const adviceItems = document.querySelectorAll('.advice-item');
        let currentIndex = 0;

        const updateSlide = () => {
            const containerWidth = document.querySelector('.advice-slider').offsetWidth;
            const offset = -currentIndex * (adviceItems[0].offsetWidth + 20); // Assuming margin-right of 20px
            adviceContainer.style.transform = `translateX(${offset}px)`;

            document.getElementById('slide-prev').disabled = currentIndex === 0;
            document.getElementById('slide-next').disabled = currentIndex === adviceItems.length - 1;
        };

        document.getElementById('slide-next').addEventListener('click', () => {
            if (currentIndex < adviceItems.length - 1) {
                currentIndex++;
                updateSlide();
            }
        });

        document.getElementById('slide-prev').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlide();
            }
        });

        updateSlide();
    };


    createAdviceItems(adviceList, 'advice-list');
    slideAdvice();
    // Add event listeners to category items
    document.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = item.dataset.link;
        });
    });
});

