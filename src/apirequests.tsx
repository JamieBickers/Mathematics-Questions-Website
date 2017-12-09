export const sendBasicQuadraticWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('quadraticEquations', emailAddress, 12)

export const getBasicQuadraticApi = () => standardGetRequest('QuadraticEquation');
export const getBasicSimultaneousApi = () => standardGetRequest('SimultaneousEquations');

export const sendBasicSimultaneousEquationsWorksheetApi = (emailAddress: string, numberOfQuestions: number) =>
sendBasicWorksheet('simultaneousEquations', emailAddress, 12)

const url = 'http://mathematicsquestiongeneratorapi.azurewebsites.net'

export const sendAllWorksheets = (emailAddress: string) =>
fetch(`${url}/api/worksheet/allPreviousWorksheets`,
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
fetch(`${url}/api/${urlTail}`)
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
fetch(`${url}/api/${urlTail}`,
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
