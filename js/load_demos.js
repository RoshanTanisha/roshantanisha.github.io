console.log('load_demos.js loaded...');

(document.onready = function() {

    console.log('document.onready');

    let xml_document = 'xmls/demos.xml';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', xml_document);
    xhr.onreadystatechange = function(){
        console.log(xhr.status);
        if (xhr.status === 200) {
            let xmlString = xhr.responseXML;
            console.log(xmlString);
            handle_xml_document(xmlString);
        }
    };
    xhr.send();
}());


function handle_xml_document(xmlString) {
    if (xmlString === null) {
        return;
    }else {
        $xml = $(xmlString);
        $xml.find('demos').each(function(){
            
            $title = '<div class="popover-header font-weight-bold">' + $(this).find("title").text().trim() + '</div>';

            $description = '<div class="popover-body text-justify">' + $(this).find("description").text().trim() + '</div>';
            
            $tech_stack = '<div class="popover-body"> <u class="font-weight-bold">Video on youtube:</u> <br><iframe width="500" height="360" src="'  + $(this).find("video_source").text().trim() + '"></iframe></div>';
            
            $("#content").append('<div class="container container-fluid">' + $title + $description + $tech_stack + '</div>');
            
        });
    }
}
