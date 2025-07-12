# Employee Management Web Application

A responsive, modular, and dynamic web interface for managing employee records. The application enables viewing, adding, editing, deleting, filtering, sorting, searching, and paginating employee data using modern front-end technologies.

---

## 📁 Project Structure
```
Employee-Management/
├── client/
│ ├── pages/
│ ├── App.jsx
│ ├── styles.css
├── public/
│ ├── placeholder.svg
│ ├── robots.txt
├── shared/
│ ├── employee.js
├── index.html
├── .dockerignore
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
├── vite.config.js
```
- `client/pages/`: Components for different views (index.js, Notfound.js).
- `public/`: Static assets (icons, images, metadata files).
- `shared/employee.js`: JavaScript array simulating employee data.
- `App.jsx`: Main application logic and rendering.
- `styles.css`: Centralized styling for layout and components.
- `index.html`: Entry point for the application.

---

## 🚀 Features

- **Employee Dashboard**

  - Displays all employees in card or grid view.
  - Edit and Delete operations for each employee.
  - Responsive layout with clean UI.

- **Add/Edit Form**

  - Add new employee with required field validation.
  - Edit employee data with pre-filled form.
  - Cancel functionality to discard unsaved edits.

- **Filtering & Sorting**

  - Filter employees by department, role, and name.
  - Sort by First Name and Department.
  - Combined filter, sort, and search capabilities.

- **Search Functionality**

  - Instant search by first name, last name, or email.

- **Pagination**

  - Selectable page sizes (10, 25, 50, 100).
  - Page navigation with dynamic re-rendering.

- **Responsive Design**

  - Optimized for desktop, tablet, and mobile devices.
  - CSS media queries and flexible layouts.

- **Client-side Data Handling**
  - Employee data is maintained in-memory using a static JavaScript array.
  - No external backend or database required.

---

## 🛠️ Technologies Used

- **Vite** – Lightning-fast development build tool.
- **React (JSX)** – Component-based UI rendering.
- **JavaScript (ES6+)** – Logic and DOM manipulation.
- **CSS** – Responsive layout and component styling.
- **SVG** – Placeholder assets.
- **HTML5** – Semantic structure and accessibility.

---

### Prerequisites

- Node.js and npm installed on your machine.

---

## 🛠️ Technologies Used

- **Vite** – Lightning-fast development build tool.
- **React (JSX)** – Component-based UI rendering.
- **JavaScript (ES6+)** – Logic and DOM manipulation.
- **CSS** – Responsive layout and component styling.
- **SVG** – Placeholder assets.
- **HTML5** – Semantic structure and accessibility.

---

## ⚙️ How to Run Locally

### Setup Instructions

# 1. Clone the repository

git clone https://github.com/kotnibhargavi/Ajackus-Assesment-Employee-Directory-.git

# 2. Navigate into the project directory

cd employee-management

# 3. Install dependencies

npm install

# 4. Start the development server

npm run dev

### 📌 Notes on Implementation

    - The project uses client-side state to manage employee data without any backend.

    - Filtering, searching, and sorting logic is implemented in vanilla JavaScript within React components.

    - Pagination is performed on filtered/sorted data to ensure accurate display.

    - The design is kept intentionally minimal and accessible for a clean user experience.

### 📂 Future Enhancements

    - Persist employee data using browser storage (localStorage) or backend integration.

    - Add confirmation modals for edit/delete actions.

    - Introduce animations and transition effects for smoother UX.

    - Advanced filtering options (multi-select, date of joining, etc.).

    - Unit testing and CI/CD pipeline integration.

### ✅ Project Highlights

    - Fully functional CRUD interface.

    - Clean, modular, and commented code.

    - Designed with scalability and responsiveness in mind.

    - Built using modern tools and development best practices.
