

class LoginPage extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/login.css"/>
        <back class="back">
        <div class="login-wrapper">
            <form class="login-card">
            <h2>Welcome Back 🌈</h2>
            <p>Please login to your account</p>

            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />

            <button type="submit">Login</button>
            <div class="links">
                <a href="sign-up">Sign Up</a>
            </div>
            </form>
        </div>
        </back>
        </body>
        `;

    }
}

export default LoginPage;