
function addElement () {
    // create a new div element
    let newDiv = document.createElement("textarea")
  

    // and give it some content
    // const newContent = document.createTextNode("Hi there and greetings!");
    let texting = document.getElementById("texting").value
    console.log(texting)
    
    // add the text node to the newly created div and style 
    newDiv.innerHTML=texting;
    newDiv.style.border="2px solid black"
    newDiv.style.width="15%"
    newDiv.style.padding="5px"
    
    // add the delete node to the newly created newDiv and function 
    let noteDel = document.createElement("button");
    noteDel.onclick=()=>{newDiv.remove(); noteDel.remove();}
    noteDel.innerHTML="Delete"
    noteDel.style.display="block"

    let colourTag = document.createElement("input")
    colourTag.type="color"
    
    colourTag.style.display="block"

    let changeColor = document.createElement("button")
    changeColor.innerHTML="Change Colour"
    changeColor.onclick=()=>{newDiv.style.backgroundColor=colourTag.value;}

    let breaker = document.createElement("br")
    let breaker1 = document.createElement("br")

    // add the newly created elements and its content into the DOM
    const currentDiv = document.getElementById("printSpace")
    document.body.insertBefore(newDiv, currentDiv)
    document.body.after(noteDel, newDiv)
    document.body.after(colourTag, newDiv)
    document.body.after(changeColor, colourTag)
    document.body.after(breaker,changeColor)
    document.body.after(breaker1,breaker)
    
}

