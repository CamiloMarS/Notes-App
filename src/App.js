import React, { Component } from "react";
import "./App.css";
import Note from "./components/note/note.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          noteId: 1,
          noteContent: "Nota 1"
        },
        {
          noteId: 2,
          noteContent: "Nota 2"
        }
      ]
    };
  }

  removeNote = noteId => {
    console.log(noteId);
  };

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          <h1>Aplicación con NodeJS y React</h1>
        </div>
        <div className="notesBody">
          <ul>
            {this.state.notes.map(note => {
              return (
                <Note
                  noteId={note.noteId}
                  noteContent={note.noteContent}
                  key={note.noteId}
                  noteDelete={this.removeNote}
                />
              );
            })}
          </ul>
        </div>
        <div className="notesFooter">
          <p>Footer</p>
        </div>
      </div>
    );
  }
}

export default App;
