
originalOnload = window.onload;
window.onload = function () {
    if (originalOnload) {
        originalOnload();
    }
    // $(document).ready(function () {
    //     // $("[title='Census Term Selection']").popover({
    //     //     title: "title",
    //     //     content: 'conjkdfjdkf kdsfjgkdsjf s dfkgjs  dfkjgkdsjfgs dfjksdf gs jdfkjgdlskfjg dskfg  sdfkgj dfgtent',                
    //     //     html: true,
    //     //     placement: 'right'
    //     // }).popover('show');

    //     console.log($("#criteriaDataBrowser"));
    // });
};


console.log('hi from criteria');


function addElement() {
    // create a new div element 
    var newDiv = document.createElement("div");

    newDiv.id = "template";
    newDiv.style = "display: none;"

    // and give it some content 
    var newContent = document.createTextNode("Loading a new image...");
    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM 
    document.getElementsByTagName("body")[0].appendChild(newDiv);;


}

var loadTippy = function () {
    const template = document.querySelector('#template')
    const initialText = template.textContent

    console.log('hi from tippy');

    const tip = tippy('#criteriaDataBrowser', {
        animation: 'shift-toward',
        arrow: true,
        html: '#template',
        onShow() {
            // `this` inside callbacks refers to the popper element
            const content = this.querySelector('.tippy-content')

            if (tip.loading || content.innerHTML !== initialText) return

            tip.loading = true

            var reader = new FileReader()

            //fetch('https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson').then(resp => resp.json()).then(json => { console.log(json); })

            fetch('https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson').then(resp => resp.json()).then(blob => {
                //const url = URL.createObjectURL(blob)
                //console.log(JSON.parse(blob))
                content.innerHTML = blob //'<img width="500" height="500" src="' + url + '">'
                tip.loading = false
            }).catch(e => {
                content.innerHTML = 'Loading failed'
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
