const html = String.raw;
const template = document.createElement('template');

template.innerHTML = html `
    <style>
        .full-screen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-color: grey;
            transition: 0.3s opacity;
            opacity: 0.9;
        }
        
        .full-screen-open {
            z-index: 2;
        }
        
        .full-screen-image {
            display: block;
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: 100%;
        }
        @keyframes zoomAnimation {
            from {transform: scale(0.4, 0.4);}
            to {transform: scale(1.0, 1.0);}
        }
        .full-screen-image-open {
            animation-duration: 0.5s;
            animation-name: zoomAnimation;
        }

        .full-screen-item-container {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: -1;
        }

        .full-screen-item-container-open {
            z-index: 3;
        }

        .close-button {
            position: fixed;
            top: 2px;
            right: 2px;
            color: white;
            cursor: pointer;
            margin: 5px 8px;
            user-select: none;
            z-index: 4;
            font-size: 21px;
            padding: 8px;
            transform: scaleX(1.5);
        }
    </style>
    <div class="full-screen-item-container">
        <img class="full-screen-image">
        <div class="close-button">x</div>
    </div>
    
    <div class="full-screen">
        
    </div>
`;

export class GalleryModal extends HTMLElement {
    constructor() {
        super();

        // SHADY STUFF
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // DOM REFS
        this.fullScreenImage = this.shadowRoot.querySelector('.full-screen-image');
        this.fullScreen = this.shadowRoot.querySelector('.full-screen');
        this.fullScreenItemContainer = this.shadowRoot.querySelector('.full-screen-item-container');
        this.closeButton = this.shadowRoot.querySelector('.close-button');
    }

    connectedCallback() {
        this.closeButton.addEventListener('click', () => {
            this.toggle();
        });
    }

    toggle(content) {
        this.fullScreenItemContainer.classList.toggle('full-screen-item-container-open');
        this.fullScreen.classList.toggle('full-screen-open');
        this.fullScreenImage.classList.toggle('full-screen-image-open');
        this.fullScreenImage.src = content;
    }
    
}
customElements.define('gallery-modal', GalleryModal);