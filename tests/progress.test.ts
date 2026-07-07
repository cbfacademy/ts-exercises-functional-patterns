import { describe, expect, it } from 'vitest';

// Autograding for Session 4: Functional patterns and narrowing.
// Two deliberate runtime bugs live in the starter:
//   1. completedModules filters on 'complete' instead of 'completed', so it
//      returns nothing until fixed.
//   2. progressSummary's 'completed' branch reads `lastActivity` (which a
//      completed module does not have) instead of `completedOn`, printing
//      "completed on undefined" until fixed.
// These tests fail on the untouched starter and pass once both are corrected.
import {
    completedModules,
    findLearner,
    progressSummary,
} from '../exercise/progress';

const amara = {
    learner: { id: 'L001', name: 'Amara Okafor', email: 'amara@example.com' },
    modules: [
        {
            title: 'From Java to TypeScript',
            status: 'completed',
            completedOn: new Date('2026-05-04'),
        },
        {
            title: 'Core types',
            status: 'in-progress',
            lastActivity: new Date('2026-05-11'),
        },
        { title: 'Interfaces, aliases, and generics', status: 'not-started' },
    ],
};

const dev = {
    learner: { id: 'L002', name: 'Dev Patel', email: 'dev@example.com' },
    modules: [
        {
            title: 'From Java to TypeScript',
            status: 'in-progress',
            lastActivity: new Date('2026-05-06'),
        },
    ],
};

const enrolments = [amara, dev];

describe('session 4: progress', () => {
    it('completedModules returns only completed modules', () => {
        const result = completedModules(amara);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('From Java to TypeScript');
    });

    it('progressSummary names the learner and every module', () => {
        const summary = progressSummary(amara);
        expect(summary).toContain('Amara Okafor');
        expect(summary).toContain('From Java to TypeScript');
        expect(summary).toContain('Core types');
        expect(summary).toContain('Interfaces, aliases, and generics');
    });

    it('progressSummary shows a completed date, not undefined', () => {
        const summary = progressSummary(amara);
        expect(summary).not.toContain('undefined');
        expect(summary).toContain('2026');
    });

    it('findLearner returns the matching enrolment', () => {
        expect(findLearner(enrolments, 'L002')).toBe(dev);
    });

    it('findLearner returns undefined when no learner matches', () => {
        expect(findLearner(enrolments, 'L999')).toBeUndefined();
    });
});
