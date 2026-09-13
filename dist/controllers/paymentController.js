"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payments_1 = require("../data/payments");
const enrollments_1 = require("../data/enrollments");
const paymentController = {
    getAllPayments: function (req, res) {
        return res.status(200).json(payments_1.payments);
    },
    getPaymentById: function (req, res) {
        const id = req.params.id;
        const payment = payments_1.payments.find((payment) => payment.id === id);
        if (!payment) {
            return res.status(404).json({
                error: 'Payment not found',
            });
        }
        return res.status(200).json(payment);
    },
    createPayment: function (req, res) {
        const { enrollmentId, amount, paymentMethod, transactionReference, } = req.body;
        if (!enrollmentId ||
            !amount ||
            !paymentMethod ||
            !transactionReference) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }
        const enrollment = enrollments_1.enrollments.find((enrollment) => enrollment.id === enrollmentId);
        if (!enrollment) {
            return res.status(404).json({
                error: 'Enrollment not found',
            });
        }
        const existingPayment = payments_1.payments.find((payment) => payment.enrollmentId === enrollmentId &&
            payment.status !== 'failed');
        if (existingPayment) {
            return res.status(409).json({
                error: 'A payment already exists for this enrollment',
            });
        }
        const id = `payment-00${payments_1.payments.length + 1}`;
        const payment = {
            id,
            enrollmentId,
            amount,
            paymentMethod,
            transactionReference,
            status: 'pending',
            paidAt: null,
        };
        payments_1.payments.push(payment);
        return res.status(201).json({
            message: 'Payment created successfully',
            payment,
        });
    },
    updatePayment: function (req, res) {
        const id = req.params.id;
        const payment = payments_1.payments.find((payment) => payment.id === id);
        if (!payment) {
            return res.status(404).json({
                error: 'Payment not found',
            });
        }
        const allowedStatuses = [
            'pending',
            'completed',
            'failed',
            'refunded',
        ];
        if (req.body.status &&
            !allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({
                error: 'Invalid payment status',
            });
        }
        if (!req.body.status) {
            return res.status(400).json({
                error: 'Status is required for update',
            });
        }
        payment.status = req.body.status;
        if (req.body.status === 'completed') {
            payment.paidAt = new Date().toISOString();
        }
        if (req.body.status !== 'completed') {
            payment.paidAt = null;
        }
        return res.status(200).json({
            message: 'Payment updated successfully',
            payment,
        });
    },
    deletePayment: function (req, res) {
        const id = req.params.id;
        const index = payments_1.payments.findIndex((payment) => payment.id === id);
        if (index === -1) {
            return res.status(404).json({
                error: 'Payment not found',
            });
        }
        payments_1.payments.splice(index, 1);
        return res.status(200).json({
            message: 'Payment deleted successfully',
        });
    },
};
exports.default = paymentController;
