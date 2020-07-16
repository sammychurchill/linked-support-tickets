import zafClient from "../api/zafClient";

export default async (ticket) => {
  const createTicket = {
    url: `/api/v2/tickets.json`,
    type: "POST",
    dataType: "JSON",
    data: ticket,
  };
  return zafClient.request(createTicket);
};
