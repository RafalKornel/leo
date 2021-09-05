import { UserDto, UserModel } from "../models";

export const createUserModel = (
  name: string,
  username?: string
): UserModel => ({
  id: 1,
  name,
  username: username || name,
});

export const createUserDto = (name: string, username?: string): UserDto => ({
  id: 1,
  name,
  username: username || name,
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
});
