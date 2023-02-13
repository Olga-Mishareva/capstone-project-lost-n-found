import styled from "styled-components";

export default function Item({ title, initialStatus, isFound }) {
  return (
    <StyledItem initialStatus={initialStatus} isFound={isFound}>
      <Title>{title}</Title>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  min-width: 18em;
  min-height: 3em;
  background-color: ${({ initialStatus, isFound }) =>
    isFound
      ? "var(--finished-pastel-color)"
      : initialStatus
      ? "var(--lost-pastel-color)"
      : "var(--found-pastel-color)"};
  border-radius: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px 0px var(--more-lightgrey-color);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1em;
`;
