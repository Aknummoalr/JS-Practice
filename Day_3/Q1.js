// Convert this Promise-based code to use async/await:

/*
function fetchData() {
    return fetch('https://dummyjson.com/products/search?q=phone')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
*/

async function fetchData(){
  try {
    result = await fetch('https://dummyjson.com/products/search?q=phone')
    const data = await result.json();
    console.log(data)
    return data

  } catch (error) {
    console.error('Error:', error);
  }
}