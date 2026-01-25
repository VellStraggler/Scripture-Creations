import { Header, Navigation, Title, Footer, MediumImage} from "./Components.jsx";
import sendIcon from "./assets/send_icon.png";

function Contact() {
    return (
        <div className="content">
            <form className="form-section"
                action="https://formspree.io/f/xkoonvej"
                method="POST">
                Your email
                <input type="email" name="email" />
                Your message
                <textarea name="message" rows="4"></textarea>
                <div>
                    <button type="submit">
                        <h3>
                        Send
                        </h3>
                        <span className="expanding-dots">
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                            <span>·</span>
                        </span>
                        <img src={sendIcon} height="24px"></img>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="container">
            <Header/>
            <Navigation />
            <Title text="Contact Us"/>
            <Contact/>
            <Footer/>
        </div>
    );
}