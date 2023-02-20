import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import ItemForm from "@/components/ItemForm";
import Overlay from "@/components/Overlay";

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

export default function CreatePage({
  clickPosition,
  showPopup,
  onShowPopup,
  onClosePopup,
}) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      onShowPopup();
    } else onClosePopup();
  }, [session]);

  const {
    trigger: triggerPost,
    error,
    isMutating: isCreating,
  } = useSWRMutation("/api/items", fetcher);

  async function addItem(data, latlng) {
    if (session) {
      const newItem = {
        ...data,
        initiallyLost: `${data.initiallyLost}` === "Lost" ? true : false,
        itemId: crypto.randomUUID(),
        userId: "",
        userName: "",
        userEmail: session.user.email,
        userRole: "user",
        longitude: latlng.lng,
        latitude: latlng.lat,
        inDiscuss: false,
        isFinished: false,
      };
      try {
        await triggerPost({ method: "POST", body: newItem });
      } catch (error) {
        throw new Error(error.message);
      }
    }

    if (!error) {
      router.push("/");
    }
  }

  return (
    <>
      {showPopup ? (
        <Overlay onClose={onClosePopup} />
      ) : (
        <ItemForm
          onSubmit={addItem}
          isMutating={isCreating}
          clickPosition={clickPosition}
          formtype="add"
          userName={session?.user.name}
        />
      )}
    </>
  );
}
