export default (logger = console.log) => (...tasks) => {
    return tasks.reduce((current, next) => {
        return current.then(output => {
            const task = next(output);

            // nested Start
            if (task instanceof Promise) {
                return task;
            }

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
