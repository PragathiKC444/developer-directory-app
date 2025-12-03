# Backend - Developer Directory API

Node.js + Express backend for the Developer Directory application.

## Features

- RESTful API with Express.js
- JSON file-based storage
- CORS enabled
- Input validation
- Error handling

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

- `GET /` - Health check
- `GET /developers` - Get all developers
- `POST /developers` - Add new developer
- `DELETE /developers/:id` - Delete developer

## Dependencies

- express: ^4.18.2
- cors: ^2.8.5
- body-parser: ^1.20.2
- nodemon: ^3.0.1 (dev)
