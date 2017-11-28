export interface QuadraticCoefficientsAndSolution {
  coefficients: number[],
  solutions: number[]
}

export const getBasicQuadraticApi = () =>
fetch('http://localhost:53132/api/QuadraticEquation')
  .then( response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      return response.json();
    }
  )
  .catch(err => console.log('Fetch Error :-S', err));

export const sendBasicQuadraticWorksheetApi = () =>
fetch('http://localhost:53132/api/worksheet/defaultQuadraticEquations',
{
  method: 'POST',
  body: JSON.stringify({emailAddress: 'bickersjamie@googlemail.com', numberOfQuestions: 12}),
  headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
  },
})
  .then( response => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      return response.json();
    }
  )
