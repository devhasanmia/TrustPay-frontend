import { useGetTransactionsQuery } from "../redux/api/features/transactions/transactionsApi";

const Transactions = () => {
  const { data: transactionData, isLoading, isError } = useGetTransactionsQuery("");
  if (isLoading) {
    return <div className="p-6">Loading transactions...</div>;
  }
  if (isError || !transactionData?.success) {
    return <div className="p-6 text-red-600">Failed to load transactions.</div>;
  }
  const transactions = transactionData?.data || [];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Transactions</h1>
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((transaction: any) => (
            <div
              key={transaction._id}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <p className="text-gray-700">
                <strong>Account Number:</strong> {transaction.accountNumber}
              </p>
              <p className="text-gray-700">
                <strong>Amount:</strong> ${transaction.amount}
              </p>
              <p className="text-gray-700">
                <strong>Charge:</strong> ${transaction.charge}
              </p>
              <p className="text-gray-700">
                <strong>Type:</strong> {transaction.transactionType}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded ${
                    transaction.status === "Success"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong>{" "}
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions
