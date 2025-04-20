1. Download the Project:
    - Clone the repository: 
	git clone https://github.com/ajsaisakovic/travel_guide.git
    - Once the project is downloaded, open it in Visual Studio Code
2. Split the Terminal:
    - Open terminal and split it (right-click and select "Split Terminal")
3. Navigate to the Backend Folder:
    - In the first terminal, navigate to the backend folder:
	cd backend
    - Install the required dependencies for the Backend:
	npm install
4. Navigate to the Frontend Folder:
    - In the second terminal, navigate to the frontend folder:
	cd frontend
    - Install the required dependencies for the Frontend:
	npm install
5. Set Up the Database:
    - Open backend/.env file and replace user, password and database with your actual data
6. Start the Backend Server:
    - In the terminal where you navigated to the backned folder, start the server:
	npm run dev
7. Start the Frontend:
    - In the terminal where you navigated to the frontend folder, start the application:
	npm run dev
8. Access the Application:
    - Once both the backend and frontend servers are running, open your browser and go to:
	  http://localhost:5173/
    - The frontend should load, and the backend will be serving data from your database. 
