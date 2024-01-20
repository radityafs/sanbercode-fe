"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import NavBar from "@/components/navbar";
import useSWRMutation from "swr/mutation";
import toast, { Toaster } from "react-hot-toast";

import categories from "@/helper/fetcher/categories/categories";
import tableCategories from "@/components/table/tableCategories";
import DeleteModal from "@/components/modal/deleteModal";
import CategoryModal from "@/components/modal/categoryModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [selectedCategoriesDelete, setSelectedCategoriesDelete] =
    useState(null);
  const [selectedCategoriesEdit, setSelectedCategoriesEdit] = useState(null);
  const [dataModalAdd, setDataModalAdd] = useState(null);

  const { trigger: triggerEdit } = useSWRMutation(
    "/Categories",
    categories.updateCategory,
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success(data.message);
          mutateGetCategories();
          setSelectedCategoriesEdit(null);
        } else {
          toast.error(data.error);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const { trigger: triggerAdd } = useSWRMutation(
    "/Categories",
    categories.createCategory,
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success(data.message);
          mutateGetCategories();
          setDataModalAdd(null);
        } else {
          toast.error(data.error);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const {
    data: dataGetCategories,
    mutate: mutateGetCategories,
    isLoading: isLoadingGetCategories,
  } = useSWR("/Categories", categories.getCategories);

  const { trigger: triggerDelete } = useSWRMutation(
    "/Categories",
    categories.deleteCategory,
    {
      onSuccess: (data) => {
        if (data.status === "success") {
          toast.success(data.message);
          mutateGetCategories();
          setSelectedCategoriesDelete(null);
        } else {
          toast.error(data.error);
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onClickDetail = (id) => {
    router.push(`/dashboard/books/?categoryId=${id}`);
  };

  useEffect(() => {
    mutateGetCategories();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Toaster position="top-right" reverseOrder={false} />

      <DeleteModal
        showModal={selectedCategoriesDelete}
        onConfirm={() => {
          triggerDelete({
            id: selectedCategoriesDelete?.id,
          });
        }}
        onDismiss={() => {
          setSelectedCategoriesDelete(null);
        }}
        context={"Categories"}
      />

      <CategoryModal
        showModal={selectedCategoriesEdit}
        onConfirm={(data) => {
          triggerEdit({
            id: selectedCategoriesEdit?.id,
            ...data,
          });
        }}
        onDismiss={() => {
          setSelectedCategoriesEdit(null);
        }}
        category={selectedCategoriesEdit}
      />

      <CategoryModal
        showModal={dataModalAdd}
        onConfirm={(data) => {
          triggerAdd(data);
        }}
        onDismiss={() => {
          setDataModalAdd(null);
        }}
      />

      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2"></div>
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
                      fill-rule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Category
                </button>
              </div>
            </div>

            {!isLoadingGetCategories &&
              dataGetCategories?.data?.length > 0 &&
              tableCategories({
                categories: dataGetCategories?.data,
                handleDelete: (categories) => {
                  setSelectedCategoriesDelete(categories);
                },
                handleEdit: (categories) => {
                  setSelectedCategoriesEdit(categories);
                },
                handleDetail: (categories) => {
                  onClickDetail(categories?.id);
                },
              })}

            {isLoadingGetCategories && loadingState()}
            {!isLoadingGetCategories &&
              dataGetCategories?.data?.length === 0 &&
              emptyState()}
          </div>
        </div>
      </section>
    </div>
  );
}

const emptyState = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          No data found
        </h1>

        <p className="text-gray-700 dark:text-gray-400">
          Please add some data to show here.
        </p>

        <button
          type="button"
          className="flex items-center justify-center mt-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-600 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-700 focus:outline-none focus:shadow-outline-primary"
        >
          Add data
        </button>

        <div className="mt-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24,8c-8.8,0-16,7.2-16,16s7.2,16,16,16s16-7.2,16-16S32.8,8,24,8z M24,36c-4.4,0-8-3.6-8-8s3.6-8,8-8
                      s8,3.6,8,8S28.4,36,24,36z"
            />
            <path d="M24,20c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S26.2,20,24,20z" />
          </svg>
        </div>
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
