import useSWR from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

import ItemDetails from "@/components/ItemDetails";

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

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  const { trigger: triggerPut, isMutating: isUpdating } = useSWRMutation(
    `/api/items/${id}`,
    fetcher
  );

  async function handleStatus() {
    const updatedItem = { ...item, inDiscuss: !item.inDiscuss };
    try {
      await triggerPut({ method: "PUT", body: updatedItem });
      mutate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  if (isLoading || !id) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <ItemDetails
      title={item.title}
      description={item.description}
      initialStatus={item.initiallyLost}
      isFound={item.inDiscuss}
      userName={item.userName}
      onHandleStatus={handleStatus}
      isMutating={isUpdating}
    />
  );
}
