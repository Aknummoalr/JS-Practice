// Learn what is debouncing, and create your own debouncing function Debouncing a 
// function ensures that it doesn’t get called too frequently.
// func will run after delay 

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to be debounced that will be called after some time
function search(query) {
    console.log('Searching for:', query);
}

// Create a debounced version of the search function
const debounceSearch = debounce(search, 100);

// Simulate typing with multiple calls to the debounced function
debounceSearch('Hello');
debounceSearch('Hello, ');
debounceSearch('Hello, World!');  // Only this call will trigger after 100ms. 
