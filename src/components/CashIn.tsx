import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { cashInSchema } from '../validations/transactionValidation';
import { useCashInMutation } from '../redux/api/features/transactions/transactionsApi';
import { toast } from 'sonner';
import InputWithLabel from './UI/InputWithLabel';

type TTransaction = z.infer<typeof cashInSchema>;

const CashIn = () => {
  const methods = useForm<TTransaction>({
    resolver: zodResolver(cashInSchema),
  });
const [cashIn] = useCashInMutation()
  // Handle form submission
  const onSubmit: SubmitHandler<TTransaction> = async (data) => {
    try {
      const payload = { ...data, transactionType: 'CashIn' };
      const result = await cashIn(payload).unwrap();
      toast.success(result.message);
      methods.reset();
    } catch (error: any) {
      toast.error(`${error?.data?.errorMessages[0]?.message}`);
    }
  };
  
  return (
    <FormProvider {...methods}>
      
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Cash In</h2>
            <p className="text-gray-600">Please fill in the details below to Cash In.</p>
          </div>

          {/* Form */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-6 space-y-6"
          >
            <InputWithLabel
              label="Mobile Number"
              name="accountNumber"
              type="text"
              placeholder="Enter recipient's mobile number"
              required
            />
            <InputWithLabel
              label="Amount"
              name="amount"
              type="number"
              required
              placeholder="Amount to cashIn"
            />
            <InputWithLabel
              label="PIN"
              name="pin"
              required
              type="password"
              placeholder="Enter your PIN"
            />
            <input
              type="hidden"
              {...methods.register('transactionType')}
              value="CashIn"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cash In
            </button>
          </form>
        </div>
    </FormProvider>
  );
};

export default CashIn;
