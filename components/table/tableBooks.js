const tableBooks = ({ books, handleDelete, handleEdit }) => {
  const onClickDelete = (book) => {
    handleDelete(book);
  };

  const onClickEdit = (book) => {
    handleEdit(book);
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
              Gambar
            </th>
            <th scope="col" className="px-4 py-3">
              Title
            </th>
            <th scope="col" className="px-4 py-3">
              Description
            </th>
            <th scope="col" className="px-4 py-3">
              Release Year
            </th>
            <th scope="col" className="px-4 py-3">
              Total Page
            </th>
            <th scope="col" className="px-4 py-3">
              Thickness
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Category
            </th>
            <th scope="col" className="px-4 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => (
            <tr className="border-b dark:border-gray-700" key={index}>
              <td className="px-4 py-3">{book.id}</td>
              <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={book.image_url}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{book.title}</td>
              <td className="px-4 py-3 text-sm">{book.description}</td>
              <td className="px-4 py-3 text-sm">{book.release_year}</td>
              <td className="px-4 py-3 text-sm">{book.total_page}</td>
              <td className="px-4 py-3 text-sm">{book.thickness}</td>
              <td className="px-4 py-3 text-sm">{book.price}</td>
              <td className="px-4 py-3 text-sm">{book.category?.name}</td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => onClickEdit(book)}
                    type="button"
                    className="text-white me-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onClickDelete(book)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableBooks;
