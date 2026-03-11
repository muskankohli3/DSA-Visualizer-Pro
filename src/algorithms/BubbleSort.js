export function bubbleSort(array) {
  const animations = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      animations.push({
        type: "compare",
        indices: [j, j + 1]
      });

      if (arr[j] > arr[j + 1]) {
        animations.push({
          type: "swap",
          indices: [j, j + 1]
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return animations;
}