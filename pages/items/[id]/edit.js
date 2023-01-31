import { useRouter } from "next/router";
import useSWR from "swr";

import ItemForm from "@/components/ItemForm";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  async function editItem(data) {
    const editedItem = {
      ...item,
      ...data,
      initiallyLost: `${data.initiallyLost}` === "Lost" ? true : false,
    };
    try {
      await fetch(`/api/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify(editedItem),
      });
      mutate();
      router.push(`/items/${id}`);
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
    <ItemForm
      onSubmit={editItem}
      formType="edit"
      title={item.title}
      description={item.description}
      userName={item.userName}
      category={item.initiallyLost}
    />
  );
}
