const meals = document.getElementById('meals');
const favs = document.getElementById('fav-el');

const searchBtn = document.getElementById('search');
const searchTermEl = document.getElementById('search-term');
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
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
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
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
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