import { Field, Label, Input, Message } from "@zendeskgarden/react-forms";
import { useState, useEffect, useReducer } from "react";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default UserSerach = (props) => {
  return (
    <Field>
      <Label>New Requester</Label>
      <Input placeholder="Search by name" />
      {/* <Message>Default message styling</Message> */}
    </Field>
  );
};
