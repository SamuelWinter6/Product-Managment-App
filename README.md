# 🛍️ Product Management App

This is a full-stack product management system built with:

- **Frontend**: React.js (Vite)
- **Backend**: Node.js + Express
- **Database**: MySQL2 (Aiven)
- **Deployment**: Render (both frontend and backend)
- **Form Handling**: React Hook Form
- **API Calls**: Axios

---

## ✅ Features

### 🧩 Core Functionality
- Add, edit, and delete products
- Image preview on input (onBlur)
- Validation with clear error messages
- Full error handling on API endpoints
- Multi-select delete system with styled checkboxes
- Product detail view (editable)
- Axios-powered API calls from frontend

### 🎨 UI & Design
- Responsive, dark-themed layout
- Table view with ID, name, description, and price
- Popup product form overlay
- Icons and button styling for intuitive UX

---

## 🛠️ Tech Stack

| Layer       | Tech                |
|-------------|---------------------|
| Frontend    | React + Vite        |
| Backend     | Express + Node.js   |
| DB          | Aiven MySQL         |
| Styling     | CSS Modules         |
| Deployment  | Render              |

---

## 🚀 Setup

### 📦 Backend

```bash
cd backend
npm install
node index.js
```

Ensure your `.env` is set correctly and `ca.pem` is loaded as a secret file in production.

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

Make sure `productApi.js` points to your correct backend URL.

---

## 🔐 Deployment Notes

- Backend uses secure CA cert from Render Secrets: `/etc/secrets/ca.pem`
- Environment variables are used for DB credentials
- Render root directories are `backend/` and `client/`

---

## 📄 Author

Developed by Samuel Winter (2025)

---