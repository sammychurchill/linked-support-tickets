import React from "react";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Field, Checkbox, Hint, Label } from "@zendeskgarden/react-forms";
import { Button } from "@zendeskgarden/react-buttons";
import { MD } from "@zendeskgarden/react-typography";
import { Dots } from "@zendeskgarden/react-loaders";

import zafClient from "./api/zafClient";
import setSize from "./utils/setSize";

import getGroups from "./utils/getGroups";
import getMacros from "./utils/getMacros";
import getAutocompleteUsers from "./utils/getAutocompleteUsers";

import GroupDropdown from "./components/GroupDropdown";
import Autocomplete from "./components/Autocomplete";
import AutocompleteSearch from "./components/AutocompleteSearch";
import TextArea from "./components/TextArea";
import TextInput from "./components/TextInput";

import "./App.css";
import getMacro from "./utils/getMacro";
import createTicket from "./utils/createTicket";
import getCurrentTicket from "./utils/getCurrentTicket";
import setComment from "./utils/setComment";
import setMessage from "./utils/setMessage";
import routeToTicket from "./utils/routeToTicket";

function App(props) {
  const [currentTicket, setCurrentTicket] = React.useState({});

  const [input, setUserInput] = React.useState("");
  const [userSearch, setUserSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});

  const [selectedCurrentMacro, setSelectedCurrentMacro] = React.useState({});
  const [selectedNewMacro, setSelectedNewMacro] = React.useState({});
  const [macros, setMacros] = React.useState([]);

  const groups = getGroups();
  const [selectedGroup, setSelectedGroup] = React.useState({});

  const [subject, setSubject] = React.useState("");
  const [newTicketStatus, setNewTicketStatus] = React.useState("open");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const [hasError, setHasError] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const [goToNewTicket, setGoToNewTicket] = React.useState(true);

  React.useEffect(() => {
    setSize(props.rootEl.scrollHeight);
    getCurrentTicket().then(({ ticket }) => setCurrentTicket(ticket));
  }, []);

  React.useEffect(() => {
    getAutocompleteUsers(userSearch)
      .then(({ users }) => setUsers(users))
      .catch(console.error);
  }, [userSearch]);

  React.useEffect(() => {
    getMacros()
      .then(({ macros }) => {
        const namedMacros = macros.map((macro) => {
          return { ...macro, name: macro.title };
        });
        setMacros(namedMacros);
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (subject.length === 0 || Object.keys(selectedUser).length === 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [subject, description, selectedUser]);

  const finialiseTickets = async () => {
    const newTicketData = {
      ticket: {
        subject: subject,
        comment: {
          body: `This ticket was created from #${currentTicket.id}`,
          public: "false",
        },
        tags: tags,
        status: newTicketStatus,
        requester: {
          name: selectedUser.name,
          email: selectedUser.email,
        },
      },
    };

    if (Object.keys(selectedGroup).length !== 0) {
      newTicketData.ticket.groupID = selectedGroup.id;
    } else {
      newTicketData.ticket.assignee_id = currentTicket.requester.assignee_id;
    }
    const updateTicketWithId = (id) => {
      return `A new ticket was created from this one #${id}`;
    };
    let ticket;
    try {
      setIsLoading(true);
      const response = await createTicket(newTicketData);
      ticket = response.ticket;
      const updatedNewTicket = await setComment(ticket.id, description);
      const updatedCurrTicket = await setComment(
        currentTicket.id,
        updateTicketWithId(ticket.id),
        "private"
      );
    } catch (error) {
      setMessage(error, "error");
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }
    setUserInput("");
    setUserSearch("");
    setUsers([]);
    setSelectedUser({});

    setSelectedCurrentMacro({});
    setSelectedNewMacro({});
    setMacros([]);

    setSelectedGroup({});

    setSubject("");
    setNewTicketStatus("open");
    setDescription("");
    setTags([]);

    setHasError(true);
    setIsLoading(false);

    setMessage(`Success, <a href=${ticket.url}>#${ticket.id}</a>`, "notice");
    if (goToNewTicket) {
      routeToTicket(ticket.id);
    }
  };

  const handleUserSelect = (value) => {
    setSelectedUser(value);
  };

  const handleUserInput = (value) => {
    setUserInput(value);
    if (value.length > 3) {
      setUserSearch(value);
    }
  };

  const handleGroupSelect = (value) => {
    setSelectedGroup(value);
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleCurrentMacroSelect = (value) => {
    zafClient.invoke("macro", value.id);
    setSelectedCurrentMacro(value);
  };

  const handleNewMacroSelect = (value) => {
    getMacro(value.id)
      .then((macroObj) => {
        const macro = macroObj.macro;
        macro.actions.forEach((action) => {
          switch (action.field) {
            case "status":
              handleMacroActionStatus(action.value);
              break;
            case "comment_value" || "comment_value_html":
              handleMacroActionComment(action.value);
              break;
            case "current_tags":
              handleMacroActionTags(action.value);
              break;
            case "subject":
              handleMacroActionSubject(action.value);
              break;
            default:
              console.log("unkown macro action");
              console.log(action);
              break;
          }
        });
      })
      .catch(console.error);
    setSelectedNewMacro(value);
  };

  const handleMacroActionStatus = (status) => {
    setNewTicketStatus(status);
  };
  const handleMacroActionSubject = (subject) => {
    setSubject(subject);
  };
  const handleMacroActionComment = (comment) => {
    setDescription(comment);
  };
  const handleMacroActionTags = (macroTags) => {
    setTags(...tags, macroTags);
  };

  const handleSubmit = () => {
    finialiseTickets();
  };

  return (
    <Grid>
      <Row>
        <Col>
          <AutocompleteSearch
            items={users}
            onInputChange={handleUserInput}
            input={input}
            selectedItem={selectedUser}
            onSelect={handleUserSelect}
            required
          >
            New Requester
          </AutocompleteSearch>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
          <GroupDropdown
            groups={groups}
            selectedItem={selectedGroup}
            onSelect={handleGroupSelect}
          ></GroupDropdown>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
          <Autocomplete
            items={macros}
            onSelect={handleNewMacroSelect}
            selectedItem={selectedNewMacro}
          >
            Apply macro to new ticket
          </Autocomplete>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextInput
            label={"Subject"}
            value={subject}
            onChange={handleSubjectChange}
            required
          />
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextArea
            label={"Description"}
            value={description}
            onChange={handleDescriptionChange}
          />
          <br></br>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <Autocomplete
            items={macros}
            onSelect={handleCurrentMacroSelect}
            selectedItem={selectedCurrentMacro}
          >
            Apply macro to current ticket
          </Autocomplete>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
          <Field>
            <Checkbox
              checked={goToNewTicket}
              onChange={({ target }) => setGoToNewTicket(!goToNewTicket)}
            >
              <Label>Open new ticket once created?</Label>
              <Hint>
                This will open up the new ticket in a tab when you click create.
                Your current work will not be lost
              </Hint>
            </Checkbox>
          </Field>
          <br></br>
        </Col>
      </Row>
      <Row justifyContent="center" alignSelf="center">
        <Button disabled={hasError} onClick={() => handleSubmit()}>
          {isLoading ? <Dots /> : <MD>Create New Ticket</MD>}
        </Button>
      </Row>
    </Grid>
  );
}

export default App;
