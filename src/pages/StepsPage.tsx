import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Step {
  id: number;
  step_name: string;
  purpose?: string;
}

const StepsPage: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepName, setStepName] = useState('');
  const [purpose, setPurpose] = useState('');

  const baseUrl = process.env.REACT_APP_STEPS_SERVICE_URL;

  const fetchSteps = async () => {
    try {
      const response = await axios.get(`${baseUrl}/steps`);
      setSteps(response.data);
    } catch (error) {
      console.error('Error fetching steps:', error);
    }
  };

  const createStep = async () => {
    try {
      await axios.post(`${baseUrl}/steps`, { step_name: stepName, purpose });
      setStepName('');
      setPurpose('');
      fetchSteps();
    } catch (error) {
      console.error('Error creating step:', error);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  return (
    <div style={{ margin: '1rem' }}>
      <h3>Steps</h3>
      <div>
        <input
          placeholder="Step Name"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
        />
        <input
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <button onClick={createStep}>Create Step</button>
      </div>
      <ul>
        {steps.map((step) => (
          <li key={step.id}>
            <strong>{step.step_name}</strong> – {step.purpose || 'No purpose'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepsPage;