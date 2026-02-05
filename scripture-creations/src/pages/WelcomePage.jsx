import { Title, PageLayout } from "../Components";
import ProductCarousel from "../Carousel";
import products from '../catalog.json';

function WelcomeCarousel() {
    return (
        <ProductCarousel products={ products}/>
    );
}

function Welcome() {
    return(
        <div>
            <WelcomeCarousel />
            <Title text=""/>
            <div className = "text">
                Categories will go here.
            </div>
        </div>
    );
}

export default function WelcomePage() {
    return (
        <PageLayout title="Welcome to Scripture Creations">
            <Welcome/>
        </PageLayout> 
    );
}