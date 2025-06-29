import './App.css';
import AddFactForm from './components/AddFactForm';
import AllFacts from './components/AllFacts';
import RandomFact from './components/RandomFact';

function App() {
  return (
    <div className="app">
      <header>
        <h1>🎉 Welcome to <span className="highlight">Factopia</span></h1>
        <p className="tagline">Fun, quirky, and random trivia facts!</p>
      </header>
      <main>
        <RandomFact />
        <AddFactForm />
        <AllFacts />
      </main>
    </div>
  );
}

export default App;
