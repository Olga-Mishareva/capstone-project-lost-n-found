import { getItem, updateItem, editItem, deleteItem } from "@/helpers/db";
import { getToken } from "next-auth/jwt";

export default async function handler(request, response) {
  const token = await getToken({ req: request });
  const userId = token?.sub;

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
        if (userId !== item.userId) {
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
        response.status(403).json({
          message: `Forbidden error: user with id ${userId} has no right for this action.`,
        });
      }
      response.status(401).json({
        message: "Unauthorized: authentication is required.",
      });
    }

    case "PATCH": {
      if (token) {
        const item = JSON.parse(request.body);
        if (userId === item.userId) {
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
        response.status(403).json({
          message: `Forbidden error: user with id ${userId} has no right for this action.`,
        });
      }
      response.status(401).json({
        message: "Unauthorized: authentication is required.",
      });
    }

    case "DELETE": {
      if (token) {
        const item = JSON.parse(request.body);
        if (userId === item.userId) {
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
        response.status(403).json({
          message: `Forbidden error: user with id ${userId} has no right for this action.`,
        });
      }
      response.status(401).json({
        message: "Unauthorized: authentication is required.",
      });
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
