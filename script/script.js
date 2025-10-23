// Отримання посилань на елементи форми
const financialForm = document.querySelector("#financialForm");
const expensesText = document.querySelector("#expensesText");
const savingsText = document.querySelector("#savingsText");
const investmentsText = document.querySelector("#investmentsText");
const expensesAlertText = document.querySelector("#expensesAlertText");
const savingsAlertText = document.querySelector("#savingsAlertText");

// Додаткові елементи для розширеної аналітики
const financialHealthScore = document.querySelector("#financialHealthScore");
const recommendationsList = document.querySelector("#recommendationsList");
const monthlyTrends = document.querySelector("#monthlyTrends");

// Обробка подання форми
financialForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Отримання значень з введених полів
  const income = parseFloat(document.querySelector("#incomeInput").value) || 0;
  const expenses = parseFloat(document.querySelector("#expensesInput").value) || 0;
  const savings = parseFloat(document.querySelector("#savingsInput").value) || 0;
  const investments = parseFloat(document.querySelector("#investmentsInput").value) || 0;
  const otherIncome = parseFloat(document.querySelector("#otherIncomeInput").value) || 0;
  const otherExpenses = parseFloat(document.querySelector("#otherExpensesInput").value) || 0;
  const additionalSavings = parseFloat(document.querySelector("#additionalSavingsInput").value) || 0;
  const additionalInvestments = parseFloat(document.querySelector("#additionalInvestmentsInput").value) || 0;

  // Обчислення результатів
  const totalIncome = income + otherIncome;
  const totalExpenses = expenses + otherExpenses;
  const totalSavings = savings + additionalSavings;
  const totalInvestments = investments + additionalInvestments;

  // Розширена аналітика
  const netIncome = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
  const investmentRate = totalIncome > 0 ? (totalInvestments / totalIncome) * 100 : 0;
  const emergencyFundMonths = totalExpenses > 0 ? Math.floor(totalSavings / totalExpenses) : 0;

  // Розрахунок фінансового здоров'я (0-100)
  let healthScore = 0;
  if (netIncome > 0) healthScore += 30;
  if (savingsRate >= 20) healthScore += 25;
  else if (savingsRate >= 10) healthScore += 15;
  else if (savingsRate >= 5) healthScore += 10;

  if (emergencyFundMonths >= 6) healthScore += 25;
  else if (emergencyFundMonths >= 3) healthScore += 15;
  else if (emergencyFundMonths >= 1) healthScore += 10;

  if (investmentRate >= 10) healthScore += 20;
  else if (investmentRate >= 5) healthScore += 15;
  else if (investmentRate > 0) healthScore += 10;

  // Відображення результатів обчислення
  expensesText.textContent = `Загальні витрати: ${totalExpenses} грн/міс, ${totalExpenses * 12} грн/рік.`;
  savingsText.textContent = `Загальний дохід: ${totalIncome} грн/міс, ${totalIncome * 12} грн/рік.`;
  investmentsText.textContent = `Загальні заощадження: ${totalSavings} грн, та Інвестиції: ${totalInvestments}`;

  // Розширена аналітика
  if (financialHealthScore) {
    financialHealthScore.innerHTML = `
      <h3>Фінансове здоров'я: ${healthScore}/100</h3>
      <div class="score-bar">
        <div class="score-fill" style="width: ${healthScore}%"></div>
      </div>
      <p>Чистий дохід: ${netIncome} грн/міс</p>
      <p>Рівень заощаджень: ${savingsRate.toFixed(1)}%</p>
      <p>Рівень інвестицій: ${investmentRate.toFixed(1)}%</p>
      <p>Резервний фонд: ${emergencyFundMonths} місяців</p>
    `;
  }

  // Генерація рекомендацій
  const recommendations = generateRecommendations(healthScore, savingsRate, investmentRate, emergencyFundMonths, netIncome);
  if (recommendationsList) {
    recommendationsList.innerHTML = recommendations.map((rec) => `<li>${rec}</li>`).join("");
  }

  // Аналіз результатів і виведення рекомендацій
  if (totalExpenses > totalIncome) {
    expensesAlertText.textContent = "Увага: Витрати перевищують доходи!";
  } else {
    expensesAlertText.textContent = "Витрати в межах доходів.";
  }

  // Аналіз заощаджень на випадок втрати базового доходу
  if (emergencyFundMonths > 0) {
    savingsAlertText.textContent = `Заощаджень вистачить на ${emergencyFundMonths} місяців у разі втрати основного доходу.`;
  } else {
    savingsAlertText.textContent = "Увага: Відсутні заощадження або вони недостатні для покриття витрат у разі втрати основного доходу!";
  }

  // Кругова діаграма розподілу витрат
  const expensesCanvas = document.getElementById("expensesChart");
  if (expensesCanvas) {
    const expensesChart = new Chart(expensesCanvas, {
      type: "doughnut",
      data: {
        labels: ["Витрати", "Доходи"],
        datasets: [
          {
            data: [totalExpenses, totalIncome],
            backgroundColor: ["red", "green"],
          },
        ],
      },
    });
  }

  // Кругова діаграма розподілу заощаджень
  const savingsCanvas = document.getElementById("savingsChart");
  if (savingsCanvas) {
    const savingsChart = new Chart(savingsCanvas, {
      type: "doughnut",
      data: {
        labels: ["Заощадження", "Інвестиції"],
        datasets: [
          {
            data: [totalSavings, totalInvestments],
            backgroundColor: ["blue", "yellow"],
          },
        ],
      },
    });
  }
});

// Функція генерації рекомендацій
function generateRecommendations(score, savingsRate, investmentRate, emergencyMonths, netIncome) {
  const recommendations = [];

  if (score < 30) {
    recommendations.push("Критичний стан фінансів. Негайно зменшіть витрати та збільшіть доходи.");
  } else if (score < 50) {
    recommendations.push("Фінанси потребують уваги. Розробіть план економії.");
  } else if (score < 70) {
    recommendations.push("Добре, але є можливості для покращення.");
  } else {
    recommendations.push("Відмінний фінансовий стан! Продовжуйте в тому ж дусі.");
  }

  if (savingsRate < 10) {
    recommendations.push("Збільшіть рівень заощаджень до мінімум 10% від доходу.");
  }

  if (emergencyMonths < 3) {
    recommendations.push("Створіть резервний фонд на 3-6 місяців витрат.");
  }

  if (investmentRate < 5) {
    recommendations.push("Розгляньте можливість інвестування для довгострокового зростання.");
  }

  if (netIncome < 0) {
    recommendations.push("НЕГАЙНО: Витрати перевищують доходи. Зменшіть витрати або збільшіть доходи.");
  }

  return recommendations;
}
