import { getPageProperties, getChildrenPages } from '../../utils/page-utils.js';

export default async function decorate(block) {
    // Read config from dataset or block model
    const config = block.dataset || {};
    const mode = config.mode || 'manual';
    const showProperties = config.showProperties !== 'false';

    let pages = [];
    if (mode === 'manual' && config.pages) {
        try {
            pages = JSON.parse(config.pages);
        } catch {
            pages = Array.isArray(config.pages) ? config.pages : [];
        }
    } else if (mode === 'children' && config.parentPage) {
        pages = await getChildrenPages(config.parentPage);
    }

    block.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'eds-list';

    for (const page of pages) {
        const li = document.createElement('li');
        li.className = 'eds-list-item';
        const props = showProperties ? await getPageProperties(page) : {};
        li.innerHTML = `
      <a href="${page}">${props.title || page}</a>
      ${showProperties ? `<span class="eds-list-desc">${props.description || ''}</span>` : ''}
    `;
        ul.appendChild(li);
    }

    block.appendChild(ul);
}
