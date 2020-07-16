import zafClient from "../api/zafClient";
import React from "react";

export default () => {
  const fetchGroups = {
    url: `/api/v2/groups/`,
    type: "GET",
    dataType: "json",
  };
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    zafClient
      .request(fetchGroups)
      .then(({ groups }) => setGroups(groups))
      .catch(console.error);
  }, []);
  return groups;
};
