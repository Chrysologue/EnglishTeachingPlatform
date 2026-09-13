import { Payment } from '../types/payment';

const payments: Payment[] = [
  {
    id: 'payment-001',
    enrollmentId: 'enroll-001',
    amount: 10000,
    paymentMethod: 'mobile-money',
    transactionReference: 'MM-20260910-001',
    status: 'completed',
    paidAt: '2026-09-10T09:30:00',
  },
  {
    id: 'payment-002',
    enrollmentId: 'enroll-002',
    amount: 10000,
    paymentMethod: 'mobile-money',
    transactionReference: 'MM-20260910-002',
    status: 'completed',
    paidAt: '2026-09-10T10:30:00',
  },
  {
    id: 'payment-003',
    enrollmentId: 'enroll-003',
    amount: 10000,
    paymentMethod: 'bank-transfer',
    transactionReference: 'BANK-20260911-001',
    status: 'completed',
    paidAt: '2026-09-11T14:30:00',
  },
  {
    id: 'payment-004',
    enrollmentId: 'enroll-004',
    amount: 10000,
    paymentMethod: 'mobile-money',
    transactionReference: 'MM-20260912-001',
    status: 'pending',
    paidAt: null,
  },
  {
    id: 'payment-005',
    enrollmentId: 'enroll-005',
    amount: 20000,
    paymentMethod: 'mobile-money',
    transactionReference: 'MM-20260912-002',
    status: 'completed',
    paidAt: '2026-09-12T18:30:00',
  },
];

export { payments };