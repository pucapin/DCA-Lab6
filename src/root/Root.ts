import { State, store } from "../flux/Store";
import { UserActions } from "../flux/Actions";

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.handleRouteChange = this.handleRouteChange.bind(this);
        store.subscribe((state: State) => {this.handleRouteChange(state)});
        UserActions.checkAuth();
    }

    connectedCallback() {
        this.render();
        this.handleRouteChange();
    }

    handleRouteChange(state = store.getState()) {
        if (!this.shadowRoot) return;
        const path = state.currentPath || window.location.pathname;
        window.history.replaceState({}, '', path); // Actualiza la URL sin recargar la página
        const content = this.shadowRoot.querySelector('#content');
        if (!content) return;
        content.innerHTML = '';
        console.log(path);
        switch (path) {
            case '/':
                content.innerHTML = `<landing-page></landing-page>`;
                break;
            case '/home':
                content.innerHTML = `<main-page></main-page>`;
                break;
            case '/login':
                content.innerHTML = `<login-page></login-page>`;
                break;
            case '/signup':
                content.innerHTML = `<signup-page></signup-page>`;
                break;
            default:
                content.innerHTML = `<h1>404 - Página no encontrada</h1>`;
                break;
        }
    }
    render() {
        if (!this.shadowRoot) return;
            
        this.shadowRoot.innerHTML = `
                <div id="content">
                </div>
        `;
    }
}

export default Root;