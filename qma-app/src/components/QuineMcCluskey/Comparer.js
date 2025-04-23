/**
 * A helper class that finds prime implicants using the Quine-McCluskey method.
 */
export class Comparer {
  /**
   * Compares binary minterms and merges those that differ by one bit.
   * It returns the prime implicants and how each one covers original minterms.
   *
   * @param {Object} binaryGroups - Groups of binary terms, sorted by number of 1s.
   * @param {Object} mintermGroups - Same groups but with decimal minterm values.
   * @returns {{
   *   primeImplicants: string[],              // Binary terms with "_" for don't-cares
   *   piCoverage: Object.<string, number[]>,  // Map of implicants to minterms
   *   iterations: Array<Object>               // Steps showing how terms were merged
   * }}
   */
  static compareMinterms(binaryGroups, mintermGroups) {
    let primeImplicants = new Set();               // Final prime implicants
    let currentGroups = { ...binaryGroups };       // Groups to compare
    let implicantToMinterms = {};                  // Map each implicant to its minterms
    let iterations = [];                           // Store each merge step

    // Initialize implicant-to-minterm mapping
    Object.keys(mintermGroups).forEach(group => {
      mintermGroups[group].forEach((minterm, idx) => {
        const term = binaryGroups[group][idx];
        implicantToMinterms[term] = [minterm];
      });
    });

    let changesMade = true;

    // Repeat merging until no more possible merges
    while (changesMade && Object.keys(currentGroups).length > 1) {
      changesMade = false;
      const newGroups = {};                         // New groups after merging
      const usedTerms = new Set();                  // Terms that were merged
      const currentIteration = { merges: [], unmatchedTerms: [] };

      const groupKeys = Object.keys(currentGroups).map(Number).sort((a, b) => a - b);

      // Compare each group with the next
      for (let i = 0; i < groupKeys.length - 1; i++) {
        const currentKey = groupKeys[i];
        const nextKey = groupKeys[i + 1];

        // Only compare adjacent groups (e.g., group 2 with group 3)
        if (nextKey - currentKey !== 1) continue;

        const currentGroup = currentGroups[currentKey];
        const nextGroup = currentGroups[nextKey];

        // Compare each term from current group with each from next group
        for (const current of currentGroup) {
          let merged = false;

          for (const next of nextGroup) {
            let diffIndex = -1;
            let diffCount = 0;

            // Find how many bits differ
            for (let j = 0; j < current.length; j++) {
              if (current[j] !== next[j]) {
                diffCount++;
                diffIndex = j;
              }
              if (diffCount > 1) break;
            }

            // Merge only if they differ by 1 bit
            if (diffCount === 1) {
              let mergedTerm = current.split('');
              mergedTerm[diffIndex] = '_';          // Replace differing bit with '_'
              mergedTerm = mergedTerm.join('');

              // Add merged term to new group
              if (!newGroups[currentKey]) newGroups[currentKey] = [];
              if (!newGroups[currentKey].includes(mergedTerm)) {
                newGroups[currentKey].push(mergedTerm);

                // Update coverage map
                implicantToMinterms[mergedTerm] = [
                  ...new Set([
                    ...(implicantToMinterms[current] || []),
                    ...(implicantToMinterms[next] || [])
                  ])
                ];

                // Log this merge
                currentIteration.merges.push({
                  from: [current, next],
                  to: mergedTerm
                });
              }

              merged = true;
              usedTerms.add(current);
              usedTerms.add(next);
              changesMade = true;
            }
          }

          // If not merged, keep as a possible prime implicant
          if (!merged && !usedTerms.has(current)) {
            currentIteration.unmatchedTerms.push(current);
          }
        }
      }

      // Add leftover terms in the last group that didn't get used
      const lastGroupIndex = groupKeys.length - 1;
      const lastGroup = currentGroups[groupKeys[lastGroupIndex]];

      for (const term of lastGroup) {
        if (!usedTerms.has(term)) {
          currentIteration.unmatchedTerms.push(term);
        }
      }

      // Add unmatched terms as prime implicants
      currentIteration.unmatchedTerms.forEach(term => primeImplicants.add(term));

      // If we stopped merging but have new terms, add them as prime implicants
      if (!changesMade && Object.keys(newGroups).length > 0) {
        for (const group of Object.values(newGroups)) {
          for (const term of group) {
            primeImplicants.add(term);
          }
        }
      }

      // Prepare for next round
      currentGroups = newGroups;
      iterations.push(currentIteration);
    }

    // Add any remaining terms in last round
    for (const group of Object.values(currentGroups)) {
      for (const term of group) {
        primeImplicants.add(term);
      }
    }

    return {
      primeImplicants: Array.from(primeImplicants),
      piCoverage: implicantToMinterms,
      iterations
    };
  }
}
