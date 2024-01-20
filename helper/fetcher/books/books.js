import fetcher from "../../fetcher";

const getBooks = async ([_, filter]) => {
  const urlSearch = new URLSearchParams();

  Object.keys(filter).forEach((key) => {
    if (filter[key] !== null) {
      urlSearch.append(key, filter[key]);
    }
  });

  const response = await fetcher({
    url: "books?" + urlSearch.toString(),
    method: "GET",
  });

  return response;
};

const createBook = async (
  _,
  {
    arg: {
      title,
      description,
      release_year,
      total_page,
      price,
      image_url,
      category_id,
    },
  }
) => {
  const response = await fetcher({
    url: "books",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title,
      description,
      release_year,
      total_page,
      price,
      image_url,
      category_id,
    },
  });
  return response;
};

const deleteBook = async (_, { arg: { id } }) => {
  const response = await fetcher({
    url: "books/" + id,
    method: "DELETE",
  });
  return response;
};

const updateBook = async (
  _,
  {
    arg: {
      id,
      title,
      description,
      release_year,
      total_page,
      price,
      image_url,
      category_id,
    },
  }
) => {
  const response = await fetcher({
    url: "books/" + id,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title,
      description,
      release_year,
      total_page,
      price,
      image_url,
      category_id,
    },
  });
  return response;
};

export default {
  getBooks,
  createBook,
  deleteBook,
  updateBook,
};
