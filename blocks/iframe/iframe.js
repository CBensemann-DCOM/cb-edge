export default function decorate(block) {
    // Get config from block dataset or children
    const config = block.dataset || {};
    const src = config.src || block.querySelector('[data-src]')?.dataset.src || '';
    const title = config.title || block.querySelector('[data-title]')?.dataset.title || '';
    const width = config.width || '100%';
    const height = config.height || '400px';
    const allowfullscreen = config.allowfullscreen !== 'false';

    block.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = title;
    iframe.width = width;
    iframe.height = height;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('loading', 'lazy');
    if (allowfullscreen) {
        iframe.setAttribute('allowfullscreen', '');
    }
    iframe.className = 'iframe-block';
    block.appendChild(iframe);
}
