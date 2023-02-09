import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import ItemForm from "@/components/ItemForm";

async function fetcher(url, { arg }) {
  const response = await fetch(url, {
    method: arg.method,
    body: JSON.stringify(arg.body),
  });
  if (!response.ok) {
    throw new Error(`Error: status code ${response.status}`);
  }
  return response.json();
}

export default function CreatePage({ clickPosition }) {
  const router = useRouter();

  const {
    trigger: triggerPost,
    error,
    isMutating: isCreating,
  } = useSWRMutation("/api/items", fetcher);

  async function addItem(data, latlng) {
    const newItem = {
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
    };
    try {
      await triggerPost({ method: "POST", body: newItem });
    } catch (error) {
      throw new Error(error.message);
    }

    if (!error) {
      router.push("/");
    }
  }

  return (
    <ItemForm
      onSubmit={addItem}
      isMutating={isCreating}
      clickPosition={clickPosition}
      formtype="add"
    />
  );
}
