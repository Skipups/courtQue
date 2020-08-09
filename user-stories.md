# User stories

## Feature: reserve a tennis court

#### _A user would like to reserve a court or see current reservations._

### Scenario: User wants to use the reservation screen but is not present.

- **Given** The user is not present
- **When** The user navigates to the reservation screen
- **Then** There will be no option to make a reservation. The user can only see current reservations for that court.


### Scenario: User is present and wants to reserve the next available court for their tennis game (singles or doubles). There is a court for their desired game available right now.

- **Given** desired courts are available and user is present
- **When** user clicks reserve
- **Then** a one-hour reservation will start right now at an available court.

### Scenario: User is present and wants to reserve the next available court for their tennis game (singles or doubles). There is not a court available for their desired game.

- **Given** desired courts are unavailable and user is present
- **When** user clicks reserve
- **Then** a one-hour reservation will be made. This reservation will start at the end of the soonest available unfinished reservation on a court that supports singles/doubles.

## Feature: login

#### _A user needs to provide certain information in order to proceed to the reservation screen._

### Scenario: A user requires a doubles court to play tennis.

- **Given** The user has a working phone number and requires a doubles court.
- **When** the user inputs their phone number and indicates that they require doubles.
- **Then** a text will be sent to the number seeking confirmation of this reservation.

### Scenario: A user can play on any tennis court.

- **Given** The user has a working phone number.
- **When** the user inputs their phone number.
- **Then** a text will be sent to the number seeking confirmation of this reservation.

## Feature: reservation confirmation

#### _The app needs to confrim the reservation and contact info_

### Scenario: The user has provided a correct phone number and can successfully reserve.

- **Given** The phone number is correct.
- **When** The app sends a text to the user and the user confirms.
- **Then** The reservation is confirmed.

### Scenario: The user has provided a correct phone number but wants to undo.

- **Given** The phone number is correct.
- **When** The app sends a text to the user and the user cancels the reservation.
- **Then** The reservation is canceled.

### Scenario: The user has provided an incorrect phone number.

- **Given** The phone number is incorrect.
- **When** The app sends a text to the incorrect number and does not receive a response within five(?) minutes.
- **Then** The reservation is canceled.

## Feature: claiming a reservation

#### _Provides a mechanism for the user to indicate that they have started their reservation_

### Scenario: The user is present at the tennis court.

- **Given** The user is present and has made a reservation.
- **When** Within 5(?) minutes the user confirms.
- **Then** The user is checked int.

### Scenario: The user is not present/ late to checkin.

- **Given** The user is not present within 5(?) minutes.
- **When** 5(?) minutes have elapsed
- **Then** *The reservation is canceled? The user is officially late?.* Unsure

