import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { TLogin } from "../types/user.type";
import { useLoginMutation } from "../redux/api/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/api/features/auth/authSlice";
import { tokenVerify } from "../utils/tokenVerify";
import { loginValidationSchema } from "../validations/userValidation";
import InputWithLabel from "../components/UI/InputWithLabel";

const Login = () => {
    const methods = useForm<TLogin>({
        resolver: zodResolver(loginValidationSchema),
      });
  const [Login] = useLoginMutation();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
        const result = await Login(data).unwrap();
        // Verify the token and decode user information
        const userDecoded = tokenVerify(result.accessToken);
        // Dispatch the user data to the Redux store
        dispatch(
          setUser({
            user: userDecoded,
            token: result.accessToken,
          })
        );
        if (userDecoded?.accountType === "Admin") {
          navigate("/admin");
        } else if (userDecoded?.accountType === "User") {
          navigate("/user");
        } else if (userDecoded?.accountType === "Agent") {
          navigate("/agent");
        }
        toast.success(result.message);
    } catch (error: any) {
        if (error?.status === 401) {
        toast.error("Invalid Mobile Number or PIN");
      } else {
        toast.error(error?.data?.message || "An error occurred");
      }
    }
  };



  return (
    <FormProvider {...methods}>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-96 h-[600px] bg-white rounded-3xl shadow-xl flex flex-col items-center p-8">
        <div className="w-28 h-3 bg-gray-300 rounded-full mt-2 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>

        {/* Form */}
        <form onSubmit={methods.handleSubmit(onSubmit)}
         className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full"
        >
        <InputWithLabel label="Mobile Number" name="mobileNumber" required type="number" placeholder="Enter your Mobile"  />
        <InputWithLabel label="PIN" name="pin" required type="password" placeholder="Enter your PIN" />
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
        </form>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-5">Forgot Password?</p>
        <p className="text-gray-500 text-sm mt-3">
          Don't have an account?{" "}
          <Link to="/registration">
            <span className="text-blue-500 cursor-pointer">Registration</span>
          </Link>
        </p>
      </div>
    </div>
    </FormProvider>
  );
};

export default Login;
