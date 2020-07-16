import zafClient from "../api/zafClient";
import React from "react";

export default (value) => {
  //   const fetchUsers = {
  //     url: `/api/v2/users/autocomplete.json?name=${value}`,
  //     type: "GET",
  //     dataType: "json",
  //   };
  //   const [users, setUsers] = React.useState([]);
  //   React.useEffect(() => {
  //     zafClient
  //       .request(fetchUsers)
  //       .then(({ users }) => setUsers(users))
  //       .catch(console.error);
  //   }, []);
  //   return users;
  const fetchUsers = {
    url: `/api/v2/users/autocomplete.json?name=${value}`,
    type: "GET",
    dataType: "json",
  };
  return zafClient.request(fetchUsers);
};
