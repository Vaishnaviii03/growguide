# GrowGuide

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

GrowGuide is a modern, AI-powered online learning platform where users can create, browse, and enroll in dynamic courses. It integrates Google Gemini AI to autogenerate course content, Clerk.dev for authentication, and uses PostgreSQL (via Drizzle ORM) for scalable, real-time data handling.

## 🚀 Live Demo

Check out the live site: [https://growguide-eight.vercel.app/](https://growguide-eight.vercel.app/)

## 🎯 Project Goal

GrowGuide aims to make quality education accessible, personalized, and interactive. Users can:
- Browse and enroll in curated/AI-generated courses
- View testimonials, features, and take action from a clean landing page
- Enjoy secure, personalized dashboards and learning progress
- Experience instant course creation with AI

## 🧱 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Authentication:** Clerk.dev (`UserButton`, `SignInButton`, `SignedIn`, `SignedOut`)
- **AI Integration:** `@google/genai` (Gemini API)
- **Backend/API:** Next.js API routes (RESTful endpoints)
- **Database:** PostgreSQL, Drizzle ORM

## 💡 Features

- Landing page with hero, features, courses, testimonials, CTA, and footer
- Auth-powered user flows (login, signup, protected routes)
- AI-generated course layout and topics
- Real-time enrollment, progress tracking, and user dashboard
- Responsive, animated UI via Tailwind CSS
- Dynamic course pages and intuitive sidebar navigation

## Folder Structure
growguide/
│
├── app/                                # Next.js app directory (routes & pages)
│   ├── _components/                    # Shared/page-level React components (CourseCard, Sidebar, etc.)
│   ├── api/                            # API route handlers (generate-course-layout, enroll-course, etc.)
│   ├── workspace/                      # Authenticated workspace area
│   │   ├── _components/                # Workspace-specific components (AppHeader, AppSidebar, WelcomeBanner, etc.)
│   │   ├── my-learning/                # "My Learning" user courses
│   │   │   └── page.jsx
│   │   ├── explore/                    # Courses exploration area
│   │   ├── ai-tools/                   # AI-powered tools section
│   │   ├── profile/                    # User profile page
│   │   └── layout.jsx                  # Layout for workspace section
│   ├── page.jsx                        # Landing page (public home)
│   └── layout.jsx                      # App-wide layout and providers
│
├── context/                            # React Context providers (SelectedChapterIndexContext, etc.)
│
├── db/                                 # Database setup (Drizzle schema, migrations)
│   └── schema.js
│
├── public/                             # Static assets (images, icons, og-images)
│   └── default-thumbnail.jpg
│
├── styles/                             # Tailwind config & global CSS
│   └── globals.css
│
├── .env.local                          # Environment variables (never commit!)
├── package.json                        # Project dependencies and scripts
├── tailwind.config.js                  # Tailwind CSS configuration
├── next.config.js                      # Next.js configuration
├── README.md                           # This documentation
└── ...                                 # (Other config and helper files as needed)


First, clone this repo and install dependencies:

First, run the development server:

```bash
git clone https://github.com/Vaishnaviii03/growguide.git
cd growguide

npm install

or
yarn install

or
pnpm install
```


Next, create a `.env.local` file with your keys (Clerk, Gemini API, PostgreSQL).

Then, run the development server:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

cumentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 Live Demo

See GrowGuide in action here:  
**[https://growguide-eight.vercel.app/](https://growguide-eight.vercel.app/)**


## Learn More

To learn more about Next.js and the stack, check out the following:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Clerk.dev Docs](https://clerk.com/docs)
- [Google Gemini API (genai)](https://ai.google.dev/tutorials/get_started)
- [Drizzle ORM Docs](https://orm.drizzle.team/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Feedback & Contributing

Found a bug or have a feature request?  
Open an [issue](https://github.com/Vaishnaviii03/growguide/issues) or create a pull request!

## License

[MIT](LICENSE)


