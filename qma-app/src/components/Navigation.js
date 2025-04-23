import React from 'react';

/**
 * StepNavigation component provides navigation buttons for the steps of a process.
 * It includes buttons to move to the previous and next steps, as well as to restart the process when the last step is reached.
 *
 * @param {Object} props - Component properties
 * @param {number} props.currentStep - The current step number in the process
 * @param {number} props.totalSteps - The total number of steps in the process
 * @param {Function} props.prevStep - Function to navigate to the previous step
 * @param {Function} props.nextStep - Function to navigate to the next step
 * @param {Function} props.resetApp - Function to restart the process when the last step is completed
 *
 * @returns {JSX.Element} The rendered StepNavigation component
 */
function StepNavigation({ currentStep, totalSteps, prevStep, nextStep, resetApp }) {
  return (
    <div className="step-navigation">
      <button 
        onClick={prevStep} 
        disabled={currentStep <= 1}
        className="nav-button"
      >
        Previous Step
      </button>
      <div className="step-indicator">
        Step {currentStep} of {totalSteps}
      </div>
      {currentStep < totalSteps ? (
        <button 
          onClick={nextStep} 
          className="nav-button"
        >
          Next Step
        </button>
      ) : (
        <button 
          onClick={resetApp} 
          className="nav-button restart"
        >
          Restart
        </button>
      )}
    </div>
  );
}

export default StepNavigation;
