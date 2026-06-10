# School Management System - Student Management Module

This repository contains a full-stack school management system focused on student administration.

## Stack

- Frontend: React + Vite + React Router DOM + Axios + Bootstrap + React Toastify
- Backend: Django + Django REST Framework + Django Token Authentication + SQLite

## Features

- Login with token authentication
- Dashboard with student count
- Protected frontend routes
- Student list with search, edit, and delete
- Add/Edit student forms with validation and notifications
- CORS enabled for local development

## Local Setup

### Backend

1. Open a terminal and navigate to the backend folder:
   ```powershell
   cd d:\machine-test\backend
   ```
2. Create a Python virtual environment:
   ```powershell
   python -m venv venv
   ```
3. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
4. Install dependencies:
   ```powershell
   pip install -r ..\requirements.txt
   ```
5. Copy the environment template:
   ```powershell
   copy ..\.env.example .env
   ```
6. Run migrations:
   ```powershell
   python manage.py migrate
   ```
7. Start the backend server:
   ```powershell
   python manage.py runserver
   ```

### Frontend

1. Open a second terminal and navigate to the frontend folder:
   ```powershell
   cd d:\machine-test\frontend
   ```
2. Install Node dependencies:
   ```powershell
   npm install
   ```
3. Start the frontend development server:
   ```powershell
   npm run dev
   ```

### Sample Credentials

- Username: `admin`
- Password: `adminpass`

### Test Data

The database migration includes sample students:

- Maria Rivera, maria.rivera@example.com
- David King, david.king@example.com
- Sophia Turner, sophia.turner@example.com

## Notes

- Backend API is available at: `http://127.0.0.1:8000/api`
- Frontend app runs at: `http://localhost:3000`
- Tokens are stored in `localStorage` under `studentAppToken`
