const meals = document.getElementById('meals');
const favs = document.getElementById('fav-el');

const searchBtn = document.getElementById('search');
const searchTermEl = document.getElementById('search-term');

const mealPopup = document.getElementById('meal-popup');
const closePopupBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();

    const randomMeal = respData.meals[0];
    // console.log(randomMeal);
    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
    const respData = await resp.json();

    const meal = respData.meals[0];
    return meal;
}

async function getMealBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+term);
    const respData = await resp.json();

    const meal = respData.meals;
    // console.log(meal);
    return meal;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
            <div class="meal-header">
                ${random? `<span class="random">Random Recipe</span>`: ''}
                <img class="meal-btn" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn">
                    <i class="fa fa-heart"></i>
                </button>
            </div>
    `;
    meals.appendChild(meal);

    const btn = meal.querySelector(".meal-body .fav-btn");

    btn.addEventListener("click", () => {
        if(btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });

    const mealBtn = meal.querySelector(".meal-btn");
    mealBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });

}

function showMealInfo(mealData) {
    mealInfoEl.innerHTML = '';
    const mealEl = document.createElement('div');

    const ings = [];
    for(let i = 1; i <= 20; i++) {
        if(mealData["strIngredient"+i]) {
            ings.push(`${mealData["strIngredient"+i]} - ${mealData["strMeasure"+i]}`);
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ings.map((ing) => 
                `<li>${ing}</li>`).join('')}
        </ul>
    `

    mealInfoEl.appendChild(mealEl);

    mealPopup.classList.remove('hidden');
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    
    return mealIds === null ? []: mealIds;
}

async function fetchFavMeals() {
    favs.innerHTML = '';
    const mealIds = getMealsLS();

    for(let i = 0; i < mealIds.length; i++) {
        const meal = await getMealById(mealIds[i]);

        addFav(meal);
    }
}

function addFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img class="pic-btn" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });
    
    const picBtn = favMeal.querySelector('.pic-btn');
    picBtn.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    favs.appendChild(favMeal);
} 

searchBtn.addEventListener('click', async () => {
    meals.innerHTML = '';
    const term = searchTermEl.value;
    const fndMeals = await getMealBySearch(term);

    if(meals) {
        fndMeals.forEach(meal => {
            addMeal(meal);
        });
    }
});

closePopupBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});