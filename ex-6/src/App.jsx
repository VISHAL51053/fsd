import Student from "./components/Student.jsx";

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">EXERCISE 06</p>
        <h1>ReactJS Laboratory</h1>
        <p className="page-description">
          A simple example of components, props, state, events, and reusable
          JavaScript modules.
        </p>
      </header>

      <Student name="Arun" department="Computer Science" />

      <footer className="page-footer">
        Built with a functional component and React state.
      </footer>
    </main>
  );
}

export default App;
