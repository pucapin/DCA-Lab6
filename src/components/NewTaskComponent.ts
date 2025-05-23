import { addTaskToList } from "../Firebase/AddTaskService";
import { ListType } from "../utils/Types";
import { fetchList } from "../Firebase/ListService";
import { getAuth } from "firebase/auth";

class NewTaskComponent extends HTMLElement {
    private list: ListType | null = null;
    constructor() {
        super();
    }    
    async connectedCallback() {
        
        this.attachShadow({ mode: 'open' });
        const auth = getAuth();
                const currentUser = auth.currentUser;
        
                if (!currentUser) {
                console.error("User not logged in");
                return;
                }
                const userId = currentUser.uid;
        this.list = await fetchList(userId);
        this.render();
    }


    render() {
        if (!this.shadowRoot) return;

        const listId = this.list?.id;

        this.shadowRoot.innerHTML = `
        <style>
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
        margin-top: 10px;
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
            <div class="form-area">
                <div class="postit-form">
                <input type="text" placeholder="Title" id="taskTitle" />
                <textarea placeholder="Description" id="taskDescription"></textarea>
                </div>
                <img src="images/pencil.png" alt="Pencil" class="pencil-icon" />
            </div>

            <button class="add-button">Add</button>
        `;
        const addBtn = this.shadowRoot.querySelector('.add-button');
        addBtn?.addEventListener('click', async() => {
            const titleInput = this.shadowRoot?.getElementById('taskTitle') as HTMLInputElement;
            const descriptionInput = this.shadowRoot?.getElementById('taskDescription') as HTMLInputElement;
            /////////
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            if(!title || !description) {
                alert('Please enter a Task title and description :3');
                return;
            }

            if(listId) {
                await addTaskToList(listId, title, description);
                this.dispatchEvent(new CustomEvent('task-added', {
                    bubbles: true,
                    composed: true
                }))
            };
        })

    }
}


export default NewTaskComponent;