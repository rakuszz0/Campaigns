package handlers

import (
	"log"
	"net/http"
	"strconv"
	"time"
	dto "zakat/dto/result"
	"zakat/models"
	"zakat/repositories"
	"zakat/services"

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
		log.Println("CreateUser Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	if err := h.userRepository.Create(&req); err != nil {
		log.Println("CreateUser Create error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create user",
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
		log.Println("GetUser GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get user",
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
		log.Println("GetAllUsers GetAll error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get users",
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
		log.Println("UpdateUser GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get user",
		})
	}

	if user == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "User not found",
		})
	}

	if err := c.Bind(user); err != nil {
		log.Println("UpdateUser Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	user.UpdatedAt = time.Now()

	if err := h.userRepository.Update(user); err != nil {
		log.Println("UpdateUser Update error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update user",
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
		log.Println("DeleteUser Delete error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete user",
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
		log.Println("CreateCampaign Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	req.CreatedAt = time.Now()
	req.UpdatedAt = time.Now()

	if err := h.campaignRepository.Create(&req); err != nil {
		log.Println("CreateCampaign Create error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create campaign",
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
		log.Println("GetCampaignByID GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaign",
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
		log.Println("GetAllCampaigns GetAll error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaigns",
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
		log.Println("UpdateCampaign GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get campaign",
		})
	}

	if campaign == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Campaign not found",
		})
	}

	if err := c.Bind(campaign); err != nil {
		log.Println("UpdateCampaign Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	campaign.UpdatedAt = time.Now()

	if err := h.campaignRepository.Update(campaign); err != nil {
		log.Println("UpdateCampaign Update error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update campaign",
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
		log.Println("DeleteCampaign Delete error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete campaign",
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "Campaign deleted successfully",
	})
}

func (h *Handler) GetDonationsByCampaign(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid campaign ID format",
		})
	}

	donations, err := h.campaignRepository.GetDonations(uint(id))
	if err != nil {
		log.Println("GetDonationsByCampaign GetDonations error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations for campaign",
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

	if err := c.Bind(&req); err != nil {
		log.Println("CreateDonation Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	if req.Amount <= 0 {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Donation amount must be greater than zero",
		})
	}

	now := time.Now()
	req.Date = now
	req.CreatedAt = now
	req.UpdatedAt = now
	req.Status = "pending"

	if err := h.donationRepository.Create(&req); err != nil {
		log.Println("CreateDonation Create error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create donation",
		})
	}

	paymentResp, err := h.paymentService.CreateTransaction(req)
	if err != nil {
		log.Println("CreateDonation PaymentService error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to create payment",
		})
	}

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
		log.Println("GetDonationByID GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donation",
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
		log.Println("GetAllDonations GetAll error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations",
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
		log.Println("UpdateDonation GetByID error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donation",
		})
	}

	if donation == nil {
		return c.JSON(http.StatusNotFound, dto.ErrorResult{
			Code:    http.StatusNotFound,
			Message: "Donation not found",
		})
	}

	if err := c.Bind(donation); err != nil {
		log.Println("UpdateDonation Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid request body",
		})
	}

	donation.UpdatedAt = time.Now()

	if err := h.donationRepository.Update(donation); err != nil {
		log.Println("UpdateDonation Update error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to update donation",
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
		log.Println("DeleteDonation Delete error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to delete donation",
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
		log.Println("GetByCampaign GetByCampaign error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to get donations by campaign",
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: donations,
	})
}

// ==================== Payment Notification ====================

func (h *Handler) HandlePaymentNotification(c echo.Context) error {
	var notification map[string]interface{}
	if err := c.Bind(&notification); err != nil {
		log.Println("HandlePaymentNotification Bind error:", err)
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Invalid notification payload",
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
		log.Println("HandlePaymentNotification VerifyPayment error:", err)
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: "Failed to verify payment",
		})
	}

	if success {
		donationID, _ := strconv.Atoi(orderID)
		donation, err := h.donationRepository.GetByID(uint(donationID))
		if err != nil {
			log.Println("HandlePaymentNotification GetByID error:", err)
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: "Failed to get donation",
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
			log.Println("HandlePaymentNotification Update error:", err)
			return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
				Code:    http.StatusInternalServerError,
				Message: "Failed to update donation status",
			})
		}
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: "Notification processed successfully",
	})
}
