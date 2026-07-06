// Session 4 integrated exercise starter.
// Rename this file to progress.ts, then follow the README.

// The domain you are modelling:
// - A learner has an id, a name, and an email.
// - A module progress record has a title and a status, which is one of
//   'not-started', 'in-progress', or 'completed'. An in-progress module
//   also has a lastActivity date. A completed module also has a
//   completedOn date. A not-started module has nothing extra.
// - An enrolment links a learner to an array of module progress records.
//
// A couple of these functions contain runtime bugs that only become
// obvious once the types are applied. The demo output below is wrong in
// two places. The compiler will find both for you.

// Returns only the completed modules for an enrolment.
export function completedModules(enrolment) {
    return enrolment.modules.filter((module) => module.status === 'complete');
}

// Returns a human-readable summary of an enrolment's progress.
export function progressSummary(enrolment) {
    const lines = enrolment.modules.map((module) => {
        switch (module.status) {
            case 'not-started':
                return `- ${module.title}: not started`;
            case 'in-progress':
                return `- ${module.title}: in progress, last activity ${module.lastActivity}`;
            case 'completed':
                return `- ${module.title}: completed on ${module.lastActivity}`;
        }
    });
    return `Progress for ${enrolment.learner.name}:\n${lines.join('\n')}`;
}

// Finds the enrolment for the learner with the given id.
export function findLearner(enrolments, id) {
    return enrolments.find((enrolment) => enrolment.learner.id === id);
}

// Try it: compile with `npx tsc`, then run `node progress.js`.
const enrolments = [
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
