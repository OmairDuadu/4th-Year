//creating the RX for the button  and function
const createNote = document.getElementById("newNote");
const buttonClicked = Rx.Observable.fromEvent(createNote,"click");
//To enter the function
buttonClicked.subscribe(() => newNote());

var Id = 1;

function newNote()
{
    // const newContent = document.createTextNode("Hi there and greetings!");
    let texting = document.getElementById("texting").value;
    console.log(texting);
    
    //catching the printspace
    let printSpace = document.getElementById('printSpace');

    // create a new div element for new notes
    let newDiv = document.createElement("div");
    // new element for text area
    let newText = document.createElement("textarea");
    //attaching note to new textarea
    newText.innerHTML=texting;

    //appending textarea to div
    newDiv.appendChild(newText);
    //appending newDiv to printSpace
    printSpace.appendChild(newDiv);

    //Colour input element
    let colourInput = document.createElement("input")
    colourInput.type="color"
    colourInput.style.display="block"
    //appending the colour input tag button
    printSpace.appendChild(colourInput)
    
    //creating the change colour button
    let changeColour = document.createElement("button")
    changeColour.innerHTML="Change Colour"
    changeColour.id ="changeColour"+Id
    
    //making the RX function
    changeColourClicked = Rx.Observable.fromEvent(changeColour,"click");
    changeColourClicked.subscribe(() => MainColourFunction(changeColour.id, colourInput));

    //appending the Change colour button
    printSpace.appendChild(changeColour)

    //the delete button fields and function
    let DeleteButton = document.createElement("button");
    let DeleteButtonText = document.createTextNode("Delete");
    DeleteButton.appendChild(DeleteButtonText);
    DeleteButton.id = "DeleteButton"+Id
    /********The RXJS for the Delete button***/
    DeleteButtonClicked = Rx.Observable.fromEvent(DeleteButton,"click");
    DeleteButtonClicked.subscribe(() => MainDeleteFunction(DeleteButton.id));
    /******************************End RXJS Function************************/
    printSpace.appendChild(DeleteButton);

    //assigning the classname to the new div
    newDiv.className = "newDivCreated";
    //giving an unique id
    newDiv.id = "newDivCreated" + Id;

    Id++
}

//the functions to remove the notes
function MainDeleteFunction(ButtonID)
{
    //getting the parent div and the colloction of children
    let originalDiv = document.getElementById('printSpace');
    let notesCollection = originalDiv.getElementsByClassName("newDivCreated");
    //iterate through the collection until we find the notes to delete
    for(let i = 0; i < notesCollection.length; i++)
    {
        let buttons = notesCollection[i].getElementsByTagName("button");
        let delButton = buttons[1];
        //we found the note, so delete it
        if(delButton.id == ButtonID)
        {
            //console.log("item with " + delButton.id + " will be deleted");
            originalDiv.removeChild(notesCollection[i]);
            break;
        }
    }
}

function MainColourFunction(changeColourId, colourInput){
    document.getElementById("changeColourId").style.backgroundColor = colourInput.value;
    // changeColor.onclick=()=>{newDiv.style.backgroundColor=colourInput.value;}
    
}