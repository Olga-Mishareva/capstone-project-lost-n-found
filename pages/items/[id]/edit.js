import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";

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

export default function EditPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  const { trigger: triggerPatch, isMutating: isUpdating } = useSWRMutation(
    `/api/items/${id}`,
    fetcher
  );

  async function editItem(data) {
    const editedItem = {
      ...item,
      ...data,
      initiallyLost: `${data.initiallyLost}` === "Lost" ? true : false,
    };
    try {
      await triggerPatch({ method: "PATCH", body: editedItem });
      mutate();
    } catch (error) {
      throw new Error(error.message);
    }

    if (!error) {
      router.push(`/items/${id}`);
    }
  }

  if (isLoading || !id) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{JSON.stringify(fetchingError)}</h2>;
  }

  return (
    <>
      {session ? (
        <ItemForm
          onSubmit={editItem}
          isMutating={isUpdating}
          formtype="edit"
          id={id}
          title={item.title}
          description={item.description}
          userName={item.userName}
          category={item.initiallyLost}
        />
      ) : (
        <></>
      )}
    </>
  );
}
