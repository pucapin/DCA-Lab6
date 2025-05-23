
import { fetchList, fetchTasks } from '../Firebase/ListService';
import { ListType, TasksType } from '../utils/Types';
import { getAuth } from "firebase/auth";



class FirebaseComp extends HTMLElement {
    private list: ListType | null = null;
    private tasks: TasksType[] = []; 
    constructor() {
        super();
    }    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        document.body.addEventListener('task-added', async () => {
            await this.fetchAndRender();
        });
        document.body.addEventListener('task-removed', async () => {
            await this.fetchAndRender();
        });
        this.fetchAndRender();
    }

    async fetchAndRender() {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
        console.error("User not logged in");
        return;
        }
        const userId = currentUser.uid;

        this.list = await fetchList(userId);
        if (this.list) {
            this.tasks = await fetchTasks(this.list.id);
        }
        this.render();

    }


    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <style>
         .task-board {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }     
        </style>
            <div class="task-board">
            </div>
        `;
        

        const container = this.shadowRoot.querySelector('.task-board');
        const listId = this.list?.id;

        this.tasks.forEach(element => {
            const postIt = document.createElement('post-it');
            postIt.setAttribute('title', element.title);
            postIt.setAttribute('description', element.description);
            postIt.setAttribute('state', element.done.toString());
            postIt.setAttribute('task-id', element.id);
            postIt.setAttribute('list-id', String(listId))
            container?.appendChild(postIt);
        });
    }
}


export default FirebaseComp;