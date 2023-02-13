import useSWR from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import ItemDetails from "@/components/ItemDetails";

async function fetcher(url, { arg }) {
  const response = await fetch(url, {
    method: arg.method,
    body: arg.body ? JSON.stringify(arg.body) : undefined,
  });
  if (!response.ok) {
    throw new Error(`Error: status code ${response.status}`);
  }
  return response.json();
}

export default function DetailsPage({ showPopup, onShowPopup, onClosePopup }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  const {
    trigger,
    isMutating,
    error: fetchError,
  } = useSWRMutation(`/api/items/${id}`, fetcher);

  async function handleStatus() {
    const updatedItem = { ...item, inDiscuss: !item.inDiscuss };
    try {
      await trigger({ method: "PUT", body: updatedItem });
      mutate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function handleDelete() {
    try {
      await trigger({ method: "DELETE", body: item }, { revalidate: false });
    } catch (error) {
      throw new Error(error.message);
    }
    if (!fetchError) {
      router.push("/");
    }
  }

  if (isLoading || !id) {
    return <h2>Loading...</h2>;
  }

  if (error || fetchError) {
    return <h2>Something goes wrong.</h2>;
  }

  return (
    <ItemDetails
      title={item.title}
      description={item.description}
      initialStatus={item.initiallyLost}
      isFound={item.inDiscuss}
      userName={item.userName}
      onHandleStatus={handleStatus}
      onDelete={handleDelete}
      isMutating={isMutating}
      showPopup={showPopup}
      onShowPopup={onShowPopup}
      onClosePopup={onClosePopup}
    />
  );
}
