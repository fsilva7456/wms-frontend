import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Variable {
  id: number;
  name: string;
  value?: string;
}

const VariablesPage: React.FC = () => {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [varName, setVarName] = useState('');
  const [varValue, setVarValue] = useState('');

  const baseUrl = process.env.REACT_APP_VARIABLES_SERVICE_URL;

  const fetchVariables = async () => {
    try {
      const response = await axios.get(`${baseUrl}/variables`);
      setVariables(response.data);
    } catch (error) {
      console.error('Error fetching variables:', error);
    }
  };

  const createVariable = async () => {
    try {
      await axios.post(`${baseUrl}/variables`, { name: varName, value: varValue });
      setVarName('');
      setVarValue('');
      fetchVariables();
    } catch (error) {
      console.error('Error creating variable:', error);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  return (
    <div style={{ margin: '1rem' }}>
      <h3>Variables</h3>
      <div>
        <input
          placeholder="Variable Name"
          value={varName}
          onChange={(e) => setVarName(e.target.value)}
        />
        <input
          placeholder="Variable Value"
          value={varValue}
          onChange={(e) => setVarValue(e.target.value)}
        />
        <button onClick={createVariable}>Create Variable</button>
      </div>
      <ul>
        {variables.map((v) => (
          <li key={v.id}>
            <strong>{v.name}</strong> - {v.value || 'No value'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariablesPage;