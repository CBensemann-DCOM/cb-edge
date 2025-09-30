export async function getPageProperties(pageUrl) {
  // Replace with actual API call or logic to fetch page properties
  // Example stub:
  return {
    title: 'Page Title',
    description: 'Page Description',
    pageUrl
  };
}

export async function getChildrenPages(parentUrl) {
  // Replace with actual API call or logic to fetch child pages
  // Example stub:
  return [
    `${parentUrl}/child1`,
    `${parentUrl}/child2`
  ];
}
