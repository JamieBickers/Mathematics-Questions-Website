//TODO: Refactor the common behaivor of these api functions once I have enough examples workig.

export const sendBasicQuadraticWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('quadraticEquations', emailAddress, 12)

export const sendBasicSimultaneousEquationsWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('simultaneousEquations', emailAddress, 12)

export const sendAllWorksheets = (emailAddress: string) =>
fetch(`http://localhost:53132/api/worksheet/allPreviousWorksheets`,
{
  method: 'POST',
  body: JSON.stringify({address: emailAddress}),
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

const sendBasicWorksheet = (worksheetType: string, emailAddress: string, numberOfQuestions: number) => () =>
standardPostRequest(`worksheet/default${worksheetType}`, {emailAddress: {address: emailAddress}, numberOfQuestions: numberOfQuestions});

const standardGetRequest = (urlTail: string) =>
fetch(`http://localhost:53132/api/${urlTail}`)
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

const standardPostRequest = (urlTail: string, jsonBody: any) =>
fetch(`http://localhost:53132/api/${urlTail}`,
{
  method: 'POST',
  body: JSON.stringify(jsonBody),
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

export const getBasicQuadraticApi = () => standardGetRequest('QuadraticEquation');
export const getBasicSimultaneousApi = () => standardGetRequest('SimultaneousEquations');
