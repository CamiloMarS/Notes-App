import React, { Component } from "react";
import { Card, Image, Label, Icon, Dropdown } from "semantic-ui-react";
import "./note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.noteData = props.data;
  }
  deleteNote = id => {
    this.props.noteDelete(id);
    console.log(this.noteData);
  };

  changeNoteToCompleted = () => {
    console.log("Completed");
  };
  changeNoteToCancel = () => {
    console.log("Cancel");
  };

  render() {
    //Opciones del dropdow
    const trigger = (
      <span>
        <Icon name="thumbs up outline" /> Estado
      </span>
    );
    const options = [
      {
        key: "completed",
        text: "completed",
        icon: "like",
        onClick: this.changeNoteToCompleted
      }
    ];
    return (
      <Card id={this.noteId}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="http://hasantezcan.com/images/raptiye.png"
          />
          <Card.Header textAlign="left">{this.noteData.noteTitle}</Card.Header>
          <Card.Description textAlign="left">
            <strong>Descripción: </strong>
            {this.noteData.noteBody}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Label
              color="red"
              horizontal
              onClick={() => this.deleteNote(this.noteData.noteId)}
              className="buttonEfect"
            >
              <Icon name="trash" />
              Eliminar
            </Label>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing="top right"
              icon={null}
            />
            <Label color="pink" horizontal className="buttonEfect">
              <Icon name="edit" />
              Editar
            </Label>
          </div>
        </Card.Content>
      </Card>
    );
  }
} //end class

export default Note;
