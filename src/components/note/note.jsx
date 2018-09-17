import React, { Component } from "react";
import { Card, Image, Label, Icon, Checkbox } from "semantic-ui-react";
import "./note.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeworkState: false
    };
    this.noteData = props.data;
  }
  deleteNote = id => {
    this.props.noteDelete(id);
  };
  changeStatusHomewok = (data, id) => {
    let homeworksCompleted = this.state.homeworkState === false ? true : false;
    this.setState({ homeworkState: homeworksCompleted });
    this.props.changeStatus({
      data: data,
      statusNote: this.state.homeworkState
    });
  };
  render() {
    return (
      <Card id={this.noteData.noteId} className="card-note">
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="http://hasantezcan.com/images/raptiye.png"
          />
          <Card.Header textAlign="left">{this.noteData.noteTitle}</Card.Header>
          <Card.Description textAlign="left">
            <label>
              <strong>Descripción: </strong>
            </label>
            <div className="note-container-body">
              {this.noteData.noteBody}
              <br />
              <label>
                <strong>Entrega: </strong>
              </label>
              {this.noteData.dateDeliver || "No específicado."}
              <br />
              <label>
                <strong>¿Realizada? </strong>
              </label>
              <Checkbox
                onChange={() =>
                  this.changeStatusHomewok(
                    this.props.data,
                    this.noteData.noteId
                  )
                }
                checked={this.noteData.statusNote || false}
              />
            </div>
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
          </div>
        </Card.Content>
      </Card>
    );
  }
} //end class

export default Note;
