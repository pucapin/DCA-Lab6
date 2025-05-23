
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import FirebaseComp from "./components/FirebaseComp";
import PostitComponent from "./components/PostitComponent";
import NewTaskComponent from "./components/NewTaskComponent";
import Root from "./root/Root";
import LandingPage from "./pages/LandingPage";

customElements.define('login-page', LoginPage);
customElements.define('signup-page', SignUpPage);
customElements.define('main-page', MainPage)
customElements.define('firebase-comp', FirebaseComp)
customElements.define('post-it', PostitComponent);
customElements.define('new-task', NewTaskComponent);
customElements.define('root-el', Root)
customElements.define('landing-page', LandingPage);