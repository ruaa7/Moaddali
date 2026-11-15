# Mo'addali | GPA Calculator

A simple GPA calculator built with HTML, CSS, and JavaScript. Add your courses, credit hours, and grades to get your GPA instantly.

## Purpose of the Project

University students often need to check their GPA during the semester or plan the grades they need. This project gives them a quick, clean tool to calculate it, with no installation, no server, and no sign-up. It was built as the final project for the Software Maintenance course to practice Git and GitHub (repositories, branches, commits, and merges).

## Key Features

- Add as many courses as you need, and remove any course with one click.
- Enter the course name, credit hours, and grade for each course.
- The GPA updates instantly whenever you change a value.
- Shows total credit hours, total grade points, and a short rating (Excellent, Very Good, ...).
- Your courses are saved in the browser (localStorage), so they are still there when you reopen the page.
- Arabic interface (right-to-left) that works on desktop and mobile.

## How the GPA Is Calculated

GPA = sum(credit hours x grade points) / sum(credit hours)
The grade scale is on a 4.0 system (A = 4.0, A- = 3.7, B+ = 3.3, ... F = 0). You can change it in the GRADES array at the top of script.js.

## Technologies

- HTML5
- CSS3
- JavaScript (vanilla)

## How to Run

1. Clone the repository:
   bash
   git clone https://github.com/ruaa7/moaddali
2. Open the project folder.
3. Open index.html in any browser.

## Project Structure

├── index.html   # page structure
├── style.css    # styling
├── script.js    # GPA logic and saving
└── README.md    # project documentation


## Contributors

- Student Name: Ruaa Yousif
- Student Name: Emadh Mufadal
