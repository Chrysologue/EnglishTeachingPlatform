type PaymentMethod = 'mobile-money' | 'bank-transfer';

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionReference: string;
  status: PaymentStatus;
  paidAt: string | null;
}

interface CreatePayment {
  enrollmentId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionReference: string;
}

export {
  Payment,
  CreatePayment,
  PaymentMethod,
  PaymentStatus,
};