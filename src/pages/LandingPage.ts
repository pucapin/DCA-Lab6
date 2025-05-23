import Navigate from "../utils/Navigate";
class LandingPage extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/landing.css"/>
        <div class="back">
        <div class="landing-container">
            <h1>Welcome to Your To Do List</h1>
            <p>Stay organized every day!</p>
            <div class="landing-buttons">
            <button class="login-btn" navigate-to='/login'">Log In</button>
            <button class="signup-btn" navigate-to='/signup'">Sign Up</button>
            </div>
        </div>
        <div>
        `;

        const loginBtn = this.shadowRoot.querySelector('.login-btn');
        const signBtn = this.shadowRoot.querySelector('.signup-btn');
        
        loginBtn?.addEventListener('click', () => {
                const path = loginBtn.getAttribute('navigate-to');
                if (path) {
                    Navigate(path);
                }
            });
        signBtn?.addEventListener('click', () => {
                const path = signBtn.getAttribute('navigate-to');
                if (path) {
                    Navigate(path);
                }
            });
        };
}

export default LandingPage;