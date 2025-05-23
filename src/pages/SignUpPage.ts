import Navigate from "../utils/Navigate";
import { registerUser } from "../Firebase/RegisterUser";
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
            <form class="signup-card" id="register-form">
            <h2>Create Account 💖</h2>
            <p>Join to start planning today!</p>

            <input type="username" name="username" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>

            <div class="links">
                <p id="sign-in" navigate-to="/login">Already have an account?</p>
            </div>
            </form>
        </div>
        </div>
        `;

        const signIn = this.shadowRoot!.querySelector('#sign-in');
                signIn?.addEventListener('click', () => {
                    const path = signIn.getAttribute('navigate-to');
                    if (path) {
                            Navigate(path);
                    }
        });

        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#register-form')!;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {
            username: formData.get('username') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            }

            if (data.password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        registerUser(data.email, data.password, data.username)
            .then((response) => {
                if (!response.isRegistered) {
                    console.error('Error al registrar el usuario:', response.error);
                    alert('Error al registrar el usuario. Por favor, verifica tus datos.');
                    return;
                }
                alert('Usuario registrado exitosamente.');
                console.log('Usuario registrado:', response);
                Navigate('/home');
            })
            .catch((error) => {
                console.error('Error al registrar el usuario:', error);
                alert('Ocurrió un error. Por favor, intenta nuevamente.');
            });

        });
    }
}

export default SignUpPage;