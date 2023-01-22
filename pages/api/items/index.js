import { getAllItems } from "@/helpers/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      const items = await getAllItems();
      res.status(200).json(items);
      break;
    }
    default: {
      res
        .status(405)
        .setHeader("Allow", "GET")
        .json(
          `Error: request method ${req.method} on ${req.url} is not allowed `
        );
    }
  }
}
