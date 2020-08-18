const path = require('path');
const {spawn} = require('child_process');
const relpath = path.relative(__dirname, process.env.INIT_CWD);

if (!relpath) {
    spawn('nyc', ['ava'], { shell: true, stdio: 'inherit' });
} else {
    spawn('nyc', [`-n '${relpath}/**/*.js'`, `-n '${relpath}/**/*.jsx'`, 'ava', `'${relpath}/**/*.test.js'`], { shell: true, stdio: 'inherit' });
}
