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
