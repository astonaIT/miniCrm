const ss = SpreadsheetApp.getActiveSpreadsheet();
const latestWs = ss.getSheetByName("Latest Snapshot");
const snapshotValues = latestWs.getDataRange().getValues();
const logWs = ss.getSheetByName('Activity Log');
const clientDBWs = ss.getSheetByName('Client DB');
const clientDbValues = clientDBWs.getDataRange().getValues();
const listsWs = ss.getSheetByName('Lists');
const settingsWs = ss.getSheetByName('Settings');
let date = new Date();
var timestamp = Utilities.formatDate(new Date(), 'Europe/Rome', 'yyyy-MM-dd h:mm:ss'); 
let submitter = Session.getActiveUser().getEmail();
let submitterHandle = submitter.split("@")[0];
var year = date.getFullYear().toString();
var month = (date.getMonth() + 1).toString().padStart(2, "0");
const activityListValues = getActivityData();

function doGet() {
  //const page = 'datatable.html';
  const page = 'main.html';
  const htmlSer = HtmlService.createTemplateFromFile(page).evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1");

  return htmlSer
}



function loadView_(partial) {
  //const page = 'datatable.html';
  //const page = 'main.html';
  const htmlSer = HtmlService.createTemplateFromFile(partial).evaluate().getContent()
  
  return htmlSer
}

function loadDashView(){
  return loadView_("dashboard");
}
function loadRegistryView(){
  return loadView_("viewRegistry")
}
function loadHomeView(){
  //console.log(loadView_("datatable"))
  return loadView_("home")
}

function loadViewOpp(){
  //console.log(loadView_("datatable"))
  return loadView_("viewOpps")
}

function loadNewOpp(){
  //console.log(loadView_("datatable"))
  return loadView_("newOpp")
}
function loadMeetingView(){
  return loadView_("newMeeting")
}
function loadPitchView(){
  return loadView_("newPitch")
}
function loadFeasibilityView(){
  return loadView_("newFeasibility")
}
function loadOfferView(){
  return loadView_("newOffer")
}
function loadwWonView(){
  return loadView_("newWon")
}
function loadLostView(){
  return loadView_("newLost")
}


function loadEditInfoView(){
  return loadView_("updateCompanyInfo")  
}

function loadEditContactsView(){
  return loadView_("updateCompanyContacts")  
}


function loadNewCompany(){
  return loadView_("addCompany")  
}

function submitOpp(obj){
if(obj.activity == 'Prospecting'){
  var finalObj = createNewObj(obj);
  addNewOpp(finalObj);
}
else {
var finalObj = createUpdateObj(obj);

addUpdatedOpp(finalObj);
}
}


function getUserB(){
  var user = Session.getActiveUser().getEmail()//.split("@")[0];;
 return user
}

function getDropdowns(){

var obj = {
  clients: getClientNames(),
  sources: getSources(),
  presales: getPreSales(),
  salesEngineers: getSes(),
  products: getProductsData(),
  lostReasons: getLostReasons()
  }
  console.log('1');
//console.log(obj.clients)
return obj;
};








function getActivityData(){
var lastRow = settingsWs.getRange('A:A').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,1,lastRow-1,3).getValues();
return listArray;
};


function getProductsData(){
var lastRow = settingsWs.getRange('F:F').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,6,lastRow,4).getValues();
//Utilities.sleep(4000);
return listArray;
};

function getClientNames(){
var lastRow = clientDBWs.getRange('A:A').getValues().filter(String).length;
var listArray = [];
listArray = clientDBWs.getRange(2,2,lastRow-1,53).getValues();
finalArray = [];
listArray.forEach(function(ar){
    clientsArray = [];
    clientsArray.push(ar[0]);
    contactsRawArray = [''];
    contactsRawArray.push(ar[13].toString() +' / '+ ar[14].toString());
    contactsRawArray.push(ar[17].toString() +' / '+ ar[18].toString());
    contactsRawArray.push(ar[21].toString() +' / '+ ar[22].toString());
    contactsRawArray.push(ar[25].toString() +' / '+ ar[26].toString());
    contactsRawArray.push(ar[29].toString() +' / '+ ar[30].toString());
    contactsRawArray.push(ar[33].toString() +' / '+ ar[34].toString());
    contactsRawArray.push(ar[37].toString() +' / '+ ar[38].toString());
    contactsRawArray.push(ar[41].toString() +' / '+ ar[42].toString());
    contactsRawArray.push(ar[45].toString() +' / '+ ar[46].toString());
    contactsRawArray.push(ar[49].toString() +' / '+ ar[50].toString());
    contactsArray = [];
    contactsRawArray.forEach(function(row){
      if(row !== ' / '){
        contactsArray.push(row)
      };
    });
    clientsArray.push(contactsArray)
    finalArray.push(clientsArray)
  });
return finalArray;
};

function getPreSales(){
var lastRow = settingsWs.getRange('M:M').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,13,lastRow-1,1).getValues().map( r => r[0].toString());
//Utilities.sleep(4000);
return listArray;
};

function getSes(){
var lastRow = settingsWs.getRange('N:N').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,14,lastRow-1,1).getValues().map( r => r[0].toString());
//Utilities.sleep(4000);
return listArray;
};

function getLostReasons(){
var lastRow = settingsWs.getRange('O:O').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,15,lastRow,1).getValues().map( r => r[0].toString());
//console.log(listArray)
return listArray;
};

function getSources(){
var lastRow = settingsWs.getRange('P:P').getValues().filter(String).length;
var listArray = [];
listArray = settingsWs.getRange(2,16,lastRow-1,1).getValues().map( r => r[0].toString());
return listArray;
};
