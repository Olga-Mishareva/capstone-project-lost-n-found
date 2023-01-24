import { getItem } from "@/helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const item = await getItem(request.query.id);
      response.status(200).json(item);
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
