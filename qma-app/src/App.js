import React, { useState } from 'react';
import './App.css';
import { QMService } from './components/QuineMcCluskey/QMService';

// Import components
import InputForm from './components/Steps/InputForm';
import Step1Complements from './components/Steps/Step1Complements';
import Step2Grouping from './components/Steps/Step2Grouping';
import Step3Comparison from './components/Steps/Step3Comparison';
import Step4PrimeImplicantChart from './components/Steps/Step4PrimeImplicantChart';
import Step5FinalExpression from './components/Steps/Step5FinalExpression';
import StepNavigation from './components/Navigation';

/**
 * Main app for visualizing the Quine-McCluskey Algorithm.
 */
function App() {
  const [currentStep, setCurrentStep] = useState(0); // Tracks the current step
  const [inputMinterms, setInputMinterms] = useState(''); // Minterm input string
  const [inputVariables, setInputVariables] = useState(''); // Variable input string
  const [result, setResult] = useState(null); // Result from the algorithm
  const [error, setError] = useState(''); // Error message

  /**
   * Handles form submission and input validation.
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate minterms
    if (inputMinterms.trim() === '') {
      setError('Please enter at least one minterm.');
      return;
    }

    const rawMinterms = inputMinterms.trim().split(',').map(term => term.trim());
    const invalidMinterms = rawMinterms.filter(term => term === '' || isNaN(term) || !/^\d+$/.test(term));

    if (invalidMinterms.length > 0) {
      setError(`Invalid minterm(s): ${invalidMinterms.join(', ')}`);
      return;
    }

    const minterms = rawMinterms.map(Number);
    if (minterms.length === 0) {
      setError('Please enter at least one minterm.');
      return;
    }

    // Check for duplicates
    const seenMinterms = new Set();
    const duplicateMinterms = minterms.filter((term) => {
      if (seenMinterms.has(term)) return true;
      seenMinterms.add(term);
      return false;
    });
    if (duplicateMinterms.length > 0) {
      setError(`Duplicate minterm(s): ${[...new Set(duplicateMinterms)].join(', ')}`);
      return;
    }

    // Validate variables
    if (inputVariables.trim() === '') {
      setError('Please enter at least one variable.');
      return;
    }

    const rawVars = inputVariables.trim().split('').filter(char => /[A-Za-z]/.test(char));

    if (rawVars.length === 0) {
      setError('Please enter at least one variable.');
      return;
    }

    if (rawVars.length > 6) {
      setError('Maximum of 6 variables allowed.');
      return;
    }

    const uniqueVars = new Set(rawVars);
    if (uniqueVars.size !== rawVars.length) {
      setError('Duplicate variables are not allowed.');
      return;
    }

    // Check if largest minterm fits in given variable count
    const largestMinterm = Math.max(...minterms);
    const maxAllowed = 63;
    if (largestMinterm > maxAllowed) {
      setError(`Minterm ${largestMinterm} exceeds the maximum allowed (63).`);
      return;
    }

    const requiredVars = Math.ceil(Math.log2(largestMinterm + 1));
    if (rawVars.length < requiredVars) {
      setError(`Need at least ${requiredVars} variables for minterm ${largestMinterm}.`);
      return;
    }

    // Run the algorithm
    const qmaResult = QMService.runQMA(minterms, rawVars);
    setResult(qmaResult);
    setCurrentStep(1);
  };

  /** Move to the next step */
  const nextStep = () => setCurrentStep(currentStep + 1);

  /** Go back to the previous step */
  const prevStep = () => setCurrentStep(currentStep - 1);

  /** Reset the whole app */
  const resetApp = () => {
    setCurrentStep(0);
    setResult(null);
    setInputMinterms('');
    setInputVariables('');
    setError('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Quine-McCluskey Algorithm</h1>
        <p>A step-by-step visual representation of the QMA process</p>
      </header>

      <main className="app-content">
        {currentStep === 0 ? (
          <InputForm
            inputMinterms={inputMinterms}
            setInputMinterms={setInputMinterms}
            inputVariables={inputVariables}
            setInputVariables={setInputVariables}
            handleSubmit={handleSubmit}
            error={error}
          />
        ) : (
          <>
            <StepNavigation
              currentStep={currentStep}
              totalSteps={5}
              prevStep={prevStep}
              nextStep={nextStep}
              resetApp={resetApp}
            />
            <div className="step-content">
              {currentStep === 1 && <Step1Complements result={result} />}
              {currentStep === 2 && <Step2Grouping result={result} />}
              {currentStep === 3 && <Step3Comparison result={result} />}
              {currentStep === 4 && <Step4PrimeImplicantChart result={result} />}
              {currentStep === 5 && <Step5FinalExpression result={result} />}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
