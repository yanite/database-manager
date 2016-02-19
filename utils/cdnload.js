
/**
 * js 加载, 预处理等
 */

var cdnUrl = "http://cdn.bootcss.com/";

var funList = [];

var jQueryUrl = cdnUrl + "jquery/2.2.0/jquery.js";

/*
funList.push({
    baseUrl : "require.js/2.1.22/",
    files: ["require.js"]
});
*/

funList.push({
    baseUrl : "tether/1.1.1/",
    files : [
        "css/tether-theme-arrows-dark.css",
        "css/tether-theme-arrows.css",
        "css/tether-theme-basic.css",
        "css/tether.css",
        "js/tether.js"
        ]
})

funList.push({
    baseUrl : "bootstrap/3.3.5/",
    files : [
        "css/bootstrap-theme.css",
        "css/bootstrap.css",
        "js/bootstrap.js",
    ]
});

funList.push({
    baseUrl : "angular.js/1.5.0-rc.2/",
    files : [
        "angular.js",
        //"angular-route.js",
        //"i18n/angular-locale_zh.js"
    ]
});

(function() {
    var jqueryScript = document.createElement('script');
    jqueryScript.onload = function() {bodyStart()};
    jqueryScript.src = jQueryUrl;
    document.getElementsByTagName('head')[0].appendChild(jqueryScript);
})(this);

function bodyStart() {

    var oHead = document.getElementsByTagName('HEAD').item(0);
    for (var i in funList) {
        var mod = funList[i];
        var url = cdnUrl + mod.baseUrl;

   //     console.log("load js " + url);
        for (var j in mod.files) {
            var filename = mod.files[j];
            if (filename.split('.')[1] == "min")
                continue;
            console.log("    " + filename)
            if (filename.split('.')[1] == "css") {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href= url + filename;
                oHead.appendChild(link);
            } else {
                var script= document.createElement("script");
                script.type = "text/javascript";
                script.src= url + filename;
                oHead.appendChild(script);
            }
        }
    }
};
