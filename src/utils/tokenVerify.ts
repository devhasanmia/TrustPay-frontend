import { jwtDecode } from "jwt-decode";
import { TUser } from "../redux/api/features/auth/authSlice";

export const tokenVerify = (token: string): TUser | null => {
  try {
    const decoded: TUser = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};