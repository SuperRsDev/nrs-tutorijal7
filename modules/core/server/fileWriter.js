const fs = require('fs');

class FileWriter {
    writeJson(path, json) {
        let data = JSON.stringify(json, null, 2);
        fs.writeFileSync(path, data);
    }
}

exports.FileWriter = new FileWriter();