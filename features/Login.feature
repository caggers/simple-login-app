Feature: User Login
	I want to log in with my credentials

Scenario: See the login Page
	Given I am a User
	When the login page loads 
	Then I should see username and password inputs

Scenario: Enter User credentials
	Given I am any User
	When I fill in my username and password credentials
	When my credentials are submitted
	Then I see an error message

Scenario: Check User credentials for a registered User
	Given I am a registered User logging in
	When my credentials are sent for authentication
	When I click the submit button
	Then I can see the App




