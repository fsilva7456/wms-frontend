import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StepsPage from './pages/StepsPage';
import VariablesPage from './pages/VariablesPage';
import LogsPage from './pages/LogsPage';

function App() {
  return (
    <Router>
      <nav style={{ margin: '1rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/steps">Steps</Link> |{' '}
        <Link to="/variables">Variables</Link> |{' '}
        <Link to="/logs">Logs</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to the Workflow Management System</h2>} />
        <Route path="/steps" element={<StepsPage />} />
        <Route path="/variables" element={<VariablesPage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;