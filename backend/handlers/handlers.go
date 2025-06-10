package handlers

import (
	"Zakat/dto"
	"Zakat/models"
	"Zakat/repositories"
	"Zakat/services"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	userRepository     repositories.UserRepository
	campaignRepository repositories.CampaignRepository
	donationRepository repositories.DonationRepository
	paymentService     services.PaymentService
}

func NewHandler(
	userRepo repositories.UserRepository,
	campaignRepo repositories.CampaignRepository,
	donationRepo repositories.DonationRepository,
	paymentService services.PaymentService,
) *Handler {
	return &Handler{
		userRepository:     userRepo,
		campaignRepository: campaignRepo,
		donationRepository: donationRepo,
		paymentService:     paymentService,
	}
}

// ==================== User Handlers ====================

func (h *Handler) CreateUser(c echo.Context) error {
	var req models.User
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	if err := h.userRepository.Create(&req); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create user",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, dto.SuccessResult{
		Code: http.StatusCreated,
		Data: req,
	})
}

func (h *Handler) GetUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid user ID format",
		})
	}

	user, err := h.userRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get user",
			Error:   err.Error(),
		})
	}

	if user == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "User not found",
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: user,
	})
}

func (h *Handler) GetAllUsers(c echo.Context) error {
	users, err := h.userRepository.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get users",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: users,
	})
}

func (h *Handler) UpdateUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid user ID format",
		})
	}

	user, err := h.userRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get user",
			Error:   err.Error(),
		})
	}

	if user == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "User not found",
		})
	}

	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	user.UpdatedAt = time.Now()

	if err := h.userRepository.Update(user); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update user",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: user,
	})
}

func (h *Handler) DeleteUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid user ID format",
		})
	}

	if err := h.userRepository.Delete(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete user",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "User deleted successfully",
	})
}

// ==================== Campaign Handlers ====================

func (h *Handler) CreateCampaign(c echo.Context) error {
	var req models.Campaign
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	if err := h.campaignRepository.Create(&req); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create campaign",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, dto.SuccessResult{
		Code: http.StatusCreated,
		Data: req,
	})
}

func (h *Handler) GetCampaignByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	campaign, err := h.campaignRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaign",
			Error:   err.Error(),
		})
	}

	if campaign == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Campaign not found",
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: campaign,
	})
}

func (h *Handler) GetAllCampaigns(c echo.Context) error {
	campaigns, err := h.campaignRepository.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaigns",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: campaigns,
	})
}

func (h *Handler) UpdateCampaign(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	campaign, err := h.campaignRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaign",
			Error:   err.Error(),
		})
	}

	if campaign == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Campaign not found",
		})
	}

	if err := c.Bind(campaign); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	campaign.UpdatedAt = time.Now()

	if err := h.campaignRepository.Update(campaign); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update campaign",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: campaign,
	})
}

func (h *Handler) DeleteCampaign(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	if err := h.campaignRepository.Delete(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete campaign",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "Campaign deleted successfully",
	})
}

func (h *Handler) GetDonationsByCampaign(c echo.Context) error {
	campaignID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	donations, err := h.campaignRepository.GetDonations(uint(campaignID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donations,
	})
}

// ==================== Donation Handlers ====================

func (h *Handler) CreateDonation(c echo.Context) error {
	var req models.Donation

	// Bind incoming JSON to Donation struct
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	// Basic validation: amount should be > 0
	if req.Amount <= 0 {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Donation amount must be greater than zero",
		})
	}

	// Set timestamps and initial status
	now := time.Now()
	req.Date = now
	req.CreatedAt = now
	req.UpdatedAt = now
	req.Status = "pending"

	// Attempt to create the donation record in repository
	if err := h.donationRepository.Create(&req); err != nil {
		log.Printf("Error creating donation: %v", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create donation",
			Error:   err.Error(),
		})
	}

	// Initiate payment transaction through payment service
	paymentResp, err := h.paymentService.CreateTransaction(req)
	if err != nil {
		log.Printf("Error creating payment transaction: %v", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create payment",
			Error:   err.Error(),
		})
	}

	// Return created response with donation data and payment redirect URL
	return c.JSON(http.StatusCreated, dto.SuccessResult{
		Code: http.StatusCreated,
		Data: map[string]interface{}{
			"donation":    req,
			"payment_url": paymentResp.RedirectURL,
		},
	})
}

func (h *Handler) GetDonationByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid donation ID format",
		})
	}

	donation, err := h.donationRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donation",
			Error:   err.Error(),
		})
	}

	if donation == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Donation not found",
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donation,
	})
}

func (h *Handler) GetAllDonations(c echo.Context) error {
	donations, err := h.donationRepository.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donations,
	})
}

func (h *Handler) UpdateDonation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid donation ID format",
		})
	}

	donation, err := h.donationRepository.GetByID(uint(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donation",
			Error:   err.Error(),
		})
	}

	if donation == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Donation not found",
		})
	}

	if err := c.Bind(donation); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	donation.UpdatedAt = time.Now()

	if err := h.donationRepository.Update(donation); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update donation",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donation,
	})
}

func (h *Handler) DeleteDonation(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid donation ID format",
		})
	}

	if err := h.donationRepository.Delete(uint(id)); err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete donation",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "Donation deleted successfully",
	})
}

func (h *Handler) GetByCampaign(c echo.Context) error {
	campaignID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	donations, err := h.donationRepository.GetByCampaign(uint(campaignID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations by campaign",
			Error:   err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donations,
	})
}

func (h *Handler) HandlePaymentNotification(c echo.Context) error {
	var notification map[string]interface{}
	if err := c.Bind(&notification); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid notification payload",
			Error:   err.Error(),
		})
	}

	orderID, ok := notification["order_id"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Missing order ID in notification",
		})
	}

	success, err := h.paymentService.VerifyPayment(orderID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to verify payment",
			Error:   err.Error(),
		})
	}

	if success {
		donationID, _ := strconv.Atoi(orderID)
		donation, err := h.donationRepository.GetByID(uint(donationID))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: "Failed to get donation",
				Error:   err.Error(),
			})
		}

		if donation == nil {
			return c.JSON(http.StatusNotFound, dto.ErrorResult{
				Code:    http.StatusNotFound,
				Message: "Donation not found",
			})
		}

		donation.Status = "paid"
		if err := h.donationRepository.Update(donation); err != nil {
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: "Failed to update donation status",
				Error:   err.Error(),
			})
		}
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "Notification processed successfully",
	})
}
