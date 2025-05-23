import { State, store } from "../flux/Store";
import { getAuth } from "firebase/auth";
import { fetchUserInfo } from "../Firebase/FetchUser";
import { logoutUser } from "../Firebase/LogOutService";

class MainPage extends HTMLElement {
    private userName: string = '';

    async connectedCallback() {
        this.attachShadow({ mode: 'open' });
        store.subscribe((state: State) => {this.render(state)});

        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userId = currentUser.uid;
        const userInfo = await fetchUserInfo(userId);
        this.userName = userInfo?.username || "User";

        this.render();
    }

    render(state = store.getState()) {
        if (!state || !state.isAuthenticated) {
            this.shadowRoot!.innerHTML = `<h1>Acceso denegado</h1>`;
            return;
        }
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

        </style>
        <div class="back">
        <button id="logoutBtn" class="logout-button">Log Out</button>

        <div class="main-container" id="main">
            <header class="header">
            <h1>${this.userName}'s To Do List</h1>
            <button class="add-task" id="openOverlay">+ Add New Task</button>
            </header>
            <firebase-comp></firebase-comp>

        <div class="overlay" id="overlay">
            <div class="overlay-content">
            <button class="go-back" id="closeOverlay">Go Back !</button>
            <new-task></new-task>
            </div>
            </div>
        </div>
        `;

        const logOut = this.shadowRoot.getElementById("logoutBtn");
        const overlay = this.shadowRoot.getElementById("overlay");
        const main = this.shadowRoot.getElementById("main");
        const newTask = this.shadowRoot.getElementById("openOverlay")
        const closeOverlay = this.shadowRoot.getElementById("closeOverlay");

        logOut?.addEventListener('click', () => {
            logoutUser();
        })

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

        this.addEventListener('task-added', () => {
            if(!overlay) return;
            overlay.style.display = "none";
        })

    }
}

export default MainPage;