import { Converter } from './Converter';
import { Organizer } from './Organizer';
import { Comparer } from './Comparer';
import { PrimeImplicantTable } from './PrimeImplicantTable';

/**
 * QMService class that runs the Quine-McCluskey algorithm for Boolean minimization.
 */
export class QMService {
  
  /**
   * Main method to execute the Quine-McCluskey algorithm.
   * 
   * @param {number[]} inputMinterms - Array of input minterms (e.g., [1, 3, 5, 7]).
   * @param {string[]} variables - Array of Boolean variable names (e.g., ['A', 'B', 'C']).
   * @returns {{
   *   inputMinterms: number[],       // The original list of minterms
   *   variables: string[],           // The list of variables
   *   complements: number[],         // List of complements of the minterms
   *   binaryNumbers: string[],      // Binary representation of minterms
   *   binaryGroups: Object,         // Groups minterms by the number of 1's in binary
   *   mintermGroups: Object,        // Groups minterms by their binary form
   *   primeImplicants: string[],    // List of prime implicants
   *   piCoverage: Object,           // Coverage of each prime implicant over the minterms
   *   iterations: Object[],         // Iterations showing the merging process
   *   essentialPIs: string[],       // Essential prime implicants
   *   additionalPIs: string[],      // Additional prime implicants needed
   *   minimalCover: string[],       // The minimal cover of prime implicants
   *   expression: string,           // Boolean expression in POS or SOP form
   *   termBreakdown: string[]       // Breakdown of the Boolean expression into terms
   }}
   */
  static runQMA(inputMinterms, variables) {
    // Step 1: Convert minterms to binary and find complements
    const { complements, binaryNumbers } = Converter.mintermConvert(inputMinterms, variables);
    
    // Step 2: Group minterms by number of 1's in their binary representation
    const { binaryGroups, mintermGroups } = Organizer.groupMinterms(binaryNumbers, complements);
    
    // Step 3: Compare adjacent groups and find prime implicants through row reduction
    const { primeImplicants, piCoverage, iterations } = Comparer.compareMinterms(binaryGroups, mintermGroups);
    
    // Step 4: Find minimal cover by selecting essential and additional prime implicants
    const { essentialPIs, additionalPIs, minimalCover } = PrimeImplicantTable.findMinimalCover(
      primeImplicants, 
      piCoverage, 
      complements
    );
    
    // Step 5: Convert the minimal cover to a Boolean expression in either POS or SOP form
    const { expression, termBreakdown } = PrimeImplicantTable.convertToExpression(minimalCover, piCoverage, variables);
    
    // Return the results with all intermediate steps and the final Boolean expression
    return {
      inputMinterms,
      variables,
      complements,
      binaryNumbers,
      binaryGroups,
      mintermGroups,
      primeImplicants,
      piCoverage,
      iterations,
      essentialPIs,
      additionalPIs,
      minimalCover,
      expression,
      termBreakdown
    };
  }
}
