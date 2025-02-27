import { z } from "zod";

export const cashInSchema = z.object({
  accountNumber: z
    .string({
      required_error: "Mobile Number is required",
      invalid_type_error: "Mobile Number must be a String",
    })
    .regex(/^\d{11}$/, "Mobile Number must be exactly 11 digits"),
  amount: z
    .string({
      required_error: "Amount is required",
    })
    .refine((value) => !isNaN(Number(value)), "Amount must be a valid number") 
    .refine((value) => Number(value) > 0, "Amount must be greater than 0") 
    .refine((value) => Number(value) <= 100000, "Amount must not exceed 100,000") 
    .transform((value) => Number(value)),
  pin: z
    .string()
    .regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
  transactionType: z.literal("CashIn"),
});

export const SendMoneySchema = z.object({
    accountNumber: z
      .string({
        required_error: "Mobile Number is required",
        invalid_type_error: "Mobile Number must be a String",
      })
      .regex(/^\d{11}$/, "Mobile Number must be exactly 11 digits"),
    amount: z
      .string({
        required_error: "Amount is required",
      })
      .refine((value) => !isNaN(Number(value)), "Amount must be a valid number") 
      .refine((value) => Number(value) >= 50, "Amount must be greater than 50") 
      .refine((value) => Number(value) <= 100000, "Amount must not exceed 100,000") 
      .transform((value) => Number(value)),
    pin: z
      .string()
      .regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
    transactionType: z.literal("Send Money"),
  });

export const CashOutSchema = z.object({
    accountNumber: z
      .string({
        required_error: "Mobile Number is required",
        invalid_type_error: "Mobile Number must be a String",
      })
      .regex(/^\d{11}$/, "Mobile Number must be exactly 11 digits"),
    amount: z
      .string({
        required_error: "Amount is required",
      })
      .refine((value) => !isNaN(Number(value)), "Amount must be a valid number") 
      .refine((value) => Number(value) > 0, "Amount must be greater than 0") 
      .refine((value) => Number(value) <= 100000, "Amount must not exceed 100,000") 
      .transform((value) => Number(value)),
    pin: z
      .string()
      .regex(/^\d{5}$/, "PIN must be exactly 5 digits"),
    transactionType: z.literal("Cash Out"),
  });
  