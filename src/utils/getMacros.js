import zafClient from "../api/zafClient";

export default () => {
  //   return zafClient.get("macros");
  const fetchMacros = {
    url: `/api/v2/macros.json`,
    type: "GET",
    dataType: "json",
  };
  return zafClient.request(fetchMacros);
};
