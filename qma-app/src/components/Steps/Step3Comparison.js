import React from 'react';

/**
 * Step3Comparison component displays the process of comparing and merging terms to find prime implicants.
 * It shows the iterations of the merging process and highlights the final prime implicants and their coverage.
 *
 * @param {Object} props - Component properties
 * @param {Object} props.result - The result object containing the merging process and prime implicants data
 * @param {Array} props.result.iterations - An array of iterations where each iteration contains:
 *   - `merges`: A list of term merges with their before and after states
 *   - `unmatchedTerms`: A list of unmatched terms that are considered prime implicants
 * @param {Array} props.result.primeImplicants - An array of the final prime implicants found through the merging process
 * @param {Object} props.result.piCoverage - An object where keys are prime implicants and values are arrays of minterms they cover
 *
 * @returns {JSX.Element} The rendered Step3Comparison component
 */
function Step3Comparison({ result }) {
  return (
    <div className="step-container">
      <h2>Step 3: Merging Process</h2>
      <div className="step-explanation">
        <p>This step shows the process of comparing and merging terms to find prime implicants.</p>
      </div>
      
      <div className="iterations-container">
        {result.iterations.map((iteration, iterIndex) => (
          <div key={iterIndex} className="iteration-block">
            <h3>Iteration {iterIndex + 1}</h3>
            
            <div className="merges-container">
              {iteration.merges.map((merge, mergeIndex) => (
                <div key={mergeIndex} className="merge-item">
                  <span className="merge-from">{merge.from.join(' + ')}</span>
                  <span className="merge-arrow">→</span>
                  <span className="merge-to">{merge.to}</span>
                </div>
              ))}
              
              {iteration.unmatchedTerms.length > 0 && (
                <div className="unmatched-terms">
                  <h4>Unmatched Terms (Prime Implicants)</h4>
                  <ul>
                    {iteration.unmatchedTerms.map((term, termIndex) => (
                      <li key={termIndex}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="prime-implicants-result">
        <h3>Final Prime Implicants</h3>
        <ul className="pi-list">
          {result.primeImplicants.map((pi, index) => (
            <li key={index}>
              <span className="pi-term">{pi}</span>
              <span className="pi-coverage">Covers: {result.piCoverage[pi].join(', ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Step3Comparison;
