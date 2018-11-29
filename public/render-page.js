import { pages } from './router.js';

const modal = document.querySelector('gallery-modal');

export function renderPage(selectedPage) {
    let page;
    switch (selectedPage) {
        case pages[0]:
            page = document.createElement('gallery-grid');
            page.addEventListener('item-selected', e => {
                modal.toggle(e.detail.content);
            });
            break;
        
        default:
            page = document.createElement('div');
            page.className = 'home-page';
            page.textContent = "Profile page works!";
            break;
    }
    page.id = 'page'
    
    if(document.querySelector('#page')) {
        document.querySelector('.app-container')
            .replaceChild(page, document.querySelector('#page'));
    } else {
        document.querySelector('.app-container')
            .appendChild(page);
    }
}