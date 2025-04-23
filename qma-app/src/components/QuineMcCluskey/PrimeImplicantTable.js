/**
 * A helper class for finding the minimal cover using prime implicants 
 * and converting it to a Boolean expression.
 */
export class PrimeImplicantTable {
  
  /**
   * Finds the minimal cover of prime implicants for a given set of minterms.
   *
   * @param {string[]} primeImplicants - List of prime implicants (e.g., ['0_1', '1_0']).
   * @param {Object.<string, number[]>} piCoverage - Object mapping each prime implicant to the minterms it covers.
   * @param {number[]} complements - List of minterms that need to be covered.
   * @returns {{
   *   essentialPIs: string[],        // List of essential prime implicants
   *   additionalPIs: string[],       // List of additional prime implicants needed
   *   minimalCover: string[]        // The minimal cover combining essential and additional PIs
   }}
   */
  static findMinimalCover(primeImplicants, piCoverage, complements) {
    const essentialPIsSet = new Set();  // Set to store essential prime implicants

    // Loop through each complement (minterm) and find covering prime implicants
    for (const minterm of complements) {
      const coveringPIs = primeImplicants.filter(pi => 
        piCoverage[pi].includes(minterm)  // Find PIs that cover the current minterm
      );
      
      // If only one PI covers this minterm, it is essential
      if (coveringPIs.length === 1) {
        essentialPIsSet.add(coveringPIs[0]);
      }
    }
    
    // Convert Set to Array for easier manipulation
    const essentialPIs = Array.from(essentialPIsSet);

    // Find all covered minterms by essential PIs
    let coveredMinterms = new Set();
    for (const pi of essentialPIs) {
      piCoverage[pi].forEach(m => coveredMinterms.add(m));  // Mark minterms covered by essential PIs
    }

    // Find additional PIs needed to cover remaining minterms
    const additionalPIs = [];
    let remainingMinterms = complements.filter(m => !coveredMinterms.has(m));  // Minterms left to cover
    
    // Exclude essential PIs from candidates
    const candidatePIs = primeImplicants.filter(pi => !essentialPIs.includes(pi));

    // Loop to select additional PIs to cover remaining minterms
    while (remainingMinterms.length > 0 && candidatePIs.length > 0) {
      let bestPI = null;
      let maxCoverage = 0;
      
      // Find the PI that covers the most remaining minterms
      for (const pi of candidatePIs) {
        const currentRemaining = [...remainingMinterms];
        const coverage = piCoverage[pi].filter(m => currentRemaining.includes(m));  // Coverage for this PI
        
        if (coverage.length > maxCoverage) {
          maxCoverage = coverage.length;
          bestPI = pi;
        }
      }

      if (!bestPI) break;  // If no best PI is found, break out

      additionalPIs.push(bestPI);
      const index = candidatePIs.indexOf(bestPI);
      candidatePIs.splice(index, 1);  // Remove the chosen PI from candidates

      // Update remaining minterms by excluding those covered by the chosen PI
      remainingMinterms = remainingMinterms.filter(m => !piCoverage[bestPI].includes(m));
    }

    // Return both essential and additional prime implicants, as well as the full minimal cover
    return {
      essentialPIs,
      additionalPIs,
      minimalCover: [...essentialPIs, ...additionalPIs]
    };
  }

  /**
   * Converts the minimal cover of prime implicants into a Boolean expression.
   *
   * @param {string[]} minimalCover - List of prime implicants in the minimal cover.
   * @param {Object.<string, number[]>} piCoverage - Object mapping each prime implicant to the minterms it covers.
   * @param {string[]} variables - Array of variable names (e.g., ['A', 'B', 'C']).
   * @returns {{
   *   expression: string,           // The final Boolean expression as a string (POS or SOP)
   *   termBreakdown: string[]      // Breakdown of each term in the expression
   }}
   */
  static convertToExpression(minimalCover, piCoverage, variables) {
    const termBreakdown = [];  // Will store each individual term of the expression

    // Process each prime implicant in the minimal cover
    for (const implicant of minimalCover) {
      let termParts = [];  // Will store parts of the current term

      // Loop through each bit of the implicant and convert it to the corresponding variable
      for (let i = 0; i < implicant.length && i < variables.length; i++) {
        const bit = implicant[i];

        if (bit === '0') {
          termParts.push(variables[i]);  // Variable in POS
        } else if (bit === '1') {
          termParts.push(variables[i] + "'");  // Complemented variable in POS
        }
        // '_' represents a don't-care, so it's ignored
      }

      // For POS, each implicant becomes a sum term
      termBreakdown.push(termParts.join(' + ') || '0');  // If term is empty, it means false (0)
    }

    // Join all terms using product (AND) operators for POS
    const expression = termBreakdown.length > 1 
      ? '(' + termBreakdown.join(')(') + ')'  // If multiple terms, group them
      : termBreakdown[0] || '1';  // If only one term, it's either that term or true (1)

    return {
      expression,
      termBreakdown
    };
  }
}
