const fetcher = async ({ url, method = "GET", body = null, headers = {} }) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      method,
      body: body ? JSON.stringify(body) : null,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    if (error.message === "You are not logged in") {
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    } else {
      throw new Error(error.message);
    }
  }
};

export default fetcher;
