import React from "react";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Field, Label, Input, Message } from "@zendeskgarden/react-forms";
// import UserSearchInput from "./components/UserSearchInput";
import TestButton from "./components/TestButton";

function App(props) {
  return (
    <Grid>
      <Row>
        <Col>
          {/* <TestButton /> */}
          <Field>
            <TestButton />
            <Label>New Requester</Label>
            <Input placeholder="Search by name" />
            {/* <Message>Default message styling</Message> */}
          </Field>
        </Col>
      </Row>
    </Grid>
  );
}

export default App;
