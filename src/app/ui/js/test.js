
function append_content(content) {
    document.getElementById("raw").innerHTML += content
    document.getElementById("escaped").innerHTML += escape(content)
    document.getElementById("encoded").innerHTML += encodeURI(content);

}

function clik_url_XSS_FN() {
    var url = new URL(window.location.href);
    var content = "<DIV><H2>Param Elements (False Negative)</H2><DIV>"
    // Data flow ends with the lambda, but should continue because it is not the end of the flow in
    // this scope.
    url.searchParams.forEach((v, k) => { content += "<DIV>" + k + ":" + v + "</DIV>" });
    content += "</DIV></DIV>"

    // False-Negative observed here.
    append_content("<BR>" + content)
}


function clik_url_XSS_TP() {
    var url = new URL(window.location.href);

    url.searchParams.forEach((v, k) => {
        // Data flow is true positive to here for DOM XSS
        append_content("<DIV>" + k + ":" + v + "</DIV>")
    });
}

function clik_JSON_TP() {
    var url = "";

    url.searchParams.forEach((v, k) => {

        try {
            // JSON.parse is not a sanitizer
            var obj = JSON.parse(v);

            if (!Array.isArray(obj)) {
                for (const k in obj)
                    append_content("<DIV>" + k + ":" + obj[k] + "</DIV>")
            }
            else {
                obj.forEach((o) => {
                    for (const k in o)
                        append_content("<DIV>" + k + ":" + o[k] + "</DIV>")
                });
            }
        }
        catch (SyntaxError) {
            append_content("<DIV>" + k + ":" + v + "</DIV>")
        }

    });
}

function clr() {
    document.getElementById("raw").innerHTML = "";
    document.getElementById("escaped").innerHTML = "";
    document.getElementById("encoded").innerHTML = "";
}

