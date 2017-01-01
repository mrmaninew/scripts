// npm run watch 

// npm scripts sections 
/*
"scripts": {
  "build": "./bin/build.sh",
  "scss": "./bin/css/stylelint.sh; ./bin/css/sass.sh; ./bin/css/autoprefix.sh",
  "js": "node bin/js/fusebox.js",
  "watch": "node bin/watch.js"
},
...
*/

const fs = require('fs'),
    spawn = require('child_process').spawn;

fs.watch('src', {
    recursive: true // watch everything in the directory
}, (e, file) => {
    // Use the extension of the file as the npm script name
    const script = file.split('.').pop();

    if (['js', 'scss'].includes(script)) {
        // Spawn the process
        const p = spawn('npm', ['run', script], {
            stdio: 'inherit' // pipe output to the console
        });
        // Print something when the process completes
        p.on('close', code => {
            if (code === 1) {
                console.error(`✖ "npm run ${script}" failed.`);
            } else {
                console.log('watching for changes...');
            }
        });
    }
});

console.log('watching for changes...');