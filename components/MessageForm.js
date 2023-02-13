import styled from "styled-components";

import SubmitButtonsSet from "@/components/SubmitButtonsSet";

export default function MessageForm({
  id,
  isMutating,
  onStopDiscuss,
  inDiscuss,
  onSubmitMessage,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    onSubmitMessage(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="message">Leave a message:</Label>
      <Textarea
        name="text"
        id="message"
        rows="3"
        minLength="3"
        maxLength="300"
        autoFocus
      ></Textarea>
      <SubmitButtonsSet
        variant="form"
        type="submit"
        link={id ? `/items/${id}` : "/"}
        ariaLabel="cancel"
        buttonName="Submit"
        linkName="Cancel"
        isMutating={isMutating}
        onStopDiscuss={onStopDiscuss}
        inDiscuss={inDiscuss}
      />
    </Form>
  );
}

const Form = styled.form`
  min-width: 18.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const Label = styled.label`
  margin: 0;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--grey-color);
`;

const Textarea = styled.textarea`
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.5rem;
  padding: 0.4rem;
  font-family: var(--inter-font);
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;
