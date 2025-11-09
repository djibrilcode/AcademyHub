import './App.css';
import StudentList from './components/Student/studentList';

function App() {
  return (
    <div className="App app-root">
      <header className="app-header">
        <h1 className="app-title">MERN Student Manager</h1>
      </header>

      <main className="app-main">
        <StudentList />
      </main>
    </div>
  );
}

export default App;
