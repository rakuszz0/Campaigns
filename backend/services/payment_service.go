package services

import (
	"Zakat/models"
	"Zakat/pkg/midtrans"
	"fmt"

	"github.com/midtrans/midtrans-go/coreapi"
)

type PaymentService interface {
	CreateTransaction(donation models.Donation) (*coreapi.ChargeResponse, error)
	VerifyPayment(orderID string) (bool, error)
}

type paymentService struct{}

func NewPaymentService() PaymentService {
	return &paymentService{}
}

func (s *paymentService) CreateTransaction(donation models.Donation) (*coreapi.ChargeResponse, error) {
	req := &coreapi.ChargeReq{
		PaymentType: coreapi.PaymentTypeBankTransfer,
		TransactionDetails: coreapi.TransactionDetails{
			OrderID:  fmt.Sprintf("%d", donation.ID),
			GrossAmt: int64(donation.Amount),
		},
		BankTransfer: &coreapi.BankTransferDetails{
			Bank: coreapi.BankBCA,
		},
	}

	return midtrans.CoreClient.ChargeTransaction(req)
}

func (s *paymentService) VerifyPayment(orderID string) (bool, error) {
	status, err := midtrans.CoreClient.CheckTransaction(orderID)
	if err != nil {
		return false, err
	}

	return status.TransactionStatus == "settlement" || status.TransactionStatus == "capture", nil
}
