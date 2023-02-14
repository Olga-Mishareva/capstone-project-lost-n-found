import styled from "styled-components";

export default function Message({ text, author }) {
  return (
    <Container>
      <Text>{text}</Text>
      <Author>{author}</Author>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: var(--input-color);
  box-shadow: 3px 3px 10px 2px rgba(26, 26, 26, 0.2);
  margin: 1rem 0;
`;

const Text = styled.p`
  margin: 0;
  padding: 1rem;
`;

const Author = styled.p`
  margin: 0;
  padding: 0.5rem 0.8rem 1rem;
  font-size: 0.8rem;
  text-align: end;
`;
