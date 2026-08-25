export const CAROUSEL_DEFAULTS = {
    carouselForm: {
        show: true,
        label: "Default Carousel Form",
        style: "default"
    }
};

class carouselRenderer {
    static DEFAULTS = CAROUSEL_DEFAULTS;

    constructor({ htmlId, inDataStore, inClasses, inTheme = "style1", onButtonClick }) {
        const localHtmlId = htmlId;
        const localDataStore = inDataStore;
        const localOnButtonClick = onButtonClick;

        this.htmlId = localHtmlId;
        this.dataStore = localDataStore;
        this.onButtonClick = localOnButtonClick;
    };

    static sampleConfig() {
        return {
            "rendererType": "carousel",
            "htmlId": "table-root",
            "theme": "style1"
        };
    }

    appendToDom(controlToInsert) {
        const root = document.getElementById(this.htmlId);
        if (!root) {
            console.error(`Element with id '${this.htmlId}' not found.`);
            return;
        }
        root.appendChild(controlToInsert);
    };

    buildCarouselElement() {
        const container = document.createElement("div");
        container.className = "relative w-full max-w-2xl mx-auto overflow-hidden bg-white shadow-xl rounded-xl border border-gray-100";

        const slideContainer = document.createElement("div");
        slideContainer.className = "flex transition-transform duration-500 ease-in-out";
        
        let currentIndex = 0;

        this.dataStore.data.forEach((row, index) => {
            const slide = document.createElement("div");
            slide.className = "min-w-full p-8";
            
            const title = document.createElement("h2");
            title.className = "text-2xl font-bold text-gray-800 mb-6 text-center";
            title.textContent = `Slide ${index + 1}`;
            slide.appendChild(title);

            const grid = document.createElement("div");
            grid.className = "grid grid-cols-2 gap-4";

            this.dataStore.columns.forEach(col => {
                const field = document.createElement("div");
                field.className = "bg-gray-50 p-3 rounded";
                field.innerHTML = `<span class="block text-xs font-semibold text-gray-500">${col.dataDataField}</span>
                                   <span class="block text-sm text-gray-900">${row[col.dataDataField]}</span>`;
                grid.appendChild(field);
            });
            slide.appendChild(grid);
            slideContainer.appendChild(slide);
        });

        container.appendChild(slideContainer);

        // Navigation Buttons
        const prevBtn = document.createElement("button");
        prevBtn.className = "absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow focus:outline-none";
        prevBtn.innerHTML = `<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>`;
        
        const nextBtn = document.createElement("button");
        nextBtn.className = "absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow focus:outline-none";
        nextBtn.innerHTML = `<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;

        const updateSlide = () => {
            slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : this.dataStore.data.length - 1;
            updateSlide();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex < this.dataStore.data.length - 1) ? currentIndex + 1 : 0;
            updateSlide();
        });

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        return container;
    };

    build() {
        const node = this.buildCarouselElement();
        return this.appendToDom(node);
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = window.ks.TableBuilder || {};
window.ks.TableBuilder.renderers = window.ks.TableBuilder.renderers || {};
window.ks.TableBuilder.renderers.carouselRenderer = carouselRenderer;
window.ks.TableBuilder.renderers.carouselRenderer.version = "v1.0";

export { carouselRenderer };
