

class MainPage extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/main.css"/>
        <style>

        .overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        z-index: 100;
        }

        .overlay-content {
        background: #fef08a;
        padding: 2rem;
        border-radius: 16px;
        width: 100%;
        max-width: 520px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .go-back {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: transparent;
        border: none;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        }

        .form-area {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-top: 2rem;
        }

        .pencil-icon {
        width: 70px;
        height: auto;
        }

        .postit-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        }

        .postit-form input,
        .postit-form textarea {
        font-family: 'Poppins', sans-serif;
        width: 90%;
        padding: 0.75rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        background: #fffbe7;
        resize: none;
        }

        textarea {
        height: 100px;
        }

        .add-button {
        align-self: flex-start;
        background: #f59e0b;
        color: white;
        width: 100px;
        height: 32px;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
        }

        .add-button:hover {
        background: #d97706;
        }

        </style>
        <div class="back">
        <div class="main-container" id="main">
            <header class="header">
            <h1>Isabella's To Do List</h1>
            <button class="add-task" id="openOverlay">+ Add New Task</button>
            </header>

            <div class="task-board">
            <div class="task-card">
                <h3>Mock Task</h3>
                <p>This is your first task. Make it happen!</p>
            </div>
        </div>

        <div class="overlay" id="overlay">
            <div class="overlay-content">
            <button class="go-back" id="closeOverlay">Go Back !</button>

            <div class="form-area">
                <div class="postit-form">
                <input type="text" placeholder="Title" id="taskTitle" />
                <textarea placeholder="Description" id="taskDescription"></textarea>
                </div>
                <img src="images/pencil.png" alt="Pencil" class="pencil-icon" />
            </div>

            <button class="add-button">Add</button>
            </div>
            </div>
        </div>
        `;
        const overlay = this.shadowRoot.getElementById("overlay");
        const main = this.shadowRoot.getElementById("main");
        const newTask = this.shadowRoot.getElementById("openOverlay")
        const closeOverlay = this.shadowRoot.getElementById("closeOverlay");

        newTask?.addEventListener('click', () => {
            if(!overlay) return;
            if(!main) return;
            overlay.style.display = "flex";
        })

        closeOverlay?.addEventListener('click', () => {
            if(!overlay) return;
            if(!main) return;
            overlay.style.display = "none";
        })

    }
}

export default MainPage;