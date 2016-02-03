export default (logger = console.log) => (...tasks) => {
    return tasks.reduce((current, next) => {
        return current.then(output => {
            if (next instanceof Promise) {
                return next;
            }

            const task = next(output);
            const name = task.name;

            logger(name, 'start');

            return task(logger.bind(logger, name, 'info'))
                .then(result => {
                    logger(name, 'resolve');

                    return result;
                })
                .catch(error => {
                    // hard error
                    if (error instanceof Error) {
                        logger(name, 'reject', error.message);
                        console.error(error.stack);
                    // soft error
                    } else {
                        logger(name, 'reject', error);
                    }

                    throw error;
                });
        });
    }, Promise.resolve());
};
