package models

type zakatTransaction struct {
	ID          int    `json:"id" gorm:"primary_key:auto_increment"`
	UserID      int    `json:"user_id" gorm:"type: int"`
	TransactionID int    `json:"-"`
	Amount      int    `json:"amount" gorm:"type: int"`
	Status      string `json:"status" gorm:"type: varchar(255)"`
	CreatedAt   string `json:"created_at" gorm:"type: timestamp"`
	UpdatedAt   string `json:"updated_at" gorm:"type: timestamp"`
	DeletedAt   string `json:"deleted_at" gorm:"type: timestamp"`
}