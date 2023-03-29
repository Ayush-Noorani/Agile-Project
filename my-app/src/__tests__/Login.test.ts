// import { axiosInstance } from "../helper/axios";
import axios from "axios";

axios;

const axiosInstance = axios.create({
  baseURL: "http://0.0.0.0:8000",
});

test("Correct Email and Correct Password", async () => {
  const value = {
    name: "rajeev.dessai11@gmail.com",
    password: "test",
  };
  const result = await axiosInstance.post("/user/login", value);
  expect(result.data.data).toBe("User found - Login successful");
  expect(result.status).toBe(200);
});

test("Wrong Email and Correct Password", async () => {
  const value = {
    name: "aBrokenEmail@gmail.com",
    password: "test",
  };

  await axiosInstance.post("/user/login", value).catch((err) => {
    expect(err.message).toBe("Request failed with status code 400");
  });
});

test("Correct Email and Wrong Password", async () => {
  const value = {
    name: "rajeev.dessai11@gmail.com",
    password: "test123",
  };

  await axiosInstance.post("/user/login", value).catch((err) => {
    expect(err.message).toBe("Request failed with status code 400");
  });
});

test("Wrong Email and Wrong Password", async () => {
  const value = {
    name: "yeeeBoi@",
    password: "test123",
  };

  await axiosInstance.post("/user/login", value).catch((err) => {
    expect(err.message).toBe("Request failed with status code 400");
  });
});
