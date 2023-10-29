// Отримання посилань на елементи форми
const financialForm = document.querySelector("#financialForm");
const expensesText = document.querySelector("#expensesText");
const savingsText = document.querySelector("#savingsText");
const investmentsText = document.querySelector("#investmentsText");
const expensesAlertText = document.querySelector("#expensesAlertText");
const savingsAlertText = document.querySelector("#savingsAlertText");

// Обробка подання форми
financialForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Отримання значень з введених полів
  const income = parseFloat(document.querySelector("#incomeInput").value);
  const expenses = parseFloat(document.querySelector("#expensesInput").value);
  const savings = parseFloat(document.querySelector("#savingsInput").value);
  const investments = parseFloat(document.querySelector("#investmentsInput").value);
  const otherIncome = parseFloat(document.querySelector("#otherIncomeInput").value);
  const otherExpenses = parseFloat(document.querySelector("#otherExpensesInput").value);
  const additionalSavings = parseFloat(document.querySelector("#additionalSavingsInput").value);
  const additionalInvestments = parseFloat(document.querySelector("#additionalInvestmentsInput").value);

  // Обчислення результатів
  const totalIncome = income + otherIncome;
  const totalExpenses = expenses + otherExpenses;
  const totalSavings = savings + additionalSavings;
  const totalInvestments = investments + additionalInvestments;

  // Відображення результатів обчислення
  expensesText.textContent = `Загальні витрати: ${totalExpenses} грн/міс, ${totalExpenses * 12} грн/рік.`;
  savingsText.textContent = `Загальний дохід: ${totalIncome} грн/міс, ${totalIncome * 12} грн/рік.`;
  investmentsText.textContent = `Загальні заощадження: ${totalSavings} грн, та Інвестиції: ${totalInvestments}`;

  // Аналіз результатів і виведення рекомендацій
  if (totalExpenses > totalIncome) {
    expensesAlertText.textContent = "Увага: Витрати перевищують доходи!";
  } else {
    expensesAlertText.textContent = "Витрати в межах доходів.";
  }

  // Аналіз заощаджень на випадок втрати базового доходу
  const monthsOfSavings = Math.floor(totalSavings / totalExpenses);
  if (monthsOfSavings > 0) {
    savingsAlertText.textContent = `Заощаджень вистачить на ${monthsOfSavings} місяців у разі втрати основного доходу.`;
  } else {
    savingsAlertText.textContent = "Увага: Відсутні заощадження або вони недостатні для покриття витрат у разі втрати основного доходу!";
  }

  // Перевірка плану збережень
  if (totalSavings < 0.1 * totalIncome) {
    savingsPlanAlertText.textContent = "Збережень менше 10% від доходу";
  } else {
    savingsPlanAlertText.textContent = "Намагайтеся утримувати рівень збережень не менше ніж 6ти місячний рівень доходу";
  }

  // Аналіз співвідношення збережень до доходу
  const savingsRatio = (totalSavings / totalIncome) * 100;

  // Виведення результатів
  document.querySelector("#savingsRatioText").textContent = "Співідношення збережень до доходу: " + savingsRatio.toFixed(2) + "%";

  // Визначення підходящого типу інвестицій
  let investmentType;

  if (totalInvestments > 50000) {
    investmentType = "агресивний";
  } else if (totalInvestments > 10000) {
    investmentType = "уміренний";
  } else {
    investmentType = "консервативний";
  }

  // Виведення результатів
  document.querySelector("#investmentTypeText").textContent = "Підходящий тип інвестицій - " + investmentType;
});
