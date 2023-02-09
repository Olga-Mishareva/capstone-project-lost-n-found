import { getAllItems, createItem } from "@/helpers/db";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const token = await getToken({ req: request });
  const userId = token?.sub;
  console.log(userId);

  switch (request.method) {
    case "GET": {
      const items = await getAllItems();
      if (!items) {
        response.status(500).json({ message: "Internal server error." });
        return;
      }
      response.status(200).json(items);
      break;
    }

    case "POST": {
      if (token) {
        const item = JSON.parse(request.body);
        const newItem = await createItem(item);
        if (!newItem) {
          response.status(500).json({ message: "Internal server error." });
          return;
        }

        response.status(201).json(newItem);
        break;
      }
    }
    default: {
      response
        .status(405)
        .setHeader("Allow", "GET, POST")
        .json(
          `Error: request method ${request.method} on ${request.url} is not allowed `
        );
    }
  }
}
