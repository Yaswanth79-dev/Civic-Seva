# Civic Seva Startup Guide

Your application is fully coded and ready, but the backend requires a running **MongoDB** database to store users and issues.

## Step 1: Install MongoDB (If you haven't yet)
If you don't have MongoDB installed on this computer:
1. Go to: https://www.mongodb.com/try/download/community
2. Download and install **MongoDB Community Server** for Windows.
3. Make sure to keep the option to "Install MongoDB as a Service" checked during installation.

## Step 2: Ensure MongoDB is Running
If it's already installed, the service might just be stopped:
1. Open the Windows **Start Menu**.
2. Search for and open **Services**.
3. Scroll down to find **MongoDB Server (MongoDB)**.
4. Right-click it and click **Start**.

*Alternatively, if you use MongoDB Compass, simply opening it and clicking "Connect" (to `mongodb://localhost:27017`) often ensures everything is working.*

## Step 3: Start the Backend
Once the database is running:
1. Open a terminal in `d:\Civic Seva`.
2. Run this command:
   ```bash
   npm start
   ```
   *You should see "Database Connected" and "Server running on port 5000" in the console.*

## Step 4: Use the App!
1. Open `index.html` in your web browser.
2. Sign up, report issues, and check out the dashboard!
