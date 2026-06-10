# Parafia Matki Teresy

Production-ready MVP PWA for the parish community of **Kościół pw. św. Matki Teresy z Kalkuty**.

The app is built as a static Next.js App Router export for Firebase Hosting Spark plan. It uses only client-side Firebase Auth and Cloud Firestore. It does not use SSR, API routes, Cloud Functions, server actions, Storage, paid Firebase services, private messages, payments, image uploads, push notifications or AI features.

## Features

- Polish mobile-first interface with large readable controls
- Google sign-in through Firebase Auth
- Firestore-backed announcements and parish events
- Community rooms and realtime messages with `onSnapshot`
- Message reports and moderator soft deletion
- Role-aware admin panel for rooms, announcements, events and member roles
- Rules acceptance stored as `acceptedRulesAt` in member documents
- Static export compatible with Firebase Hosting `out` directory
- PWA manifest and placeholder SVG icons

## Firebase project setup

1. Create a Firebase project.
2. Enable **Authentication** and add **Google** as a sign-in provider.
3. Enable **Cloud Firestore** in production mode.
4. Add a web app in Firebase project settings.
5. Copy the web app configuration values into environment variables.
6. Deploy Firestore rules and indexes from this repository.
7. Deploy the static site to Firebase Hosting.

## Environment variables

Create `.env.local` for local development and set the same values in your hosting build environment:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

All variables are public Firebase web config values. Do not place service account keys in this app.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build command

```bash
npm run build
```

The static export is written to `out` because `next.config.ts` uses `output: 'export'`.

## Deploy command

Install Firebase CLI if needed, log in, select the project and deploy:

```bash
npm run build
firebase deploy
```

`firebase.json` is configured to deploy the `out` directory and includes Firestore rules and indexes.

## Manual first superadmin setup

The client panel intentionally cannot create or assign the `superadmin` role.

1. Sign in to the app once with the Google account that should become the first superadmin.
2. Open Firestore in the Firebase console.
3. Go to `parishes/st-mother-teresa-kalkuta/members/{uid}`.
4. Change `role` from `user` to `superadmin` manually.
5. Keep `isBanned` set to `false`.

After this, the superadmin can assign `admin`, `moderator` or `user` roles from the admin panel. No client UI assigns `superadmin`.

## Create the first parish rooms

Firestore rooms are stored under:

```text
parishes/st-mother-teresa-kalkuta/rooms/{roomId}
```

Run this helper to print seed data for the parish document and default rooms:

```bash
npm run seed:print
```

Create these documents manually in the Firebase console or import them with your preferred Firebase tooling. The default room IDs are:

- `ogloszenia-parafialne`
- `pytania-do-parafii`
- `intencje-modlitewne`
- `pomoc-sasiedzka`
- `luzne-rozmowy`

The first superadmin can also create extra rooms in the admin panel. For static export, direct page files are prebuilt for the default room IDs. Additional rooms are best opened through in-app navigation from `/community`.

## Firestore data structure

```text
parishes/{parishId}
parishes/{parishId}/members/{userId}
parishes/{parishId}/rooms/{roomId}
parishes/{parishId}/rooms/{roomId}/messages/{messageId}
parishes/{parishId}/reports/{reportId}
parishes/{parishId}/bans/{userId}
parishes/{parishId}/announcements/{announcementId}
parishes/{parishId}/events/{eventId}
```

The constant parish ID is `st-mother-teresa-kalkuta`.

## Known Firebase Spark plan limitations

- No Cloud Functions, so all moderation workflows are client UI plus Firestore Security Rules.
- No backend cron jobs or server-side notification dispatch.
- No Firebase Storage usage in this MVP.
- Firestore reads and writes are limited by the Spark quota.
- Static export means dynamic route files must be known at build time. The default room pages are prebuilt; newly created rooms should be reached through client-side navigation.
- Firestore indexes may need a few minutes to build after deployment.

## Security model

Firestore Security Rules deny by default and enforce:

- Authenticated users can read published announcements and events.
- Authenticated users can read active rooms and messages.
- Authenticated non-banned users can create valid messages.
- Users cannot edit messages.
- Moderators, admins and superadmins can soft delete messages and close rooms.
- Users can create reports.
- Admins and superadmins can manage announcements and events.
- Moderators, admins and superadmins can create rooms.
- Admins can change only `user` and `moderator` roles.
- Superadmins can assign `user`, `moderator` and `admin` roles.
- Client code cannot assign `superadmin`.
