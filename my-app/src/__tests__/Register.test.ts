import axios from "axios";
axios;
const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000",
});

test("Valid Registeration", async () => {
  const value = {
    name: "test@123.com",
    password: "test",
  };
  const result = await axiosInstance.post("/user/register", value);
  expect(result.data.data).toBe("Registered");
  expect(result.status).toBe(200);
});

test("Invalid Registeration", async () => {
  const value = {
    name: "test@123.com",
    password: "test",
  };
  const result = await axiosInstance.post("/user/register", value);
  expect(result.data.message).toBe("email already exists!");
  expect(result.status).toBe(403);
});
