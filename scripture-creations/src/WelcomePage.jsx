import { PageLayout } from "./Components";

function WelcomeCarousel() {
    return (
        <div>
            
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