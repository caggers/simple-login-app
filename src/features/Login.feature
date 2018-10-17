Feature: User Login Page
	In order to access my homepage
	As a User
	I want to log in with my credentials
	And access the App

Scenario: See the Login Page
	Given I am a User
	When the login page loads 
	Then I should see username and password inputs

Scenario: Enter User credentials
	Given I am a registered User
	When I fill in my username and password credentials
	And I click submit
	Then my credentials should be checked

Examples: Valid
| username 	| password 	|
| admin 	| admin		|
| user		| user 		|
Examples: Invalid
| username 	| password 	|
| 1234		| 5678		|
| betty		| spagetti	|


Scenario: Check User credentials for a registered User
	Given I am a registered User logging in
	When my credentials are sent for authentication
	And they pass
	Then I should log into the system
	And I can see the App

Scenario: Check User credentials for an unregistered User
	Given I am not registered user logging in
	When my invalid credentials are sent for authentication
	And they do not pass
	Then I should see an error message


