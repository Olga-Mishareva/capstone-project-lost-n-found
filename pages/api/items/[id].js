import { getItem, updateItem, editItem, deleteItem } from "@/helpers/db";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const token = await getToken({ req: request });

  switch (request.method) {
    case "GET": {
      const item = await getItem(request.query.id);
      if (!item) {
        response.status(404).json({
          message: `Item ${request.query.id} was not found.`,
        });
        return;
      }

      response.status(200).json(item);
      break;
    }

    case "PUT": {
      if (token) {
        const item = JSON.parse(request.body);
        const updatedItem = await updateItem(request.query.id, item);
        if (!updatedItem) {
          response.status(404).json({
            message: `Item ${request.query.id} was not found.`,
          });
          return;
        }

        response.status(200).json(updatedItem);
        break;
      }
    }

    case "PATCH": {
      if (token) {
        const item = JSON.parse(request.body);
        const editedItem = await editItem(request.query.id, item);
        if (!editedItem) {
          response.status(404).json({
            message: `Item ${request.query.id} was not found.`,
          });
          return;
        }

        response.status(200).json(editedItem);
        break;
      }
    }

    case "DELETE": {
      if (token) {
        const deletedItem = await deleteItem(request.query.id);
        if (!deletedItem) {
          response.status(404).json({
            message: `Item ${request.query.id} was not found.`,
          });
          return;
        }

        response.status(200).json(deletedItem);
        break;
      }
    }

    default: {
      res
        .status(405)
        .setHeader("Allow", "GET, PUT, PATCH, DELETE")
        .json(
          `Error: request method ${request.method} on ${request.url} is not allowed `
        );
    }
  }
}
