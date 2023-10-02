function getOppInfoById(id){
  var oppIds = latestWs.getRange(2,3, latestWs.getLastRow()-1,1).getValues().map( r => r[0].toString());
  const posIndex = oppIds.indexOf(id)
  const rowNum = posIndex === -1 ? 0 : posIndex + 2;
  var ar = latestWs.getRange(rowNum,1,1,31).getValues()[0]; 
  var start = Utilities.formatDate(new Date(ar[20]), 'Europe/Rome', 'yyyy-MM-dd').toString() === '1970-01-01' ? '' : Utilities.formatDate(new Date(ar[20]), 'Europe/Rome', 'yyyy-MM-dd').toString();
  var end = Utilities.formatDate(new Date(ar[21]), 'Europe/Rome', 'yyyy-MM-dd').toString() === '1970-01-01' ? '' : Utilities.formatDate(new Date(ar[21]), 'Europe/Rome', 'yyyy-MM-dd').toString();
  var rawObj =
  {
  'Timestamp': Utilities.formatDate(ar[0], 'Europe/Rome', 'dd-MM-yyyy').toString(), //??
  'Submitter': ar[1],  //??
  'Opportunity ID': ar[2],
  'Contact ID': ar[3],
  'Status': ar[4],
  'Probability': ar[5], 
  'Client': ar[6], 
  'Client Country': ar[7], 
  'Client Id': ar[8],
  'Opportunity Name': ar[9],
  'Comment': '',//ar[10],
  'Final Client': ar[11],
  'Business contact 1': [ar[12]],
  'Business contact 2': [ar[13]],
  'Business contact 3': [ar[14]],
  'Activity': ar[15],
  'Business Unit': ar[16], 
  'Business Line': ar[17],
  'Product' : ar [18],
  'Category' : ar[19],
  'Expected Start Date': start,
  'Expected End Date': end,
  'Amount €': ar[22],
  'Attachment': '',//ar[23],
  'Sales country': ar[24],
  'Sales rep': ar[25],
  'Presale Rep': [ar[26]],
  'Rep Code': ar[27],
  'Sales Engineeer': [ar[28]],
  'Lost Reason': '',
  'Source': ar[30]
  };

  var contactsAr = getClientNames();
    contactsAr.forEach(function(item){      
      if(item[0] === rawObj['Client']){
        item[1].forEach(function(el){
        rawObj['Business contact 1'].push(el);
        rawObj['Business contact 2'].push(el);
        rawObj['Business contact 3'].push(el);
        })
      }
    });

  var buffer = [' '];

  var ps = getPreSales();
  var existingPs = rawObj['Presale Rep']
  rawObj['Presale Rep'] = [...existingPs, ...buffer, ...ps];

  var se = getSes();
  var existingSe = rawObj['Sales Engineeer']
  rawObj['Sales Engineeer'] = [...existingSe, ...buffer, ...se];

  rawObj['Lost Reason'] = getLostReasons();


  var productsAr = getProductsData();
  var categoriesRaw = [];
  var categories = [];
  var productsRaw = [];
  var products = [];
  var bLsRaw = [];
  var bLs = [];

  var existingCategory = rawObj['Category'];
  var existingProduct = rawObj['Product'];
  var existingBL = rawObj['Business Line'];
  var existingBU = rawObj['Business Unit'];
    
  if( existingBL === '' ){
    productsAr.forEach(function(item){ 
      if(existingBU === item[0]){
      bLsRaw.push(item[1])
      };      
    });
    
  bLs = [...new Set(bLsRaw)];
  rawObj['Business Line'] = [...buffer,...bLs];
  rawObj['Product'] = [rawObj['Product']]
  rawObj['Category'] = [rawObj['Category']]
  };

  if( existingProduct === '' && existingBL !== ''){
    productsAr.forEach(function(item){ 
      if(existingBU === item[0]){
      bLsRaw.push(item[1])

      };

      if(existingBL === item[1]){

      productsRaw.push(item[2])
      };      
    });
  products = [...new Set(productsRaw)];
  bLs = [...new Set(bLsRaw)];
  rawObj['Business Line'] = [rawObj['Business Line'],...buffer, ...bLs] 
  rawObj['Product'] = [...buffer,...products];
  rawObj['Category'] = [rawObj['Category']]  
  };

  if( existingCategory === '' && existingProduct !== ''){
    productsAr.forEach(function(item){ 
      if(existingBU === item[0]){
      bLsRaw.push(item[1])
      };
      if(existingBL === item[1]){
      productsRaw.push(item[2])
      }; 
      if( existingProduct === item[2]){     
      categoriesRaw.push(item[3])
      };      
    });
  products = [...new Set(productsRaw)];
  bLs = [...new Set(bLsRaw)];
  categories = [...new Set(categoriesRaw)];
  rawObj['Business Line'] = [rawObj['Business Line'],...buffer, ...bLs] 
  rawObj['Product'] = [rawObj['Product'],...buffer, ...products] 
  rawObj['Category'] =   [...buffer,...categories];
  };
    
  if( existingCategory !== '' ){
    productsAr.forEach(function(item){ 
      if(existingBU === item[0]){
      bLsRaw.push(item[1])
      };
      if(existingBL === item[1]){
      productsRaw.push(item[2])
      }; 
      if( existingProduct === item[2]){     
      categoriesRaw.push(item[3])
      }; 
      if( existingCategory === item[3]){     
      categoriesRaw.push(item[3])
      };      
    });
  products = [...new Set(productsRaw)];
  bLs = [...new Set(bLsRaw)];
  categories = [...new Set(categoriesRaw)];
  rawObj['Business Line'] = [rawObj['Business Line'],...buffer, ...bLs] 
  rawObj['Product'] = [rawObj['Product'],...buffer, ...products] 
  rawObj['Category'] =   [rawObj['Category'],...buffer,...categories];
  };  
  return rawObj
  };




function addUpdatedOpp(finalObj){
var obj =finalObj;
var row =[];

row.push(
  date, submitter, obj.ui_oppId, obj.contactId, obj.status, obj.probability, obj.client , obj.client_country, obj.client_id, obj.ui_oppName, obj.description, obj.final_client, obj.contact_1, obj.contact_2,obj.contact_3,
  obj.activity, obj.bu, obj.bl, obj.product,obj.category, obj.start, obj.end, obj.amount, obj.brief, obj.sa_country, obj.sale, obj.presale, obj.repCode, obj.se, obj.lost_reason,obj.source
  )
logWs.appendRow(row);
updateSnapshot(row);
};


function updateSnapshot(row){
var updatedRow = row;
var rowNo = 0;
snapshotValues.forEach(function(row){
  rowNo++;
  if(row[2] == updatedRow[2]){
    latestWs.getRange('A' + rowNo + ':AE' + rowNo).setValues([updatedRow]); 
    };
  });
};

function createUpdateObj(obj){
  var fieldsObj = obj;
  infoAr = getInfo(obj.ui_oppId);
 
  fieldsObj.final_client = fieldsObj.final_client == '' ? fieldsObj.client : fieldsObj.final_client;
  var salesRep = infoAr[0];
  var sa_country= infoAr[1];
  var repCode = infoAr[2];
  var oppName= infoAr[3];
  var client_country= infoAr[4];
  var client_id = infoAr[5];

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
    'oppId': fieldsObj.oppId,
    'oppName': oppName
    };

  var completeObj = {
    ...fieldsObj,
    ...addObj
  };

  var contactId = createUpdateContactId(completeObj);

  var idsObj = {
    'contactId': contactId
  };

  var finalObj = {
    ...completeObj,
    ...idsObj
  };
  //console.log(finalObj)
  return finalObj;  

  };

function createUpdateContactId (obj){
var oppId = obj.ui_oppId
var result = oppId + "|" + timestamp
return result;
};

function getInfo(oppId){
var repCode;
var sa_country;
var client_country;
var client_id;
var oppName;
var salesRep;     
snapshotValues.forEach(function(row){
 if(oppId = row[2]){
     salesRep = row[25];
     sa_country = row[24]
     repCode = row[27]
     oppName = row[9]
     client_country = row[7]
     client_id = row[8]
    };
  });
var infoAr = [];
infoAr.push(salesRep,sa_country,repCode,oppName,client_country,client_id);
return infoAr;
}
