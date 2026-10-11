"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
const payments = [
    {
        payment_id: 'payment-001',
        enrollment_id: 'enroll-001',
        amount: 10000,
        payment_method: 'mobile-money',
        transaction_reference: 'MM-20260910-001',
        status: 'completed',
        paid_at: '2026-09-10T09:30:00',
    },
    {
        payment_id: 'payment-002',
        enrollment_id: 'enroll-002',
        amount: 10000,
        payment_method: 'mobile-money',
        transaction_reference: 'MM-20260910-002',
        status: 'completed',
        paid_at: '2026-09-10T10:30:00',
    },
    {
        payment_id: 'payment-003',
        enrollment_id: 'enroll-003',
        amount: 10000,
        payment_method: 'bank-transfer',
        transaction_reference: 'BANK-20260911-001',
        status: 'completed',
        paid_at: '2026-09-11T14:30:00',
    },
    {
        payment_id: 'payment-004',
        enrollment_id: 'enroll-004',
        amount: 10000,
        payment_method: 'mobile-money',
        transaction_reference: 'MM-20260912-001',
        status: 'pending',
        paid_at: null,
    },
    {
        payment_id: 'payment-005',
        enrollment_id: 'enroll-005',
        amount: 20000,
        payment_method: 'mobile-money',
        transaction_reference: 'MM-20260912-002',
        status: 'completed',
        paid_at: '2026-09-12T18:30:00',
    },
];
exports.payments = payments;
