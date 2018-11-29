import './components/index.js';
import { pages } from './router.js';
import { renderPage } from './render-page.js';

renderPage(pages[0]);

document.querySelector('nav-bar').addEventListener('navigation', e => {
    renderPage(e.detail);
});
