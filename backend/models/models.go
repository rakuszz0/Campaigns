package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID        int            `gorm:"primaryKey" json:"id"`
	FirstName string         `json:"first_name" form:"first_name"`
	LastName  string         `json:"last_name" form:"last_name"`
	Username  string         `json:"username" form:"username" gorm:"unique"`
	Telephone string         `json:"telephone" form:"telephone"`
	Address   string         `json:"address" form:"address"`
	Email     string         `json:"email" form:"email" gorm:"unique"`
	Password  string         `json:"-" form:"password"` // Disembunyikan di JSON
	IsAdmin   bool           `json:"is_admin" form:"is_admin"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Relasi
	Campaigns []Campaign `gorm:"foreignKey:UserID" json:"campaigns,omitempty"`
	Donations []Donation `gorm:"foreignKey:UserID" json:"donations,omitempty"`
}

type UserResponseJWT struct {
	ID    int    `json:"id"`
	Name  string `json:"name"` // Nama digabung dari FirstName + LastName saat di-generate
	Email string `json:"email"`
	Token string `json:"token"`
}

type Campaign struct {
	ID             int            `gorm:"primaryKey" json:"id"`
	Title          string         `json:"title" form:"title"`
	Description    string         `json:"description" form:"description"`
	Start          time.Time      `json:"start" form:"start"`
	End            time.Time      `json:"end" form:"end"`
	CPocket        string         `json:"cpocket" form:"cpocket"`
	Status         string         `json:"status" form:"status"`
	Photo          string         `json:"photo" form:"photo"`
	TotalCollected float64        `json:"total_collected" form:"total_collected"`
	UserID         int            `json:"user_id"`
	User           User           `gorm:"foreignKey:UserID" json:"user"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	DeletedAt      gorm.DeletedAt `gorm:"index" json:"-"`
	Donations      []Donation     `gorm:"foreignKey:CampaignID" json:"donations,omitempty"`
}

type Donation struct {
	ID         int            `gorm:"primaryKey" json:"id" form:"id"`
	Amount     float64        `json:"amount" form:"amount"`
	Date       time.Time      `json:"date" form:"date"`
	Status     string         `json:"status" form:"status"`
	UserID     int            `json:"user_id"`
	User       User           `gorm:"foreignKey:UserID" json:"user"`
	CampaignID int            `json:"campaign_id"`
	Campaign   Campaign       `gorm:"foreignKey:CampaignID" json:"campaign"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `gorm:"index" json:"-"`
}
