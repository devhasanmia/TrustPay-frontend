import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CashOutSchema } from '../validations/transactionValidation';
import { useCashOutMutation } from '../redux/api/features/transactions/transactionsApi';
import { toast } from 'sonner';
import InputWithLabel from './UI/InputWithLabel';

type TTransaction = z.infer<typeof CashOutSchema>;

const CashOut = () => {
  const methods = useForm<TTransaction>({
    resolver: zodResolver(CashOutSchema),
  });

  const [cashOuts] = useCashOutMutation();

  // Handle form submission
  const onSubmit: SubmitHandler<TTransaction> = async (data) => {
    try {
      const payload = { ...data, transactionType: 'Cash Out' };
      const result = await cashOuts(payload).unwrap();
      toast.success(result.message);
      console.log(payload);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Cash Out</h2>
          <p className="text-gray-600">Please fill in the details below to send money.</p>
        </div>
        {/* Form */}
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <InputWithLabel
            label="Mobile Number"
            name="accountNumber"
            type="text"
            placeholder="Enter Agent mobile number"
            required
          />
          <InputWithLabel
            label="Amount"
            name="amount"
            type="number"
            required
            placeholder="Amount to send"
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
            value="Cash Out"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Cash Out
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CashOut;