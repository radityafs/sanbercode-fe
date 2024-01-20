const fetcher = async ({ url, method = "GET", body = null, headers = {} }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      headers,
      method,
      body: body ? JSON.stringify(body) : null,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default fetcher;
