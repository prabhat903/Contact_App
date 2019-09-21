// App XHR request are handle from here....

/***********
 * Get request... Provide action...
 */
export const Get = function (params) {
    var url = '/' + params.action,response;
    return new Promise((resolve, reject) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                response = xhttp.responseText||"";
                resolve(JSON.parse(response));
            }else if(this.status == 500){
                reject("Server Not Responding");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
}
/********
 * POST request to create Object Provide action...
 */
export const Post = function (params) {
    var url = '/'+params.action,response;
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        var data = JSON.stringify(params.data);
        http.open('POST', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                response = http.responseText||""
                resolve(JSON.parse(response));
            }else if(this.status == 500){
                reject("Server Not Responding");
            }
        }
        http.send(data);
    });
}
/*******
 * DELETE request to remove object from data base...
 */
export const Delete = function (params) {
    var url = '/'+params.action,response;
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        var data = JSON.stringify(params.data);
        http.open('DELETE', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                response = http.responseText||""
                resolve(JSON.parse(response));
            }else if(this.status == 500){
                reject("Server Not Responding");
            }
        }
        http.send(data);
    });
}
/***********
 * PUT request to update any object.....
 */
export const Update = function (params) {
    var url = '/'+params.action,response;
    return new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        var data = JSON.stringify(params.data);
        http.open('PUT', url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');

        http.onreadystatechange = function () {//Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                response = http.responseText||""
                resolve(JSON.parse(response));
            }else if(this.status == 500){
                reject("Server Not Responding");
            }
        }
        http.send(data);
    });
}