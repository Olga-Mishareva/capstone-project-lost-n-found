import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import SVGIcon from "@/components/SVGIcon";
import SubmitButtonsSet from "@/components/SubmitButtonsSet";
import Overlay from "@/components/Overlay";

export default function ItemDetails({
  title,
  description,
  initialStatus,
  isFound,
  userName,
  onHandleStatus,
  onDelete,
  isMutating,
}) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  function handleOpenPopup() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DetailsWrapper>
        <Container>
          <Category initialStatus={initialStatus} isFound={isFound}>
            {isFound ? "Waiting for pick-up" : initialStatus ? "Lost" : "Found"}
          </Category>

          <StyledLink href="/">
            <SVGIcon
              variant="close"
              width="48px"
              label="close"
              color="var(--font-color)"
            />
          </StyledLink>
        </Container>
        <UserName>
          <Span>by</Span> {userName}
        </UserName>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
        {session?.user.name === userName ? (
          <></>
        ) : (
          <StyledFoundButton
            onClick={session ? onHandleStatus : handleOpenPopup}
            type="button"
            isFound={isFound}
            session={session}
            disabled={isMutating}
          >
            {isFound
              ? "Found its owner"
              : initialStatus
              ? "I found it"
              : "That's mine"}
          </StyledFoundButton>
        )}
        {session?.user.name == userName ? (
          <SubmitButtonsSet
            variant="details"
            type="button"
            pagetype="details-page"
            link={`/items/${id}/edit`}
            ariaLabel="edit"
            buttonName="Delete"
            linkName="Edit"
            isMutating={isMutating}
            pathName={pathName}
            onOpen={handleOpenPopup}
          />
        ) : (
          <></>
        )}
      </DetailsWrapper>
      {showPopup && <Overlay onConfirm={onDelete} onClose={handleClosePopup} />}
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
`;

const Category = styled.p`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ isFound, initialStatus }) =>
    isFound
      ? "var(--finished-color)"
      : initialStatus
      ? "var(--lost-color)"
      : "var(--found-color)"};
`;

const StyledLink = styled(Link)`
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
  padding: 2.2rem 0 1.5rem;
  text-align: center;
  word-break: break-word;
`;

const ItemDescription = styled.p`
  margin: 0;
  padding: 1rem 0;
  word-break: break-word;
`;

const StyledFoundButton = styled.button`
  min-width: 100%;
  margin: 5em 0;
  padding: 1em;
  border: none;
  border-radius: 1em;
  cursor: pointer;
  background-color: ${({ isFound }) =>
    isFound ? "var(--finished-color)" : "var(--finished-pastel-color)"};
  color: ${({ isFound }) => (isFound ? "#FFFFFF" : "var(--font-color)")};
`;
