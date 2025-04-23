/**
 * A helper class to convert minterms and find their complements.
 */
export class Converter {
  /**
   * Converts a list of minterms into their complement minterms and binary equivalents.
   *
   * @param {number[]} inputMinterms - Array of minterms (e.g., [0, 1, 3]).
   * @param {string[]} variables - Array of variable names (e.g., ['A', 'B']).
   * @returns {{
   *   complements: number[],     // Minterms that are not in the input (complement set)
   *   binaryNumbers: string[],   // Binary strings of the complements, padded to match variable count
   *   n: number                  // Bit width based on the largest minterm or number of variables
   * }}
   */
  static mintermConvert(inputMinterms, variables) {
    // Get the largest minterm to know how many bits we need
    const largestMinterm = Math.max(...inputMinterms);

    // Number of bits is based on the largest minterm or variable count
    const n = Math.max(largestMinterm.toString(2).length, variables.length);

    // Compute max possible minterm (e.g., 3 variables → max = 2^3 - 1 = 7)
    const maxPossibleMinterm = Math.pow(2, n) - 1;

    // Find complement minterms (those not included in inputMinterms)
    let complements = [];
    for (let i = 0; i <= maxPossibleMinterm; i++) {
      if (!inputMinterms.includes(i)) {
        complements.push(i);
      }
    }

    // Convert each complement to binary with left padding to match bit width
    let binaryNumbers = complements.map(num => {
      let binary = num.toString(2);
      while (binary.length < n) {
        binary = '0' + binary;
      }
      return binary;
    });

    return {
      complements,
      binaryNumbers,
      n
    };
  }
}
