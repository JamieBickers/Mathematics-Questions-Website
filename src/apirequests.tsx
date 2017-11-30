//TODO: Refactor the common behaivor of these api functions once I have enough examples workig.

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

  export const getBasicSimultaneousApi = () =>
  fetch('http://localhost:53132/api/SimultaneousEquations')
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

export const sendBasicQuadraticWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('quadraticEquations', emailAddress, 12)

export const sendBasicSimultaneousEquationsWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('simultaneousEquations', emailAddress, 12)

const sendBasicWorksheet = (worksheetType: string, emailAddress: string, numberOfQuestions: number) => () =>
fetch(`http://localhost:53132/api/worksheet/default${worksheetType}`,
{
  method: 'POST',
  body: JSON.stringify({emailAddress: emailAddress, numberOfQuestions: numberOfQuestions}),
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
