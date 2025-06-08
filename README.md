# Jira Dashboard

A modern, responsive Jira dashboard built with React, TypeScript, and Chakra UI. This application provides a clean interface for viewing and managing Jira tasks with advanced filtering capabilities.

## Features

- 🚀 Modern React with TypeScript
- 💅 Beautiful UI with Chakra UI
- 🔍 Advanced filtering capabilities:
  - Project search
  - Status filtering
  - Date range filtering
  - Assignee search
- 🎨 Color-coded task statuses
- 🔒 Authentication support (Email & Jira PAT)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/pragya-aggarwal/jira-clone.git
cd jira-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`



### Authentication

1. Email Login:
   - Use test credentials:
     - Email: main@gmail.com
     - Password: pass@123

2. Jira PAT:
   - email- main@gmail.com
   - Jira PAT- jira_Details

### Dashboard Features

1. Project Search:
   - Use the search bar 
   - Search is case-insensitive

2. Status Filtering:
   - Click the status dropdown
   - Select from: To Do, In Progress, In Review, Done
   - Status colors:
     - To Do: Orange
     - In Progress: Yellow
     - In Review: Teal
     - Done: Green

3. Date Filtering:
   - Use the date pickers to set a date range
   - Tasks outside the range will be filtered out

4. Assignee Search:
   - Type in the assignee search box
   - Matches partial names
   - Case-insensitive search

## Development

- Build for production:
```bash
npm run build
```

