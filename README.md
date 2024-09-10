
# README

## Project: "Your Imagination - Your Garden"

The purpose of this web system is to serve as a platform for decorating private and restaurant gardens. The system has three types of users: the owner, the decorator, and the administrator.

### Public Access (Non-Registered Users)

1. **General Information**:
   - Display overall statistics such as the number of decorated gardens, registered owners, decorators, and scheduled tasks in the last 24 hours, 7 days, and 30 days.
   - Display a list of companies with the current engaged decorators (only names).

2. **Search and Sort**:
   - Allow users to search for companies by name and address.
   - Enable sorting of companies based on different columns (e.g., name, address).

### User Access

#### Common Functionalities

1. **Registration**:
   - Owners can register by providing a username, password, name, surname, gender, address, contact phone, email address, profile picture, and credit card number.
   - The system performs basic data validation and requires administrator approval for registration to become active.

2. **Login**:
   - All users can log in using their credentials (username and password).

3. **Password Change**:
   - Users can change their password by providing the old password, new password, and confirmation of the new password.

#### Owner Functionalities

1. **Profile Management**:
   - Owners can view and update their profile information including profile picture.

2. **Company Search and Details**:
   - Owners can search for companies and view detailed information about each company, including the services offered and the price list.

3. **Scheduling**:
   - Owners can schedule garden decoration through a multi-step form specifying details such as date, time, garden area, and additional requirements.
   - Upload a JSON file for garden layout.

4. **Current Schedules**:
   - View a list of current appointments.

5. **Maintenance**:
   - Schedule maintenance for water surfaces in the garden.

#### Decorator Functionalities

1. **Profile Management**:
   - Decorators can view and update their profile information including profile picture.

2. **View Schedules**:
   - View all assigned schedules and confirm or reject appointments with a mandatory comment in case of rejection.

3. **Maintenance**:
   - View and confirm maintenance requests with an estimated completion time.

4. **Statistics**:
   - View statistics through various charts such as the number of tasks per month, task distribution among decorators, and average number of tasks per day of the week in the last 24 months.

#### Administrator Functionalities

1. **User Management**:
   - Manage all users including viewing, updating, and deactivating user accounts.

2. **Registration Requests**:
   - Review and approve or reject registration requests from owners.

3. **Decorator and Company Management**:
   - Add new decorators and companies to the system.
   - Define company working hours and vacation periods during which no appointments can be scheduled.

### Other Features

- **Uniform Design**: The application features a consistent look and feel using CSS.
- **Responsive Design**: The application is designed to be responsive, adapting to various screen sizes.
- **Data Validation**: Efficient server-side validation is implemented to ensure data integrity.

### Technology Stack

- **Frontend**: Angular 16
- **Backend**: Express with NodeJS and MongoDB
- **Database**: MongoDB

### Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   ```
2. **Navigate to Project Directory**:
   ```
   cd <project-directory>
   ```
3. **Install Dependencies**:
   - For Angular:
     ```
     npm install
     ```
   - For NodeJS:
     ```
     npm install
     ```
4. **Run the Application**:
   - For Angular:
     ```
     ng serve
     ```
   - For NodeJS:
     ```
     node server.js
     ```
5. **Other packages**:
   -Multer (sending images to backend):
      ```
      npm install multer
   -Chart.js (for statistics):
      ```
      npm install chart.js
   -Js-SHA3 (for saving encrypted password):
      ```
      npm install js-sha3

***NOTE***

   -**src** - This project contains only src folders, for application to work, create empty frontend and backend and copy src folders.