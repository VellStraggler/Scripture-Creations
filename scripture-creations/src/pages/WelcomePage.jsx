import { Title, PageLayout, getImageUrl, toCapitalized, getCategories } from "../Components";
import ProductCarousel from "../Carousel";
import products from '../catalog.json';
import { Link } from "react-router";

function CategoryLinks() {
    const categories = getCategories();
    return (
        <div className="categories">
            {categories.map(category => (
                <div key={category} className = "category">
                    <Link 
                        to={`/categories/${category}`} 
                        onClick={() => window.scrollTo(0, 0)}>
                        <div
                            style={{
                                backgroundImage: `url(${getImageUrl(`categories/${category}.jpg`)})`
                            }}>
                            <h2>
                                {toCapitalized(category)}
                            </h2>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

function WelcomeCarousel() {
    return (
        <ProductCarousel products={ products}/>
    );
}

function Welcome() {
    return(
        <div>
            <WelcomeCarousel />
            <Title text="Categories"/>
            <CategoryLinks />
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