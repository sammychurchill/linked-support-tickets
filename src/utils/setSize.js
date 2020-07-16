import zafClient from "../api/zafClient";

export default (value) => {
  zafClient.invoke("resize", {
    width: "100%",
    height: value + 20,
  });
};
