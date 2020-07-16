import zafClient from "../api/zafClient";

export default (id) => {
  //   return zafClient.get("macros");
  const fetchMacro = {
    url: `/api/v2/macros/${id}.json`,
    type: "GET",
    dataType: "json",
  };
  return zafClient.request(fetchMacro);
};
