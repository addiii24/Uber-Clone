# User API Documentation

## Register User Endpoint

Registers a new user in the system and returns an authentication token (JWT).

### Endpoint
`POST /api/users/register`

### Request Headers
- `Content-Type: application/json`

### Request Body (Required Data)
The endpoint expects a JSON body with the following structure:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

#### Field Restrictions:
- **`fullname.firstname`**: Required. String, minimum 3 characters.
- **`fullname.lastname`**: Required. String, minimum 3 characters.
- **`email`**: Required. Must be a valid email format.
- **`password`**: Required. String, minimum 6 characters.

*(Note: Although the controller is designed to support flat `firstname` and `lastname` fields, the strict route validation expects the `fullname` object).*

### Responses

#### 201 Created (Success)
Returned when the user is successfully created.
```json
{
    "message": "User registered successfully",
    "user": {
        "id": "[USER_ID]",
        "email": "[EMAIL_ADDRESS]",
        "fullname": {
            "firstname": "[FIRST_NAME]",
            "lastname": "[LAST_NAME]"
        }
    },
    "token": "[JWT_TOKEN]"
}
```

#### 400 Bad Request (Validation Error)
Returned when the submitted data does not meet the validation requirements (e.g., short password, or short names).
```json
{
  "errors": [
    {
      "type": "field",
      "value": "123",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### 500 Internal Server Error
Returned when a server issue occurs, such as when trying to register an email that is already taken, or if the database is unreachable.
```json
{
  "message": "Email already in use"
}
```

---

## Login User Endpoint

Authenticates an existing user and returns an authentication token (JWT).

### Endpoint
`POST /api/users/login`

### Request Headers
- `Content-Type: application/json`

### Request Body (Required Data)
The endpoint expects a JSON body with the following structure:
```json
{
  "email": "adityasharma4131@gmail.com",
  "password": "securepassword123"
}
```

#### Field Restrictions:
- **`email`**: Required. Must be a valid email format.
- **`password`**: Required. String, minimum 6 characters.

### Responses

#### 200 OK (Success)
Returned when the user is successfully authenticated.
```json
{
  "message": "User logged in successfully",
  "user": {
      "id": "[USER_ID]",
      "email": "[EMAIL_ADDRESS]",
      "fullname": {
          "firstname": "[FIRSTNAME]",
          "lastname": "[LASTNAME]"
      }
  },
  "token": "[JWT_TOKEN]"
}
```

#### 400 Bad Request
Returned when email or password fields are missing from the request body or have invalid formats.
```json
{
  "message": "All fields are required"
}
```

#### 401 Unauthorized
Returned when the email doesn't correspond to any user, or the password doesn't match.
```json
{
  "message": "Invalid email and password"
}
```

---

## Get User Profile Endpoint

Retrieves the authenticated user's profile information.

### Endpoint
`GET /api/users/profile`

### Request Headers / Cookies
- Requires a valid JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Responses

#### 200 OK (Success)
Returned when the user's profile is successfully fetched.
```json
{
    "message": "User profile fetched successfully",
    "user": {
        "fullname": {
            "firstname": "[FIRSTNAME]",
            "lastname": "[LASTNAME]"
        },
        "_id": "[USER_ID]",
        "email": "[EMAIL_ADDRESS]",
        "createdAt": "[DATE]",
        "updatedAt": "[DATE]",
    }
}
```

#### 401 Unauthorized
Returned if no token is provided, the token is invalid, the token has been blacklisted, or the user no longer exists.
```json
{
  "message": "Unauthorized Token" 
}
```
*(Errors may also be "Token is blacklisted" or "Unauthorized User" depending on the reason)*

---

## Logout User Endpoint

Logs out the user by adding their current token to the blacklist and clearing the token cookie.

### Endpoints
`GET /api/users/logout`
`POST /api/users/logout`

### Request Headers / Cookies
- Requires a valid JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Responses

#### 200 OK (Success)
Returned when the user is successfully logged out.
```json
{
  "message": "User logged out successfully"
}
```

#### 400 Bad Request
Returned if no token is provided in the request at all.
```json
{
  "message": "No token provided"
}
```

#### 401 Unauthorized
Returned if the provided token is invalid or already blacklisted.
```json
{
  "message": "Unauthorized Token"
}
```

---

# Captain API Documentation

The following endpoints are for Captain (Driver) operations.

---

## Register Captain Endpoint

Registers a new captain in the system and returns an authentication token (JWT).

### Endpoint
`POST /api/captains/register`

### Request Headers
- `Content-Type: application/json`

### Request Body (Required Data)
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicletype": "car"
  }
}
```

#### Field Restrictions:
- **`fullname.firstname`**: Required. String, minimum 3 characters.
- **`fullname.lastname`**: Required. String, minimum 3 characters.
- **`email`**: Required. Must be a valid email format.
- **`password`**: Required. String, minimum 6 characters.
- **`vehicle.color`**: Required. String, minimum 3 characters.
- **`vehicle.plate`**: Required. String, minimum 3 characters.
- **`vehicle.capacity`**: Required. Number, minimum 1.
- **`vehicle.vehicletype`**: Required. Must be one of: `"car"`, `"bike"`, or `"auto"`.

### Responses

#### 201 Created (Success)
Returned when the captain is successfully created.
```json
{
    "message": "Captain registered successfully",
    "user": {
        "id": "[CAPTAIN_ID]",
        "email": "[EMAIL_ADDRESS]",
        "fullname": {
            "firstname": "[FIRST_NAME]",
            "lastname": "[LAST_NAME]"
        }
    },
    "token": "[JWT_TOKEN]"
}
```

#### 400 Bad Request
Returned for validation errors or if the captain's email already exists.
```json
{
  "message": "Captain already exists"
}
```

---

## Login Captain Endpoint

Authenticates an existing captain and returns an authentication token (JWT).

### Endpoint
`POST /api/captains/login`

### Request Headers
- `Content-Type: application/json`

### Request Body (Required Data)
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword123"
}
```

### Responses

#### 200 OK (Success)
Returned when the captain is successfully authenticated.
```json
{
  "message": "User logged in successfully",
  "user": {
      "id": "[CAPTAIN_ID]",
      "email": "[EMAIL_ADDRESS]",
      "fullname": {
          "firstname": "[FIRSTNAME]",
          "lastname": "[LASTNAME]"
      }
  },
  "token": "[JWT_TOKEN]"
}
```

#### 400 Bad Request
Returned when fields are missing or invalid.
```json
{
  "message": "All fields are required"
}
```

#### 401 Unauthorized
Returned for invalid credentials.
```json
{
  "message": "Invalid email and password"
}
```

---

## Get Captain Profile Endpoint

Retrieves the authenticated captain's profile.

### Endpoint
`GET /api/captains/profile`

### Request Headers / Cookies
- Requires a valid JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Responses

#### 200 OK (Success)
```json
{
  "message": "User profile fetched successfully",
  "user": { ...captain profile data... }
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthorized Token" 
}
```

---

## Logout Captain Endpoint

Logs out the captain by blacklisting their token and clearing the cookie.

### Endpoint
`POST /api/captains/logout`

### Request Headers / Cookies
- Requires a valid JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Responses

#### 200 OK (Success)
```json
{
  "message": "Captain logged out successfully"
}
```

#### 400 Bad Request
```json
{
  "message": "No token provided"
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthorized Token"
}
```

---

# Map API Documentation

The following endpoints handle map-based features like coordinates, distance/time calculation, and location auto-suggestions.

---

## Get Coordinates Endpoint

Fetches the geographical coordinates (latitude and longitude) for a given address.

### Endpoint
`GET /api/map/get-coordinates`

### Request Headers / Cookies
- Requires a valid JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Query Parameters
- **`address`**: Required. String, minimum 3 characters.

### Responses

#### 200 OK (Success)
```json
{
  "success": true,
  "message": "Coordinates fetched successfully",
  "data": { ...coordinate data... }
}
```

#### 400 Bad Request
Returned for validation errors (e.g., missing address query).
```json
{
  "errors": [ ...validation errors... ]
}
```

#### 404 Not Found
Returned if coordinates cannot be fetched.
```json
{
  "success": false,
  "message": "Failed to fetch coordinates",
  "error": "[ERROR_MESSAGE]"
}
```

---

## Get Distance and Time Endpoint

Calculates the distance and estimated travel time between an origin and destination.

### Endpoint
`GET /api/map/get-distance-time`

### Request Headers / Cookies
- Requires a valid JWT token.

### Query Parameters
- **`origin`**: Required. String, minimum 3 characters.
- **`destination`**: Required. String, minimum 3 characters.

### Responses

#### 200 OK (Success)
```json
{
  "success": true,
  "message": "Distance and time fetched successfully",
  "data": { ...distance and time data... }
}
```

#### 400 Bad Request
```json
{
  "errors": [ ...validation errors... ]
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Failed to fetch distance and time",
  "error": "[ERROR_MESSAGE]"
}
```

---

## Get Auto-suggestions Endpoint

Provides autocomplete location suggestions based on user input.

### Endpoint
`GET /api/map/get-autosuggetions`

### Request Headers / Cookies
- Requires a valid JWT token.

### Query Parameters
- **`input`**: Required. String, minimum 3 characters.

### Responses

#### 200 OK (Success)
```json
{
  "success": true,
  "message": "Autosuggetions fetched successfully",
  "data": [ ...array of suggestions... ]
}
```

#### 400 Bad Request
```json
{
  "errors": [ ...validation errors... ]
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Failed to fetch autosuggetions",
  "error": "[ERROR_MESSAGE]"
}
```

---

# Ride API Documentation

The following endpoints handle the creation and fare estimation of rides.

---

## Create Ride Endpoint

Creates a new ride request for a user.

### Endpoint
`POST /api/ride/create-ride`

### Request Headers / Cookies
- Requires a valid User JWT token passed either in the `Authorization` header (`Bearer [JWT_TOKEN]`) or in the `token` cookie.

### Request Body (Required Data)
```json
{
  "pickup": "Connaught Place, New Delhi",
  "destination": "India Gate, New Delhi",
  "vehicleType": "car"
}
```

#### Field Restrictions:
- **`pickup`**: Required. String, minimum 3 characters.
- **`destination`**: Required. String, minimum 3 characters.
- **`vehicleType`**: Required. Must be one of: `"auto"`, `"car"`, or `"moto"`.

### Responses

#### 201 Created (Success)
Returned when the ride is successfully created.
```json
{
  "success": true,
  "ride": { ...ride details... }
}
```

#### 400 Bad Request
Returned for validation errors.
```json
{
  "success": false,
  "errors": [ ...validation errors... ]
}
```

#### 500 Internal Server Error
Returned if ride creation fails.
```json
{
  "success": false,
  "message": "[ERROR_MESSAGE]"
}
```

---

## Get Fare Endpoint

Calculates and returns the estimated fare for different vehicle types between a pickup and destination.

### Endpoint
`POST /api/ride/get-fare`

*(Note: Ensure you pass these as query parameters even though the method is POST according to the codebase, or pass as query if method is updated).*

### Request Headers / Cookies
- Requires a valid User JWT token.

### Query Parameters
- **`pickup`**: Required. String, minimum 3 characters.
- **`destination`**: Required. String, minimum 3 characters.
- **`vehicleType`**: Required. Must be one of: `"auto"`, `"car"`, or `"moto"`.

### Responses

#### 200 OK (Success)
Returned when the fare is successfully calculated.
```json
{
  "success": true,
  "fare": { ...fare estimation object... }
}
```

#### 400 Bad Request
Returned for validation errors.
```json
{
  "success": false,
  "errors": [ ...validation errors... ]
}
```

#### 500 Internal Server Error
Returned if fare calculation fails.
```json
{
  "success": false,
  "message": "[ERROR_MESSAGE]"
}
```
