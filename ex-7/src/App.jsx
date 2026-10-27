import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const pages = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Home() {
  return (
    <section className="content-card" aria-labelledby="page-title">
      <p className="section-label">HOME</p>
      <h2 id="page-title">Welcome to the React Router application.</h2>
      <p>
        Choose a page from the navigation above. React Router updates the
        content without reloading the application.
      </p>
      <div className="route-note">
        <span className="status-dot" aria-hidden="true" />
        You are viewing the home route
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="content-card" aria-labelledby="page-title">
      <p className="section-label">ABOUT</p>
      <h2 id="page-title">This application demonstrates React routing.</h2>
      <p>
        BrowserRouter keeps the URL in sync with the page. Routes and Route
        select the component to display, while Link navigates without a full
        browser page reload.
      </p>
      <div className="concept-list" aria-label="React Router concepts">
        <span>BrowserRouter</span>
        <span>Routes</span>
        <span>Route</span>
        <span>Link</span>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="content-card" aria-labelledby="page-title">
      <p className="section-label">CONTACT</p>
      <h2 id="page-title">Get in touch.</h2>
      <p>Have a question about this React Router example? Send us an email.</p>
      <a className="email-link" href="mailto:student@example.com">
        student@example.com
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

function NotFound() {
  return (
    <section className="content-card not-found" aria-labelledby="page-title">
      <p className="section-label">404 · NOT FOUND</p>
      <h2 id="page-title">This page doesn&apos;t exist.</h2>
      <p>The address may be incorrect, or the page may have moved.</p>
      <Link className="back-home" to="/">
        <span aria-hidden="true">←</span> Back to home
      </Link>
    </section>
  );
}

function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav className="site-nav" aria-label="Main navigation">
      {pages.map(({ label, path }) => (
        <Link
          key={path}
          className="nav-link"
          to={path}
          aria-current={pathname === path ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="app-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="React Router Lab home">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="11" cy="29" r="4" />
                <circle cx="29" cy="11" r="4" />
                <circle cx="29" cy="29" r="4" />
                <path d="M14 29h7a8 8 0 0 0 8-8v-6M14 29a8 8 0 0 1 8-8h3" />
              </svg>
            </span>
            <span>Router Lab</span>
          </Link>
          <Navigation />
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            EXERCISE 08
          </p>
          <h1 id="hero-title">
            One app.
            <br />
            <span>Different pages.</span>
          </h1>
          <p className="hero-description">
            A simple demonstration of client-side navigation with React Router.
          </p>
        </section>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="site-footer">
          <span>REACT ROUTER LAB</span>
          <span>Navigation without a full-page reload</span>
        </footer>
      </main>
    </BrowserRouter>
  );
}

export default App;
