
// Pozivi modul 
let Pozivi = (function () {
    const api = {
        gradovi: '/gradovi'
    }
    const contentJson = {
        key: 'Content-Type',
        value: 'application/json;charset=UTF-8'
    }

    function dajStranicuGradova(data, callback, errorCallback) {
        var xhttp = new XMLHttpRequest();
        var params = `page=${data.page}&limit=${data.limit}`;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            } else if(this.readyState == 4  && this.status >= 400) {
                errorCallback(this.responseText);
            }
        };
        xhttp.open("GET", `${api.gradovi}?${params}`, true);
        xhttp.setRequestHeader(contentJson.key, contentJson.value)
        xhttp.send(JSON.stringify(data));
    }


    return {
        dajStranicuGradova,
    }
}());

