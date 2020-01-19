import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Grid, TextField, Button } from "@material-ui/core";
import "./signup.css";

class SignUp extends Component {
  state = {};

  handleSubmit = () => {};

  render() {
    return (
      <div className="mid-pane">
        <Container maxWidth="md">
          <Grid container>
            <Grid
              item
              xs={5}
              spacing={5}
              style={{
                padding: "15px",
                borderRadius: "10px"
              }}
            >
              <Typography variant="h6" color="primary">
                Share Money
              </Typography>
              <Typography
                color="textPrimary"
                variant="caption"
                style={{ marginTop: "25px", display: "inline-block" }}
              >
                Finding difficulty to remember the money spent for yourself and
                friends, Use ShareMoney and forget it!
              </Typography>
            </Grid>
            <Grid
              item
              xs={7}
              container
              direction="column"
              style={{ padding: "15px" }}
            >
              <Typography
                color="primary"
                variant="subtitle1"
                style={{ color: "#006F99" }}
              >
                Sign Up
              </Typography>
              <TextField label="Email" margin="normal" />
              <TextField label="password" margin="normal" />
              <TextField label="Phone Number" margin="normal" size="small" />
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={this.handleSubmit}
                style={{
                  marginTop: "25px",
                  justifyContent: "center"
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default SignUp;
