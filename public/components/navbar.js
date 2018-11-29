import { pages } from '../router.js';

const html = String.raw;
const template = document.createElement('template');
template.innerHTML = html`
<style>
:host {
    width: 100%;
}
.navbar {
    height: 50px;
    /* width: 100%; */
    background-color: #A57615;
    font-size: 18px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: grey 0px 3px 3px; 
}
.nav-links {
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
}
.nav-link {
    margin: 0 8px;
    cursor: pointer;
}
.nav-link-enabled {
    font-weight: 900;
    font-size: 21px;
}
</style>
<div class="navbar">
    <div class="nav-links">
        <!-- <div class="nav-link nav-link-enabled">Gallery</div>
        <span> | </span>
        <div class="nav-link">
            Profile
        </div> -->
    </div>
    <div></div>
</div>
`;

export class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // DOM REFS
        this.navLinks = this.shadowRoot.querySelector('div.nav-links');

        // STATE MANAGEMENT ALERT!! //
        this.selectedPage = pages[0];
    }

    connectedCallback() {
        this.renderLinks();
    }


    renderLinks() {
        this.navLinks.innerHTML = '';
        for(let i=0; i<pages.length; i++) {

            const link = document.createElement('div');
            link.classList.add('nav-link');
            if(pages[i] === this.selectedPage) {
                link.classList.add('nav-link-enabled');
            }
            link.textContent = pages[i];
            link.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('navigation', {
                    detail: pages[i]
                }));
                this.selectedPage = pages[i];
                this.renderLinks();
            });
            this.navLinks.appendChild(link);

            if(i < pages.length-1) {
                const divider = document.createElement('span');
                divider.textContent = ' | ';
                this.navLinks.appendChild(divider);
            }
        }
    }
}
customElements.define('nav-bar', NavBar);