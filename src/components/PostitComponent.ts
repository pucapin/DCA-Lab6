
import { deleteTask } from "../Firebase/DeleteTaskService";
import { updateTaskState } from "../Firebase/UpdateTaskService";

class PostitComponent extends HTMLElement {
    taskId!: string;
    listId!: string;
    done = false;

    constructor() {
        super();
    }    
    async connectedCallback() {
        this.taskId = this.getAttribute('task-id')!;
        this.listId = this.getAttribute('list-id')!;
        this.done = this.getAttribute('state') === 'true';
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    updateStateButton() {
        if (!this.shadowRoot) return;
        const stateBtn = this.shadowRoot.getElementById('state');
        if (!stateBtn) return;

        if(this.done === true) {
                stateBtn.textContent  = 'Mark as Not Done'
                stateBtn.style.backgroundColor = '#f87171' 
        } else {
                stateBtn.textContent  = '✓ Mark as Done'
                stateBtn.style.backgroundColor = ' #4ade80'       
        }
    }

    render() {

        if (!this.shadowRoot) return;
                
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/main.css"/>

        <div class="task-card">
            <button class="remove-btn" id="remove" title="Remove Task">×</button>
            <h3>${this.getAttribute('title')}</h3>
            <p>${this.getAttribute('description')}</p>
            <button class="done-btn" id="state">✓ Mark as done</button>
        </div>
        `;
        this.updateStateButton();
        const stateBtn = this.shadowRoot.getElementById('state');

        const removeBtn = this.shadowRoot.getElementById('remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', async() => {
                if (!this.listId || !this.taskId) {
                console.error('Missing listId or taskId');
                return;
                }
                try {
                    await deleteTask(this.listId, this.taskId);
                    this.dispatchEvent(new CustomEvent('task-removed', {
                    bubbles: true,
                    composed: true
                }))
                } catch (err) {
                    console.error('Error deleting task:', err);
                }
            })
        }
        if (stateBtn) {
            stateBtn.addEventListener('click', async () => {
                const newState = !this.done
                await updateTaskState(this.listId, this.taskId, newState);
                this.done = newState;
                this.updateStateButton()
                // Update UI      
            });
        }

    }
}


export default PostitComponent;