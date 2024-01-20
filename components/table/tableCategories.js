const tableCategories = ({
  categories,
  handleDelete,
  handleEdit,
  handleDetail,
}) => {
  const onClickEdit = (category) => {
    handleEdit(category);
  };

  const onClickDelete = (category) => {
    handleDelete(category);
  };

  const onClickDetail = (category) => {
    handleDetail(category);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Id
            </th>
            <th scope="col" className="px-4 py-3">
              Category name
            </th>
            <th scope="col" className="px-4 py-3 text-end">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-3">{category.id}</td>

              <td className="px-4 py-3 text-sm">{category.name}</td>
              <td className="px-4 py-3 justify-end flex">
                <button
                  onClick={() => onClickDetail(category)}
                  type="button"
                  className="text-white me-3 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Detail
                </button>

                <button
                  type="button"
                  onClick={() => onClickEdit(category)}
                  className="text-white me-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onClickDelete(category)}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableCategories;
