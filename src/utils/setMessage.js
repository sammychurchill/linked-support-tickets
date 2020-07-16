import zafClient from "../api/zafClient";

export default (message, type, duration) => {
  return zafClient.invoke("notify", message, type, duration);
};
