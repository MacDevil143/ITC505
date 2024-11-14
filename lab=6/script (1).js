document.getElementById('sortBtn').addEventListener('click', function() {
    const array = [5, 3, 8, 1, 2];
    const sortedArray = array.sort((a, b) => a - b);
    document.getElementById('result').textContent = 'Sorted Array: ' + sortedArray.join(', ');
});
