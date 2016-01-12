export default function(tasks) {
    return []
        .concat(tasks)
        .reduce(function(sequence, task) {
            return sequence
                .then(function() {
                    console.log(`[${task.name}]: start`);

                    return task()
                        .then(message => {
                            const messagesList = [].concat(message);

                            messagesList.forEach(messageItem => {
                                if (messageItem) {
                                    console.log(`[${task.name}]: ${messageItem}`);
                                }
                            });

                            console.log(`[${task.name}]: done`);
                        });
                })
                .catch(function(error) {
                    if (error) {
                        console.log(`[${task.name}]: ${error}`);
                    }

                    console.log(`[${task.name}]: error`);

                    throw new Error(error);
                });
        }, Promise.resolve());
}
