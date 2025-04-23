import React from 'react';

/**
 * InputForm component allows users to input minterms and variables.
 * It handles form submission and updates state with the input values.
 *
 * @param {Object} props - Component properties
 * @param {string} props.inputMinterms - The current value of the input minterms
 * @param {function} props.setInputMinterms - Function to update the inputMinterms state
 * @param {string} props.inputVariables - The current value of the input variables
 * @param {function} props.setInputVariables - Function to update the inputVariables state
 * @param {function} props.handleSubmit - Function to handle form submission
 * @param {string} [props.error] - Error message if validation fails
 * 
 * @returns {JSX.Element} The rendered InputForm component
 */
function InputForm({ inputMinterms, setInputMinterms, inputVariables, setInputVariables, handleSubmit, error }) {
  return (
    <div className="input-form">
      <h2>Enter Minterms and Variables</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="minterms">Minterms (comma separated)</label>
          <input
            id="minterms"
            type="text"
            value={inputMinterms}
            onChange={(e) => setInputMinterms(e.target.value)}
            placeholder="0,1,2,3,7,8,9,11,15"
            className="minterm-input"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="variables">Variables (maximum 6)</label>
          <input
            id="variables"
            type="text"
            value={inputVariables}
            onChange={(e) => setInputVariables(e.target.value)}
            placeholder="e.g. GAB"
            className="variable-input"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="submit-button">Process Minterms</button>
      </form>
    </div>
  );
}

export default InputForm;
