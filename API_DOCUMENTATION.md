# API Documentation - Car & Bus Booking System

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "user"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### Login
**POST** `/auth/login`

Request Body:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Refresh Token
**POST** `/auth/refresh-token`

Request Body:
```json
{
  "refreshToken": "..."
}
```

### Logout
**POST** `/auth/logout` (Protected)

---

## Vehicle Endpoints

### Get All Vehicles
**GET** `/vehicles?type=car&isActive=true`

### Create Vehicle (Admin Only)
**POST** `/vehicles`

Request Body:
```json
{
  "name": "Luxury Sedan",
  "vehicleNumber": "DL01AB1234",
  "type": "car",
  "brand": "Toyota",
  "model": "Camry",
  "capacity": 4,
  "carType": "luxury"
}
```

### Update Vehicle (Admin Only)
**PUT** `/vehicles/:id`

### Delete Vehicle (Admin Only)
**DELETE** `/vehicles/:id`

---

## Route Endpoints

### Search Routes
**GET** `/routes/search?source=Delhi&destination=Mumbai&vehicleType=bus`

### Get All Routes
**GET** `/routes`

### Create Route (Admin Only)
**POST** `/routes`

Request Body:
```json
{
  "source": "Delhi",
  "destination": "Mumbai",
  "distance": 1450,
  "duration": "18 hours",
  "vehicle": "vehicle_id",
  "price": 1200,
  "schedule": {
    "departureTime": "20:00",
    "arrivalTime": "14:00"
  }
}
```

---

## Booking Endpoints

### Create Booking
**POST** `/bookings`

Request Body:
```json
{
  "route": "route_id",
  "vehicle": "vehicle_id",
  "travelDate": "2025-12-25",
  "selectedSeats": ["S1", "S2"],
  "numberOfPassengers": 2,
  "passengerDetails": [
    { "name": "John", "age": 30, "gender": "male" },
    { "name": "Jane", "age": 28, "gender": "female" }
  ],
  "totalAmount": 2400,
  "offerCode": "FIRST50"
}
```

### Get User Bookings
**GET** `/bookings/my-bookings`

### Update Booking Status (Admin Only)
**PATCH** `/bookings/:id/status`

Request Body:
```json
{
  "status": "approved",
  "adminNotes": "Booking confirmed"
}
```

### Cancel Booking
**PATCH** `/bookings/:id/cancel`

---

## Offer Endpoints

### Get Active Offers
**GET** `/offers/active`

### Validate Offer
**POST** `/offers/validate`

Request Body:
```json
{
  "code": "FIRST50",
  "bookingAmount": 1000,
  "vehicleType": "car"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "offer": { ... },
    "discountAmount": 500,
    "finalAmount": 500
  }
}
```

### Create Offer (Admin Only)
**POST** `/offers`

Request Body:
```json
{
  "code": "SAVE100",
  "title": "Flat ₹100 Off",
  "description": "Get flat ₹100 off",
  "discountType": "flat",
  "discountValue": 100,
  "minBookingAmount": 800,
  "validFrom": "2025-12-01",
  "validTill": "2025-12-31",
  "applicableOn": "all"
}
```

---

## Admin Endpoints

### Get Dashboard Stats
**GET** `/admin/stats`

Response:
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 100,
      "totalBookings": 250,
      "pendingBookings": 15,
      "approvedBookings": 200,
      "rejectedBookings": 20,
      "cancelledBookings": 15,
      "totalRevenue": 500000
    },
    "recentBookings": [ ... ]
  }
}
```

### Get All Users
**GET** `/admin/users`

### Toggle User Status
**PATCH** `/admin/users/:id/toggle`

---

## Socket.IO Events

### Client → Server

- `join` - Join user-specific room
  ```js
  socket.emit('join', userId);
  ```

- `join-admin` - Join admin room
  ```js
  socket.emit('join-admin');
  ```

### Server → Client

- `booking-status-updated` - Booking status changed
  ```js
  socket.on('booking-status-updated', (data) => {
    console.log(data.bookingId, data.status);
  });
  ```

- `new-booking` - New booking created (Admin only)
  ```js
  socket.on('new-booking', (data) => {
    console.log('New booking:', data.booking);
  });
  ```

- `seat-availability-updated` - Seat availability changed
  ```js
  socket.on('seat-availability-updated', (data) => {
    console.log('Vehicle:', data.vehicleId);
  });
  ```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": ["Optional array of validation errors"]
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
