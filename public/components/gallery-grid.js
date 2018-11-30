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

    button.show-more-button {
        display: block;
        margin: 20px auto;
    }
    </style>
    <div class="gallery-container">
    </div>
    <button class="show-more-button">Show more</button>
`;

export class GalleryGrid extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.container = this.shadowRoot.querySelector('.gallery-container');
        this.showMoreButton = this.shadowRoot.querySelector('.show-more-button');

        this.picsumIndex = 0;
    }

    /**
     * ########################
     * 
     * >>   LOGIC ALERT      <<
     * 
     * ########################
     */
    connectedCallback() {
        this.renderPhotos(10);
        this.showMoreButton.addEventListener('click', () => {
            this.renderPhotos(5)
        });
    }

    renderPhotos(count) {
        for(let i=0; i<count; i++) {
            const photoUrl = `${base_url}${i + this.picsumIndex}`
            const galleryItem = new GalleryItem();
            galleryItem.src = photoUrl;
            this.container.appendChild(galleryItem);

            galleryItem.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('item-selected', {
                    detail: {
                        content: photoUrl,
                    },
                }));
            });
        }
        this.picsumIndex += count;
    }
}
customElements.define('gallery-grid', GalleryGrid);