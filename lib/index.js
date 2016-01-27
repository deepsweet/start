export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        return tasks.reduce(function(current, next) {
            return current
                .then(function() {
                    return new Promise(function(resolve, reject) {
                        logger({ name: next.name, messages: 'start' });

                        return next(
                            function(messages) {
                                logger({ name: next.name, messages, done: true });
                                resolve();
                            },
                            function(messages) {
                                logger({ name: next.name, messages, error: true });
                                reject();
                            }
                        );
                    });
                })
                .catch(function(error) {
                    if (typeof error !== 'undefined') {
                        console.error(error.stack);
                    }

                    throw new Error(error);
                });
        }, Promise.resolve());
    };
}
