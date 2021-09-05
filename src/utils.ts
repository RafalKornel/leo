import { UserDto } from "./user.dto";

export const createUser = (name: string, username?: string): UserDto => ({
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
