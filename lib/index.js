function log(out) {
    if (typeof out.messages !== 'undefined') {
        [].concat(out.messages).forEach(function(message) {
            console.log(`[${out.name}]: ${message}`);
        });
    }

    if (out.done === true) {
        console.log(`[${out.name}]: done`);
    }

    if (out.error === true) {
        console.log(`[${out.name}]: error`);
    }
}

export default function start(...tasks) {
    return tasks.reduce(function(current, next) {
        return current
            .then(function() {
                return new Promise(function(resolve, reject) {
                    log({ name: next.name, messages: 'start' });

                    return next(
                        function(messages) {
                            log({ name: next.name, messages, done: true });
                            resolve();
                        },
                        function(messages) {
                            log({ name: next.name, messages, error: true });
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
}
