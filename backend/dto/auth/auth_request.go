package authdto

type SignUpRequest struct {
	FirstName string `json:"first_name" validate:"required"`
	LastName  string `json:"last_name" validate:"required"`
	Username  string `json:"username" validate:"required"`
	Phone     string `json:"phone" validate:"required"`
	Address   string `json:"address" `
	IsAdmin   bool   `json:"is_admin"`
	Email     string `json:"email" validate:"required"`
	Password  string `json:"password" validate:"required"`
}

type SignInRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" gorm:"type: varchar(255)" validate:"required"`
	NewPassword string `json:"new_password" gorm:"type: varchar(255)" validate:"required"`
}
