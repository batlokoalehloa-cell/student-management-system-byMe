# Student Management System

A beginner-friendly React and JavaScript student record application created for the DIWA2110 Web Application Development individual assignment.

## Features

- View student records in a table.
- Add, edit, and delete student records using working modal dialogs.
- Search by student name, ID, email, or course.
- Filter by enrollment status.
- Validate required fields, age, email format, and duplicate student IDs.
- Show dashboard totals and feedback messages.
- Save records in browser `localStorage` so they remain after a refresh on the same browser.
- Responsive layout for desktop and smaller screens.

## Requirements

Install Node.js (which includes npm).

## Run the project locally

1. Open this folder in Visual Studio Code.
2. Open the terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local address Vite shows in the terminal.

## Build locally

Run `npm run build`. Vite creates a production build in the `dist` folder. Hosting and deployment are intentionally not included in this stage.

## Beginner learning notes

- `src/data.js` demonstrates arrays and objects.
- `src/App.jsx` contains state, searching, filtering, and add/edit/delete logic.
- `src/components/StudentTable.jsx` displays reusable table rows and passes actions through props.
- `src/components/StudentModal.jsx` contains form state and validation.
- `src/components/DeleteModal.jsx` asks for confirmation before deletion.
- Most functions use traditional function declarations or function expressions. One short arrow function is included in `src/App.jsx` to demonstrate the assignment's arrow-function requirement without making the code unnecessarily complicated.
- `const` is used for values that are not reassigned; `let` is not needed in every file because most variables are not reassigned. `var` is intentionally avoided because modern JavaScript generally prefers `const` and `let`.

## Notes

The sample records are fictional. `localStorage` only saves data in the current browser on the current device; it is not a shared database. Clear the site's local storage if you want to reset the sample records.
