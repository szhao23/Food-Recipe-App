// Create and Store Variables
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const mealList = document.getElementById("mealList");
const modalContainer = document.getElementById("modal-container");
const mealDetailsContent = document.getElementById("meal-details-content");
const recipeCloseButton = document.getElementById("recipeCloseBtn");

// Event Listeners
searchButton.addEventListener("click", async () => {
  const ingredient = searchInput.value.trim();
  if (ingredient) {
    const meals = await searchMealsByIngredient(ingredient);
    displayMeals(meals);
  }
});

mealList.addEventListener("click", async (e) => {
  const card = e.target.closest(".meal-item");
  if (card) {
    const mealId = card.dataset.id;
    const meal = await getMealDetails(mealId);
    if (meal) {
      showMealDetailsPopup(meal);
    }
  }
});

// Fetch Function By Ingredient
async function searchMealsByIngredient(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    // Display Error message in Console if Fail
    console.log("Error when fetching data: ", error);
  }
}

// Function to Fetch Meal Details by ID
async function getMealDetails(mealId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.log("Error when fetching meal details: ", error);
  }
}

// Display Meals in List Function
function displayMeals(meals) {
  mealList.innerHTML = "";
  if (meals) {
    meals.forEach((meal) => {
      const mealItem = document.createElement("div");
      mealItem.classList.add("meal-item");
      mealItem.dataset.id = meal.idMeal;
      mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            `;
      mealList.appendChild(mealItem);
    });
  } else {
    mealList.innerHTML =
      "<p>No meals were able to be found... Try another ingredient!</p>";
  }
}

// Function to Create and Display Meal Details on Popup
function showMealDetailsPopup(meal) {
  mealDetailsContent.innerHTML = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="recipe-video">
        <a href="${meal.strYoutube}"
        target="_blank">Video Tutorial Guide</a>
    </div>
    `;
  modalContainer.style.display = "block";
}

// Event Listener for Pop-up Close Buttin
recipeCloseButton.addEventListener("click", closeRecipeModal);

function closeRecipeModal() {
  modalContainer.style.display = "none";
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

async function performSearch() {
  const ingredient = searchInput.value.trim();
  if (ingredient) {
    const meals = await searchMealsByIngredient(ingredient);
    displayMeals(meals);
  }
}

// Perform a quick search upon page loading
window.addEventListener("load", () => {
  searchInput.value = "chicken";
  performSearch();
});
