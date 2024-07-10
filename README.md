# FBI Wanted List Application

Welcome to the FBI Wanted List Application! This project allows users to browse, filter, and manage a list of individuals wanted by the FBI. The application features a login portal, a home page showcasing all wanted individuals, and functionality to filter, view, edit, and remove wanted persons.

## Features

- **Login Portal**: Secure access to the application.
- **Home Page**: Displays a comprehensive list of the FBI's wanted individuals.
- **NavBar Filters**: Filter the wanted persons by categories such as Cyber Crimes, Violent Crimes, and Missing Persons.
- **Pagination**: Navigate through the vast list of wanted individuals.
- **Detailed View**: Select any image to view detailed information about the individual.
- **Edit Information**: Edit the details and picture of any wanted person.
- **Remove Person**: Remove a wanted person from the list.

The FBI information is fetched from an Express.js backend, which uses a mock database (`db.json`) to store data. All CRUD capabilities are available through the endpoint: [FBI Most Wanted Backend](https://fbi-most-wanted-backend.onrender.com/api/v1/default_all_pages).

## How to Run the Project

1. **Clone the Project**
   ```bash
   git clone https://github.com/t0nylombardi/fbi_most_wanted_frontend.git
   cd fbi_most_wanted_frontend
   ```
2. Install Dependencies:

```bash
npm install
```

3. Run the Development Server

```bash
npm run dev
```

4. Login(the demo login username and password is listed on the login page)

- Open your browser and navigate to the development server URL.
- Enter your login credentials to access the application.

5. View FBI Most Wanted List

- Explore the home page to see all FBI wanted individuals.
- Use the NavBar to filter by different categories.
- Click on any image to view detailed information.
- Edit or remove a wanted person as needed.

## Additional Information

- The backend is an Express.js server that provides the data for the application.
- Ensure the backend server is running and accessible for the application to function correctly.
- The backend URL is configured in the application to fetch data from the endpoint mentioned above.

## Technologies Used

- Frontend: Vite, React, Typescript
- Backend: Express.js
- Database: Mock database using db.json
- Styling: Tailwind CSS (or any other CSS framework you used)
- Authentication: JWT (or any other authentication method you used)

License
This project is licensed under the MIT License. See the LICENSE file for details.
