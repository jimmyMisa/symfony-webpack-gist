/**
 * Calcul la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @param {number} acc (accumulateur)
 * @return {number}
 */
function offsetTop(element, acc = 0) {
    if (!element) {
        return null;
    }
    if (element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop);
    }
    return acc + element.offsetTop;
}

/**
 * @property {HTMLElement} element
 * @property {{y: number, rotate: number, variable: boolean}} options
 */
class BindTab {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        this.in_progress = false;
        this.is_yet_unobserve_down = false;
        this.is_able_to_tab = false;
        this.timeoutID = null;
        this.timingScrollInTab = 400;
        this.timingAnimationObservation = 300;
        this.element = element;
        this.offset_top = offsetTop(element);
        this.onWheel = this.onWheel.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onIntersection = this.onIntersection.bind(this);
        const observer = new IntersectionObserver(this.onIntersection);
        observer.observe(element);
        this.onWheel();
    }

    /**
     * @param {IntersectionObserverEntry[]} entries
     */
    onIntersection(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                console.log("intersecting")
                document.addEventListener("wheel", this.onWheel, {
                    passive: false,
                });
                window.addEventListener("resize", this.onResize);
            } else {
                console.log("nointersecting")
                document.removeEventListener("wheel", this.onWheel);
                document.removeEventListener("resize", this.onResize);
            }
        }
    }

    onResize() {
        this.onWheel();
    }

    onWheel(event) {
        this.offset_top = offsetTop(this.element);
        this.offset_height = this.element.offsetHeight;
        this.offset_bottom = this.getScrollBottomOfEl();

        var { element, in_progress, offset_top, offset_height, offset_bottom, is_able_to_tab } = this;

        if (in_progress) {
            if (event) {
                event.preventDefault();
            }
            return true;
        }

        if (is_able_to_tab) {
            event.preventDefault();
        }

        var e_delta_y = event ? event.deltaY : 0;
        var scroll_Y = window.scrollY - Math.abs(e_delta_y);

        console.log({
            in_progress,
            is_able_to_tab,
            offset_height,
            offset_bottom,
            offset_top,
            e_delta_y,
            v_scroll_Y: window.scrollY,
            scroll_Y
        });
        var nav_bar_height = this.getNavbarHeight();

        /*var is_able_to_progress_down =
            e_delta_y > 0 &&
            scroll_Y >= offset_bottom &&
            scroll_Y <= offset_top;
        var is_able_to_up =
            e_delta_y < 0 &&
            scroll_Y >= offset_bottom &&
            scroll_Y <= offset_top;

        if (window.innerHeight < (offset_height + (Math.abs(e_delta_y)))) {*/
            var is_able_to_progress_down =
                e_delta_y > 0 &&
                scroll_Y >= (offset_bottom - (offset_height/* + this.getNavbarHeight()*/)) &&
                scroll_Y <= (offset_top + (offset_height/* + this.getNavbarHeight()*/));
            var is_able_to_up =
                e_delta_y < 0 &&
                scroll_Y >= (offset_bottom - offset_height) &&
                scroll_Y <= (offset_top + offset_height);
        //}



        if (is_able_to_progress_down) {
            if (event) {
                event.preventDefault();
            }
            this.processDow();
        }

        if (is_able_to_up) {
            if (event) {
                event.preventDefault();
            }
            this.processUp();
        }
    }

    processDow() {
        this.in_progress = true;
        console.log("in_progress_down");

        var { element, offset_top, offset_height, is_able_to_tab } = this;

        var nav_link_active = $(element).find(".nav-link.active");
        var nav_item_active = $(nav_link_active).closest(".nav-item");
        var nav_item_next = $(nav_item_active).next();
        var nav_link_next = $(nav_item_next).find(".nav-link");

        if (!nav_link_next.length) {
            var xxx = offset_top + (offset_height - this.getNavbarHeight())

            if (this.is_yet_unobserve_down) {
                this.is_yet_unobserve_down = false
                xxx = offset_top + offset_height + 20
            } else {
                this.is_yet_unobserve_down = true
            }
            return this.scrollToUnobserveEl(xxx);
            
        }

        if (is_able_to_tab) {
            return this.handleElementTab(nav_link_next);
        }

        return this.scrollToObserseEl();
    }

    processUp() {
        this.in_progress = true;
        console.log("in_progress_up");

        var { element, offset_height, offset_bottom, is_able_to_tab } = this;

        var nav_link_active = $(element).find(".nav-link.active");
        var nav_item_active = $(nav_link_active).closest(".nav-item");
        var nav_item_prev = $(nav_item_active).prev();
        var nav_link_prev = $(nav_item_prev).find(".nav-link");

        if (!nav_link_prev.length) {
            return this.scrollToUnobserveEl(offset_bottom - offset_height);
        }

        if (is_able_to_tab) {
            console.log("progress_tab");
            return this.handleElementTab(nav_link_prev);
        }

        return this.scrollToObserseEl();
    }

    handleElementTab(nav_link) {
        this.in_progress = true;
        console.log("handleElementTab");

        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
            if (nav_link) {
                $(nav_link).tab("show");
            }
            this.in_progress = false;
        }, this.timingScrollInTab);
        return true;
    }

    scrollToUnobserveEl(scroll_top) {
        this.in_progress = true;
        console.log("scrollToUnobserveEl");

        $("html,body").animate({
                scrollTop: scroll_top,
            },
            this.timingAnimationObservation,
            "linear",
            () => {
                this.in_progress = false;
                this.is_able_to_tab = false;
            }
        );
        return true;
    }

    scrollToObserseEl(scroll_top) {
        this.in_progress = true;
        console.log("scrollToObserseEl");

        var { offset_top } = this;

        $("html,body").animate({
                scrollTop: this.getScrollTopToObserveEl(),
            },
            this.timingAnimationObservation,
            "linear",
            () => {
                this.in_progress = false;
                this.is_able_to_tab = true;
            }
        );
        return true;
    }

    getScrollTopToObserveEl() {
        var { offset_height, offset_top, offset_bottom } = this
        var screen_rest = window.innerHeight - offset_height
        var screen_rest_per_2 = screen_rest / 2
        var nav_bar_height = this.getNavbarHeight();

        if (screen_rest_per_2 < nav_bar_height) {
            return offset_top - nav_bar_height
        }
        return offset_top - screen_rest_per_2
    }

    getScrollBottomOfEl() {
        var { offset_height, offset_top } = this
        var screen_rest = window.innerHeight - offset_height
        var nav_bar_height = this.getNavbarHeight();

        var rst = offset_top - screen_rest

        if (rst > offset_top) {
             return offset_top
        }

        return rst;
    }

    getNavbarHeight() {
        var nav_bar_height = 0;
        if ($(".app_front_navbar")[0]) {
            nav_bar_height = $(".app_front_navbar")[0].getBoundingClientRect().height
        }
        return nav_bar_height
    }

    /**
     * @return {BindTab[]}
     */
    static bind() {
        return Array.from(document.querySelectorAll("[data-bindTab]")).map(
            (element) => {
                //return new BindTab(element);
            }
        );
    }
}

export { BindTab };