export default (reporter = console.log) => (...tasks) => {
  return tasks.reduce((current, next) => {
    return current.then((output) => {
      const task = next(output);

      // nested Start
      if (task instanceof Promise) {
        return task;
      }

      const name = task.name;
      let taskPromise = null;

      reporter(name, 'start');

      // catch an errors that are outside of task Promise
      try {
        taskPromise = task(reporter.bind(reporter, name, 'info'));
      } catch (error) {
        reporter(name, 'reject', error);
      }

      return taskPromise
        .then((result) => {
          reporter(name, 'resolve');

          return result;
        })
        .catch((error) => {
          reporter(name, 'reject', error);

          throw error;
        });
    });
  }, Promise.resolve());
};
