package authentication

import (
	"github.com/authelia/authelia/v4/internal/model"
)

// UserProvider is the interface for interacting with authentication backends.
// All methods expect properly formatted and validated inputs - no validation is performed
// by the interface implementations themselves.
type UserProvider interface {
	model.StartupCheck

	// AddUser creates a new user in the file database. Takes additional, optional values via opts.
	AddUser(username, displayName, password string, opts ...func(options *NewUserOptionalDetailsOpts)) (err error)

	// UpdateUser modifies an existing user in the file database. Takes new values via opts.
	UpdateUser(username string, opts ...func(options *ModifyUserDetailsOpts)) (err error)

	// DeleteUser deletes user given the username.
	DeleteUser(username string) (err error)

	// CheckUserPassword checks if provided password matches for the given user.
	CheckUserPassword(username, password string) (valid bool, err error)

	// GetDetails retrieves a user's information, returns UserNotFound when a user is disabled.
	GetDetails(username string) (details *UserDetails, err error)

	// UpdatePassword updates the password of the given user.
	UpdatePassword(username, newPassword string) (err error)

	// ChangePassword validates the old password then changes the password of the given user.
	ChangePassword(username, oldPassword, newPassword string) (err error)

	// ChangeDisplayName changes the display name for a specific user.
	ChangeDisplayName(username, newDisplayName string) (err error)

	// ChangeEmail changes the email for a specific user.
	ChangeEmail(username, newEmail string) (err error)

	// ChangeGroups changes the groups for a specific user.
	ChangeGroups(username string, newGroups []string) (err error)

	// ListUsers returns a list of all users and their attributes.
	ListUsers() (userList []UserDetails, err error)
}
