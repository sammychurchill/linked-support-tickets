import zafClient from "../api/zafClient";

export default () => {
  return zafClient.get("ticket");
};
