import { Request, Response } from 'express';
import { payments } from '../data/payments';
import { enrollments } from '../data/enrollments';
import {
  Payment,
  CreatePayment,
} from '../types/payment';

interface PaymentController {
  getAllPayments: (req: Request, res: Response) => Response;
  getPaymentById: (req: Request, res: Response) => Response;
  createPayment: (
    req: Request,
    res: Response,
  ) => Response;
  updatePayment: (req: Request, res: Response) => Response;
  deletePayment: (req: Request, res: Response) => Response;
}

const paymentController: PaymentController = {
  getAllPayments: function (req: Request, res: Response) {
    return res.status(200).json(payments);
  },

  getPaymentById: function (req: Request, res: Response) {
    const id = req.params.id;

    const payment = payments.find(
      (payment) => payment.id === id,
    );

    if (!payment) {
      return res.status(404).json({
        error: 'Payment not found',
      });
    }

    return res.status(200).json(payment);
  },

  createPayment: function (
    req: Request<{}, {}, CreatePayment>,
    res: Response,
  ) {
    const {
      enrollmentId,
      amount,
      paymentMethod,
      transactionReference,
    } = req.body;

    if (
      !enrollmentId ||
      !amount ||
      !paymentMethod ||
      !transactionReference
    ) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    const enrollment = enrollments.find(
      (enrollment) => enrollment.id === enrollmentId,
    );

    if (!enrollment) {
      return res.status(404).json({
        error: 'Enrollment not found',
      });
    }

    const existingPayment = payments.find(
      (payment) =>
        payment.enrollmentId === enrollmentId &&
        payment.status !== 'failed',
    );

    if (existingPayment) {
      return res.status(409).json({
        error: 'A payment already exists for this enrollment',
      });
    }

    const id = `payment-00${payments.length + 1}`;

    const payment: Payment = {
      id,
      enrollmentId,
      amount,
      paymentMethod,
      transactionReference,
      status: 'pending',
      paidAt: null,
    };

    payments.push(payment);

    return res.status(201).json({
      message: 'Payment created successfully',
      payment,
    });
  },

  updatePayment: function (
    req: Request,
    res: Response,
  ) {
    const id = req.params.id;

    const payment = payments.find(
      (payment) => payment.id === id,
    );

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

    if (
      req.body.status &&
      !allowedStatuses.includes(req.body.status)
    ) {
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

  deletePayment: function (
    req: Request,
    res: Response,
  ) {
    const id = req.params.id;

    const index = payments.findIndex(
      (payment) => payment.id === id,
    );

    if (index === -1) {
      return res.status(404).json({
        error: 'Payment not found',
      });
    }

    payments.splice(index, 1);

    return res.status(200).json({
      message: 'Payment deleted successfully',
    });
  },
};

export default paymentController;