// Create and Store Variables
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const mealList = document.getElementById("meal-list");
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
function showMealDetailsPopup(meal) {}
