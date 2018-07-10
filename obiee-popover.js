
//Global Namespace
var gsODS = {};
gsODS.clicked = false;


$.fn.clickToggle = function (a, b) {
    
    return this.each(function () {
        
        
        $(this).click(function () {
            if (gsODS.clicked) {
                gsODS.clicked = false;
                return b.apply(this, arguments);
            }
            gsODS.clicked = true;
            return a.apply(this, arguments);
        });
    });
};


var showPopover = function () {

    var thisElem = $(this);

    //alert("show");

    // $.getJSON("https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson", function (data) {

    //     var dataParsed = JSON.parse(data);
    //     var contentHtml = "";
    //     for (var key in dataParsed) {
    //         if (dataParsed.hasOwnProperty(key)) {
    //             contentHtml += "<h5>" + key + "</h5>" + "<p>" + dataParsed[key] + "</p>";
    //         }
    //     }

    //     thisElem.popover({
    //         content: contentHtml,
    //         html: true
    //     }).popover('show');

    // });

    $.ajax({
        url: "https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson",
        dataType: 'json',
        async: true,
        //data: myData,
        success: function (data) {
            var dataParsed = JSON.parse(data);
            var contentHtml = "";
            
            for (var key in dataParsed) {
                if (dataParsed.hasOwnProperty(key)) {

                    if (key == "Name") {
                        continue;
                    }

                    contentHtml += "<div class=\"p-0 m-0 mb-2\"><h4 class=\"mb-0 pb-0\" style=\"font-size:1rem;\">" + key + "</h4>" + dataParsed[key] + "</div>";
                }
            }

            thisElem.popover({
                title: dataParsed["Name"] + '<button type="button" class="close" onclick="closePopup(this);" style="line-height: 1rem;">&times;</button>',
                content: contentHtml,                
                html: true,
                template: '<div class="popover" style="max-width: 30vw;" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body" style="max-height:50vh; overflow: auto;"></div></div>'
            }).popover('show');
        }
    });





};

var hidePopover = function () {
    var thisElem = $(this);

    //alert("hi-CResxJY#[(-de");

    thisElem.popover('dispose');   
};


$('.ddApplications').clickToggle(showPopover, hidePopover);

var closePopup = function(param){
    gsODS.clicked = false;
    $(param).parents(".popover").popover('dispose');
}