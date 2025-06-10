package database

import (
	"Zakat/models"
	"fmt"

	"gorm.io/gorm"
)

var DB *gorm.DB // Make sure this is initialized elsewhere in your project

func RunMigration() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.Campaign{},
		&models.Donation{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
