import styled, { css } from "styled-components";

import SubmitButtonsSet from "@/components/SubmitButtonsSet";

export default function ItemForm({
  formtype,
  id,
  title,
  description,
  userName,
  category,
  onSubmit,
  clickPosition,
  isMutating,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data, clickPosition);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Wrapper variant="category">
        <Label htmlFor="category-select">Category:</Label>
        <Select
          name="initiallyLost"
          id="category-select"
          defaultValue={formtype === "add" ? "" : category ? "Lost" : "Found"}
          required
          autoFocus
        >
          <option value="">Choose</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </Select>
      </Wrapper>

      <Wrapper variant="username">
        <UserNameLabel id="user-name">User name: </UserNameLabel>
        <UserName aria-labelledby="user-name">{userName}</UserName>
      </Wrapper>

      <Label htmlFor="title">Title of item:</Label>
      <Input
        name="title"
        id="title"
        minLength="2"
        maxLength="30"
        required
        defaultValue={formtype === "edit" ? title : ""}
      />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        type="text"
        name="description"
        id="description"
        rows="7"
        minLength="3"
        maxLength="500"
        required
        defaultValue={formtype === "edit" ? description : ""}
      />
      <SubmitButtonsSet
        variant="form"
        type="submit"
        link={id ? `/items/${id}` : "/"}
        ariaLabel="cancel"
        buttonName="Submit"
        linkName="Cancel"
        isMutating={isMutating}
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${({ variant }) =>
    variant === "category" &&
    css`
      align-items: baseline;
      padding-bottom: 0.5rem;
    `};

  ${({ variant }) =>
    variant === "username" &&
    css`
      align-items: center;
      padding: 1rem 0 0.5rem;
      border-bottom: 1px solid var(--lightgrey-color);
    `};
`;

const Label = styled.label`
  margin: 0;
  padding: 1.5rem 0 0.5rem;
  font-weight: 500;
`;

const Select = styled.select`
  font-size: 1rem;
  min-width: 7rem;
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.3rem;
  padding: 0.5rem;
  padding-left: 0.2rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const Input = styled.input`
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.2rem;
  min-height: 1.8rem;
  padding: 0.5rem;
  font-family: var(--inter-font);
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.2rem;
  padding: 0.4rem;
  font-family: var(--inter-font);
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const UserName = styled.p`
  margin: 0;
  font-weight: 600;
`;

const UserNameLabel = styled.span`
  font-weight: 500;
`;
