
originalOnload = window.onload;
window.onload = function () {
    if (originalOnload) {
        originalOnload();
    }
    $(document).ready(function () {
        $("[title='Census Term Selection']").popover({
            title: "title",
            content: 'conjkdfjdkf kdsfjgkdsjf s dfkgjs  dfkjgkdsjfgs dfjksdf gs jdfkjgdlskfjg dskfg  sdfkgj dfgtent',                
            html: true,
            placement: 'right'
        }).popover('show');
        
        console.log($("#criteriaDataBrowser"));
        console.log($('#criteriaDataBrowser$Census Term Selection_details'));
    });
};