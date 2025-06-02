
Full Stack Registration Form Project (React + Express + Multer + MongoDB Atlas)
================================================================================

📁 Folder Structure:
--------------------
registration-app/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── RegistrationForm.jsx
│   │   └── index.js
│   └── package.json
├── server/                    # Backend Express server
│   ├── index.js
│   ├── models/
│   │   └── User.js
│   ├── uploads/               # Folder where uploaded files will be stored
│   └── package.json
└── README.txt (this file)

🔧 Step-by-Step Instructions:
-----------------------------

1. 📦 Initialize Backend (server):
----------------------------------
- Create a folder called `server`
- Inside it, run: `npm init -y`
- Install dependencies:
  ```bash
  npm install express multer mongoose cors
  ```

- Create `server/index.js` with the following:
  - Set up Express server
  - Configure Multer for file upload
  - Connect to MongoDB Atlas
  - Handle POST request to `/register`

- Create `server/models/User.js` for Mongoose schema.

2. 🎨 Setup Frontend (client):
------------------------------
- Run `npx create-react-app client`
- Install axios: `npm install axios`
- Replace contents of `App.jsx` and `index.js`
- Create a new component `RegistrationForm.jsx` and implement the form

3. ✍️ RegistrationForm.jsx Overview:
-------------------------------------
- All form fields (name, email, dob, residential and permanent address)
- One checkbox: if checked, permanent address is copied from residential
- One file input: uploads file
- On submit, form data is packaged using FormData and sent to backend

4. 🧠 Improvements Added:
--------------------------
- Form values are stored in a single state object (`form`)
- Checkbox updates permanent address automatically
- File uploaded using `FormData`
- Added success/failure handling
- Reset form after successful submission

🧪 Running the App:
-------------------
1. Start backend:
   ```bash
   cd server
   node index.js
   ```

2. Start frontend:
   ```bash
   cd client
   npm start
   ```

Ensure MongoDB Atlas URI is correctly added in the backend `index.js`.

✅ Current Status:
------------------
- Form accepts user data + file
- Stores in MongoDB + uploads file
- Frontend and backend are connected
- Next Step: Add display functionality for submitted data

