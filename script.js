const GRADES = [
  { label: "A", points: 4.0 },
  { label: "A-", points: 3.7 },
  { label: "B+", points: 3.3 },
  { label: "B", points: 3.0 },
  { label: "B-", points: 2.7 },
  { label: "C+", points: 2.3 },
  { label: "C", points: 2.0 },
  { label: "C-", points: 1.7 },
  { label: "D+", points: 1.3 },
  { label: "D", points: 1.0 },
  { label: "F", points: 0.0 },
];


function getRank(gpa) {
  if (gpa >= 3.5) return "ممتاز";
  if (gpa >= 3.0) return "جيد جداً";
  if (gpa >= 2.0) return "جيد";
  if (gpa >= 1.0) return "مقبول";
  return "ضعيف";
}

const STORAGE_KEY = "my-gpa-courses";

const coursesEl = document.getElementById("courses");
const gpaEl = document.getElementById("gpa");
const rankEl = document.getElementById("rank");
const totalHoursEl = document.getElementById("totalHours");
const totalPointsEl = document.getElementById("totalPoints");


function createRow(course = {}) {
  const row = document.createElement("div");
  row.className = "course";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "name";
  nameInput.placeholder = "اسم المادة";
  nameInput.setAttribute("aria-label", "اسم المادة");
  nameInput.value = course.name || "";

  const hoursInput = document.createElement("input");
  hoursInput.type = "number";
  hoursInput.className = "hours";
  hoursInput.min = "0";
  hoursInput.step = "0.5";
  hoursInput.placeholder = "الساعات";
  hoursInput.setAttribute("aria-label", "الساعات المعتمدة");
  hoursInput.value = course.hours || "";

  const gradeSelect = document.createElement("select");
  gradeSelect.className = "grade";
  gradeSelect.setAttribute("aria-label", "التقدير");
  GRADES.forEach((g) => {
    const option = document.createElement("option");
    option.value = g.points;
    option.textContent = `${g.label} (${g.points.toFixed(1)})`;
    if (course.grade !== undefined && Number(course.grade) === g.points) {
      option.selected = true;
    }
    gradeSelect.appendChild(option);
  });

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "remove";
  removeBtn.setAttribute("aria-label", "حذف المادة");
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => {
    row.remove();
    update();
  });

  row.append(nameInput, hoursInput, gradeSelect, removeBtn);
  coursesEl.appendChild(row);
}


function calculate() {
  let totalHours = 0;
  let totalPoints = 0;

  coursesEl.querySelectorAll(".course").forEach((row) => {
    const hours = parseFloat(row.querySelector(".hours").value);
    const points = parseFloat(row.querySelector(".grade").value);
    if (hours > 0) {
      totalHours += hours;
      totalPoints += hours * points;
    }
  });

  if (totalHours === 0) {
    gpaEl.textContent = "—";
    rankEl.textContent = "";
  } else {
    const gpa = totalPoints / totalHours;
    gpaEl.textContent = gpa.toFixed(2);
    rankEl.textContent = getRank(gpa);
  }

  totalHoursEl.textContent = totalHours;
  totalPointsEl.textContent = totalPoints.toFixed(2);
}


function save() {
  const data = [];
  coursesEl.querySelectorAll(".course").forEach((row) => {
    data.push({
      name: row.querySelector(".name").value,
      hours: row.querySelector(".hours").value,
      grade: row.querySelector(".grade").value,
    });
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("فشل حفظ البيانات:", e);
  }
}

function update() {
  calculate();
  save();
}


function load() {
  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    saved = [];
  }
  if (saved.length === 0) {
    createRow();
    createRow();
    createRow();
  } else {
    saved.forEach(createRow);
  }
  calculate();
}


coursesEl.addEventListener("input", update);
coursesEl.addEventListener("change", update);

document.getElementById("addBtn").addEventListener("click", () => {
  createRow();
  update();
  const names = coursesEl.querySelectorAll(".name");
  names[names.length - 1].focus();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm(" حذف جميع المواد؟")) {
    coursesEl.innerHTML = "";
    createRow();
    createRow();
    createRow();
    update();
  }
});

load();
