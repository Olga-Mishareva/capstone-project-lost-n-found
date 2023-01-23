import { getAllItems } from "@/helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const items = await getAllItems();
      response.status(200).json(items);
      break;
    }
    default: {
      res
        .status(405)
        .setHeader("Allow", "GET")
        .json(
          `Error: request method ${request.method} on ${request.url} is not allowed `
        );
    }
  }
}
