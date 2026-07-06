import { defineConfig } from 'vitest/config';

// Autograding runs `npm test` from the repository root. Tests live in `tests/`
// and import the exercise module(s). Keeping them out of `exercise/` means a
// bare `npx tsc` in `exercise/` — the workflow students follow — never picks up
// a test file.
export default defineConfig({
    test: {
        include: ['tests/**/*.test.ts'],
        environment: 'node',
        // Always emit JUnit XML so the CI test-reporter has something to
        // parse; the human-readable `default` reporter stays on for local runs.
        reporters: ['default', 'junit'],
        outputFile: { junit: 'test-results/junit.xml' },
    },
});
