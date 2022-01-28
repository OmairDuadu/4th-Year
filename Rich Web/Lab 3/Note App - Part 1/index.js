/*The RXJS functionality on the add button on the application*/
const AddButton = document.getElementById("Add");

const AddClicked = Rx.Observable.fromEvent(AddButton,"click");

AddClicked.subscribe(() => AddANoteToDiv());

//variable to keep track of the ids inside the page
var tableRowId = 1;

function AddANoteToDiv()
{
    //adding the new note to the collection
    let note = prompt("What is your note", "Sample");
    
    //ensure the note is not empty
    if(note == null)
    {
        return;
    }

    //getting the notes area 
    let notesArea = document.getElementById('NotesStorage');

    //creating the div area to store the notes and the associated buttons
    let notesDiv = document.createElement("div");

    //the paragraph 
    let noteParagraph = document.createElement("p");
    let inputtedNotes = document.createTextNode(note);
    noteParagraph.appendChild(inputtedNotes);

    //appending the paragraph and a newline 
    notesDiv.appendChild(noteParagraph);

    //appending the edit and delete buttons to the div 

    //the edit button fields
    let EditButton = document.createElement("button");
    let EditButtonText = document.createTextNode("Edit");
    EditButton.appendChild(EditButtonText);
    EditButton.id = "EditButton" + tableRowId;

    /****************The RXJS for the Edit button*************************/
    EditButtonClicked = Rx.Observable.fromEvent(EditButton,"click");
    EditButtonClicked.subscribe(() => MainEditButtonFunction(EditButton.id));
    /******************************End RXJS Function************************/
    //appending the note to the appropriate note
    notesDiv.appendChild(EditButton);

    //the delete button fields and function
    let DeleteButton = document.createElement("button");
    let DeleteButtonText = document.createTextNode("Delete");
    DeleteButton.appendChild(DeleteButtonText);
    DeleteButton.id = "DeleteButton"+tableRowId
    /****************The RXJS for the Delete button*************************/
    DeleteButtonClicked = Rx.Observable.fromEvent(DeleteButton,"click");
    DeleteButtonClicked.subscribe(() => MainDeleteFunction(DeleteButton.id));
    /******************************End RXJS Function************************/
    notesDiv.appendChild(DeleteButton);

    //assigning the classname to the new div
    notesDiv.className = "NotesInsideDiv";
    //giving an unique id
    notesDiv.id = "NotesInsideDiv" + tableRowId;

    //creating the colour section
    let colourHeader = document.createElement("h3");
    colourHeader.innerText = "Change the colour of the div";
    notesDiv.appendChild(colourHeader);
    //pink button
    let pinkButton = document.createElement("button");
    pinkButton.className = "PinkButton";
    /****************The RXJS for the Pink button*************************/
    PinkButtonClicked = Rx.Observable.fromEvent(pinkButton,"click");
    PinkButtonClicked.subscribe(() => MainSetDivPink(notesDiv.id));
    /******************************End RXJS Function************************/
    notesDiv.appendChild(pinkButton);
    //aqua button
    let aquaButton = document.createElement("button");
    aquaButton.className = "AquaButton";
    /****************The RXJS for the Aqua button*************************/
    AquaButtonClicked = Rx.Observable.fromEvent(aquaButton,"click");
    AquaButtonClicked.subscribe(() => MainSetDivAqua(notesDiv.id));
    /******************************End RXJS Function************************/
    notesDiv.appendChild(aquaButton);
    //aqua button
    let whiteButton = document.createElement("button");
    whiteButton.className = "WhiteButton";
    /****************The RXJS for the White button*************************/
    WhiteButtonClicked = Rx.Observable.fromEvent(whiteButton,"click");
    WhiteButtonClicked.subscribe(() => MainSetDivWhite(notesDiv.id));
    /******************************End RXJS Function************************/
    notesDiv.appendChild(whiteButton);

    //attaching the new div and a new line to the parent div
    notesArea.appendChild(notesDiv);

    // increment the id
    tableRowId++;
}

//the function to edit the notes
function MainEditButtonFunction(ButtonID)
{
    //getting the parent div and the children collection
    let notesArea = document.getElementById('NotesStorage');
    let notesCollection = notesArea.getElementsByClassName("NotesInsideDiv");
    //iterate through the collection until we find the note to edit
    for(let i = 0; i < notesCollection.length; i++)
    {
        let paragraphArea =  notesCollection[i].getElementsByTagName("p");
        let paragraphText = paragraphArea[0];

        let buttons = notesCollection[i].getElementsByTagName("button");
        let EditButton = buttons[0];
        //we found the note, so prompt to update and update
        if(EditButton.id == ButtonID)
        {
             var newText = prompt("What is your updated note", paragraphText.innerText);
             if(newText == null)
             {
                 return;
             }
             paragraphText.innerText = newText;
            // //console.log(button);
             break;
            
        }
    }
    
}

//the functions to remove the notes
function MainDeleteFunction(ButtonID)
{
    //getting the parent div and the colloction of children
    let notesArea = document.getElementById('NotesStorage');
    let notesCollection = notesArea.getElementsByClassName("NotesInsideDiv");
    //iterate through the collection until we find the notes to delete
    for(let i = 0; i < notesCollection.length; i++)
    {
        let buttons = notesCollection[i].getElementsByTagName("button");
        let delButton = buttons[1];
        //we found the note, so delete it
        if(delButton.id == ButtonID)
        {
            //console.log("item with " + delButton.id + " will be deleted");
            notesArea.removeChild(notesCollection[i]);
            break;
        }
    }
}

//functions to change the colour of the notes
function MainSetDivAqua(DivID)
{
    document.getElementById(DivID).style.backgroundColor = "aqua";
}

function MainSetDivPink(DivID)
{
    document.getElementById(DivID).style.backgroundColor = "pink";
}

function MainSetDivWhite(DivID)
{
    document.getElementById(DivID).style.backgroundColor = "white";
}