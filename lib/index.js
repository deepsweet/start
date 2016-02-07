export default (logger = console.log) => (...tasks) => {
    return tasks.reduce((current, next) => {
        return current.then(output => {
            const task = next(output);

            // nested Start
            if (task instanceof Promise) {
                return task;
            }

            const name = task.name;
            let taskPromise;

            logger(name, 'start');

            // catch an errors that are outside of task Promise
            try {
                taskPromise = task(logger.bind(logger, name, 'info'));
            } catch (error) {
                logger(name, 'reject', error);
            }

            return taskPromise
                .then(result => {
                    logger(name, 'resolve');

                    return result;
                })
                .catch(error => {
                    logger(name, 'reject', error);

                    throw error;
                });
        });
    }, Promise.resolve());
};
