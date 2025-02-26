import { useFormContext, RegisterOptions } from "react-hook-form";

type TInputWithLabelProps = {
  name: string; 
  label: string; 
  type?: string;
  placeholder?: string; 
  required?: boolean; 
  disabled?: boolean; 
  className?: string;
  validation?: RegisterOptions; 
};

const InputWithLabel = ({
  name,
  label,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  validation,
}: TInputWithLabelProps) => {
  const {
    register,
    formState: { errors },
} = useFormContext();
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        {...register(name, validation)}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputWithLabel;