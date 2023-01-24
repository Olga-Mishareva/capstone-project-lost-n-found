import { getItem, updateItem } from "@/helpers/db";

export default async function handler(request, response) {
  switch (request.method) {
    case "GET": {
      const item = await getItem(request.query.id);
      if (!item) {
        response.status(404).json({
          message: `Item ${request.query.id} was not found.`,
        });
      }
      response.status(200).json(item);
      break;
    }
    case "PUT": {
      const item = JSON.parse(request.body);
      const newItem = await updateItem(request.query.id, item);
      if (!newItem) {
        response.status(404).json({
          message: `Item ${request.query.id} was not found.`,
        });
      }
      response.status(200).json(newItem);
      break;
    }
    default: {
      res
        .status(405)
        .setHeader("Allow", "GET, PUT")
        .json(
          `Error: request method ${request.method} on ${request.url} is not allowed `
        );
    }
  }
}
