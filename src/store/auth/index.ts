import { atomWithStorage } from "jotai/utils";

const token = atomWithStorage("token", localStorage.getItem("token") || "");

export const authStore = {
  token,
};

export default authStore;
