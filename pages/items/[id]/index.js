import useSWR from "swr";
import { useRouter } from "next/router";

import ItemDetails from "@/components/ItemDetails";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  async function handleStatus() {
    const newItem = { ...item, inDiscuss: !item.inDiscuss };
    try {
      await fetch(`/api/items/${id}`, {
        method: "PUT",
        body: JSON.stringify(newItem),
      });
      mutate();
    } catch (error) {
      throw new Error({ message: error });
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
    />
  );
}
