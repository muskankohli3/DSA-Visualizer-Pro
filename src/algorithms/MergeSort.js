export function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;

  const arr = [...array];
  mergeSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function mergeSortHelper(arr, left, right, animations) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  animations.push({
    type: "split",
    range: [left, right],
    mid
  });

  mergeSortHelper(arr, left, mid, animations);
  mergeSortHelper(arr, mid + 1, right, animations);

  merge(arr, left, mid, right, animations);
}

function merge(arr, left, mid, right, animations) {
  const leftPart = arr.slice(left, mid + 1);
  const rightPart = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftPart.length && j < rightPart.length) {
    animations.push({
      type: "compare",
      indices: [left + i, mid + 1 + j]
    });

    if (leftPart[i] <= rightPart[j]) {
      animations.push({
        type: "overwrite",
        index: k,
        value: leftPart[i]
      });
      arr[k++] = leftPart[i++];
    } else {
      animations.push({
        type: "overwrite",
        index: k,
        value: rightPart[j]
      });
      arr[k++] = rightPart[j++];
    }
  }

  while (i < leftPart.length) {
    animations.push({
      type: "overwrite",
      index: k,
      value: leftPart[i]
    });
    arr[k++] = leftPart[i++];
  }

  while (j < rightPart.length) {
    animations.push({
      type: "overwrite",
      index: k,
      value: rightPart[j]
    });
    arr[k++] = rightPart[j++];
  }
}