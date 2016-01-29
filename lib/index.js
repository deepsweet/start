export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        logger({ type: 'global-start' });

        return tasks
            .reduce(function(current, next) {
                return current
                    .then(function() {
                        logger({ name: next.name, type: 'task-start' });

                        return next().then(function(message) {
                            logger({ name: next.name, message, type: 'task-resolve' });
                        });
                    })
                    .catch(function(message) {
                        // "hard" errors
                        if (message instanceof Error) {
                            console.error(message.stack);
                        // "soft" errors
                        } else {
                            logger({ name: next.name, message, type: 'task-reject' });
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
