import React from "react";
import ReactDOM from 'react-dom';

class Note extends React.Component {

    constructor(props){
        super(props);
        this.DeleteNote = this.DeleteNote.bind(this)
      }
    

    DeleteNote(){
        this.props.delete(this.props.id);
    }

    render(){
      return (
        <div className={"Note"}>
            {/* new note being created */}
            <textarea id={"noteMade"} placeholder={"Note field"}>{this.props.message}</textarea>
            <br></br>
            <button id={"deleteButton"} onClick={this.DeleteNote}>Delete</button>
            <button id={"changeColour"}>Change Colour</button>
            <input type={"color"}></input>
        </div>
      );
    }
  }

  export default Note