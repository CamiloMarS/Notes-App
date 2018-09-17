import React, { Component } from "react";
import "./App.css";

import Note from "./components/note/note.jsx";
import NoteForm from "./components/Note-Form/Note-Form.jsx";
import MessageProcess from "./components/Component-Message";
import firebase from "firebase";
import { DB_CONFIG } from "./config/config-firebase.js";

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
    this.application = firebase.initializeApp(DB_CONFIG);
    this.db = this.application
      .database()
      .ref()
      .child("notes");
  }
  componentDidMount() {
    let { notes } = this.state;
    //Cargar las notas de Realtime Database de Firebase
    this.db.on("child_added", snap => {
      notes.push({
        noteId: snap.key,
        noteTitle: snap.val().noteTitle,
        noteBody: snap.val().noteBody,
        dateDeliver: snap.val().dateDeliver,
        statusNote: snap.val().statusNote || false
      });
      console.log("No!!!!!!!");

      this.setState({ notes });
    });

    //Escuchar cada vez que se borre una nota
    this.db.on("child_removed", snap => {
      for (let i = 0; i < notes.length; i++) {
        if ((notes[i].noteId = snap.key)) {
          notes.splice(i, 1);
        }
      }
      this.setState({ notes });
    });
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
      let { titulo, body, dateDeliver } = dataNote;
      let { notes } = this.state;
      this.db.push().set({
        noteId: notes.length + 1,
        noteTitle: titulo,
        noteBody: body,
        dateDeliver
      });
    }
  };

  removeNote = noteId => {
    this.db.child(noteId).remove();
  };
  changeNoteStatus = data => {
    let { noteId, dateDeliver, noteBody, noteTitle, statusNote } = data.data;
    let dataNote = {
      dateDeliver,
      noteBody,
      noteTitle,
      statusNote: data.statusNote
    };

    this.db.child(noteId).update(dataNote);
    this.setStateMessage({
      code: 406,
      message: "El estado de la tarea ha cambiado a " + data.statusNote
    });
  };

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
          <h1>Aplicación con NodeJS y React</h1>
          {this.activeMessageProcess()}
        </div>
        <div className="notesBody">
          <NoteForm
            messageProcess={this.setStateMessage}
            addNewNote={this.saveNewNote}
            notesTotal={this.state.notes.length}
          />
          <div className="contentNotesList">
            {this.state.notes.map(note => {
              return (
                <Note
                  data={note}
                  key={note.noteId}
                  noteDelete={this.removeNote}
                  changeStatus={this.changeNoteStatus}
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
