function toTitleCase(str) {
  //return 
    str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    }
  );
  var cleanStr = str.trim()
  return cleanStr;
}

function checkCompanyName(str){

    var clientToLog = toTitleCase('str')
    var dupe = false;
  clientDbValues.forEach(function(row){

    if(row[1] === clientToLog){
      dupe = true; 
      } 
    });
   return dupe
}


function addCompany(obj){
var fieldsObj = obj;
//console.log(fieldsObj)
let lastRow = clientDBWs.getLastRow()
let lastCode = clientDBWs.getRange(lastRow,1).getValue().substring(1) 
let newDigit = parseInt(lastCode) + 1
let newCode;
if(newDigit.toString().length = 3){
  newCode= 'C0'+  newDigit.toString()
  } else if (newDigit.toString().length = 4){
    newCode= 'C'+  newDigit.toString()
  }


properClientName = toTitleCase(fieldsObj.client_name);



var row = [newCode, properClientName, fieldsObj.country, fieldsObj.entity,fieldsObj.business_name, fieldsObj.vertical, fieldsObj.vat, fieldsObj.comment,
            fieldsObj.business_street, fieldsObj.business_city, fieldsObj.business_area, fieldsObj.business_code,
          ]
row.push(date,submitter);
 

clientDBWs.appendRow(row);
}

function updateCompany(obj){

var row = [  obj.country,obj.entity, obj.business_name, obj.vertical, obj.vat, 
          obj.business_street, obj.business_city, obj.business_area, obj.business_code, obj.comment, ]

row.push(date,submitter);

var updatedRow = row;
var rowNo = 0;

clientDbValues.forEach(function(row){
  rowNo++;
  if(row[0] == updatedRow[0]){
    clientDBWs.getRange('C' + rowNo + ':N' + rowNo).setValues([updatedRow]); 
    };
  });
}

function updateContacts(obj){
var fieldsObj=obj;

var row = [

fieldsObj.contact1Name,
fieldsObj.contact1Role,
fieldsObj.contact1Mail,
fieldsObj.contact1Phone,

fieldsObj.contact2Name,
fieldsObj.contact2Role,
fieldsObj.contact2Mail,
fieldsObj.contact2Phone,

fieldsObj.contact3Name,
fieldsObj.contact3Role,
fieldsObj.contact3Mail,
fieldsObj.contact3Phone,

fieldsObj.contact4Name,
fieldsObj.contact4Role,
fieldsObj.contact4Mail,
fieldsObj.contact4Phone,

fieldsObj.contact5Name,
fieldsObj.contact5Role,
fieldsObj.contact5Mail,
fieldsObj.contact5Phone,

fieldsObj.contact6Name,
fieldsObj.contact6Role,
fieldsObj.contact6Mail,
fieldsObj.contact6Phone,

fieldsObj.contact7Name,
fieldsObj.contact7Role,
fieldsObj.contact7Mail,
fieldsObj.contact7Phone,

fieldsObj.contact8Name,
fieldsObj.contact8Role,
fieldsObj.contact8Mail,
fieldsObj.contact8Phone,

fieldsObj.contact9Name,
fieldsObj.contact9Role,
fieldsObj.contact9Mail,
fieldsObj.contact9Phone,

fieldsObj.contact10Name,
fieldsObj.contact10Role,
fieldsObj.contact10Mail,
fieldsObj.contact10Phone,

date,submitter
]

var updatedRow = row;
var rowNo = 0;

clientDbValues.forEach(function(row){
  rowNo++;
  if(row[0] == fieldsObj.company_id){
    clientDBWs.getRange('O' + rowNo + ':BD' + rowNo).setValues([updatedRow]); 
    };
  });


}






function getCompanyInfoById(id){
  //var id = 'C0319'
  var companyIds = clientDBWs.getRange(2,1, clientDBWs.getLastRow()-1,1).getValues().map( r => r[0].toString());
  const posIndex = companyIds.indexOf(id)
  const rowNum = posIndex === -1 ? 0 : posIndex + 2;
  var ar = clientDBWs.getRange(rowNum,1,1,14).getValues()[0]; 
 

  var rawObj =
  {
  'companyId': ar[0],
  'companyName': ar[1],  //??
  'companyCountry': [ar[2]],
  'entity': [ar[3]],
  'businessName': ar[4],
  'vertical': [ar[5]], 
  'vat': ar[6], 
  'road': ar[7], 
  'city': ar[8],
  'area': ar[9],
  'zipCode': ar[10],
  'comment': ar[11],
  'timestamp': Utilities.formatDate(ar[12], 'Europe/Rome', 'dd-MM-yyyy').toString(), //??
  'creator': [ar[13]],

  };

  

  var buffer = [' '];

  var verticals = getAllVerticals();
  var existingVertical = rawObj['vertical']
  rawObj['vertical'] = [...existingVertical, ...buffer, ...verticals];

  var countries = getAllCountries();
  var existingCountry = rawObj['companyCountry']
  rawObj['companyCountry'] = [...existingCountry, ...buffer, ...countries];

  var entities = getAllEntities();
  var existingEntity = rawObj['entity']
  rawObj['entity'] = [...existingEntity, ...buffer, ...entities];

  //console.log(rawObj)
  return rawObj
  };



function getCompanyDropdowns(){
  var vertical = getAllVerticals();
  var companyCountry = getAllCountries();
  var entity = getAllEntities();

vertical.splice(-1);
companyCountry.splice(-1)
entity.splice(-1)
vertical.unshift(" ");
companyCountry.unshift(" ");
entity.unshift(" ");

var obj = {
'vertical': vertical,
'companyCountry': companyCountry,
'entity': entity
  }
console.log(obj)
return obj;
}

function getAllVerticals(){
  var lastRow = listsWs.getRange('E:E').getValues().filter(String).length;
  var listArray = [];
  //var def = [verticalRange.getValue()];
  var listArray = listsWs.getRange(2,5,lastRow).getValues();
  //listArray.unshift(def);
  return listArray;
}

function getAllCountries(){
  var lastRow = listsWs.getRange('G:G').getValues().filter(String).length;
  var listArray = [];
  //var def = [countryRange.getValue()];
  var listArray = listsWs.getRange(2,7,lastRow).getValues();
  //listArray.unshift(def);
  return listArray;
}

function getAllEntities(){
  var lastRow = listsWs.getRange('A:A').getValues().filter(String).length;
  var listArray = [];
  //var def = [entityRange.getValue()];
  listArray = listsWs.getRange(2,1,lastRow).getValues();
  //listArray.unshift(def);
  return listArray;
}


function getCompanyContactsById(id){
  //var id = 'C0002'
  var companyIds = clientDBWs.getRange(2,1, clientDBWs.getLastRow()-1,1).getValues().map( r => r[0].toString());
  const posIndex = companyIds.indexOf(id)
  const rowNum = posIndex === -1 ? 0 : posIndex + 2;
  var idAr = clientDBWs.getRange(rowNum,1,1,2).getValues()[0]; 
  var contactsAr = clientDBWs.getRange(rowNum,15,1,54).getValues()[0]; 
  var ar = [...idAr, ...contactsAr]

  var rawObj =
  {
"companyId":ar[0],
"clientName":ar[1],
"contact1Name":ar[2],
"contact1Role":ar[3],
"contact1Mail":ar[4],
"contact1Phone":ar[5],
"contact2Name":ar[6],
"contact2Role":ar[7],
"contact2Mail":ar[8],
"contact2Phone":ar[9],
"contact3Name":ar[10],
"contact3Role":ar[11],
"contact3Mail":ar[12],
"contact3Phone":ar[13],
"contact4Name":ar[14],
"contact4Role":ar[15],
"contact4Mail":ar[16],
"contact4Phone":ar[17],
"contact5Name":ar[18],
"contact5Role":ar[19],
"contact5Mail":ar[20],
"contact5Phone":ar[21],
"contact6Name":ar[22],
"contact6Role":ar[23],
"contact6Mail":ar[24],
"contact6Phone":ar[25],
"contact7Name":ar[26],
"contact7Role":ar[27],
"contact7Mail":ar[28],
"contact7Phone":ar[29],
"contact8Name":ar[30],
"contact8Role":ar[31],
"contact8Mail":ar[32],
"contact8Phone":ar[33],
"contact9Name":ar[34],
"contact9Role":ar[35],
"contact9Mail":ar[36],
"contact9Phone":ar[37],
"contact10Name":ar[38],
"contact10Role":ar[39],
"contact10Mail":ar[40],
"contact10Phone":ar[41],

  };
  //console.log(rawObj)
  return rawObj
}
