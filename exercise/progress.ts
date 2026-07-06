// Session 4 reference solution: Functional patterns and narrowing.

interface Learner {
    id: string;
    name: string;
    email: string;
}

type ModuleProgress =
    | { title: string; status: 'not-started' }
    | { title: string; status: 'in-progress'; lastActivity: Date }
    | { title: string; status: 'completed'; completedOn: Date };

interface Enrolment {
    learner: Learner;
    modules: ModuleProgress[];
}

// Returns only the completed modules for an enrolment.
// Fixed: the starter filtered on 'complete' instead of 'completed'.
export function completedModules(enrolment: Enrolment): ModuleProgress[] {
    return enrolment.modules.filter((module) => module.status === 'completed');
}

// Returns a human-readable summary of an enrolment's progress.
export function progressSummary(enrolment: Enrolment): string {
    const lines = enrolment.modules.map((module) => {
        switch (module.status) {
            case 'not-started':
                return `- ${module.title}: not started`;
            case 'in-progress':
                return `- ${module.title}: in progress, last activity ${module.lastActivity.toDateString()}`;
            case 'completed':
                // Fixed: the starter read `lastActivity` (undefined here) instead of `completedOn`.
                return `- ${module.title}: completed on ${module.completedOn.toDateString()}`;
        }
    });
    return `Progress for ${enrolment.learner.name}:\n${lines.join('\n')}`;
}

// Finds the enrolment for the learner with the given id.
export function findLearner(
    enrolments: Enrolment[],
    id: string,
): Enrolment | undefined {
    return enrolments.find((enrolment) => enrolment.learner.id === id);
}

// Try it: compile with `npx tsc`, then run `node progress.js`.
const enrolments: Enrolment[] = [
    {
        learner: {
            id: 'L001',
            name: 'Amara Okafor',
            email: 'amara@example.com',
        },
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
            {
                title: 'Interfaces, aliases, and generics',
                status: 'not-started',
            },
        ],
    },
    {
        learner: { id: 'L002', name: 'Dev Patel', email: 'dev@example.com' },
        modules: [
            {
                title: 'From Java to TypeScript',
                status: 'in-progress',
                lastActivity: new Date('2026-05-06'),
            },
        ],
    },
];

console.log('Completed modules for Amara:', completedModules(enrolments[0]));
console.log(progressSummary(enrolments[0]));
console.log('Looking up L002:', findLearner(enrolments, 'L002'));
console.log('Looking up L999:', findLearner(enrolments, 'L999'));
