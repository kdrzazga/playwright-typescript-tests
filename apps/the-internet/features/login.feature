@the-internet
Feature: Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I log in with username "tomsmith" and password "SuperSecretPassword!"
    Then I should see a message containing "You logged into a secure area"

  Scenario: Unsuccessful login with invalid credentials
    Given I am on the login page
    When I log in with username "invalid" and password "invalid"
    Then I should see a message containing "Your username is invalid!"
