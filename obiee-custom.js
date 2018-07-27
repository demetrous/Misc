var link = document.createElement("link");
link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css";
link.type = "text/css";
link.rel = "stylesheet";
//document.getElementsByTagName("head")[0].appendChild(link);


var link = document.createElement("link");
link.href = "https://ir.unlv.edu/external-scripts/obiee-criteria-popover.css";
link.type = "text/css";
link.rel = "stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

var scripts = [
     "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    // "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
    // "https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js",
    "https://ir.unlv.edu/external-scripts/obiee-criteria-popover.js",
    "https://unpkg.com/tippy.js@2.5.3/dist/tippy.all.min.js"
];

for (var i in scripts) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = scripts[i];
    document.getElementsByTagName("head")[0].appendChild(script);
}

function myFunc() {
    if (document.getElementById('criteriaDataBrowser')) {

        console.log(document.getElementById('criteriaDataBrowser'));
        console.log("the table should appear above");

    } else {
        console.log('went to timeout');
        setTimeout(myFunc, 15);

    }
}

//myFunc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("criteriaDataBrowser").innerHTML =
                this.responseText;
        }
    };
    xhttp.open("GET", "https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson", true);
    xhttp.send();
}


//loadDoc();

