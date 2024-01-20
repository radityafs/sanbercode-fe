import fetcher from "../../fetcher";

const getCategories = async () => {
  const response = await fetcher({
    url: `categories`,
  });
  return response;
};

const getBookCategories = async (_, { arg: { id } }) => {
  const response = await fetcher({
    url: `categories/${id}/books`,
  });
  return response;
};

const createCategory = async (_, { arg: { name } }) => {
  const response = await fetcher({
    url: `categories`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { name },
  });
  return response;
};

const updateCategory = async (_, { arg: { id, name } }) => {
  const response = await fetcher({
    url: `categories/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: { name },
  });
  return response;
};

const deleteCategory = async (_, { arg: { id } }) => {
  const response = await fetcher({
    url: `categories/${id}`,
    method: "DELETE",
  });
  return response;
};

export default {
  getCategories,
  getBookCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
