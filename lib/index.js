export default (reporter = console.log) => (...tasks) => {

    function _getPromise(task) {
        // nested Start
        if (task instanceof Promise) {
            return task;
        }

        const name = task.name;
        let taskPromise;

        reporter(name, 'start');

        // catch an errors that are outside of task Promise
        try {
            taskPromise = task(reporter.bind(reporter, name, 'info'));
        } catch (error) {
            reporter(name, 'reject', error);
        }

        return taskPromise
            .then(result => {
                reporter(name, 'resolve');

                return result;
            })
            .catch(error => {
                reporter(name, 'reject', error);

                throw error;
            });
    }

    return tasks.reduce((current, next) => {
        return current.then(output => {
            if (Array.isArray(next)) {
                return Promise.all(
                    next.map(nextTask => _getPromise(nextTask(output)))
                );
            }

            return _getPromise(next(output));
        });
    }, Promise.resolve());
};
