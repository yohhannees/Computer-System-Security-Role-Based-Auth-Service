## Endpoints

### 1. Onboard a Driver

- **POST** `/drivers`
- **Description**: Onboard a new driver and create an associated vehicle.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "http://example.com/profile.jpg",
    "licenseNumber": "ABC123456",
    "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
    "insuranceVerified": true,
    "backgroundCheck": "Pending",
    "status": "ONLINE",
    "vehicle": {
      "make": "Toyota",
      "model": "Camry",
      "year": 2022,
      "plateNumber": "XYZ123",
      "color": "Blue",
      "registered": true
    }
  }
  ```
- **Sample Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "http://example.com/profile.jpg",
    "licenseNumber": "ABC123456",
    "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
    "insuranceVerified": true,
    "backgroundCheck": "Pending",
    "status": "ONLINE",
    "vehicles": [
      {
        "id": 1,
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "plateNumber": "XYZ123",
        "color": "Blue",
        "registered": true,
        "createdAt": "2023-10-01T12:00:00.000Z",
        "updatedAt": "2023-10-01T12:00:00.000Z"
      }
    ],
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:00:00.000Z"
  }
  ```

### 2. Update Driver Information

- **PUT** `/drivers/:id`
- **Description**: Update an existing driver's information.
- **Request Body**:
  ```json
  {
    "name": "John Smith",
    "status": "OFFLINE"
  }
  ```
- **Sample Response**:
  ```json
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "http://example.com/profile.jpg",
    "licenseNumber": "ABC123456",
    "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
    "insuranceVerified": true,
    "backgroundCheck": "Pending",
    "status": "OFFLINE",
    "vehicles": [
      {
        "id": 1,
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "plateNumber": "XYZ123",
        "color": "Blue",
        "registered": true
      }
    ],
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:05:00.000Z"
  }
  ```

### 3. Get Driver Information

- **GET** `/drivers/:id`
- **Description**: Retrieve information about a specific driver.
- **Sample Response**:
  ```json
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "http://example.com/profile.jpg",
    "licenseNumber": "ABC123456",
    "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
    "insuranceVerified": true,
    "backgroundCheck": "Pending",
    "status": "OFFLINE",
    "vehicles": [
      {
        "id": 1,
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "plateNumber": "XYZ123",
        "color": "Blue",
        "registered": true
      }
    ],
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:05:00.000Z"
  }
  ```

### 4. Set Driver Status

- **PATCH** `/drivers/:id/status`
- **Description**: Update the status of a driver (e.g., ONLINE or OFFLINE).
- **Request Body**:
  ```json
  {
    "status": "ONLINE"
  }
  ```
- **Sample Response**:
  ```json
  {
    "id": 1,
    "name": "John Smith",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890",
    "profilePicture": "http://example.com/profile.jpg",
    "licenseNumber": "ABC123456",
    "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
    "insuranceVerified": true,
    "backgroundCheck": "Pending",
    "status": "ONLINE",
    "vehicles": [
      {
        "id": 1,
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "plateNumber": "XYZ123",
        "color": "Blue",
        "registered": true
      }
    ],
    "createdAt": "2023-10-01T12:00:00.000Z",
    "updatedAt": "2023-10-01T12:10:00.000Z"
  }
  ```

### 5. Track Driver Performance

- **GET** `/drivers/:id/performance`
- **Description**: Retrieve performance metrics for a specific driver.
- **Sample Response**:
  ```json
  [
    {
      "id": 1,
      "ratings": 4.5,
      "totalTrips": 100,
      "complaints": 2,
      "compliments": 10,
      "driverId": 1,
      "createdAt": "2023-10-01T12:00:00.000Z",
      "updatedAt": "2023-10-01T12:05:00.000Z"
    }
  ]
  ```

### 6. Track Driver Earnings

- **GET** `/drivers/:id/earnings`
- **Description**: Retrieve earnings for a specific driver.
- **Sample Response**:
  ```json
  [
    {
      "id": 1,
      "amount": 150.0,
      "date": "2023-10-01T00:00:00.000Z",
      "tripId": 1,
      "driverId": 1,
      "createdAt": "2023-10-01T12:00:00.000Z"
    }
  ]
  ```

## Testing the API

You can test the API using tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/).

### Example cURL Commands

1. **Onboard a Driver**:

   ```bash
   curl -X POST http://localhost:4343/api/drivers \
   -H "Content-Type: application/json" \
   -d '{
     "name": "John Doe",
     "email": "john.doe@example.com",
     "phoneNumber": "+1234567890",
     "profilePicture": "http://example.com/profile.jpg",
     "licenseNumber": "ABC123456",
     "licenseExpiryDate": "2025-12-31T00:00:00.000Z",
     "insuranceVerified": true,
     "backgroundCheck": "Pending",
     "status": "ONLINE",
     "vehicle": {
       "make": "Toyota",
       "model": "Camry",
       "year": 2022,
       "plateNumber": "XYZ123",
       "color": "Blue",
       "registered": true
     }
   }'
   ```

2. **Update Driver Information**:

   ```bash
   curl -X PUT http://localhost:4343/api/drivers/1 \
   -H "Content-Type: application/json" \
   -d '{
     "name": "John Smith",
     "status": "OFFLINE"
   }'
   ```

3. **Get Driver Information**:

   ```bash
   curl -X GET http://localhost:4343/api/drivers/1
   ```

4. **Set Driver Status**:

   ```bash
   curl -X PATCH http://localhost:4343/api/drivers/1/status \
   -H "Content-Type: application/json" \
   -d '{
     "status": "ONLINE"
   }'
   ```

5. **Track Driver Performance**:

   ```bash
   curl -X GET http://localhost:4343/api/drivers/1/performance
   ```

6. **Track Driver Earnings**:
   ```bash
   curl -X GET http://localhost:4343/api/drivers/1/earnings
   ```

## Conclusion

This API provides a comprehensive set of endpoints for managing drivers and their associated vehicles in your application. Use the provided sample requests and responses to test the functionality and integrate it into your application.
