import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

import SVGIcon from "@/components/SVGIcon";

import SubmitButtonsSet from "@/components/SubmitButtonsSet";

export default function ItemDetails({
  title,
  description,
  initialStatus,
  isFound,
  userName,
  onHandleStatus,
}) {
  const router = useRouter();
  const { id } = router.query;

  async function handleDelete() {
    try {
      await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      throw new Error({ message: error });
    }
  }

  console.log(id);

  return (
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
      />
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  min-width: 18.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 0 1rem;
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
