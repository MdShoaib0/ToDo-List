# **Todo List Application - MERN Stack**  

A **full-stack Todo List application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with a **vanilla JavaScript frontend** (no React) and **GSAP animations** for smooth UI interactions.  

## **🔗 Live Demo**  
[👉 Check it out here!](#) *(Add your live link when deployed)*  

---

## **✨ Features**  
✅ **Create tasks** with title, description, and category  
✅ **Delete tasks** with confirmation  
✅ **Update tasks** (edit existing tasks)  
✅ **Mark tasks as complete** (with visual feedback)  
✅ **Filter tasks by category**  
✅ **Smooth GSAP animations** for better UX  
✅ **Full CRUD operations** (Create, Read, Update, Delete)  
✅ **Responsive design** (works on mobile & desktop)  

---

## **🛠 Tech Stack**  
### **Frontend**  
- **HTML5** (Structure)  
- **CSS3** (Styling)  
- **JavaScript (ES6+)** (Functionality)  
- **GSAP (GreenSock Animation Platform)** (Animations)  

### **Backend**  
- **Node.js** (Runtime)  
- **Express.js** (Server Framework)  
- **MongoDB** (Database)  
- **Mongoose** (ODM for MongoDB)  

### **APIs**  
- **RESTful API** (For task management)  

---

## **🚀 Getting Started**  

### **Prerequisites**  
- Node.js (v14+)  
- MongoDB (local or cloud)  
- Git (for version control)  

### **Installation**  

#### **1. Clone the repository**  
```bash
git clone https://github.com/your-username/todo-list-mern.git
cd todo-list-mern
```

#### **2. Set up the Backend**  
```bash
cd Backend
npm install
```

#### **3. Set up Environment Variables**  
Create a `.env` file in the `Backend` folder:  
```env
COMPASS_URI=mongodb+srv://your-mongodb-connection-string
PORT=5000
```

#### **4. Start the Backend Server**  
```bash
npm start
# Server runs on http://localhost:5000
```

#### **5. Set up the Frontend**  
Open `Frontend/index.html` in a browser (no server needed, works with Live Server in VSCode).  

---

## **📂 Project Structure**  

### **Frontend** (`/Frontend`)  
- `index.html` - Main HTML file  
- `styles.css` - Styling  
- `script.js` - Main JavaScript logic  
- `animations.js` - GSAP animations  

### **Backend** (`/Backend`)  
- `server.js` - Express server setup  
- `routes/` - API endpoints  
- `models/` - MongoDB schemas  
- `Database.js` - MongoDB connection  

---

## **🔌 API Endpoints**  

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT`  | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |

---

## **🎥 Demo (Screenshots/GIF)**  
*(Add screenshots or a GIF of your app in action)*  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

## **💡 Future Improvements**  
- [ ] Add user authentication  
- [ ] Implement drag-and-drop reordering  
- [ ] Dark mode toggle  
- [ ] Task due dates & reminders  

---

## **🙏 Credits**  
- **GSAP** for animations  
- **MongoDB Atlas** for cloud database  

---

## **📬 Contact**  
👤 **Your Name**  
📧 your-email@example.com  
🌐 [your-portfolio.com](#)  

---

### **🌟 Enjoy the Todo List App!** 🚀  


git remote add origin https://github.com/MdShoaib0/ToDo-List.git
git branch -M main
git push -u origin main