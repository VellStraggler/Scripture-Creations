import { NavLink } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div className="container">
            <Header />
            <Navigation />
            <Title text="Checkout"/>
            <div className="content">
                <div>
                    Your payment has been processed, and your receipt has been mailed to you.
                </div>
                <NavLink to="/" title="Home Page" className="nice-button">
                    Back to Home
                </NavLink>
            </div>
            <Footer />
        </div>
    );
}