import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  accessToken: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    birthday: string;
    id: number;
  };
}

export const loginUser = async (credentials: LoginRequest) => {
  const token = await api.post<UserResponse>("/login", {
    email: credentials.email,
    password: credentials.password,
  });
  await AsyncStorage.setItem("token", token.data.accessToken);
  await AsyncStorage.setItem("id", String(token.data.user.id));
  return token.data;
};

/**
 * Registers a user with the server.
 *
 * This function takes a `User` object and submits it to the server's `/register`
 * endpoint. If the registration is successful, it returns the response data.
 * If the registration fails, it throws the error.
 */
export const registerUser = async (credentials: User) => {
  try {
    const response = await api.post<UserResponse>(
      "/register",
      credentials
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

/**
 * Retrieves the current user's information from the server.
 *
 * This function fetches the user ID from AsyncStorage and sends a GET request
 * to the server's `/users/{id}` endpoint to retrieve the user's details.
 *
 * @returns {Promise<UserResponse>} A promise that resolves to the user's data.
 */
export const getCurrentUser = async () => {
  const id = await AsyncStorage.getItem("id");
  return api.get<UserResponse>(`/users/${id}`);
};

export const putUser = async (userData: User) => {
  const id = await AsyncStorage.getItem("id");
  return api
    .put(`/users/${id}`, userData)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};