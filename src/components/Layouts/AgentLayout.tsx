import { useState } from "react";
import { MdNotifications, MdLogout } from "react-icons/md";
import { Outlet } from "react-router";
import { FaUsers } from "react-icons/fa";
import QuickActionBox from "../UI/QuickActionBox";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/api/features/auth/authSlice";
import { useGetAgentownQuery } from "../../redux/api/features/user/userApi";

const AgentLayout = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { data: getAgentown } = useGetAgentownQuery("");
  const agentData = getAgentown?.data?.[0]; 

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">TrustPay</h1>
          <nav className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-transform transform hover:scale-110">
              <MdNotifications className="text-2xl" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => dispatch(logout())}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-transform transform hover:scale-105"
            >
              <MdLogout className="text-lg" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome, {agentData?.name} ({agentData?.accountType})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Current Income</h3>
                <p className="text-4xl font-bold mt-4">
                  {balanceVisible ? `$${agentData?.income?.toLocaleString()}` : "****"}
                </p>
                <button
                  onClick={toggleBalanceVisibility}
                  className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {balanceVisible ? "Hide Balance" : "Show Balance"}
                </button>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold">Current Balance</h3>
                <p className="text-4xl font-bold mt-4">
                  {balanceVisible ? `$${agentData?.balance?.toLocaleString()}` : "****"}
                </p>
                <button
                  onClick={toggleBalanceVisibility}
                  className="mt-4 px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {balanceVisible ? "Hide Balance" : "Show Balance"}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickActionBox
                  icon={<FaUsers className="text-4xl text-blue-600" />}
                  text="Cash In"
                  to="/agent/CashIn"
                />
                <QuickActionBox
                  icon={<FaUsers className="text-4xl text-blue-600" />}
                  text="Transactions"
                  to="/agent/transactions"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Outlet for Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default AgentLayout;