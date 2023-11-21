import { validate } from "../service/api/auth";

export const isAuthticated = async (): Promise<boolean> => {
  try {
    await validate();
    return true;
  } catch (e) {
    return false;
  }
};
