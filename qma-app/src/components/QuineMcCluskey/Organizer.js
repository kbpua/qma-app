/**
 * A helper class to group minterms based on the number of 1's in their binary representation.
 */
export class Organizer {
  /**
   * Groups binary numbers and their corresponding minterms based on the count of 1's in the binary representation.
   *
   * @param {string[]} binaryNumbers - Array of binary strings (e.g., ['001', '101', '111']).
   * @param {number[]} complements - Array of minterms corresponding to the binary numbers (e.g., [0, 1, 3]).
   * @returns {{
   *   binaryGroups: Object.<number, string[]>,  // Groups of binary numbers by count of 1's
   *   mintermGroups: Object.<number, number[]>  // Groups of minterms by count of 1's
   * }}
   */
  static groupMinterms(binaryNumbers, complements) {
    let binaryGroups = {};  // Will hold groups of binary strings based on count of 1's
    let mintermGroups = {}; // Will hold corresponding minterms for each binary group

    // Loop through the complements and binary numbers
    complements.forEach((minterm, index) => {
      const binary = binaryNumbers[index]; // Get the binary string
      const ones = binary.split('').filter(bit => bit === '1').length; // Count the 1's in binary

      // If the group for this number of 1's doesn't exist, create it
      if (!binaryGroups[ones]) {
        binaryGroups[ones] = [];
        mintermGroups[ones] = [];
      }

      // Add the binary number and its corresponding minterm to the correct groups
      binaryGroups[ones].push(binary);
      mintermGroups[ones].push(minterm);
    });

    // Return the groups of binary numbers and minterms
    return {
      binaryGroups,
      mintermGroups
    };
  }
}
