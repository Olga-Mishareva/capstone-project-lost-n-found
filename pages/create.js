import { useRouter } from "next/router";

import ItemForm from "@/components/ItemForm";

export default function CreatePage({ clickPosition }) {
  const router = useRouter();

  async function addItem(data, latlng) {
    try {
      await fetch("api/items", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          initiallyLost: `${data.initiallyLost}` === "Lost" ? true : false,
          itemId: crypto.randomUUID(),
          userId: "cde299f9-dacf-4761-902c-61ed6614fab0", // temporarily hardcoded
          userRole: "user",
          longitude: latlng.lng,
          latitude: latlng.lat,
          inDiscuss: false,
          isFinished: false,
          messages: [],
        }),
      });
      router.push("/");
    } catch (error) {
      throw new Error({ message: error });
    }
  }

  return (
    <ItemForm onSubmit={addItem} clickPosition={clickPosition} formtype="add" />
  );
}
