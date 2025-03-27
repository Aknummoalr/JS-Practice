// What is wrong with this promise chain?

getData()
  .then(data => {
    processData(data);
  })
  .then(result => {
    displayResult(result);
  });

// Ans: - .then should return of line 4 if processData(data) should return something that will be argument for next .then 
//     , as it is not returning means result will be undefined

//     we can fix it by returing result of processData(data)

getData()
  .then(data => {
    return processData(data);
  })
  .then(result => {
    displayResult(result);
  });