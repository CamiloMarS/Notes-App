import React, { Component } from "react";
import "./Note-Form.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
  }
  sendMessageProcess = (numberCode, message) => {
    this.props.messageProcess({
      code: numberCode,
      message: message
    });
  };

  clearFormControls = (...ctrol) => {
    ctrol.map(c => {
      c.value = "";
    });
  };

  addNoteInformation = e => {
    let titulo = this.txtTitleNote.value;
    let body = this.txtBodyNote.value;
    let dateDeliver = this.txtDateDeliver.value;

    if (titulo.length === 0 && body.length === 0) {
      this.sendMessageProcess("Código 5001", "Añade información de la nota!");
      return;
    } else if (titulo.length > 0 && body.length === 0)
      this.sendMessageProcess(
        "Código 5002",
        "Nota sin cuerpo, importante editar luego!"
      );
    else if (titulo.length === 0 && body.length > 0)
      this.sendMessageProcess(
        "Código 5003",
        "Nota sin título... Se le añadió uno por defecto!"
      );
    else
      this.sendMessageProcess("Código 2004", "Nota agregada exitosamente! =)");

    let note = {
      titulo: titulo !== "" ? titulo : `Nota #${this.props.notesTotal + 1}`,
      body,
      dateDeliver: dateDeliver
    };
    this.props.addNewNote(note);
    this.clearFormControls(
      this.txtTitleNote,
      this.txtBodyNote,
      this.txtDateDeliver
    );
  };

  render() {
    return (
      <div className="NoteForm">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          ref={input => {
            this.txtTitleNote = input;
          }}
        />
        <label className="form-label">Cuerpo</label>
        <textarea
          className="form-control textarea"
          ref={textarea => {
            this.txtBodyNote = textarea;
          }}
        />
        <label className="form-label">Entrega: </label>
        <input
          type="date"
          className="form-control"
          ref={input => {
            this.txtDateDeliver = input;
          }}
        />
        <button className="btnNoteForm" onClick={this.addNoteInformation}>
          Agregar
        </button>
      </div>
    );
  }
} //end class

export default NoteForm;
