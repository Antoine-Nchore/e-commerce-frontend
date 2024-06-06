import axios from "axios";

export const BASE_URL = `http://127.0.0.1:5000`;

export const api = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
  withCredentials: true,
});

api.interceptors.request.use((req) => {
  if (!req.headers["Authorization"]) {
    const session = JSON.parse(localStorage.getItem("session"));
    req.headers["Authorization"] = `Bearer ${session?.access_token}`;
  }
  return req;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (err?.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const session = JSON.parse(localStorage.getItem("session"));
      if (!session?.refresh_token) {
        return Promise.reject(err);
      }

      try {
        const { data } = await axios.post(
          `${BASE_URL}/refresh-access`,
          undefined,
          {
            headers: {
              Authorization: `Bearer ${session.refresh_token}`,
            },
          }
        );

        if (data?.access_token) {
          session["access_token"] = data.access_token;
          localStorage.setItem("session", JSON.stringify(session));
          originalConfig.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
        }

        return api(originalConfig);
      } catch (error) {
        localStorage.removeItem("session");
        window.location.reload();
      }
    }

    return Promise.reject(err);
  }
);
