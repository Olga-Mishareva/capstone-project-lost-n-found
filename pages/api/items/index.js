import { getAllItems, createItem } from "@/helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const items = await getAllItems();
      if (!items) {
        response.status(400).json({ message: "Bad request" });
        return;
      }
      response.status(200).json(items);
      break;
    }
    case "POST": {
      const item = JSON.parse(request.body);
      const newItem = await createItem(item);
      if (!newItem) {
        response.status(400).json({ message: "Bad request" });
        return;
      }

      response.status(200).json(newItem);
      break;
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
