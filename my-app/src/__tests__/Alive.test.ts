import axios from "axios";
axios;
const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000",
});

test("Backend Up and Running", async () => {
  const result = await axiosInstance.get("/");
  expect(result.data).toStrictEqual({ message: "Hello, World!" });
  expect(result.status).toBe(200);
});
