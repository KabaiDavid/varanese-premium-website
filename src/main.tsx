import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import { App } from './App';
import { keyForPath, preload } from './pages/registry';
import { startMotion, startHScroll } from './lib/motion';

document.documentElement.classList.add('js');

const root = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Load the current route's code before hydrating so the prerendered markup is reused as-is.
const key = keyForPath(location.pathname);
preload(key).then(() => {
  // Hydrate only when the served HTML was prerendered for this route (hosts may serve a fallback page).
  if (root.hasChildNodes() && root.dataset.page === key) hydrateRoot(root, tree);
  else {
    root.innerHTML = '';
    createRoot(root).render(tree);
  }
  (window as unknown as { __vBooted: boolean }).__vBooted = true;
  requestAnimationFrame(() => { startMotion(); startHScroll(); });
});
