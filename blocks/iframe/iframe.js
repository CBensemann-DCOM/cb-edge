export default function decorate(block) {
  // Parse block.innerHTML structure for values
  const divs = block.querySelectorAll(':scope > div');
  let src = '';
  let title = '';
  let width = '100%';
  let height = '400px';

  if (divs.length > 0) {
    // src and title from first div's <a>
    const link = divs[0].querySelector('a');
    if (link) {
      src = link.getAttribute('href') || '';
      title = link.getAttribute('title') || '';
    }
  }
  if (divs.length > 2) {
    // width from third div
    const widthText = divs[2].textContent?.trim();
    if (widthText) width = widthText;
  }
  if (divs.length > 3) {
    // height from fourth div
    const heightText = divs[3].textContent?.trim();
    if (heightText) height = heightText;
  }

  // fallback to dataset if present
  const config = block.dataset || {};
  src = config.src || src;
  title = config.title || title;
  width = config.width || width;
  height = config.height || height;
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
