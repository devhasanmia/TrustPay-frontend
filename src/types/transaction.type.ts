export enum TransactionType {
    SendMoney = "Send Money",
    CashIn = "CashIn",
    CashOut = "Cash Out",
}

export enum TransactionStatus {
    Pending = "Pending",
    Success = "Success",
    Failed = "Failed",
}

export type TTransaction = {
    accountNumber: string;
    amount: string;
    transactionType: "Send Money" | "CashIn" | "Cash Out"; 
    pin: string;
};
