export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try fetching the asset directly
    let response = await env.ASSETS.fetch(request);

    // If 404 and no file extension, try clean URL matching
    if (response.status === 404 && !url.pathname.includes('.')) {
      // 1. Check folder/index.html
      const folderPath = url.pathname.endsWith('/') 
        ? url.pathname + 'index.html' 
        : url.pathname + '/index.html';
      const folderUrl = new URL(folderPath, request.url);
      response = await env.ASSETS.fetch(new Request(folderUrl, request));

      // 2. Check path.html
      if (response.status === 404) {
        const htmlPath = url.pathname.replace(/\/$/, '') + '.html';
        const htmlUrl = new URL(htmlPath, request.url);
        response = await env.ASSETS.fetch(new Request(htmlUrl, request));
      }

      // 3. Fallback to /index.html (SPA routing)
      if (response.status === 404) {
        const rootUrl = new URL('/index.html', request.url);
        response = await env.ASSETS.fetch(new Request(rootUrl, request));
      }
    }

    return response;
  }
};
