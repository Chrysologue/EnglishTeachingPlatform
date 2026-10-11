type PaymentMethod = 'mobile-money' | 'bank-transfer';

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

interface Payment {
  payment_id: string;
  enrollment_id: string;
  amount: number;
  payment_method: PaymentMethod;
  transaction_reference: string;
  status: PaymentStatus;
  paid_at: string | null;
}

interface CreatePayment {
  enrollment_id: string;
  amount: number;
  payment_method: PaymentMethod;
  transaction_reference: string;
}

export { Payment, CreatePayment, PaymentMethod, PaymentStatus };
