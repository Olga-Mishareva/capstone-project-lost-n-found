import useSWR from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import useSWRSubscription from "swr/subscription";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [isCommited, setIsCommited] = useState(false);

  const { data: item, mutate, isLoading, error } = useSWR(`/api/items/${id}`);

  useEffect(() => {
    mutate();
  }, [item]);

  // const { data: newM, error: subscriptionError } = useSWRSubscription(
  //   `/api/items/${id}`,
  //   (id, { next }) => {
  //     const sub = item?.subscribe(`/api/items/${id}`, (err, data) =>
  //       next(err, data)
  //     );
  //     return () => sub?.close();
  //   }
  // );

  // console.log(newM);
  // console.log(subscriptionError);

  const {
    trigger,
    isMutating,
    error: fetchError,
  } = useSWRMutation(`/api/items/${id}`, fetcher);

  useEffect(() => {
    if (isCommited) {
      handleStatus();
    }
  }, [isCommited]);

  async function handleStatus() {
    const updatedItem = { ...item, inDiscuss: true };
    try {
      await trigger({ method: "PUT", body: updatedItem });
      mutate();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function handleMessages(data) {
    const newMessage = {
      text: data.text,
      userName: session.user.name,
      item: item._id,
    };
    try {
      await trigger({ method: "PUT", body: newMessage });
      mutate();
      setIsCommited(true);
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
    return <h2>Something went wrong.</h2>;
  }

  return (
    <ItemDetails
      title={item.title}
      description={item.description}
      initialStatus={item.initiallyLost}
      inDiscuss={item.inDiscuss}
      messages={item.messages}
      userName={item.userName}
      userEmail={item.userEmail}
      onHandleMessages={handleMessages}
      onDelete={handleDelete}
      isMutating={isMutating}
      showPopup={showPopup}
      onShowPopup={onShowPopup}
      onClosePopup={onClosePopup}
    />
  );
}
