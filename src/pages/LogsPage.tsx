import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Log {
  id: number;
  log_type: string;
  message?: string;
  timestamp: string;
}

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [logType, setLogType] = useState('');
  const [message, setMessage] = useState('');

  const baseUrl = process.env.REACT_APP_LOGS_SERVICE_URL;

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const createLog = async () => {
    try {
      await axios.post(`${baseUrl}/logs`, { log_type: logType, message });
      setLogType('');
      setMessage('');
      fetchLogs();
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ margin: '1rem' }}>
      <h3>Logs</h3>
      <div>
        <input
          placeholder="Log Type"
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
        />
        <input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={createLog}>Create Log</button>
      </div>
      <ul>
        {logs.map((l) => (
          <li key={l.id}>
            <strong>{l.log_type}</strong> – {l.message} (
            {new Date(l.timestamp).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogsPage;