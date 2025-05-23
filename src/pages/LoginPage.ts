import { loginUser } from "../Firebase/LoginUser";
import Navigate from "../utils/Navigate";
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
            <form class="login-card" id="login-form">
            <h2>Welcome Back 🌈</h2>
            <p>Please login to your account</p>

            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />

            <button type="submit">Login</button>
            <div class="links">
                <p id="signup"  navigate-to="/signup">Sign Up</p>
            </div>
            </form>
        </div>
        </back>
        `;
        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#login-form')!;
        if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            console.log('Login submitted with:', { email, password });
            loginUser(email, password)
            Navigate('/home');

        });

        const signUp = this.shadowRoot!.querySelector('#signup');
        signUp?.addEventListener('click', () => {
            const path = signUp.getAttribute('navigate-to');
            if (path) {
                    Navigate(path);
            }
        });

    }
    }
}

export default LoginPage;