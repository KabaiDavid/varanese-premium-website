import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { preloadAll, keyForPath } from './pages/registry';
import { allRoutes, headFor, headToHtml } from './seo';

export { allRoutes };

export async function render(url: string) {
  await preloadAll();
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  return { html, head: headToHtml(headFor(url)), notFound: keyForPath(url) === 'notFound', pageKey: keyForPath(url) };
}
