import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { TLogin } from "../types/user.type";
import { useLoginMutation } from "../redux/api/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/api/features/auth/authSlice";
import { tokenVerify } from "../utils/tokenVerify";
import { loginValidationSchema } from "../validations/userValidation";
import InputWithLabel from "../components/UI/InputWithLabel";
import { useEffect } from "react"; 

const Login = () => {
  const methods = useForm<TLogin>({
    resolver: zodResolver(loginValidationSchema),
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  // Redirect to the dashboard if the user is already authenticated
  useEffect(() => {
    if (token) {
      const userDecoded = tokenVerify(token);
      if (userDecoded?.accountType === "Admin") {
        navigate("/admin");
      } else if (userDecoded?.accountType === "User") {
        navigate("/user");
      } else if (userDecoded?.accountType === "Agent") {
        navigate("/agent");
      }
    }
  }, [token, navigate]);

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const result = await login(data).unwrap();
      const userDecoded = tokenVerify(result.accessToken);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
            <p className="text-gray-600">Please log in to continue.</p>
          </div>
  

          {/* Form */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <InputWithLabel
              label="Mobile Number"
              name="mobileNumber"
              type="text" // Changed to text to avoid issues with leading zeros
              placeholder="Enter your mobile number"
              required
            />
            <InputWithLabel
              label="PIN"
              name="pin"
              type="password"
              placeholder="Enter your PIN"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
              <Link to="/login" className="text-blue-600 hover:underline">
            <p className="text-gray-600">Forgot Password?</p>
              </Link>
            <p className="text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/registration" className="text-blue-600 hover:underline">
              Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Login;