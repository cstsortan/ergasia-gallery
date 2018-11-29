import { GalleryItem } from "./gallery-item.js";

const html = String.raw;
const template = document.createElement('template');
const base_url = 'https://picsum.photos/200/300?image=';

template.innerHTML = html`
    <style>
    .gallery-container {
        width: 100%;
        display: block;
        flex: 1;
        display: grid;
        justify-content: space-evenly;
    }

    
    @media screen and (min-width: 360px) {
        .gallery-container {
            grid-template-columns: auto;
        }
    }

    @media screen and (min-width: 600px) {
        .gallery-container {
            grid-template-columns: auto auto;
        }
    }

    @media screen and (min-width: 800px) {
        .gallery-container {
            grid-template-columns: auto auto auto;
        }
    }

    @media screen and (min-width: 1200px) {
        .gallery-container {
            grid-template-columns: auto auto auto auto;
        }
    }

    @media screen and (min-width: 1500) {
        .gallery-container {
            grid-template-columns: auto auto auto auto auto;
        }
    }

    gallery-item {
        display: inline-block;
    }
    </style>
    <div class="gallery-container">
    </div>
`;

export class GalleryGrid extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.container = this.shadowRoot.querySelector('.gallery-container');
    }

    /**
     * ########################
     * 
     * >>   LOGIC ALERT      <<
     * 
     * ########################
     */
    connectedCallback() {
        for(let i=0; i<20; i++) {
            const photoUrl = `${base_url}${i}`
            const img = new GalleryItem();
            img.src = photoUrl;
            this.container.appendChild(img);

            img.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('item-selected', {
                    detail: {
                        content: photoUrl,
                    },
                }));
            });
        }

    }
}
customElements.define('gallery-grid', GalleryGrid);