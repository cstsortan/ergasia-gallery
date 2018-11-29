const html = String.raw;
const template = document.createElement('template');
template.innerHTML = html `
    <style>
        .gallery-item {
            height: 300px;
            width: 300px;
            background-color: cyan;
            margin: 16px;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .gallery-item:hover {
            transform: scale(1.15, 1.15);
        }
    </style>
    <img class="gallery-item">
`;

export class GalleryItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    set src(content) {
        this.shadowRoot.querySelector('img').src = content;
    }
}

window.customElements.define('gallery-item', GalleryItem);