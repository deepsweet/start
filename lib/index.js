export default function(tasks) {
    return []
        .concat(tasks)
        .reduce((sequence, task) => {
            return sequence.then(() => {
                console.log(`[${task.name}]: start`);

                return task()
                    .then(message => {
                        console.log(`[${task.name}]: done`);

                        if (message) {
                            console.log(`[${task.name}]: ${message}`);
                        }
                    })
                    .catch(error => {
                        console.log(`[${task.name}]: error`);

                        if (error) {
                            console.log(`[${task.name}]: ${error}`);
                        }

                        process.exit(1);
                    });
            });
        }, Promise.resolve());
}
