import React, { Component } from "react";
import { Message, Icon } from "semantic-ui-react";

class MessageProcess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Message icon color="pink">
        <Icon name="info circle" loading />
        <Message.Content>
          <Message.Header>{this.props.title}</Message.Header>
          {this.props.message}
        </Message.Content>
      </Message>
    );
  }
}

export default MessageProcess;
