const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    const [commands, ...args] = command.split(' ');
    switch (commands) {
        case 'sort':
            const data = args[0];
            switch(data) {
                case 'importance':
                    showImportantComments(files);
                    break;
                case 'user':
                    showCommentsByName(files);
                    break;
                case 'date':
                    sortCommentsByDate(files);
                    break;
                    default:
                        break;

            }
        case `user`:
            const username = args[0];
            extractCommentsByName(files, username);
            break;
        case 'important':
            extractImportantComments(files, 'show');
            break;
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            extractComments(files);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

function extractComments(files) {
    for (const file of files) {
        for (const line of file.split('\n')) {
            if (line.startsWith('// TODO')) {
                console.log(line);
            }
        }
    }
}

function extractImportantComments(files) {
    for (const file of files) {
        for (const line of file.split('\n')) {
            if (line.startsWith('// TODO') && line.includes('!')) {
                console.log(line);
            }
        }
    }
}

function showImportantComments(files) {
    const notImportantComments = [];
    const importantComments = [];
    for (const file of files) {
        for (const line of file.split('\n')) {
            if (line.startsWith('// TODO')) {
                if (line.includes('!')) {
                    importantComments.push(line);
                } else {
                    notImportantComments.push(line)
                }
            }
        }
    }
    console.log(importantComments.join('\n'));
    console.log(notImportantComments.join('\n'));
}

function extractCommentsByName(files, name) {
    for (const file of files) {
        for (let line of file.split('\n')) {
            if (line.startsWith('// TODO') && line.includes(name)) {
                console.log(line);
            }
        }
    }
}


function showCommentsByName(files) {
    const namedComments = [];
    const notNamedComments = [];
    for (const file of files) {
        for (let line of file.split('\n')) {
            if (line.startsWith('// TODO')) {
                const name = line.split(';')[0].slice(8).trim();
                if (name != null) {
                    namedComments.push(line);
                } else {
                    notNamedComments.push(line)
                }
            }
        }
    }
    console.log(namedComments.join('\n'));
    console.log(notNamedComments.join('\n'));
}

function sortCommentsByDate(files){
    const datesArray = [];
    const withoutDates = [];
    for (const file of files) {
        for (const line of file.split('\n')) {
            if (line.startsWith('// TODO')) {
                const dateMatch = /^\d{4}-\d{2}-\d{2}$/;
                if (dateMatch) {
                    const date = dateMatch[1];
                    datesArray.push({line, date});
                } else {
                    withoutDates.push(line);
                }
            }
        }
    }
    datesArray.sort((a,b) => new Date(b.date) - new Date(a.date));
    const sortedDatesArray = [datesArray.map(item => item.line)];
    console.log(sortedDatesArray.join('\n'));
    console.log(withoutDates.join('\n'));
}

// TODO анекдот
