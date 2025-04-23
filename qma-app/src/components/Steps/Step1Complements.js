import React from 'react';

/**
 * Step1Complements component displays the process of finding complements and converting them to binary.
 * It shows the original minterms, the used variables, and a table of the complements and their binary conversions.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.result - The result object containing the minterm and binary data
 * @param {Array<number>} props.result.inputMinterms - Array of input minterms (decimal values)
 * @param {Array<string>} props.result.variables - Array of variable names (e.g., ["A", "B", "C"])
 * @param {Array<number>} props.result.complements - Array of complement minterms (decimal values)
 * @param {Array<string>} props.result.binaryNumbers - Array of binary representations of the complements
 * 
 * @returns {JSX.Element} The rendered Step1Complements component
 */
function Step1Complements({ result }) {
  return (
    <div className="step-container">
      <h2>Step 1: Complements & Binary Conversion</h2>
      <div className="step-explanation">
        <p>This step identifies the complements of the input minterms and converts them to binary format.</p>
        <p>Original minterms: {result.inputMinterms.join(', ')}</p>
        <p>Variables used: {result.variables.join(', ')}</p>
      </div>
      
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Decimal (Complement)</th>
              <th>Binary</th>
            </tr>
          </thead>
          <tbody>
            {result.complements.map((comp, index) => (
              <tr key={index}>
                <td>{comp}</td>
                <td>{result.binaryNumbers[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Step1Complements;
