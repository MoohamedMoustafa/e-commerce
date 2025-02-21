# Fresh Cart E-commerce

A modern React-based e-commerce application with features like product browsing, cart management, wishlist, and secure checkout.

## Features

- User authentication (login, register, password reset)
- Product browsing and filtering
- Shopping cart management
- Wishlist functionality
- Category and brand filtering
- Secure checkout process
- Order history
- Responsive design

## Technologies Used

- React 18
- React Router v7
- React Query (TanStack Query)
- Tailwind CSS
- Formik & Yup for form validation
- Axios for API requests
- React Hot Toast for notifications
- React Slick for carousels
- JWT authentication

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd e-commerce
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 to view the app in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # React components
├── context/        # Context providers
├── hooks/          # Custom React hooks
├── assets/         # Static assets
└── main.jsx        # App entry point
```

## Main Features Implementation

### Authentication

- JWT-based authentication
- Protected routes
- Password reset flow

### Product Management

- Product search functionality
- Product listing with filters
- Product details view
- Related products recommendations

### Shopping Cart

- Add/remove items
- Update quantities
- Checkout process
- Order tracking

### Wishlist

- Add/remove products
- Sync with backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
