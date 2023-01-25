import styled from "styled-components";
import Link from "next/link";

import SVGIcon from "@/components/SVGIcon";

export default function ItemDetails({
  title,
  description,
  initialStatus,
  isFound,
  userName,
  onHandle,
}) {
  return (
    <DetailsWrapper>
      <Container>
        <Category initialStatus={initialStatus} isFound={isFound}>
          {isFound ? "Waiting for pick-up" : initialStatus ? "Lost" : "Found"}
        </Category>
        <StyledLink href={"/"}>
          <SVGIcon variant="close" width="48px" color="var(--font-color)" />
        </StyledLink>
      </Container>
      <UserName>by {userName}</UserName>
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      <StyledButton onClick={onHandle} type="button" isFound={isFound}>
        {isFound
          ? "Found its owner"
          : initialStatus
          ? "I found it"
          : "That's mine"}
      </StyledButton>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  max-width: 350px;
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

const UserName = styled.p`
  margin: 0;
`;

const ItemTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  padding: 2.2rem 0 1.5rem;
  text-align: center;
`;

const ItemDescription = styled.p`
  margin: 0;
  padding: 1rem 0;
`;

const StyledButton = styled.button`
  min-width: 100%;
  margin: 5em 0;
  padding: 1em;
  border: none;
  border-radius: 1em;
  background-color: ${({ isFound }) =>
    isFound ? "var(--finished-color)" : "var(--finished-pastel-color)"};
  color: ${({ isFound }) => (isFound ? "#FFFFFF" : "var(--font-color)")};
`;
