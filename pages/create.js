import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
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
      userId: "",
      userName: "",
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
      userName={session.user.name}
    />
  );
}
