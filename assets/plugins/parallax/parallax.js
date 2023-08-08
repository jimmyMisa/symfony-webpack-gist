/**
 * Calcul la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @param {number} acc (accumulateur)
 * @return {number}
 */
function offsetTop(element, acc = 0) {
    if (element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc + element.offsetTop;
}

/**
 * @property {HTMLElement} element
 * @property {{y: number, rotate: number, variable: boolean}} options
 */
class Parallax {

    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.element = element;
        this.options = this.parseAttribute();
        this.onScroll = this.onScroll.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onIntersection = this.onIntersection.bind(this);
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / this.options.divisor;

        if (this.options.is_parent_overflow_hidden) {
            document.addEventListener("scroll", this.onScroll);
            window.addEventListener("resize", this.onResize);
        } else {
            const observer = new IntersectionObserver(this.onIntersection);
            observer.observe(element);
        }
        
        this.onScroll()
    }

    parseAttribute() {
        const defaultOptions = {
            y: 0.0,
            rotate: 0,
            divisor: 2,
            variable: false,
            is_parent_overflow_hidden: false
        }
        if (this.element.dataset.parallax.startsWith('{')) {
            return { ...defaultOptions, ...JSON.parse(this.element.dataset.parallax) };
        }
        return { ...defaultOptions, y: parseFloat(this.element.dataset.parallax) };
    }

    /**
     * @param {IntersectionObserverEntry[]} entries
     */
    onIntersection(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                document.addEventListener("scroll", this.onScroll);
                window.addEventListener("resize", this.onResize);
                this.elementY = offsetTop(this.element) + this.element.offsetHeight / this.options.divisor;
            } else {
                document.removeEventListener("scroll", this.onScroll);
                document.removeEventListener("resize", this.onResize);
            }
        }
    }

    onResize() {
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / this.options.divisor;
    	this.onScroll();
    }

    onScroll() {
        window.requestAnimationFrame(() => {
            const screenY = window.scrollY + window.innerHeight / this.options.divisor;
            const diffY = this.elementY - screenY;
            const translateY = diffY * -1 * this.options.y;

            if (this.options.variable) {
            	this.element.style.setProperty(
            		"--parallaxY",
            		`${translateY}px`
            	);
            } else {
            	let transform = `translateY(${translateY}px)`;
            	if (this.options.rotate) {
            		transform += ` rotate(${diffY * this.options.rotate}deg)`
            	}
            	this.element.style.setProperty(
	                "transform",
	                transform
	            );
            }
        });

    }

    /**
     * @return {Parallax[]}
     */
    static bind() {
        return Array.from(document.querySelectorAll("[data-parallax]")).map(
            (element) => {
                return new Parallax(element);
            }
        )
    }
}

export {
    Parallax
}