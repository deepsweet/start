export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        logger({ type: 'global-start' });

        return tasks
            .reduce(function(sequence, task) {
                const name = task.name;

                return sequence
                    .then(function() {
                        logger({ name, type: 'task-start' });

                        return task()
                            .then(function(message) {
                                logger({ name, message, type: 'task-resolve' });
                            })
                            .catch(function(error) {
                                // "hard" errors
                                if (error instanceof Error) {
                                    logger({ name, message: error.message, type: 'task-reject' });
                                    console.error(error.stack);
                                    logger({ type: 'global-reject' });

                                    throw error;
                                }

                                logger({ name, message: error, type: 'task-reject' });
                                logger({ type: 'global-reject' });

                                throw new Error(error);
                            });
                    });
            }, Promise.resolve())
            .then(function() {
                logger({ type: 'global-resolve' });
            });
    };
}
