import zafClient from "../api/zafClient";

export default (id) => {
  zafClient.invoke("routeTo", "ticket", id);
};
