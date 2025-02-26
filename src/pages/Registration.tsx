import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import InputWithLabel from "../components/UI/InputWithLabel";
import { userValidationSchema } from "../validations/userValidation";
import { useRegistrationMutation } from "../redux/api/features/auth/authApi";
import { toast } from "sonner";

type TFormData = {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
  accountType: "Agent" | "User";
  nid: string;
};

const Registration = () => {
  const methods = useForm<TFormData>({
    resolver: zodResolver(userValidationSchema),
  });

  const [userRegistration] = useRegistrationMutation();
  let navigate = useNavigate();
  const onSubmit: SubmitHandler<TFormData> = async (data) => {
    try {
        const result = await userRegistration(data).unwrap();
        toast.success(result.message);
        methods.reset();
        navigate("/login", { replace: true });
    } catch (error: any) {
        toast.error(`${error?.data?.errorMessages[0]?.message}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-500 p-6 sm:p-8 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Create Your TrustPay Account</h2>
            <p className="mt-2 text-sm sm:text-base opacity-90">
              Join TrustPay today and enjoy seamless financial services.
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <InputWithLabel
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                required
                className="col-span-1 sm:col-span-2"
              />

              {/* 5-digit PIN */}
              <InputWithLabel
                name="pin"
                label="5-digit PIN"
                type="text"
                placeholder="12345"
                required
              />

              {/* Mobile Number */}
              <InputWithLabel
                name="mobileNumber"
                label="Mobile Number"
                type="text"
                placeholder="Mobile number"
                required
              />

              {/* National ID (NID) */}
              <InputWithLabel
                name="nid"
                label="National ID (NID)"
                type="text"
                placeholder="NID Number"
                required
              />

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <select
                  {...methods.register("accountType")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                >
                  <option value="User">User</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>

              {/* Email Address */}
              <InputWithLabel
                name="email"
                label="Email Address"
                type="email"
                placeholder="john.doe@example.com"
                required
                className="col-span-1 sm:col-span-2"
              />

              {/* Register Button */}
              <div className="col-span-1 sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Register
                </button>
              </div>
            </form>

            {/* Login Link */}
            <p className="text-gray-600 text-sm sm:text-base mt-6 text-center">
              Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Registration;