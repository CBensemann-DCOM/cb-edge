import { getPageProperties, getChildrenPages } from '../../utils/page-utils.js';

export default function decorate(block) {
  const config = block.dataset || {};
  const mode = config.mode || 'manual';
  const showProperties = config.showProperties !== 'false';

  let pagesPromise;
  if (mode === 'manual' && config.pages) {
    try {
      const parsed = JSON.parse(config.pages);
      pagesPromise = Promise.resolve(parsed);
    } catch {
      pagesPromise = Promise.resolve(Array.isArray(config.pages) ? config.pages : []);
    }
  } else if (mode === 'children' && config.parentPage) {
    pagesPromise = getChildrenPages(config.parentPage);
  } else {
    pagesPromise = Promise.resolve([]);
  }

  pagesPromise.then((pages) => {
    block.innerHTML = '';
    const ul = document.createElement('ul');
    ul.className = 'eds-list';

    if (showProperties) {
      Promise.all(pages.map((page) => getPageProperties(page))).then((propsArr) => {
        pages.forEach((page, i) => {
          const li = document.createElement('li');
          li.className = 'eds-list-item';
          const props = propsArr[i] || {};
          li.innerHTML = `
            <a href="${page}">${props.title || page}</a>
            <span class="eds-list-desc">${props.description || ''}</span>
          `;
          ul.appendChild(li);
        });
        block.appendChild(ul);
      });
    } else {
      pages.forEach((page) => {
        const li = document.createElement('li');
        li.className = 'eds-list-item';
        li.innerHTML = `<a href="${page}">${page}</a>`;
        ul.appendChild(li);
      });
      block.appendChild(ul);
    }
  });
}
