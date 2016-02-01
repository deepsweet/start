export default (logger = console.log) => (...tasks) => {
    return tasks.reduce((current, next) => {
        return current.then(output => {
            const task = next(output);
            const name = task.name;
            const log = (message) => logger({ name, type: 'info', message });

            logger({ name, type: 'start' });

            return task(log)
                .then(result => {
                    logger({ name, type: 'resolve' });

                    return result;
                })
                .catch(error => {
                    // "hard" errors
                    if (error instanceof Error) {
                        logger({ name, type: 'reject', message: error.message });
                        console.error(error.stack);

                        throw error;
                    }

                    logger({ name, type: 'reject', message: error });

                    throw new Error(error);
                });
        });
    }, Promise.resolve());
};
