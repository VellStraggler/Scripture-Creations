import { PageLayout } from "./Components";

function WelcomeCarousel() {
    return (
        <div className="text">
            Under Construction!
        </div>
    );
}

function Welcome() {
    return(
        <div>
            <WelcomeCarousel />
        </div>
    );
}

export default function WelcomePage() {
    return (
        <PageLayout title="Welcome to Scripture Creations" SubPage={Welcome}/> 
    );
}