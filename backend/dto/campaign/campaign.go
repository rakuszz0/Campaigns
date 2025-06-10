package dto

import "time"

type CampaignCreateRequest struct {
	Title       string    `json:"title" form:"title"`
	Description string    `json:"description" form:"description"`
	Start       time.Time `json:"start" form:"start"`
	End         time.Time `json:"end" form:"end"`
	CPocket     string    `json:"cpocket" form:"cpocket"`
	Status      string    `json:"status" form:"status"`
	Photo       string    `json:"photo" form:"photo"`
	UserID      int       `json:"user_id" form:"user_id"`
}

type CampaignResponse struct {
	ID             int       `json:"id"`
	Title          string    `json:"title"`
	Description    string    `json:"description"`
	Start          time.Time `json:"start"`
	End            time.Time `json:"end"`
	CPocket        string    `json:"cpocket"`
	Status         string    `json:"status"`
	Photo          string    `json:"photo"`
	TotalCollected float64   `json:"total_collected"`
	UserID         int       `json:"user_id"`
	UserName       string    `json:"user_name"`
	CreatedAt      time.Time `json:"created_at"`
}
