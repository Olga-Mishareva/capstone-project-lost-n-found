import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import SVGIcon from "@/components/SVGIcon";
import SubmitButtonsSet from "@/components/SubmitButtonsSet";
import Overlay from "@/components/Overlay";
import MessageForm from "@/components/MessageForm";
import Message from "@/components/Message";

export default function ItemDetails({
  title,
  description,
  initialStatus,
  inDiscuss,
  userName,
  userEmail,
  onHandleMessages,
  onDelete,
  isMutating,
  showPopup,
  onShowPopup,
  onClosePopup,
}) {
  const { data: session } = useSession();
  const pathName = usePathname();

  const router = useRouter();
  const { id } = router.query;

  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

  const {
    data: messages,
    isLoading,
    mutate,
    error,
  } = useSWR(session ? `/api/items/${id}/messages` : null);

  useEffect(() => {
    mutate();
  }, [isMutating]);

  function openMessageForm() {
    setIsMessageFormOpen(true);
  }

  function closeMessageForm() {
    setIsMessageFormOpen(false);
  }

  console.log(`item.userEmail: ${userEmail}`);
  console.log(`session.user.email: ${session.user.email}`);

  return (
    <>
      <DetailsWrapper>
        <Container>
          <Category initialStatus={initialStatus} inDiscuss={inDiscuss}>
            {inDiscuss
              ? "Waiting for pick-up"
              : initialStatus
              ? "Lost"
              : "Found"}
          </Category>

          <StyledCancelLink href="/">
            <SVGIcon
              variant="close"
              width="48px"
              label="close"
              color="var(--font-color)"
            />
          </StyledCancelLink>
        </Container>
        <UserName>
          <Span>by</Span> {userName}
        </UserName>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>

        {isMessageFormOpen ? (
          <></>
        ) : session?.user.email === userEmail ? (
          <SubmitButtonsSet
            variant="details"
            type="button"
            link={`/items/${id}/edit`}
            ariaLabel="edit"
            buttonName="Delete"
            linkName="Edit"
            isMutating={isMutating}
            pathName={pathName}
            onOpen={onShowPopup}
          />
        ) : (
          <></>
        )}

        {session?.user.email === userEmail && !inDiscuss ? (
          <></>
        ) : !isMessageFormOpen ? (
          <MessageButton
            onClick={session ? openMessageForm : onShowPopup}
            type="button"
            session={session}
            disabled={isMutating}
          >
            Leave a message
          </MessageButton>
        ) : (
          <MessageForm
            id={id}
            isMutating={isMutating}
            isMessageFormOpen={isMessageFormOpen}
            onCloseForm={closeMessageForm}
            onSubmitMessage={onHandleMessages}
          />
        )}

        {!session && inDiscuss ? (
          <StyledText>Log in to see the messages.</StyledText>
        ) : (
          <></>
        )}

        <MessagesList>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong.</p>
          ) : (
            messages
              ?.slice()
              .reverse()
              .map((message) => (
                <li key={crypto.randomUUID()}>
                  <Message text={message.text} author={message.userName} />
                </li>
              ))
          )}
        </MessagesList>
      </DetailsWrapper>
      {showPopup && <Overlay onConfirm={onDelete} onClose={onClosePopup} />}
    </>
  );
}

const DetailsWrapper = styled.div`
  margin: 0 auto;
  min-width: 18.5rem;
  max-width: calc(100vw - 4rem);
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1rem;
`;

const Category = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ initialStatus, inDiscuss }) =>
    inDiscuss
      ? "var(--finished-color)"
      : initialStatus
      ? "var(--lost-color)"
      : "var(--found-color)"};
`;

const StyledCancelLink = styled(Link)`
  :hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  font-weight: 400;
`;

const UserName = styled.p`
  margin: 0;
  font-weight: 600;
  word-break: break-word;
`;

const ItemTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  padding: 2.5rem 0 1.5rem;
  text-align: center;
  word-break: break-word;
`;

const ItemDescription = styled.p`
  margin: 0;
  padding: 1rem 0;
  word-break: break-word;
`;

const MessageButton = styled.button`
  min-width: 100%;
  margin-top: 2em;
  padding: 0.8rem;
  border: none;
  border-radius: 0.6rem;
  background-color: var(--middle-finished-color);
  color: var(--font-color);
  font-size: 1.2rem;
  box-shadow: 5px 5px 10px 2px var(--more-lightgrey-color);
  transition: opacity 0.2s ease-in;

  :hover {
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s ease-in;
  }

  :active {
    box-shadow: none;
  }
`;

const StyledText = styled.p`
  margin: 0 auto;
  text-align: center;
  padding-top: 2.5rem;
  color: var(--grey-color);
`;

const MessagesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.5rem 0 1rem;
`;
