import zafClient from "../api/zafClient";

export default async (id, message, type = "public") => {
  const data = { ticket: {} };

  data.ticket.comment = { body: message };

  if (type === "private") {
    data.ticket.comment.public = false;
  }
  if (type === "public") {
    data.ticket.comment.public = true;
  }

  const updateTicket = {
    url: `/api/v2/tickets/${id}.json`,
    type: "PUT",
    dataType: "JSON",
    data: data,
  };
  return zafClient.request(updateTicket);
};
