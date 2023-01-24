import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";

import ItemDetails from "@/components/ItemDetails";

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: item, isLoading, error } = useSWR(`/api/items/${id}`);

  if (!isReady || isLoading) {
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
    />
  );
}
