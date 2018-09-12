import React, { Component } from "react";
import "./note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
  }
  deleteNote = id => {
    this.props.noteDelete(id);
  };

  render() {
    return (
      <div className="note">
        <span
          onClick={() => this.deleteNote(this.noteId)}
          className="ctrolDeleteNote"
        >
          &times;
        </span>
        <p> {this.noteContent} </p>
      </div>
    );
  }
} //end class

export default Note;
