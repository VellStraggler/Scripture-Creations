import { DivDown, PageLayout} from "./Components.jsx";
import sendIcon from "./assets/send_icon.png";

function Contact() {
    return (
        <div>
            <div className="text">
                Your feedback is important to us, as are your questions. We often
                respond within 48 hours and will help in any way we can!
            </div>
            <form className="form-section"
                action="https://formspree.io/f/xkoonvej"
                method="POST">
                <DivDown>
                    <label>Your email</label>
                    <input type="email" name="email" />
                    <label>Your message</label>
                    <textarea name="message" rows="4"></textarea>
                </DivDown>
                <div>
                    <button type="submit">
                        <h3>
                        Send
                        </h3>
                        <span className="expanding-dots">
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
        <PageLayout title="Contact Us" SubPage={Contact}/>
    );
}