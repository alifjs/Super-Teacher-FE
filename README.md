# Super Teacher: Front End

The web client for **Super Teacher**, an online classroom platform in the spirit of Google Classroom.

Back end: [Super-Teacher-BE](https://github.com/alifjs/Super-Teacher-BE)

## Features

- Landing page, registration, login, forgot / change password
- Teacher and student dashboards
- Classroom pages with stream, classwork and people: add materials, assignments, exams, meet links and students
- Real-time classroom chat (Socket.IO)
- File uploads with drag-and-drop, date pickers, toasts, dark mode

## Tech & engineering

| | |
|---|---|
| Framework | Next.js + React, TypeScript |
| State & data | Redux Toolkit + RTK Query with shared API types |
| UI | Tailwind CSS, shadcn/ui (Radix primitives), lucide icons |
| Forms | React Hook Form + Zod schemas |
| Real time | socket.io-client |
| Quality | Jest unit tests, ESLint, Prettier, Husky + commitlint, GitHub Actions (build, lint, test) |
| Infra | Dockerfile for deployment |

Code is organised by feature (`modules/classroom`, `modules/dashboard`, `modules/login`, ...). Each module keeps its components, form schemas, types and hooks together.

---

## Development setup

# Installation
Make sure you have `nvm` installed. Then, run the following commands:

```bash
$ nvm use
```

We use Node v20 by default.

```bash
$ yarn install
```

# Environment Variables
For local development and testing, please create the following files at the root of the project directory:

- `env.development.local`
- `env.test.local`

You can follow `env.example` to specify which env variables are needed for the project as a guideline, and the above two files can be created based off of this file.

# Conventions

Please refer to [this document](https://docs.google.com/document/d/1BVaXGcIUM_FET4XZWtSHLVjaZv1z6fp2HZ3eW1uBKlA/edit) for conventions for this repository.

Please pay special attention to [RTK-Query and Shared types folder structure](https://docs.google.com/document/d/1BVaXGcIUM_FET4XZWtSHLVjaZv1z6fp2HZ3eW1uBKlA/edit#heading=h.1jtw5xnt6dsd)

# Tests
- If you create any helper functions, please write unit tests for them.

```bash
# unit tests
$ yarn run test
```

# Run
## RUN dev server
```bash
yarn start:dev
```

## BUILD compiled
```bash
yarn build
```

## START on production server
```bash
yarn start
```

# Commit Convention
``subject(ticket-code): message``

Valid subjects:
``build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test``
