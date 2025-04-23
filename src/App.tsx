import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HealthScoreWheel from './components/HealthScoreWheel.tsx';
import { sampleData } from './data/sampleData.ts';

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center mb-4">Health Score Visualization</h1>
          <div className="card">
            <div className="card-body">
              <HealthScoreWheel data={sampleData} width={800} height={600} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 