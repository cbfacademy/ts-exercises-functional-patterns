# Session 4: Functional patterns and narrowing

**What you are practising:** discriminated unions, narrowing, immutability, and `map`/`filter`/`reduce`, pulled together in one integrated exercise.

## Setup

Accept the assignment, clone **your** repository, then install the tooling once:

```bash
npm install
```

## The workflow

1. Open a terminal in the `exercise/` folder.
2. Rename the starter: `mv progress.js progress.ts`.
3. Work through what the compiler surfaces.
4. Compile with a bare `npx tsc`. Not `npx tsc progress.ts`: with a filename argument, `tsc` ignores `tsconfig.json` and the strict settings with it.
5. Run the output: `node progress.js`.

## Your task

This is the last TypeScript exercise of the module and it pulls together sessions 1 to 4. The file contains skeleton functions and a test block. All of them are untyped, and a couple contain runtime bugs that only become obvious once types are applied. Run the starter and compare its output against the data; two things are quietly wrong.

1. Rename `progress.js` to `progress.ts`.
2. Model the domain with interfaces and/or type aliases:
    - a `Learner` with `id`, `name`, and `email`
    - a `ModuleProgress` with a `title` and a `status`, discriminated on status: `'not-started'`, `'in-progress'`, or `'completed'`. A completed module has a `completedOn: Date`, an in-progress module has a `lastActivity: Date`, and a not-started module has nothing extra.
    - an `Enrolment` that links a learner to an array of `ModuleProgress`
3. Implement these functions with correct types:
    - `completedModules(enrolment: Enrolment): ModuleProgress[]`, returning only completed modules
    - `progressSummary(enrolment: Enrolment): string`, returning a human-readable summary using a discriminated union switch
    - `findLearner(enrolments: Enrolment[], id: string): Enrolment | undefined`, using a generic helper if you want
4. Use `map`, `filter`, or `reduce` at least once.
5. Do not mutate any input.
6. Compile with `npx tsc` and run with `node progress.js`.

Keep the exported function names (`completedModules`, `progressSummary`, `findLearner`) — the autograder imports them by name.

## Stretch goals

- Add an `exhaustive` helper and use it in `progressSummary` so that adding a new module status becomes a compile error.
- Add a function that takes an `Enrolment` and returns a new `Enrolment` with one module marked as complete, using the four immutable moves from Part 1 of the session.
- Extract the generic `findById` from session 3 and use it inside `findLearner`.

## Done when

`npx tsc` completes with no errors, `node progress.js` shows Amara's completed module in the list and a summary with real dates (no `undefined`), no input is mutated, and your work is committed and pushed.

## How your work is graded

Every push runs two GitHub Actions checks:

- **Type check** — runs `npx tsc` on your exercise under the strict settings, once you have renamed the starter to `.ts`.
- **Autograding** — runs an automated test suite (Vitest) against your functions and reports a functionality score, plus an automated code-quality review.
