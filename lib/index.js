export default function(logger = console.log.bind(console)) {
    return function(...tasks) {
        return tasks.reduce(function(current, next) {
            return current
                .then(function() {
                    return new Promise(function(resolve, reject) {
                        logger({ name: next.name, type: 'start' });

                        return next(
                            function(messages) {
                                logger({ name: next.name, messages, type: 'resolve' });
                                resolve();
                            },
                            function(messages) {
                                logger({ name: next.name, messages, type: 'reject' });
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
