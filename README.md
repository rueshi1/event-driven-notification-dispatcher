# Event-Driven Notification Dispatcher

## Project Overview

This project implements a lightweight asynchronous notification system using Express.js, Node.js, and SQLite.

The system receives business events through an API endpoint, stores the event in a SQLite database, creates a notification task, pushes the task into an in-memory queue, immediately returns a response to the client, and processes the notification asynchronously in the background.

The API does not wait for notification processing to complete, demonstrating an event-driven architecture and non-blocking request handling.

---

## Tech Stack

- Node.js
- Express.js
- SQLite
- JavaScript
- In-Memory Queue
- REST API

---

## Features

- Event persistence using SQLite
- Notification persistence using SQLite
- In-memory queue implementation
- Asynchronous background processing
- Immediate HTTP 202 Accepted response
- Notification status tracking
- Retry count tracking
- Failure simulation (10%)
- Request validation
- Error handling

---

## Project Structure

```text
project-root/

src/
├── app.js
├── server.js
├── controllers/
│   └── eventController.js
├── services/
│   ├── eventService.js
│   ├── notificationService.js
│   └── queueWorker.js
├── routes/
│   └── eventRoutes.js
├── db/
│   ├── database.js
│   └── schema.sql

README.md
package.json
notifications.db
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Application

```bash
npm run dev
```

Server starts at:

```text
http://localhost:3000
```

---

## Database Schema

### Events Table

Stores incoming business events.

| Column | Type |
|----------|----------|
| id | INTEGER |
| event_type | TEXT |
| payload | TEXT |
| created_at | DATETIME |

### Notifications Table

Stores notification tasks.

| Column | Type |
|----------|----------|
| id | INTEGER |
| event_id | INTEGER |
| recipient | TEXT |
| channel | TEXT |
| status | TEXT |
| retry_count | INTEGER |
| created_at | DATETIME |
| updated_at | DATETIME |

---

## API Endpoint

### Create Event

**POST**

```http
/api/v1/events
```

### Request Body

```json
{
  "event_type": "order_placed",
  "recipient": "user@example.com",
  "data": {
    "order_id": 101
  }
}
```

### Success Response

**HTTP Status:** 202 Accepted

```json
{
  "message": "Event accepted for processing",
  "tracking_id": 1,
  "notification_id": 1,
  "status": "pending"
}
```

---

## Queue Processing Workflow

1. Client sends event request.
2. Event is saved into the events table.
3. Notification record is created with status `pending`.
4. Notification task is pushed into an in-memory queue.
5. API immediately returns `202 Accepted`.
6. Background worker picks task from queue.
7. Notification sending is simulated.
8. Notification status is updated to `completed` or `failed`.

---

## Asynchronous Processing

The API response is returned immediately after the notification task is added to the queue.

Notification processing occurs independently in the background and does not block the client request.

---

## Failure Simulation

The background worker simulates real-world processing conditions:

- Random delay between 500ms and 1000ms
- 10% simulated failure rate

Possible notification statuses:

- pending
- completed
- failed

If a notification fails:

- status is updated to `failed`
- retry_count is incremented

---

## Error Handling

### Validation Error

**HTTP Status:** 400 Bad Request

```json
{
  "error": "event_type and recipient are required"
}
```

### Internal Server Error

**HTTP Status:** 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```



---

## Assumptions

- Notification delivery is simulated.
- Email is the default notification channel.
- Queue is maintained in memory.
- SQLite is used as the local database.
- Single worker instance is used.

---

## Future Enhancements

- Redis-based queue
- RabbitMQ integration
- Email service integration
- Docker containerization
- Dead Letter Queue support
- Retry scheduler
- Notification status tracking API

---

