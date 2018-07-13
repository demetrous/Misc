
originalOnload = window.onload;
window.onload = function () {
    if (originalOnload) {
        originalOnload();
    }
    $(document).ready(function () {

        //console.log($("#answerPickerDivId"));
        //console.log(document.getElementById('criteriaDataBrowser'));
        //$("#criteriaDataBrowser span span span.treeNodeText").click(console.log($(this)));

        $(document).on("click", "#criteriaDataBrowser span span.treeNodeDetails span.treeNodeText", function () {
            //$(this).attr('data-tippy','');
            console.log($(this).text());

            fetch('https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson').then(resp => resp.json()).then(data => {


                var dataParsed = JSON.parse(data)
                var contentHtml = ""

                //console.log(content)

                for (var key in dataParsed) {
                    if (dataParsed.hasOwnProperty(key)) {

                        if (key == "Name") {
                            //continue;
                        }

                        contentHtml += "<div class=\"p-0 m-0 mb-2\"><h4 class=\"mb-0 pb-0\" style=\"font-size:1rem;\">" + key + "</h4>" + dataParsed[key] + "</div>";
                    }
                }

                console.log(contentHtml)
                //content.innerHTML = contentHtml//'<img width="500" height="500" src="' + url + '">'
                //tip.loading = false
            }).catch(e => {
                console.log('Failed to load the data')
                //tip.loading = false
            })

            $(this).attr("id", "newItem");



            var newDiv = document.createElement("div");

            newDiv.id = "newDiv";

            //newDiv.style = "display: none;"

            // and give it some content 
            var newContent = document.createTextNode("Loading the content...");
            // add the text node to the newly created div
            newDiv.appendChild(newContent);

            document.getElementById("criteriaDataBrowser").appendChild(newDiv);

            const template = document.querySelector('#newDiv')
            const initialText = template.textContent;

            const tip = tippy('#newItem', {
                html: document.querySelector('#newDiv'),
                maxWidth: "100px",
                placement: "right",
                html: '#newDiv',
                onShow() {
                    // `this` inside callbacks refers to the popper element
                    const content = this.querySelector('.tippy-content')

                    console.log(this)

                    if (tip.loading || content.innerHTML !== initialText) return

                    tip.loading = true


                    fetch('https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson').then(resp => resp.json()).then(data => {


                        var dataParsed = JSON.parse(data)
                        var contentHtml = ""

                        //console.log(content)

                        for (var key in dataParsed) {
                            if (dataParsed.hasOwnProperty(key)) {

                                if (key == "Name") {
                                    //continue;
                                }

                                contentHtml += "<div class=\"p-0 m-0 mb-2\"><h4 class=\"mb-0 pb-0\" style=\"font-size:1rem;\">" + key + "</h4>" + dataParsed[key] + "</div>";
                            }
                        }


                        content.innerHTML = contentHtml//'<img width="500" height="500" src="' + url + '">'
                        tip.loading = false
                    }).catch(e => {
                        content.innerHTML = 'Failed to load a definition'
                        tip.loading = false
                    })
                },
                onHidden() {
                    const content = this.querySelector('.tippy-content')
                    content.innerHTML = initialText
                }
            })

            // $(this).attr('title','Hi from tippy').addClass("myClass");
            // tippy(".myClass");

            // var newDiv = document.createElement("button");

            // newDiv.className = "newBtn";
            // newDiv.title = "Hello from button";

            // //newDiv.style = "display: none;"

            // // and give it some content 
            // var newContent = document.createTextNode("Loading the content...");
            // // add the text node to the newly created div
            // newDiv.appendChild(newContent);

            // // add the newly created element and its content into the DOM 
            // document.getElementById("criteriaDataBrowser").appendChild(newDiv);
            // tippy(".newBtn");

            // var script = document.createElement("script");
            // script.type = "text/javascript";
            // script.src = 'tippy(".newBtn");';
            // document.getElementsByTagName("#criteriaDataBrowser")[0].appendChild(script);



        });

    });
};


//console.log('hi from criteria');




function addElement() {
    // create a new div element 
    var newDiv = document.createElement("div");

    newDiv.id = "template";
    newDiv.style = "display: none;"

    // and give it some content 
    var newContent = document.createTextNode("Loading the content...");
    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM 
    document.getElementsByTagName("body")[0].appendChild(newDiv);

}


var loadTippy = function () {
    const template = document.querySelector('#template')
    const initialText = template.textContent



    //console.log('hi from tippy');

    const tip = tippy('#criteriaDataBrowser span span span', {
        target: '',
        interactive: true,
        trigger: "click",
        arrow: true,
        maxWidth: '40vh',
        placement: 'left-start',
        html: '#template',
        onShow() {
            // `this` inside callbacks refers to the popper element
            const content = this.querySelector('.tippy-content')

            console.log(this)

            if (tip.loading || content.innerHTML !== initialText) return

            tip.loading = true


            fetch('https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson').then(resp => resp.json()).then(data => {


                var dataParsed = JSON.parse(data)
                var contentHtml = ""

                //console.log(content)

                for (var key in dataParsed) {
                    if (dataParsed.hasOwnProperty(key)) {

                        if (key == "Name") {
                            //continue;
                        }

                        contentHtml += "<div class=\"p-0 m-0 mb-2\"><h4 class=\"mb-0 pb-0\" style=\"font-size:1rem;\">" + key + "</h4>" + dataParsed[key] + "</div>";
                    }
                }


                content.innerHTML = contentHtml//'<img width="500" height="500" src="' + url + '">'
                tip.loading = false
            }).catch(e => {
                content.innerHTML = 'Failed to load a definition'
                tip.loading = false
            })
        },
        onHidden() {
            const content = this.querySelector('.tippy-content')
            content.innerHTML = initialText
        },
        // prevent tooltip from displaying over button
        popperOptions: {
            modifiers: {
                preventOverflow: {
                    enabled: false
                },
                hide: {
                    enabled: false
                }
            }
        }
    })
}

addElement();
setTimeout(loadTippy, 200);
//loadTippy();
