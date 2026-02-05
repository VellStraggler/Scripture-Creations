import { Link } from "react-router";
import { getImageURL } from "./Components";
import { useEffect, useRef } from "react";

export default function ProductCarousel({ products, baseSpeed=0.75 }) {
    const ref = useRef(null);
    const pausedRef = useRef(false);


    const loopedProducts = [...products, ...products, ...products];
    let speed = baseSpeed;

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        let scrollPos = 0;

        const step = () => {
            if(pausedRef.current) {
                speed = baseSpeed * .5;
            } else {
                speed = baseSpeed;
            }
            scrollPos += speed; // pixels per frame
            
            if (scrollPos >= container.scrollWidth / 2) {
                scrollPos = 0; // reset to start
            }
            
            container.scrollLeft = scrollPos;
            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [loopedProducts, speed]);

    // Centered Product Highlight Effect
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        
        const onScroll = () => {
            if (pausedRef.current) {
                // return;
                [...el.children].forEach((child) => child.classList.remove("is-center"));
                return;
            }
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
        onScroll(); // initial call

        return () => el.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="carousel-cont"
            onMouseEnter={() => pausedRef.current = true}
            onMouseLeave={() => pausedRef.current = false}>
            <div ref={ref} className="carousel">
                {loopedProducts.map((p, index) => (
                    <CarouselItem p={p} index={index} />
                ))}
            </div>
        </div>
    );
}

export function CarouselItem({p, index}) {
    return (
        <div key={(p.id + "-" + index)} className="slide">
            <Link to={`/products/${p.id}`}>
                <img src={getImageURL(p)} alt={p.name} />
                <div>{p.name}</div>
            </Link>
        </div>
    );
}