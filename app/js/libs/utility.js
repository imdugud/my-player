'use strict';
/**
 * @param {{type: string, url: {String}, beforeSend: beforeSend, success: success, error: {Function}, complete: {Function}}} params
 */
Document.prototype.httpReq = function (params) {

    var xhr = new XMLHttpRequest();

    xhr.open(params.type, params.url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {// 0 when files are loaded locally (e.g., cordova/phonegap app.)
                params.success && params.success(xhr.responseText);
                params.complete && params.complete();
            } else {
                params.error && params.error(xhr.responseText);
                params.complete && params.complete();
            }
        }
    };
    params.beforeSend && params.beforeSend(xhr);
    xhr.send();
};
/**
 * @param {{
 * url: {String}
 * success: {Function}
 * error: {Function}
 * complete: {Function}
 * }} params
 */
Document.prototype.getJSON = function (params) {
    document.httpReq({
        type: 'get',
        url: params.url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Accept', 'application/json, text/javascript');
        },
        success: function (res) {
          if (res === ""){
            params.success({err:'json file is empty.'});
          }else{
            params.success && params.success(JSON.parse(res));
          }
        },
        error: params.error,
        complete: params.complete
    });
};
