import styled from "styled-components";

export default function Item({ title, initialStatus }) {
  return (
    <StyledItem initialStatus={initialStatus}>
      <Title>{title}</Title>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  min-width: 300px;
  min-height: 70px;
  margin: 0 35px;
  background-color: ${({ initialStatus }) =>
    initialStatus ? "var(--lost-pastel-color)" : "var(--found-pastel-color)"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 600;
  padding: 10px;
`;
