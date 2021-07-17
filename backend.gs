/***********************************
 * title: backend
 * url: YOUR URL
***********************************/

const DB_ID = 'YOUR_SPREADSHEET_ID';

/***********************************
 * HELPERS
 **********************************/
/* 
* This functinos receives and array of arrays and return an array of objects using the first
* row as the key name
*/
function arrayToArrayOfObjects(ARRAY){
    // this line atracts the fist row as an array of strings.
    let keys = [...ARRAY[0]];
    
    // remove the first row
    ARRAY.shift(); 

    // map the array in order to assign each value to a key.
    let arrayOfObjects = ARRAY.map((arrayWithValues) => {
      let objectToReturn = {};

      arrayWithValues.forEach( (key,i) => { 
       objectToReturn = {
        ...objectToReturn, 
        [keys[i]]: key
        }; 
       } );
      return objectToReturn;
    });

  return arrayOfObjects;
}
/* 
* Receives an object an store those values into a plain array.
*/
function objectToArray(object){
  let ARRAY = getValues();
  let keys = [...ARRAY[0]];
  let newItem = keys.map( key => object[key])
  return newItem
}

/***********************************
 * CRUD
 **********************************/

function getValues() {
  const SS_ID = DB_ID;
  const ArrayOfArrays = SpreadsheetApp
                          .openById(SS_ID)
                          .getSheets()[0]
                          .getDataRange()
                          .getValues();
  return ArrayOfArrays;
}

function saveNewValue(ValueToSave) {
  const SS_ID = DB_ID;
  const ss = SpreadsheetApp.openById(SS_ID).getSheets()[0];

  let ARRAY = getValues();
  let keys = [...ARRAY[0]];
  keys.shift();
  let data = keys.map( key => ValueToSave[key])

  // const data = objectToArray(ValueToSave);
  console.log(data)
  data.unshift(Utilities.getUuid());
   console.log(data)
  ss.appendRow(data);
}

function updateValue( ValueToReplace ) {
  // this funciont receives 
  const SS_ID = DB_ID;
  const ss = SpreadsheetApp.openById(SS_ID)
              .getSheets()[0]
              .getDataRange()
              .getValues();
  
  let rowToUpdate = 0;
  const numOfColumns = ss[0].length;

  ss.forEach((el,i) => {
    if(el[0] == ValueToReplace._id){
      rowToUpdate = i + 1; 
    } 
  });
  const data = objectToArray(ValueToReplace);
  
  SpreadsheetApp.openById(SS_ID)
    .getSheets()[0]
    .getRange(rowToUpdate, 1, 1, numOfColumns)
    .setValues( [ data ] );
}

function deleteValue( ValueToDelete ) {
  // this funciont receives 
  const SS_ID = DB_ID;
  const ss = SpreadsheetApp.openById(SS_ID)
              .getSheets()[0]
              .getDataRange()
              .getValues();
  
  let rowToDelete = 0;

  ss.forEach((el,i) => {
    if(el[0] == ValueToDelete._id){
      rowToDelete = i + 1; 
    } 
  });

  SpreadsheetApp.openById(SS_ID)
    .getSheets()[0]
    .deleteRow(rowToDelete)
}


function getObjects() {
  return arrayToArrayOfObjects( getValues() );
}

function testGetVaues() {
  console.log( arrayToArrayOfObjects( getValues() ) );
}


