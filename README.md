# RoomEase

A full-stack PG/hostel & rental property management platform connecting **property owners** with **tenants** — owners list properties and rooms, tenants browse and apply to move in. Built as a modular Spring Boot backend with a React frontend.

> 🚧 **Status: Work in progress.** Core auth, property, room, and application flows work end-to-end, but several pages and review workflows are still stubs (see [Project Status](#project-status) below). Expect breaking changes.

## Overview

RoomEase has two user roles:

- **Owner** — registers properties (PGs, hostels, rentals), adds rooms to each property, and reviews tenant applications.
- **Tenant** — browses available properties and submits applications to move in.

Auth is OTP-verified (email or phone) on top of a standard email/password login, with JWT-based session handling and role-based route protection.

## Repository Layout

```
RoomEase/
├── backend/     # Spring Boot REST API
└── frontend/    # React (Vite) client
```

## Tech Stack

**Backend**
- Java 17, Spring Boot 4.1
- Spring Web MVC, Spring Data JPA (MySQL)
- Spring Security + JJWT (stateless JWT auth)
- Redis (via `spring-data-redis`) for OTP storage/expiry
- Spring Mail (OTP delivery over email)
- springdoc-openapi (Swagger UI / OpenAPI docs)
- Spring WebSocket dependency present (not yet wired into any endpoint)
- Maven build

**Frontend**
- React 19 + React Router 7
- Vite build tooling
- Tailwind CSS 4
- Axios (with a request interceptor that attaches the JWT)
- lucide-react for icons

## Backend Architecture

The backend is organized as a modular monolith, one package per domain:

```
backend/src/main/java/com/nishtha/RoomEase/
├── RoomEaseApplication.java
├── config/
│   ├── SecurityConfig.java       # JWT auth, role-based route rules, CORS
│   └── OpenApiConfig.java        # Swagger/OpenAPI + bearer auth scheme
├── auth/
│   ├── controller/AuthController.java     # register / verify / login
│   ├── service/AuthService.java           # registration, OTP, login logic
│   ├── service/OtpService.java            # Redis-backed OTP generate/verify (5-min TTL)
│   ├── service/EmailService.java          # sends OTP via email
│   ├── service/SmsService.java            # OTP "SMS" (currently logs to console)
│   └── security/                          # JwtService, JwtAuthenticationFilter, CustomUserDetailsService
├── user/
│   └── entity/User.java                   # id, role (OWNER/TENANT), verification & profile status
├── property/
│   ├── controller/PropertyController.java # CRUD + listing available properties
│   ├── service/PropertyServiceImpl.java
│   └── entity/Property.java, PropertyImage.java
├── room/
│   ├── controller/RoomController.java     # CRUD for rooms under a property
│   └── entity/Room.java
├── application/
│   ├── controller/ApplicationController.java  # tenant applies / views own applications
│   └── entity/Application.java                # PENDING / APPROVED / REJECTED
└── common/enums/                          # Role, GenderType, PropertyStatus, ApplicationStatus, VerificationMethod
```

## API Endpoints

Base URL (local): `http://localhost:8080`. Interactive docs are available at `/swagger-ui.html` once the backend is running.

### Auth (`/auth`) — public
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create an account, sends an OTP (email or phone) |
| `POST` | `/auth/verify` | Verify the OTP to activate the account |
| `POST` | `/auth/login` | Login with email/phone + password, returns a JWT |

### Properties (`/properties`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/properties/all` | Public | List all `AVAILABLE` properties |
| `POST` | `/properties/register-property` | Owner | Create a new property (owned by the logged-in user) |
| `GET` | `/properties` | Owner | List the current owner's properties |
| `GET` | `/properties/{id}` | Owner | Get one of the owner's own properties |
| `GET` | `/properties/details/{propertyId}` | Authenticated | Get public-facing property details (e.g. for tenants) |
| `PUT` | `/properties/edit-property/{id}` | Owner | Update a property (partial update) |
| `DELETE` | `/properties/{id}` | Owner | Delete a property |

### Rooms
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/properties/{propertyId}/rooms` | Owner | Add a room to a property |
| `GET` | `/properties/{propertyId}/rooms` | Owner | List rooms for a property |
| `GET` | `/rooms/{roomId}` | Owner | Get a single room |
| `PUT` | `/rooms/{roomId}` | Owner | Update a room (partial update) |
| `DELETE` | `/rooms/{roomId}` | Owner | Delete a room |

### Applications (`/applications`) — Tenant only
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/applications/apply` | Apply to a property (one pending application per property at a time) |
| `GET` | `/applications/my` | List the tenant's own applications |

All protected endpoints expect `Authorization: Bearer <jwt>`. Role checks (`OWNER` / `TENANT`) are enforced in `SecurityConfig`.

## Project Status

This is an actively developed, unfinished project. As of now:

**Working end-to-end:**
- Registration → OTP verification (email/SMS-stub) → login → JWT session
- Owner: create/edit/delete properties and rooms
- Tenant: browse available properties, apply to a property, view own applications

**Known gaps / in progress:**
- `ApplicationService.approveApplication` and `rejectApplication` are unimplemented stubs (owners can't yet approve/reject applications from the API)
- `ManageProperty` and owner-side `PropertyDetails` frontend pages are placeholders/empty
- `ForgotPassword` page is a stub with no backend endpoint
- `SmsService` doesn't send real SMS — it just logs the OTP to the console
- Frontend has some duplicate/near-duplicate `Pages` vs `pages` imports (case-sensitivity risk on Linux/CI)
- No occupancy tracking wired up yet (`Room.currOccupancy` is set to `0` and never incremented, e.g. on application approval)

## Security Notes

These are worth fixing before any real deployment:

- `application.properties` currently has the DB password, mail credentials, and JWT secret committed in plaintext — move these to environment variables / a secrets manager and rotate them.
- `PropertyController`'s `SecurityConfig` rule (`/properties/**` → `permitAll()`) is broader than intended and currently overlaps with the more specific owner-only room rule below it — worth double-checking the matcher ordering.
- Debug logging (`debug=true`, verbose `System.out.println` of tokens/headers in `JwtAuthenticationFilter`) should be removed for production.

## Getting Started

### Prerequisites
- Java 17 and Maven (or the included `mvnw` wrapper)
- MySQL running locally (database referenced by `spring.datasource.url`)
- Redis running locally (for OTP storage)
- Node.js and npm

### Backend

```bash
cd backend

# create the database first, e.g.:
# mysql -u root -p -e "CREATE DATABASE pg_management_system"

./mvnw spring-boot:run
```

By default the backend reads DB/mail/JWT config from `src/main/resources/application.properties`. Override these with environment-specific values (ideally via environment variables) rather than editing that file directly — see [Security Notes](#security-notes).

The API runs on `http://localhost:8080`, with Swagger UI at `http://localhost:8080/swagger-ui.html`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on Vite's dev server (default `http://localhost:5173`), which is the origin currently whitelisted in the backend's CORS config. The frontend's Axios client (`src/services/api.js`) points at `http://localhost:8080` by default.

## Roadmap

- Implement owner approve/reject on tenant applications, with occupancy updates on approval
- Finish `ManageProperty` and owner `PropertyDetails` pages
- Real SMS OTP delivery (currently console-logged)
- Password reset flow
- Move all secrets to environment variables; add a `.env.example`
- Property image upload (currently `PropertyImage`/`imageUrls` exist in the data model but there's no upload endpoint yet)
