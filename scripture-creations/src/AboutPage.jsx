import { Header, Navigation, Footer, MediumImage, Title} from "./Components.jsx";

function Management() {
    return (
        <div className="text">
            <h2 className="centered">Management</h2>
            <div className="img-and-desc">
                <img src={`${import.meta.env.BASE_URL}images/other/reed&eve.jpg`}></img>
                <div>
                    <div>
                        <h3>Reed Hansen, President:</h3>
                        <ul>
                            <li>MBA from the University of Phoenix, 1997</li>
                            <li>BA in Computer Information Systems from Weber State University, 1985</li>
                            <li>Minor: Economics</li>
                            <li>Over ten years experience designing and making games, books, and LDS products</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Eve Hansen, Vice President Sales & Marketing:</h3>
                        <ul>
                            <li>English Education Major at BYU</li>
                            <li>Studied Interior Design at UVSC</li>
                            <li>Artistic and editing talents</li>
                            <li>Twelve years experience in sales</li>
                            <li>Nine years experience in secretarial/bookkeeping</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function History() {
    return (
        <div className="text">
            <h2 className="centered">History</h2>
            <div className="img-and-desc">
                <img src={`${import.meta.env.BASE_URL}images/other/collating.jpg`}></img>
                <div>
                    Scripture Creations is a creator and distributor of LDS products. It was established in 1998 and produced its first product, Concentrate on LDS Presidents, in December of that year. The product line has expanded to over forty products. The product lines include games, study aids, and inspirational materials.
                </div>
            </div>
        </div>
    );
}

function Objectives() {
    return (
        <div className="text">
            <h2 className="centered">Our Objectives</h2>
            <ul>
                <li>To conduct business fairly, honestly, profitably, and courteously.</li>
                <li>To develop products that are fun, creative, exciting, and enhance users knowledge of the scriptures and increase their testimonies of Jesus Christ.</li>
                <li>To fulfill orders expeditiously and accurately.</li>
            </ul>
        </div>
    );
}

function MissionStatement() {
    return (
        <div className="text">
            <h2 className="centered">Our Mission Statement</h2>
            <h3 className="centered"><em>"Strengthening Families in Jesus Christ"</em></h3>
            To create and distribute products that will strengthen the knowledge
            and testimonies of those who use them and move the work of the Lord
            forward in new and creative ways.
        </div>
    );
}

function About() {
    return (
        <div className="content">
            <Title text="About Us" />
            <MissionStatement />
            <Objectives />
            <History />
            <Management />
        </div>
    );
}

export default function AboutPage() {
    return (
        <div className="container">
            <Header/>
            <Navigation />
            <About/>
            <Footer/>
        </div>
    );
}