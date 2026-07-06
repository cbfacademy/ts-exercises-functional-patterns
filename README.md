# TypeScript Exercise Template

This template repository is used to create autograded **TypeScript** exercise repositories for CBF Academy bootcamps. It includes a GitHub Classroom autograding workflow that scores student submissions on **functionality** and **code quality** by executing unit tests (Vitest) and submitting the code changes for review by an automated agent.

Use this template for plain-TypeScript exercises (`ts-exercises-<name>`). For React exercises, use the `ts-react-exercise-template` instead.

## What's in here

| Path                                          | Purpose                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `exercise/`                                   | Where the starter code lives. Has its own strict `tsconfig.json`.           |
| `tests/`                                      | Where the autograding unit tests live (`<name>.test.ts`).                   |
| `vitest.config.ts`                            | Runs `tests/**` and writes JUnit XML to `test-results/junit.xml`.           |
| `.github/workflows/classroom-autograding.yml` | Calls the shared reusable workflow with `toolchain: node`.                  |
| `.github/workflows/typecheck.yml`             | Fast `npx tsc` feedback on every push once the starter is renamed to `.ts`. |
| `package.json`                                | Shared tooling: Vitest, TypeScript, ESLint, Prettier.                       |

## Usage

1. Create a new repository from this template:
    - **Template:** select this repository
    - **Name:** use the `ts-exercises-<exercise name>` convention, e.g. `ts-exercises-core-types`
    - **Visibility:** Public (needed for Classroom)
2. After initialising, open the repo settings and mark it as a **template** so it can be used for assignments.
3. Add the exercise on the `main` branch:
    - Put the starter in `exercise/` (e.g. `exercise/calculator.js`). **Export** every function the tests import, so the grader can reach them.
    - Put the unit tests in `tests/` (e.g. `tests/calculator.test.ts`), importing from `../exercise/<file>`.
    - Replace this README with the exercise brief for students.
4. Create a `solutions` branch and commit a reference solution to it (the renamed `.ts`, fully typed, bugs fixed). Confirm `npm test` is green against it.
5. Push all branches.

## Testing (Classroom assignment settings)

Create a new Classroom assignment using the exercise repo as the starter template, with:

- **Repository visibility:** Private
- **Grant students admin access to their repository:** Disabled
- **Copy the default branch only:** Enabled (keeps the `solutions` branch private)
- **Supported editor:** Don't use an online IDE
- **Protected file paths:** `.github/**/*`, `**/tests/**/*` — so students cannot edit the workflows or the autograding tests
- **Enable feedback pull requests:** Enabled

Then accept the assignment from a test account, commit and push, and review the Actions output and the Feedback PR comment to confirm everything works.

## How grading works

- **Functionality** comes from the Vitest suite: the reusable workflow runs `npm ci && npm test`, parses `test-results/junit.xml`, and scales the pass rate to 5 points.
- **Code quality** comes from the automated agent review of the submission, scaled to 5 points.

> Note: for exercises whose only defect is a **type** error (nothing wrong at runtime), Vitest cannot distinguish a finished submission from the starter — the `typecheck.yml` check and the agent review are what catch untyped work. Design at least one **runtime-observable** requirement per exercise where you want the functionality score to reflect real progress.
