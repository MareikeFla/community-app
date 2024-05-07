# Pin&Join - Community App

> **Digital capstone project** for the neue fische web development bootcamp, crafted with dedication by [n377i](https://github.com/n377i), [Bruno0221](https://github.com/Bruno0221), [Lea-Mentz](https://github.com/Lea-Mentz) and [MareikeFla](https://github.com/MareikeFla).

![Pin&Join Banner](public/assets/images/banner.png)

## Description

Pin&Join is a dynamic platform designed to foster local engagement through social interaction. Our intuitive and user-friendly web interface connects like-minded community members by allowing them to create, discover and exchange events. It emphasizes accessibility, allowing for quick user onboarding with GitHub and Google account integration.

Access the app [here on Vercel](https://community-app-topaz.vercel.app).

## Key Features

- **Event Management**: Users can create and manage local events to boost community participation.
- **Search and Filter**: Users can find events that cater to their interests with robust search and filtering tools.
- **Accessibility Features**: The app provides visual cues about event accessibility, enhancing usability for all users.
- **Interactive Event Map**: Users can locate and navigate to events with an integrated, interactive map.
- **Real-Time Updates**: The app features daily updates with real events from Cologne, ensuring the content is up-to-date and relevant.
- **User Feedback**: There is a system in place for users to provide feedback on events, promoting a community-driven approach to improvement.
- **Secure Authentication**: Ensures safe user registration and login.

## Technology Stack

- React/Next.js for robust front-end development
- React Hooks for state and lifecycle management
- React Router for effective page routing
- Styled Components for component-specific styling
- [NextAuth for secure authentication](https://next-auth.js.org/)
- [Cloudinary for image hosting](https://cloudinary.com/)
- [MongoDB for backend data storage](https://www.mongodb.com/)
- Mongoose for data modeling
- [City of Cologne Event API for real-time event data](https://offenedaten-koeln.de/dataset/veranstaltungen-der-stadt-k%C3%Bln/resource/94d5e889-ed56-403d-9cd6-4e98d3d5c8bd)
- [Leaflet for interactive maps](https://leafletjs.com/)

## Getting Started

To set up Pin&Join on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Copy the `env.local.example` file, rename it to `env.local` and add the corresponding values.
3. Run `npm install` to install all required dependencies.
4. Start the application in development mode by executing `npm run dev`.
5. Access the app via the local server URL provided in your terminal.
