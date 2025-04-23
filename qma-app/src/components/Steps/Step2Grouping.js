import React from 'react';

/**
 * Step2Grouping component displays the process of grouping binary representations by the number of 1's.
 * It shows the binary groups and their corresponding minterms, based on the count of 1's in each binary string.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.result - The result object containing the grouped binary and minterm data
 * @param {Object} props.result.binaryGroups - An object where the keys are the number of 1's, and the values are arrays of binary strings
 * @param {Object} props.result.mintermGroups - An object where the keys are the number of 1's, and the values are arrays of minterms (decimal values) corresponding to the binary strings
 *
 * @returns {JSX.Element} The rendered Step2Grouping component
 */
function Step2Grouping({ result }) {
  return (
    <div className="step-container">
      <h2>Step 2: Grouping by Number of 1's</h2>
      <div className="step-explanation">
        <p>In this step, binary representations are grouped based on the number of 1's they contain.</p>
      </div>
      
      <div className="groups-container">
        {Object.keys(result.binaryGroups).map(groupKey => (
          <div key={groupKey} className="group-card">
            <h3>Group {groupKey} (with {groupKey} 1's)</h3>
            <ul>
              {result.binaryGroups[groupKey].map((binary, idx) => (
                <li key={idx}>
                  <span className="binary">{binary}</span> 
                  <span className="decimal">= {result.mintermGroups[groupKey][idx]}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step2Grouping;
