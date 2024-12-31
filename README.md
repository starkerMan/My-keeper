# 📝 My Keeper App

My Keeper App is a full-stack, feature-rich note-taking application designed to showcase advanced web development skills.
It allows users to create, manage, and archive notes, leveraging modern technologies and best practices in frontend and backend development.

## 🌟 Features

- **Rich Text Editing**:
  - Integrated with a customizable **Draft.js** editor for rich text formatting (bold, italic, headers, lists).
- **Tag Management**:
  - Add tags to notes and filter notes by multiple tags for better organization.
- **Note Archiving**:
  - Archive notes to declutter the active workspace while maintaining access to older content.
- **Authentication**:
  - Secure user authentication and authorization using **Firebase Auth**.
- **Real-Time Database**:
  - Persistent data storage and synchronization with **Firestore**.
- **Search Functionality**:
  - Full-text search for titles and content, with support for case-insensitive and partial matches.
- **Responsive Design**:
  - Fully responsive interface built with **React** and styled using **Tailwind CSS**.
- **Role-based Routing**:
  - Protects routes for authenticated users and redirects unauthorized access.
- **Persistent Storage**:
  - Notes persist between sessions via Firestore, with fallback local storage for offline functionality.

## 🛠️ Technologies Used

### **Frontend**

- **React**: Modern, component-based UI library for building dynamic user interfaces.
- **Draft.js**: Integrated rich text editor for flexible note formatting.
- **Tailwind CSS**: Utility-first CSS framework for rapid and responsive design.
- **React Router**: Seamless navigation with protected and dynamic routes.

### **Backend**

- **Firebase Firestore**: NoSQL database for scalable, real-time data storage.
- **Firebase Authentication**: Secure and scalable user authentication.

### **Other Tools**

- **React Icons**: Intuitive icon library for user-friendly interfaces.
- **ESLint & Prettier**: Code quality and formatting tools to ensure maintainable code.

## 🚀 Features Added to Showcase My Skills

- **Rich Text Editor Integration**:
  - Implemented using **Draft.js** to enable advanced text formatting options.
- **Firestore Integration**:
  - Designed a scalable database schema and implemented CRUD operations for notes.
- **State Management**:
  - Managed global and local states effectively using React hooks and context.
- **Tag Filtering**:
  - Built a dynamic filtering system to allow multi-tag selection for organizing notes.
- **Authentication**:
  - Implemented a secure login and signup system using Firebase.
- **Responsive Design**:
  - Ensured usability across devices with a fully responsive layout using Tailwind CSS.

## 🔧 Steps to Run and Test the App

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/my-keeper
   cd my-keeper
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Setup Firebase**:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore Database** and **Authentication** (email/password).
   - Add your Firebase configuration to a `firebase.js` file in the `src` directory:

     ```javascript
     import { initializeApp } from "firebase/app";

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     const app = initializeApp(firebaseConfig);
     ```

4. **Run the App**:

   ```bash
   npm start
   ```

5. **Test Features**:
   - **Signup/Login**: Register or log in to your account.
   - **Create Notes**: Add notes with formatted content and tags.
   - **Archive Notes**: Archive notes to test the archive functionality.
   - **Filter Notes**: Test multi-tag filtering and search functionality.

## 📸 Screenshots

### **Home Page**

![Home Page](https://via.placeholder.com/800x400.png?text=Add+Screenshot+Here)

### **Rich Text Editor**

![Rich Text Editor](https://via.placeholder.com/800x400.png?text=Add+Screenshot+Here)

### **Search and Filter**

![Search and Filter](https://via.placeholder.com/800x400.png?text=Add+Screenshot+Here)

## 💼 Why This Project?

This project demonstrates my ability to:

- Build dynamic, user-focused applications using **React** and **Tailwind CSS**.
- Integrate advanced features like **rich text editing** and **multi-tag filtering**.
- Design and implement **secure authentication** and **persistent data storage**.
- Optimize for performance and scalability with **Firestore** and **Firebase**.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📫 Contact

- **Email**: starker_typo.0c@icloud.com
- **LinkedIn**: [Your LinkedIn](https://www.linkedin.com/in/mejri-oregon)
- **GitHub**: [GitHub 1](https://github.com/seifedd) [GitHub 2](https://github.com/starkerMan)
