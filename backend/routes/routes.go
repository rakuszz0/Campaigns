package routes

import (
	"net/http"

	"zakat/handlers"
	"zakat/pkg/bcrypt"
	"zakat/pkg/middleware"
	"zakat/pkg/midtrans"
	"zakat/repositories"
	"zakat/services"

	"github.com/labstack/echo/v4"
	echoMiddleware "github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func InitRouter(db *gorm.DB) *echo.Echo {
	e := echo.New()

	// Middleware
	e.Use(echoMiddleware.Logger())
	e.Use(echoMiddleware.Recover())
	e.Use(echoMiddleware.CORS())

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
	// check authentication
	api.GET("/check-auth", middleware.Auth(handler.CheckAuth))

	api.POST("/verify-password", func(c echo.Context) error {
		var req struct {
			Password string `json:"password"`
			Hash     string `json:"hash"`
		}
		if err := c.Bind(&req); err != nil {
			return err
		}

		match := bcrypt.CheckPasswordHash(req.Password, req.Hash)
		return c.JSON(http.StatusOK, map[string]interface{}{
			"match":    match,
			"password": req.Password,
			"hash":     req.Hash,
		})
	})
	// Auth Routes (clear separation)
	api.POST("/signup", handler.CreateUser) // Register
	api.POST("/signin", handler.SignIn)     // Login

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
