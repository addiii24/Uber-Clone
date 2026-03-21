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
      "id": "69be6fd2d4964376ff42d218",
      "email": "adityasharma4131@gmail.com",
      "fullname": {
          "firstname": "Aditya",
          "lastname": "Sharma"
      }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmU2ZmQyZDQ5NjQzNzZmZjQyZDIxOCIsImlhdCI6MTc3NDA5MjY1OSwiZXhwIjoxNzc0MTc5MDU5fQ.YOTwJYowYBMDRKaPahYiRrHA4jarOxaYFd3wAQWYhBU"
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
