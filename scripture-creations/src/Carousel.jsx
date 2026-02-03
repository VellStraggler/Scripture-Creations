import { getImageURL } from "./Components";
import { useEffect, useRef } from "react";

export default function ProductCarousel({ products, speed=0.75 }) {
    const ref = useRef(null);

    const loopedProducts = [...products, ...products, ...products];

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        let scrollPos = 0;

        const slideWidth = 240; // should match CSS .slide width + gap

        const step = () => {
        scrollPos += speed; // pixels per frame

        if (scrollPos >= container.scrollWidth / 2) {
            scrollPos = 0; // reset to start
        }

        container.scrollLeft = scrollPos;
        requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [loopedProducts, speed]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onScroll = () => {
            [...el.children].forEach((child) => {
                const box = child.getBoundingClientRect();
                const childCenter =
                    box.left + box.width / 2;

                const distance = Math.abs(
                    childCenter - el.getBoundingClientRect().left - el.clientWidth / 2
                );

                child.classList.toggle(
                    "is-center",
                    distance < box.width / 2
                );
            });
        };

        el.addEventListener("scroll", onScroll);
        onScroll(); // initial

        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="carousel-cont"
            onMouseEnter={() => paused = true}
            onMouseLeave={() => paused = false}>
            <div ref={ref} className="carousel">
                {loopedProducts.map((p) => (
                    <div key={p.id} className="slide">
                        <img src={getImageURL(p)} alt={p.name} />
                        <div>{p.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
