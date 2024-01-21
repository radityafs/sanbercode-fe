"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import toast, { Toaster } from "react-hot-toast";

import NavBar from "@/components/navbar";
import books from "@/helper/fetcher/books/books";
import tableBooks from "@/components/table/tableBooks";
import DeleteModal from "@/components/modal/deleteModal";
import BookModal from "@/components/modal/bookModal";
import categories from "@/helper/fetcher/categories/categories";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [filter, setFilter] = useState({
    title: "",
    categoryId: "",
    minYear: "",
    maxYear: "",
    minPage: "",
    maxPage: "",
    sortByTitle: "",
  });

  const debouncedSearch = useDebounce(filter, 200);

  const [selectedBookDelete, setSelectedBookDelete] = useState(null);
  const [selectedBookEdit, setSelectedBookEdit] = useState(null);
  const [dataModalAdd, setDataModalAdd] = useState(null);

  const {
    data: dataGetBooks,
    isLoading: isLoadingGetBooks,
    mutate: mutateGetBooks,
  } = useSWR(
    debouncedSearch ? ["/books", debouncedSearch] : null,
    books.getBooks
  );

  const { data: dataGetCategories, mutate: mutateGetCategories } = useSWR(
    "/categories",
    categories.getCategories
  );

  const { trigger: triggerDelete } = useSWRMutation(
    "/books",
    books.deleteBook,
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success(data.message);
          mutateGetBooks();
          setSelectedBookDelete(null);
        } else {
          toast.error(data.error);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const { trigger: triggerAdd } = useSWRMutation("/books", books.createBook, {
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message);
        mutateGetBooks();
        setDataModalAdd(null);
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { trigger: triggerEdit } = useSWRMutation("/books", books.updateBook, {
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message);
        mutateGetBooks();
        setSelectedBookEdit(null);
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Fetch data on first render
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("categoryId")) {
      setFilter({
        ...filter,
        categoryId: searchParams.get("categoryId"),
      });
    }

    mutateGetBooks();
    mutateGetCategories();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <Toaster position="top-right" reverseOrder={false} />

      <DeleteModal
        showModal={selectedBookDelete}
        onConfirm={() => {
          triggerDelete({
            id: selectedBookDelete?.id,
          });
        }}
        onDismiss={() => {
          setSelectedBookDelete(null);
        }}
        context={"Book"}
      />

      <BookModal
        showModal={selectedBookEdit}
        onConfirm={(data) => {
          triggerEdit({
            id: selectedBookEdit?.id,
            ...data,
          });
        }}
        onDismiss={() => {
          setSelectedBookEdit(null);
        }}
        categories={dataGetCategories?.data}
        book={selectedBookEdit}
      />

      <BookModal
        showModal={dataModalAdd}
        onConfirm={(data) => {
          triggerAdd(data);
        }}
        onDismiss={() => {
          setDataModalAdd(null);
        }}
        categories={dataGetCategories?.data}
      />

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 p-2">
              <div className="w-full">
                <label htmlFor="min-year" className="sr-only">
                  Min Year
                </label>
                <input
                  type="number"
                  id="min-year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Min Year"
                  required
                  value={filter.minYear}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      minYear: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <label htmlFor="max-year" className="sr-only">
                    Max Year
                  </label>
                  <input
                    type="number"
                    id="max-year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Max Year"
                    required
                    value={filter.maxYear}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        maxYear: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 p-2">
              <div className="w-full">
                <label htmlFor="min-year" className="sr-only">
                  Min Page
                </label>
                <input
                  type="number"
                  id="min-year"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Min Page"
                  required
                  value={filter.minPage}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      minPage: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <div className="flex items-center">
                  <label htmlFor="max-year" className="sr-only">
                    Max Page
                  </label>
                  <input
                    type="number"
                    id="max-page"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Max Page"
                    required
                    value={filter.maxPage}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        maxPage: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 p-2">
              <div className="w-full">
                <select
                  id="category"
                  name="category"
                  className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={filter.categoryId}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      categoryId: e.target.value,
                    });
                  }}
                >
                  <option value={""}>All Category</option>
                  {dataGetCategories?.data?.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <select
                  id="sort-by-title"
                  name="sort-by-title"
                  className="bg-gray-50  w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  pl-4 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={filter.sortByTitle}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      sortByTitle: e.target.value,
                    });
                  }}
                >
                  <option value="">Sort By Title</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 p-4">
              <div className="w-full">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative md:mb-0 mb-3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required
                    value={filter.title}
                    onChange={(e) => {
                      setFilter({
                        ...filter,
                        title: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => {
                    setDataModalAdd(true);
                  }}
                  type="button"
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add product
                </button>
              </div>
            </div>
            {/** Loading state */}
            {isLoadingGetBooks && loadingState()}

            {/** Empty state */}

            {!isLoadingGetBooks &&
              dataGetBooks?.data?.length === 0 &&
              emptyState()}

            {/** Table */}
            {dataGetBooks?.data?.length > 0 &&
              !isLoadingGetBooks &&
              tableBooks({
                books: dataGetBooks?.data,
                handleEdit: (book) => {
                  setSelectedBookEdit(book);
                },
                handleDelete: (book) => {
                  setSelectedBookDelete(book);
                },
              })}
          </div>
        </div>
      </section>
    </div>
  );
}

const emptyState = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          No data found
        </h1>

        <p className="text-gray-700 dark:text-gray-400">
          Please add some data to show here.
        </p>
      </div>
    </div>
  );
};

const loadingState = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};
