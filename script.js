document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calorie-counter");
  const historyList = document.getElementById("historyList");

  const DAILY_CALORIE_GOAL = 2000; 
  let entries = JSON.parse(localStorage.getItem("calorieHistory")) || [];

  
  function renderHistory() {
    historyList.innerHTML = "";
    let totalCalories = 0;

    entries.forEach((entry) => {
      totalCalories = totalCalories + entry.calories; 
      const li = document.createElement("li");
      li.className = "border-b pb-1 text-gray-700 flex justify-between";
      li.innerHTML = `
        <span>${entry.food} - ${entry.calories} cal</span>
        <span class="text-sm text-gray-500">${entry.day} (${entry.meal})</span>
      `;
      historyList.appendChild(li);
    });

    
    const summary = document.createElement("li");
    summary.className = "font-semibold text-blue-600 mt-2";
    summary.textContent = `Total: ${totalCalories} cal`;
    historyList.appendChild(summary);
  }

  renderHistory();

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const calories = Number(form.querySelector('input[type="number"]').value.trim());
    const food = form.querySelector('input[type="text"]').value.trim();
    const day = document.getElementById("Day").value;
    const meal = document.getElementById("Meal").value;

    if (!calories || calories <= 0) {
      alert("Please enter a valid calorie amount.");
      return;
    }

    if (!food) {
      alert("Please enter the food name.");
      return;
    }

    const entry = { day, meal, food, calories };
    entries.push(entry);
    localStorage.setItem("calorieHistory", JSON.stringify(entries));

    form.querySelector('input[type="number"]').value = "";
    form.querySelector('input[type="text"]').value = "";
    renderHistory();
  });

  
  document.querySelector("button[type='reset']").addEventListener("click", () => {
    entries = [];
    localStorage.removeItem("calorieHistory");
    renderHistory();
  });
});


