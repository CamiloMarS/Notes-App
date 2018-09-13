import React, { Component } from "react";
import "./App.css";

import Note from "./components/note/note.jsx";
import NoteForm from "./components/Note-Form/Note-Form.jsx";
import MessageProcess from "./components/Component-Message";
import firebase from "firebase";
// import { DB_CONFIG } from "./config/config-firebase.js";
// import "firebase/database";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      message: {
        active: false,
        title: "",
        message: ""
      }
    };
    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.db = this.app.database.ref().child("notes");
  }
  componentDidMount() {
    // let { notes } = this.state;
    // this.db.on("child_added", snap => {
    //   notes.push({
    //     noteId: snap.key,
    //     noteContent: snap.val().noteContent
    //   });
    // });
  }
  activeMessageProcess = () => {
    //Agregar los datos para el mensaje
    if (this.state.message.active === true) {
      return (
        <MessageProcess
          title={this.state.message.title}
          message={this.state.message.message}
        />
      );
    }
  };
  setStateMessage = dataMessage => {
    if (Object.keys(dataMessage).length > 0) {
      let { code, message } = dataMessage;
      this.setState({ message: { active: true, title: code, message } });
      setTimeout(() => {
        this.desactiveMessageProcess();
      }, 3000);
    }
  };

  desactiveMessageProcess = () => {
    this.setState({ message: { active: false } });
  };

  saveNewNote = dataNote => {
    //Guardar la nueva NOTA en Firebase
    if (Object.keys(dataNote).length > 0) {
      let { titulo, body } = dataNote;
      let { notes } = this.state;
      notes.push({
        noteId: notes.length + 1,
        noteTitle: titulo,
        noteBody: body
      });
    }
  };

  removeNote = noteId => {
    alert(noteId);
  };

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          <h1>Aplicación con NodeJS y React</h1>
        </div>
        <div className="notesBody">
          <NoteForm
            messageProcess={this.setStateMessage}
            addNewNote={this.saveNewNote}
            notesTotal={this.state.notes.length}
          />
          <div className="contentNotesList">
            {this.activeMessageProcess()}

            {this.state.notes.map(note => {
              return (
                <Note
                  data={note}
                  key={note.noteId}
                  noteDelete={this.removeNote}
                />
              );
            })}
          </div>
        </div>
        <div className="notesFooter">Camilo Salazar &#174;</div>
      </div>
    );
  }
}

export default App;
