import { NavLink } from "react-router-dom";
import { PageLayout } from "../Components";

function Success() {
    return (
        <div>

        <div className="text">
            Your payment has been successfully processed, and your receipt has been mailed to you. Thank you for shopping at Scripture Creations.
            <div className="centered">

        </div>
                <NavLink to="/" title="Home Page" className="nice-button">
                    Back to Home
                </NavLink>
            </div>
        </div>
    );
}
export default function SuccessPage() {
    return (
        <PageLayout title="Checked Out">
            <Success/>
        </PageLayout>
    );
}