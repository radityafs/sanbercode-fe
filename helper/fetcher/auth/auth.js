import fetcher from "../../fetcher";

const login = async (_, { arg: { email, password } }) => {
  const response = await fetcher({
    url: "auth/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { email, password },
  });

  return response;
};

const register = async (_, { arg: { name, email, password } }) => {
  const response = await fetcher({
    url: "auth/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { name, email, password },
  });

  return response;
};

export default {
  login,
  register,
};
