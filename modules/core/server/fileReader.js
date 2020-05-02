const fs = require('fs');

class FileReader {
    citajFajl(path) {
        var fileContent;
    
        return new Promise(function(resolve) {
            fileContent = fs.readFileSync(path, {encoding: 'utf8'});
            resolve(fileContent);
        });
    }
    
    citajCsvUJsonObject(putanja, callback) {
        this.citajFajl(putanja)
            .then((csvPodaci) => {
                let linije = csvPodaci.split("\n");
      
                let result = [];
            
                let zaglavlje = linije[0].split(",");
              
                for(let i=1;i<linije.length;i++){
              
                    let obj = {};
                    let trenutnaLinija=linije[i].split(",");
              
                    for(var j=0;j<zaglavlje.length;j++){
                        obj[this.normalizujZaglavlje(zaglavlje[j])] = trenutnaLinija[j];
                    }
              
                    result.push(obj);
                }
            
                callback(result);
            })
    }

    citajJson(putanja, callback) {
        let rawdata = fs.readFileSync(putanja);
        let data = JSON.parse(rawdata);
        callback(data);
    }
    
    normalizujZaglavlje(redUZaglavlju) {
        return redUZaglavlju.trim().replace(/ /g,"_").toLowerCase();
    }
}

exports.FileReader = new FileReader();