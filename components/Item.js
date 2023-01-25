import styled from "styled-components";

export default function Item({ title, initialStatus }) {
  return (
    <StyledItem initialStatus={initialStatus}>
      <Title>{title}</Title>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  min-width: 18em;
  min-height: 3em;
  background-color: ${({ initialStatus }) =>
    initialStatus ? "var(--lost-pastel-color)" : "var(--found-pastel-color)"};
  border-radius: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1em;
`;
