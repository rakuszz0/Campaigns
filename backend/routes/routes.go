package routes

import (
	"zakat/handlers"
	"zakat/pkg/midtrans"
	"zakat/repositories"
	"zakat/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func InitRouter(db *gorm.DB) *echo.Echo {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	// Initialize Midtrans
	midtrans.Init()

	// Initialize Repositories
	userRepo := repositories.NewUserRepository(db)
	campaignRepo := repositories.NewCampaignRepository(db)
	donationRepo := repositories.NewDonationRepository(db)

	// Initialize Services
	paymentService := services.NewPaymentService()

	// Initialize Handler
	handler := handlers.NewHandler(userRepo, campaignRepo, donationRepo, paymentService)

	// API Routes
	api := e.Group("/api/v1")

	// User Routes
	userRoutes := api.Group("/users")
	{
		userRoutes.POST("", handler.CreateUser)
		userRoutes.GET("", handler.GetAllUsers)
		userRoutes.GET("/:id", handler.GetUser)
		userRoutes.PUT("/:id", handler.UpdateUser)
		userRoutes.DELETE("/:id", handler.DeleteUser)
	}

	// Campaign Routes
	campaignRoutes := api.Group("/campaigns")
	{
		campaignRoutes.POST("", handler.CreateCampaign)
		campaignRoutes.GET("", handler.GetAllCampaigns)
		campaignRoutes.GET("/:id", handler.GetCampaignByID)
		campaignRoutes.PUT("/:id", handler.UpdateCampaign)
		campaignRoutes.DELETE("/:id", handler.DeleteCampaign)
		campaignRoutes.GET("/:id/donations", handler.GetDonationsByCampaign)
	}

	// Donation Routes
	donationRoutes := api.Group("/donations")
	{
		donationRoutes.POST("", handler.CreateDonation)
		donationRoutes.GET("", handler.GetAllDonations)
		donationRoutes.GET("/:id", handler.GetDonationByID)
		donationRoutes.PUT("/:id", handler.UpdateDonation)
		donationRoutes.DELETE("/:id", handler.DeleteDonation)
		donationRoutes.GET("/by-campaign/:id", handler.GetByCampaign)
		donationRoutes.POST("/notifications", handler.HandlePaymentNotification)
	}

	return e
}
