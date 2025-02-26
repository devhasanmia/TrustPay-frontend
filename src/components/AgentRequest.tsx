import { Table, Tag, Button, Dropdown, Menu, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAgentsApprovalMutation, useAgentsApprovalRequestQuery } from "../redux/api/features/user/userApi";

const AgentRequest = () => {
  const { data: agentRequests, isLoading,  } = useAgentsApprovalRequestQuery("");
  const [agentApproval] = useAgentsApprovalMutation();

 const handleStatusChange = async (key: any, newStatus: string) => {
  await agentApproval({ id: key, status: { status: newStatus } });
};


  // Dropdown menu for status options
  const statusMenu = (key: any) => (
    <Menu>
      <Menu.Item onClick={() => handleStatusChange(key, "Pending")}>
        Pending
      </Menu.Item>
      <Menu.Item onClick={() => handleStatusChange(key, "Approve")}>
        Approve
      </Menu.Item>
      <Menu.Item onClick={() => handleStatusChange(key, "Rejected")}>
        Reject
      </Menu.Item>
      <Menu.Item onClick={() => handleStatusChange(key, "Blocked")}>
        Block
      </Menu.Item>
    </Menu>
  );

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Approve"
              ? "green"
              : status === "Rejected"
              ? "red"
              : status === "Blocked"
              ? "orange"
              : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_:any, record: any) => (
        <Dropdown overlay={statusMenu(record.key)} trigger={["click"]}>
          <Button>
            Change Status <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }



  const tableData = agentRequests?.data?.map((item:any) => ({
    key: item._id,
    name: item.name,
    email: item.email,
    mobileNumber: item.mobileNumber,
    status: item.status || "Pending",
  }));

  return (
    <section className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Agent Approval Requests
      </h2>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </section>
  );
};

export default AgentRequest;