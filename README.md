# User Persistence

## Description

This project implements a user management system with specific entities and associated REST APIs. It focuses on user registration, authentication, and additional features like photo uploads to AWS S3.

## Entities

### 1. User

- **Fields:**
  - FirstName (Min: 2 chars, Max: 25 chars)
  - LastName (Min: 2 chars, Max: 25 chars)
  - Email (Unique)
  - Password (Min: 6 chars, Max: 50 chars, must contain at least 1 number)
  - Role (String)
  - Active (True/False, True by default)
  - CreatedAt (Auto generated)
  - UpdatedAt (Auto generated)

### 2. Client

- **Fields:**
  - Avatar (Url)
  - Photos (Array of Photos)
  - Inherits from User entity

### 3. Photo

- **Fields:**
  - Name (String)
  - Url (Url)
  - User (Owner)
  - CreatedAt (Auto generated)
  - UpdatedAt (Auto generated)

## APIs

### 1. REST APIs Part 1

#### a. POST /api/register

- **Authentication:** Anonymous
- **Specifications:**
  - Register a new Client.
  - Auto-generate FullName from FirstName + " " + LastName.
  - Client can upload multiple images during registration (at least 4 images required).
  - A default avatar assigned if not provided.

#### b. POST /api/login

- **Authentication:** Anonymous
- **Specifications:**
  - Login existing Client with email/password.
  - Returns a JWT token upon successful login.

### 2. Authentication and API Part 2

#### a. GET /api/users/me

- **Authentication:** Authenticated as Client (Bearer token with Passport library)
- **Specifications:**
  - Get relevant Client details.
  - Authentication token is mandatory.

### 3. Optional: Upload photos to AWS S3

- **AWS Credentials:**
  - Access key ID
  - Secret access key
  - Region: eu-west-1
  - Bucket name
  - **Note:** Do not share these credentials on a public Git repo.

## Installation

[Include instructions on how to install your application here.]

## Running the app

```bash
# build the pg Database service
$ docker-compose --env-file .env  up -d 

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Configuration

[Specify any configuration settings here.]

## Contributing

[Include guidelines for contributing to your project.]

## Credits

[Give credit to any resources or individuals who helped with the project.]

## License

[Specify the license under which your project is released.]

## Contact

[Provide contact information for inquiries.]
