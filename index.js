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
        case `user`:
            const username = args[0];
            extractCommentsByName(files, username);
            break;
        case 'important':
            extractImportantComments(files);
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

function extractCommentsByName(files, name) {
    for (const file of files) {
        for (let line of file.split('\n')) {
            if (line.startsWith('// TODO') && line.includes(name)) {
                console.log(line);
            }
        }
    }
}


// TODO you can do it!
