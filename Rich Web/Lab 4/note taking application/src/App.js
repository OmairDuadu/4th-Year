//Author: Omair Duadu
//Date: 16/12/2021
//Project: Note app in React
//Desc. : Note taking application with the delete function
//        Colour change is not currently completed and functional 
import React from "react";
import Note from "./Note";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notes : [],
      userInput : "",
      counter : 0,
      colour : []
    }

    //binds functions to components
    this.handleUserInput = this.handleUserInput.bind(this);
    this.AddNote = this.AddNote.bind(this)
    this.DeleteNote = this.DeleteNote.bind(this)
    this.ChangeColour = this.ChangeColour.bind
  }

  //Change Colour functiuon
  ChangeColour(){

  }

  //Delete Functionality
  DeleteNote = (id) =>{
    this.setState({notes : [...this.state.notes.filter(note => note.id !== id )]} );
  }   

  //used to save the user input when changes occur
  handleUserInput(e){
    this.setState({userInput : e.target.value});
  }

  //used to add the new object to the state
  AddNote(){
    console.log(this.state.userInput)
    let userInput = this.state.userInput;
    let newNote = {
      message : userInput,
      id : this.state.counter
    }
    this.setState({counter : this.state.counter + 1})
    this.setState({notes:[...this.state.notes,newNote]})
  }
  
  //Main Component to create the text are for the Notes
  render(){
    return (
      <div className={"App"}>
        <header className={"App-header"}>
        </header>

        <section>
          <h1>Note App</h1>
          <div id ={"NotesStorage"}></div>
          <div>
            <textarea id={"textArea"} placeholder={"Note field"} onChange={this.handleUserInput}></textarea>
            <br></br>
            <button id={"newNoteButton"} onClick={this.AddNote}>New note</button>
          </div>
          <br></br>
          
          {/* This creates a new Note render triggered by the note Array in the State for every new component*/}
          {this.state.notes.map((note,i)=>(
            // creating prop to pass it into the new Notes components that are being created
            <Note message={note.message} id={note.id} delete={this.DeleteNote}></Note>
          ))}
        </section>

      </div>
    );
  }
}

export default App;