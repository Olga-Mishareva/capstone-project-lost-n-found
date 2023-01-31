import styled from "styled-components";
import Link from "next/link";

export default function ItemForm({
  formType,
  title,
  description,
  userName,
  category,
  onSubmit,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryWrapper>
        <Label htmlFor="category-select">Category:</Label>
        <Select
          name="initiallyLost"
          id="category-select"
          defaultValue={formType === "add" ? "" : category ? "Lost" : "Found"}
          required
          autoFocus
        >
          <option value="">Choose</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </Select>
      </CategoryWrapper>
      {formType === "add" ? (
        <>
          <Label htmlFor="user-name">User name:</Label>
          <Input
            type="text"
            name="userName"
            id="user-name"
            minLength="2"
            maxLength="30"
            required
          />
        </>
      ) : (
        <>
          <p>User name:</p>
          <p>{userName}</p>
        </>
      )}

      <Label htmlFor="title">Title of item:</Label>
      <Input
        name="title"
        id="title"
        minLength="2"
        maxLength="30"
        required
        defaultValue={formType === "edit" ? title : ""}
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
        defaultValue={formType === "edit" ? description : ""}
      />
      <ButtonsWrapper>
        <BackLink href={"/"} aria-label="cancel">
          Cancel
        </BackLink>
        <SubmitButton type="submit">Submit</SubmitButton>
      </ButtonsWrapper>
    </Form>
  );
}

const Form = styled.form`
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 0.5rem;
`;

const Label = styled.label`
  margin: 0;
  padding: 1rem 0 0.5rem;
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
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const ButtonsWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackLink = styled(Link)`
  min-width: 8.8rem;
  min-height: 2.6rem;
  text-decoration: none;
  color: var(--font-color);
  background-color: var(--lost-pastel-color);
  border-radius: 0.6rem;
  padding: 0.6rem 2.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  :hover {
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  min-width: 8.8rem;
  min-height: 2.6rem;
  border: none;
  background-color: var(--finished-pastel-color);
  border-radius: 0.6rem;
  padding: 0.6rem 2.4rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--font-color);
  :hover {
    cursor: pointer;
  }
`;
