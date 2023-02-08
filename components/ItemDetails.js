import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import useSWRMutation from "swr/mutation";

import SVGIcon from "@/components/SVGIcon";
import ConfirmPopup from "@/components/Overlay";
import SubmitButtonsSet from "@/components/SubmitButtonsSet";
import Overlay from "@/components/Overlay";
import useConfirmStore from "@/hooks/useConfirmStore";

async function fetcher(url, { arg }) {
  const response = await fetch(url, {
    method: arg.method,
  });
  if (!response.ok) {
    throw new Error(`Error: status code ${response.status}`);
  }
  console.log(response);
  return response.json();
}

export default function ItemDetails({
  title,
  description,
  initialStatus,
  isFound,
  userName,
  onHandleStatus,
  isMutating,
}) {
  // const popupIsOpen = useConfirmStore((state) => state.popupIsOpen);

  const router = useRouter();
  const { id } = router.query;

  const {
    trigger: triggerDelete,
    isMutating: isDeleting,
    error: fetchingError,
  } = useSWRMutation(`/api/items/${id}`, fetcher);

  async function handleDelete() {
    try {
      await triggerDelete({ method: "DELETE" });
    } catch (error) {
      throw new Error(error.message);
    }
    if (!fetchingError) {
      console.log("no error!!!");
      router.push("/");
    }
  }

  if (fetchingError) {
    return <h2>{fetchingError}</h2>;
  }

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
        <StyledFoundButton
          onClick={onHandleStatus}
          type="button"
          isFound={isFound}
          disabled={isMutating}
        >
          {isFound
            ? "Found its owner"
            : initialStatus
            ? "I found it"
            : "That's mine"}
        </StyledFoundButton>

        <SubmitButtonsSet
          variant="details"
          type="button"
          onDelete={handleDelete}
          pagetype="details-page"
          link={`/items/${id}/edit`}
          ariaLabel="edit"
          buttonName="Delete"
          linkName="Edit"
          isMutating={isDeleting}
        />
      </DetailsWrapper>
      {/* {popupIsOpen && <Overlay onDelete={handleDelete} />} */}
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
  background-color: ${({ isFound }) =>
    isFound ? "var(--finished-color)" : "var(--finished-pastel-color)"};
  color: ${({ isFound }) => (isFound ? "#FFFFFF" : "var(--font-color)")};
`;
