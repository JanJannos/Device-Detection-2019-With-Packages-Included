import React from "react";
// import { Button, ButtonToolbar } from "react-bootstrap";
import "./styles.css";

const validateURL = str => {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    alert("Please enter valid URL.");
    return false;
  }
  return true;
};

const validatePort = port => {
  if (isNaN(port)) {
    alert("Please enter a valid Port!");
    return false;
  }
  return true;
};

const validateInput = (ipAddress, port) => {
  // true means invalid, so our conditions got reversed
  return {
    ipAddress: ipAddress.length === 0 || !validateURL(ipAddress),
    port: port.length === 0 || !validatePort(port)
  };
};

export default class ConnectServer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: "",
      port: "",
      everFocusedEmail: false,
      everFocusedPassword: false,
      inFocus: ""
    };
  }

  handleEmailChange = evt => {
    this.setState({ ipAddress: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ port: evt.target.value });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { ipAddress, port } = this.state;
    const info = {
      ip: ipAddress,
      port: port
    };

    const _info = JSON.stringify(info);
    this.props.clientMainCallback(_info);
  };

  canBeSubmitted() {
    const errors = validateInput(this.state.ipAddress, this.state.port);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validateInput(this.state.ipAddress, this.state.port);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Connect To Server</h1>        
        <input
          className={errors.ipAddress ? "error" : ""}
          type="text"
          placeholder="Address"
          value={this.state.ipAddress}
          onChange={this.handleEmailChange}
        />
        <input
          className={errors.port ? "error" : ""}
          type="port"
          placeholder="Port"
          value={this.state.port}
          onChange={this.handlePasswordChange}
        />
        <button disabled={isDisabled}>Connect</button>
        {/* <ButtonToolbar>
            <Button disabled={isDisabled} variant="outline-primary"  onClick={this.handleSubmit}>Connect</Button>
        </ButtonToolbar> */}
      </form>
    );
  }
}
