# surplus-food-resQ

FoodResQ is a full-stack platform that helps restaurants, caterers, and event organizers donate surplus food to NGOs, reducing food waste and improving access to food.
## Features

### 🏪 Restaurant
* Register and login
* Create food donations
* View own donations
* Edit and delete donations
* Track donation status

### NGO
* Register and login
* View available donations
* Claim donations
* Mark donations as picked up
* Complete donations

### Authentication & Authorization
* JWT-based authentication
* Password hashing with bcrypt
* Role-based access control
* Restaurants can manage only their own donations
* Only the NGO that claimed a donation can pick it up or complete it

## 🔄 Donation Lifecycle

```text
AVAILABLE → CLAIMED → PICKED_UP → COMPLETED

