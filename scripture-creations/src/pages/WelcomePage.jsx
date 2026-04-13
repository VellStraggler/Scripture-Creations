import { Title, PageLayout, getImageUrl, toCapitalized, getCategories } from "../Components";
import ProductCarousel from "../Carousel";
import products from '../catalog.json';
import { Link } from "react-router";

function addScores(category) {
    return category.replaceAll(" ", "_")
}

function CategoryLinks() {
    const categories = getCategories();
    return (
        <div className="categories">
            <Title text="Categories" basic={true}/>
            {categories.map(category => (
                <div key={category} className = "category">
                    <Link 
                        to={`/categories/${category}`} 
                        onClick={() => window.scrollTo(0, 0)}>
                        <div
                            style={{
                                backgroundImage: `url(${getImageUrl(`categories/${addScores(category)}-md.webp`)})`
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
            <CategoryLinks />
        </div>
    );
}

export default function WelcomePage() {
    return (
        <PageLayout title=<i>"Strengthening Families in Jesus Christ"</i>>
            <Welcome/>
        </PageLayout> 
    );
}