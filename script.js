const sB = document.getElementById('search-btn');
const mealL = document.getElementById('meal');
const closeB = document.getElementById('recipe-close-btn');
const mealD = document.querySelector('.meal-details-content');

sB.addEventListener('click', getMealL);
mealL.addEventListener('click', getMR);
closeB.addEventListener('click', () => {
    mealD.parentElement.classList.remove('showR');
});


function getMealL() {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            let html = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                <div class = "mm" data-id ="${meal.idMeal}">
                    <div class = "meal-img">
                         <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                     <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-bn">Get Recipe</a>
                    </div>
                 </div>
                `;
                });
                mealL.classList.remove('notFound');
            } else {
                mealL.classList.add('notFound');
                html = "sorry";
            }
            mealL.innerHTML = html;
        });

}

function getMR(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-bn')) {
        let mealI = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealI.dataset.id}`)
            .then(response => response.json())
            .then(data => sc(data.meals))
    }
}
function sc(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class = "title">${meal.strMeal}</h2>
          <p >${meal.strCategory}</p>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
          <div class = "img">
            <img src = "${meal.strMealThumb}" alt = "">
          </div>
         
    `;
    mealD.innerHTML = html;
    mealD.parentElement.classList.add('showR');
}