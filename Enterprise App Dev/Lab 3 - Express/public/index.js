// function to display the colour info
function showColour(res){

  //Location to print the results
  let GenderElement = document.getElementById("face_gender");
  let ageElement = document.getElementById("face_age");
  let smileElement = document.getElementById("face_smile");
  let glassesElement = document.getElementById("face_eye_glasses");
  let sunGlassesElement = document.getElementById("face_sun_glasses");

  //Displaying colour inplaceholder variables
  GenderElement.innerHTML = res.colorId;
  ageElement.innerHTML = res.hexString;
  smileElement.innerHTML = "R: " + res.rgb.r + " G: " + res.rgb.g+ " B: " + res.rgb.b;
  glassesElement.innerHTML = "H: " + res.hsl.h + " S: " + res.hsl.s+ " L: " + res.hsl.l;
  sunGlassesElement.innerHTML = res.name;
  document.getElementById("colourBack").style.backgroundColor=res.hexString;
}

//function to get the colour using Id
async function getColour() {
  //Get Files From Website and package it into FormData format
  let colourId = document.getElementById("input-number").value;
  const res = await axios.get("http://localhost:3000/colour/" + colourId);

  console.log(res.data)
  showColour(res.data)

  console.log(JSON.parse(getCookie("colourCookie")));
  cook = JSON.parse(getCookie("colourCookie"))
  showColour(cook)
}

window.onload = function() {
  cook = JSON.parse(getCookie("colourCookie"))
  showColour(cook);
}

//creating new colour entry
async function createColour() {
  //Get Files From Website and package it into FormData format
  let name = document.getElementById("create-name").value;
  let hexString = document.getElementById("create-hex").value;

  // creating hex nad hdsl values
  let rgb = HexToRgb(hexString);
  let hsl = HexToHSL(hexString);

  console.log(rgb);
  console.log(hsl);
  const res = await axios.post("http://localhost:3000/createcolours/", {hexString : hexString, rgb : rgb, hsl : hsl, name : name});
  console.log(res.data)
  showColour(res.data)
  
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function editColour() {
  //Get Files From Website and package it into FormData format
  let colourId = document.getElementById("edit-Id").value;
  let colourName = document.getElementById("edit-name").value;
  let hexString = document.getElementById("edit-hex").value;

  const res = await axios.post("http://localhost:3000/getColour/");
  if(res.data[colourId] == 0){

    createColour(colourId,hexString);

  }else{

    let rgb = HexToRgb(hexString);
    let hsl = HexToHSL(hexString);
    const resEdit = await axios.post("http://localhost:3000/editcolours/" + colourId , {colorId : colourId,hexString : hexString, rgb : rgb, hsl : hsl, name : colourName});  
    
    console.log(resEdit.data)
    showColour(resEdit.data)
  }
  
}


async function deleteColour() {
  //Get Files From Website and package it into FormData format
  let colourId = document.getElementById("delete-Id").value;
  let deleter = document.getElementById("Delete-notify");

  const res = await axios.delete("http://localhost:3000/colours/"+colourId);

  
  deleter.innerHTML = res.data.status;

  console.log(res.data.status);

}


function HexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}


function HexToHSL(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  r = parseInt(result[1], 16);
  g = parseInt(result[2], 16);
  b = parseInt(result[3], 16);
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  let HSL = new Object();
  HSL['h']=h;
  HSL['s']=s;
  HSL['l']=l;
  return HSL;
}