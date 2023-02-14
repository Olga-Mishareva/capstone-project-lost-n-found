import { getToken } from "next-auth/jwt";
import { getMessages } from "@/helpers/db";

export default async function handler(request, response) {
  const token = await getToken({ req: request });

  if (token) {
    if (request.method === "GET") {
      const messages = await getMessages(request.query.id);

      console.log(messages);
      if (!messages) {
        response.status(404).json({
          message: "Internal server error.",
        });
        return;
      }
      response.status(200).json(messages);
    }
    return;
  }
  response.status(401).json({
    message: "Unauthorized: authentication is required.",
  });
}
