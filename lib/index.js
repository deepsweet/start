export default function(tasks) {
    return []
        .concat(tasks)
        .reduce((sequence, task) => {
            return sequence.then(() => {
                console.log(`[${task.name}]: start`);

                return task()
                    .then(message => {
                        console.log(`[${task.name}]: done`);

                        const messagesList = [].concat(message);

                        messagesList.forEach(messageItem => {
                            if (messageItem) {
                                console.log(`[${task.name}]: ${messageItem}`);
                            }
                        });
                    })
                    .catch(error => {
                        console.log(`[${task.name}]: error`);

                        if (error) {
                            console.log(`[${task.name}]: ${error}`);
                        }

                        throw new Error(error);
                    });
            });
        }, Promise.resolve());
}
