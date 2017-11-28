export interface QuadraticCoefficientsAndSolution {
  coefficients: number[],
  solutions: number[]
}

export const testApi = () =>
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
