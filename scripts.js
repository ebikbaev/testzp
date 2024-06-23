document.addEventListener("DOMContentLoaded", function () {
  const paymentTypeCheckbox = document.getElementById("paymentType");
  const hourlyFields = document.getElementById("hourlyFields");
  const taskFields = document.getElementById("taskFields");

  paymentTypeCheckbox.addEventListener("change", function () {
    if (this.checked) {
      hourlyFields.style.display = "none";
      taskFields.style.display = "block";
    } else {
      hourlyFields.style.display = "block";
      taskFields.style.display = "none";
    }
  });

  // Ensure the initial state matches the checkbox
  if (paymentTypeCheckbox.checked) {
    hourlyFields.style.display = "none";
    taskFields.style.display = "block";
  } else {
    hourlyFields.style.display = "block";
    taskFields.style.display = "none";
  }
});

function openSettings() {
  document.getElementById("settingsModal").style.display = "flex";
}

function closeSettings() {
  document.getElementById("settingsModal").style.display = "none";
}

function changeTheme() {
  const theme = document.getElementById("theme").value;
  document.body.className = theme + "-theme";
}

function toggleShiftFields() {
  const extraHourlyFields = document.getElementById("extraHourlyFields");
  const extraTaskFields = document.getElementById("extraTaskFields");
  const isChecked = document.getElementById("multipleShifts").checked;

  if (isChecked) {
    const shiftsInput = document.createElement("div");
    shiftsInput.classList.add("input-group");
    shiftsInput.innerHTML = `
      <label for="shifts">Number of Shifts:</label>
      <input type="number" id="shifts" class="input-field"/>
    `;

    if (document.getElementById("paymentType").checked) {
      extraTaskFields.appendChild(shiftsInput);
    } else {
      extraHourlyFields.appendChild(shiftsInput);
    }
  } else {
    while (extraHourlyFields.firstChild) {
      extraHourlyFields.removeChild(extraHourlyFields.firstChild);
    }
    while (extraTaskFields.firstChild) {
      extraTaskFields.removeChild(extraTaskFields.firstChild);
    }
  }
}

function toggleBonusFields() {
  const extraHourlyFields = document.getElementById("extraHourlyFields");
  const extraTaskFields = document.getElementById("extraTaskFields");
  const isChecked = document.getElementById("showBonus").checked;

  if (isChecked) {
    const bonusInput = document.createElement("div");
    bonusInput.classList.add("input-group");
    bonusInput.innerHTML = `
      <label for="bonusDays">Bonus Days:</label>
      <input type="number" id="bonusDays" class="input-field"/>
    `;

    if (document.getElementById("paymentType").checked) {
      extraTaskFields.appendChild(bonusInput);
    } else {
      extraHourlyFields.appendChild(bonusInput);
    }
  } else {
    const bonusDaysFieldHourly = document.getElementById("bonusDays");
    const bonusDaysFieldTask = document.getElementById("bonusDays");

    if (bonusDaysFieldHourly && bonusDaysFieldHourly.parentNode) {
      bonusDaysFieldHourly.parentNode.remove();
    }
    if (bonusDaysFieldTask && bonusDaysFieldTask.parentNode) {
      bonusDaysFieldTask.parentNode.remove();
    }
  }
}

function calculateHourlyIncomeAndBonus() {
  const hourlyRate =
    parseFloat(document.getElementById("hourlyRate").value) || 0;
  const workedHours =
    parseFloat(document.getElementById("workedHours").value) || 0;
  const normalHours =
    parseFloat(document.getElementById("normalHours").value) || 0;
  const bonusDays =
    parseFloat(document.getElementById("bonusDays")?.value) || 0;

  const income = hourlyRate * workedHours + bonusDays * 8 * hourlyRate;
  const bonus =
    workedHours > normalHours
      ? (workedHours - normalHours) * hourlyRate * 1.5
      : 0;

  document.getElementById(
    "incomeResult"
  ).textContent = `Total Income: $${income.toFixed(2)}`;
  document.getElementById(
    "bonusResult"
  ).textContent = `Total Bonus: $${bonus.toFixed(2)}`;
}

function calculateTaskIncomeAndBonus() {
  const hourlyRate =
    parseFloat(document.getElementById("taskHourlyRate").value) || 0;
  const taskCount = parseFloat(document.getElementById("taskCount").value) || 0;
  const taskRateAbove8 =
    parseFloat(document.getElementById("taskRateAbove8").value) || 0;
  const taskCoefficient =
    parseFloat(document.getElementById("taskCoefficient").value) || 0;
  const shifts = parseFloat(document.getElementById("shifts")?.value) || 1;
  const bonusDays =
    parseFloat(document.getElementById("bonusDays")?.value) || 0;

  const normalTasks = shifts * 8;
  const additionalTasks = Math.max(0, taskCount - normalTasks);
  const income =
    normalTasks * hourlyRate * taskCoefficient +
    additionalTasks * taskRateAbove8 +
    bonusDays * 8 * hourlyRate;
  const bonus = additionalTasks * taskRateAbove8;

  document.getElementById(
    "incomeResult"
  ).textContent = `Total Income: $${income.toFixed(2)}`;
  document.getElementById(
    "bonusResult"
  ).textContent = `Total Bonus: $${bonus.toFixed(2)}`;
}
