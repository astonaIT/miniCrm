function addNewOpp(finalObj){
var obj =finalObj;
var row =[];

row.push(
  date, submitter, obj.oppId, obj.contactId, obj.status, obj.probability, obj.client , obj.client_country, obj.client_id, obj.oppName, obj.description, obj.final_client, obj.contact_1, obj.contact_2,obj.contact_3,
  obj.activity, obj.bu, obj.bl, obj.product,obj.category, obj.start, obj.end, obj.amount, obj.brief, obj.sa_country, obj.sale, obj.presale, obj.repCode, obj.se, obj.lost_reason,obj.source
  )
logWs.appendRow(row);
latestWs.appendRow(row);
};

function getInfoNewOpp(fieldsObj){
var repCode;
var sa_country;
var client_country;
var client_id;
var client = fieldsObj.client
var salesRep = submitterHandle;     
var repInfoAr = settingsWs.getRange('J:L').getValues();
repInfoAr.forEach(function(row){
 if(salesRep == row[0]){
     sa_country = row[2]
     repCode = row[1]

    };
  });
clientDbValues.forEach(function(row){
 if(client === row[1]){
    client_country = row[2];
     client_id = row[0]
        };
  });
var infoAr = [];
infoAr.push(salesRep,sa_country,repCode,client_country,client_id);
return infoAr;
}




function createNewObj(obj){

  var fieldsObj = obj;
  infoAr = getInfoNewOpp(fieldsObj);
 
  fieldsObj.final_client = fieldsObj.final_client == '' ? fieldsObj.client : fieldsObj.final_client;
  var salesRep = infoAr[0];
  var sa_country= infoAr[1];
  var repCode = infoAr[2];
  var client_country= infoAr[3];
  var client_id = infoAr[4];

  let activityToFind = fieldsObj.activity;
  var probability;
  var status;

  for (let z = 0; activityListValues.length; z++) {
    if(activityListValues[z][0] == activityToFind){
      probability = activityListValues[z][1];
      status = activityListValues[z][2];
      break;
    };
  };

  var addObj = {
    'probability': probability,
    'status': status,
    'repCode': repCode,
    'sa_country': sa_country,
    'client_country': client_country,
    'client_id': client_id,
    'sale': salesRep,
    };

  var completeObj = {
    ...fieldsObj,
    ...addObj
  };

var oppName = createOppName(completeObj);
var oppId = createOppId(completeObj);
var contactId = createContactId(completeObj);

var idsObj = {
'oppName': oppName,
'oppId': oppId,
'contactId': contactId
};

  var finalObj = {
    ...completeObj,
    ...idsObj
  };
  console.log(finalObj)
  return finalObj;  

  };

function createOppId(obj){
var result;
var rowNo = getFirstEmptyRowWholeRow();
result = obj.client_id + '|' + obj.bu + '|' + year + month + '|' + obj.repCode + '|' + rowNo
return result;
};



function createOppName(obj){
var result;
var rowNo = getFirstEmptyRowWholeRow();
result = obj.client + '|' + obj.bu + '|' + year + month + '|' + obj.sale + '|' + rowNo
return result;
};


function createContactId(obj){
var oppId = createOppId(obj)
var result = oppId + "|" + timestamp
return result;
};


function getFirstEmptyRowWholeRow() {
var values = logWs.getDataRange().getValues();
var row = 0;
  for (var row=0; row<values.length; row++) {
    if (!values[row].join("")) break;
    };
return (row+1);
};
