

class SignUpPage extends HTMLElement {    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }


    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="styles/signup.css" />
        <div class="back">
        <div class="signup-wrapper">
            <form class="signup-card">
            <h2>Create Account 💖</h2>
            <p>Join to start planning today!</p>

            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />

            <button type="submit">Sign Up</button>

            <div class="links">
                <a href="#">Already have an account?</a>
            </div>
            </form>
        </div>
        </div>
        `;

    }
}

export default SignUpPage;