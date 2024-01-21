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

    if (result.code === 401 && result.error === "You are not logged in") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetcher;
