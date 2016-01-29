export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        logger({ type: 'global-start' });

        return tasks
            .reduce(function(sequence, task) {
                const name = task.name;

                return sequence
                    .then(function() {
                        logger({ name, type: 'task-start' });

                        return task().then(function(message) {
                            logger({ name, message, type: 'task-resolve' });
                        });
                    })
                    .catch(function(message) {
                        // "hard" errors
                        if (message instanceof Error) {
                            console.error(message.stack);
                        // "soft" errors
                        } else {
                            logger({ name, message, type: 'task-reject' });
                        }

                        logger({ type: 'global-reject' });

                        throw new Error(message);
                    });
            }, Promise.resolve())
            .then(function() {
                logger({ type: 'global-resolve' });
            });
    };
}
