import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReserveProvider } from './components/Reserve';
import { MobileBar } from './components/MobileBar';
import { keyForPath, pageComponent } from './pages/registry';
import { headFor } from './seo';
import './styles/global.css';

function useHeadSync(pathname: string) {
  useEffect(() => {
    const h = headFor(pathname);
    document.title = h.title;
    const set = (sel: string, attr: string, val: string) => document.querySelector(sel)?.setAttribute(attr, val);
    set('meta[name="description"]', 'content', h.description);
    set('meta[property="og:title"]', 'content', h.title);
    set('meta[property="og:description"]', 'content', h.description);
    set('meta[property="og:url"]', 'content', `https://varanese.com${h.path}`);
    set('link[rel="canonical"]', 'href', `https://varanese.com${h.path}`);
  }, [pathname]);
}

export function App() {
  const { pathname, hash } = useLocation();
  useHeadSync(pathname);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const Page = pageComponent(keyForPath(pathname));
  return (
    <ReserveProvider>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main" tabIndex={-1} key={pathname} className="page-enter">
        <Suspense fallback={<div className="route-loading" aria-busy="true" />}>
          <Page />
        </Suspense>
      </main>
      <Footer />
      <MobileBar />
    </ReserveProvider>
  );
}
