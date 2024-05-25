function mergeSort(array) {
  if (array.length > 1) {
    let midIndex = Math.floor((array.length - 1) / 2);
    let leftArray = mergeSort(array.slice(0, midIndex + 1));
    let rightArray = mergeSort(array.slice(midIndex + 1));
    return merge(leftArray, rightArray);
  } else {
    return array;
  }

  function merge(array1, array2) {
    let output = [];
    let i = 0;
    let j = 0;
    for (let k = 0; k < array1.length + array2.length; k++) {
      if (array1[i] <= array2[j]) {
        output.push(array1[i]);
        i++;
      } else if (array1[i] > array2[j]) {
        output.push(array2[j]);
        j++;
      } else if (!array1[i]) {
        output.push(array2[j]);
        j++;
      } else if (!array2[j]) {
        output.push(array1[i]);
        i++;
      }
    }
    return output;
  }
}

module.exports = { mergeSort };
