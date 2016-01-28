export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        logger({ type: 'global-start' });

        return tasks
            .reduce(function(current, next) {
                return current
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            logger({ name: next.name, type: 'task-start' });

                            return next(
                                function(messages) {
                                    logger({ name: next.name, messages, type: 'task-resolve' });
                                    resolve();
                                },
                                function(messages) {
                                    logger({ name: next.name, messages, type: 'task-reject' });
                                    reject();
                                }
                            );
                        });
                    });
            }, Promise.resolve())
            .then(function() {
                logger({ type: 'global-resolve' });
            })
            .catch(function(error) {
                logger({ type: 'global-reject' });

                // don't mute hard errors
                if (error instanceof Error) {
                    console.error(error.stack);
                }

                throw new Error(error);
            });
    };
}
