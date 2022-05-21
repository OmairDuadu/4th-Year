var http = require('http');
var url = require('url');
var fs = require('fs');



http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end(); 
  }); // you can use 'return' to ensure you stop after the (first) callback
}).listen(8888);

$(document).ready(function(){
  $("button").click(function(){
    $("#div1").fadeToggle();
    $("#div2").fadeToggle("slow");
    $("#div3").fadeToggle(3000);
  });
});


//funtion to display table 

function displayTable() {
  let xmlhttp = new XMLHttpRequest();

  //All the URLs stored within the array
  let country_objects = ["country-objects/countryCapital.json","country-objects/countryContinent.json","country-objects/countryCoast.json",
      "country-objects/countryCurrency.json","country-objects/countryInternet.json","country-objects/countryFlag.json"];

  // Counters and Array for holding the json
  let filesCount = 0;
  let countryData = [];

  for( let i = 0; i < country_objects.length; i++){
      setTimeout(() => {
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
                let table = JSON.parse(xmlhttp.responseText); 
                countryData.push(table);
                filesCount += 1;
                if(filesCount == country_objects.length){
                    console.log("The folder country-objects have been read")
                    createTable(countryData);
                }
            }
        }
        xmlhttp.open("GET", country_objects[i], true); 
        xmlhttp.send();
      } ,1000 * i)
  }
}

//Hides the Table
function twentyRows(){
  let table = document.getElementById("country-table");
  let rows = 20
  for (let i = 0, row; row = table.rows[i]; i++) {
      if(i > rows){
          row.style.visibility = "hidden";
      }
  }
}

//Displays the Table
function fullTable(){
  let table = document.getElementById("country-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
      row.style.visibility = "";
  }
}


//Creation of Table
function createTable(countryData){

  //Combination of individual Tables
  let combinedTable = countryData[0]
  for(let i = 1; i < countryData.length; i++){
      combinedTable = combinedTable.map((item, index) => Object.assign({}, item, countryData[i][index]))
  }
  console.log(combinedTable)
  let table = document.getElementById("country-table");

  //Insertion of data to the table created
  for(let i =0; i < combinedTable.length;i++){
      let newRow = table.insertRow(-1)

      let countryCell = newRow.insertCell(0);
      countryCell.innerHTML = combinedTable[i].country;
      

      let capitalCell = newRow.insertCell(1);
      capitalCell.innerHTML = combinedTable[i].city;
      
      let continentCell = newRow.insertCell(2);
      continentCell.innerHTML = combinedTable[i].continent;
      
      let costlineCell = newRow.insertCell(3);
      costlineCell.innerHTML = combinedTable[i].costline;

      let domainCell = newRow.insertCell(4);
      domainCell.innerHTML = combinedTable[i].tld;

      let currencyCell = newRow.insertCell(5);
      currencyCell.innerHTML = combinedTable[i].currency_name;

      let flagCell = newRow.insertCell(6);

      let flag_img = document.createElement('img');
      flag_img.src = combinedTable[i].flag_base64;
      flag_img.style.height = "70px";
      flag_img.style.width = "40%";
      flagCell.appendChild(flag_img);
  }
  twentyRows()
}

