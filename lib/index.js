export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        logger({ type: 'global-start' });

        return tasks
            .reduce(function(current, next) {
                return current
                    .then(function() {
                        logger({ name: next.name, type: 'task-start' });

                        return next().then(function(messages) {
                            logger({ name: next.name, messages, type: 'task-resolve' });
                        });
                    })
                    .catch(function(error) {
                        // "hard" errors
                        if (error instanceof Error) {
                            console.error(error.stack);
                        // "soft" errors
                        } else {
                            logger({ name: next.name, messages: error, type: 'task-reject' });
                        }

                        logger({ type: 'global-reject' });

                        throw new Error(error);
                    });
            }, Promise.resolve())
            .then(function() {
                logger({ type: 'global-resolve' });
            });
    };
}
