import { useRouter } from "next/router";

import ItemForm from "@/components/ItemForm";

export default function CreatePage() {
  const router = useRouter();

  async function addItem(data) {
    console.log(data);
    try {
      await fetch("api/items", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          initiallyLost: `${data.initiallyLost}` === "Lost" ? true : false,
          itemId: crypto.randomUUID(),
          userId: "cde299f9-dacf-4761-902c-61ed6614fab0", // temporarily hardcoded
          userRole: "user",
          longitude: "13.388517", // temporarily hardcoded
          latitude: "52.5202038", // temporarily hardcoded
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

  return <ItemForm onSubmit={addItem} formtype="add" />;
}
