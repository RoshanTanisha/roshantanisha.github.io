console.log('load_talk.js loaded...');

(document.onready = function() {

    console.log('document.onready');

    let xml_document = 'xmls/projects.xml';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', xml_document);
    xhr.onreadystatechange = function(){
        if (xhr.status === 200) {
            let xmlString = xhr.responseXML;
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
        $xml.find('project').each(function(){
            
            $title = '<div class="popover-header font-weight-bold">' + $(this).find("title").text().trim() + '</div>';

            $description = '<div class="popover-body text-justify">' + $(this).find("description").text().trim() + '</div>';
            
            $tech_stack = '<div class="popover-body"> <u class="font-weight-bold">Tech Stack:</u> ' + $(this).find("tech_stack").text().trim() + '</div>';
            
            $("#content").append('<div class="container container-fluid">' + $title + $description + $tech_stack + '</div>');
            
        });
    }
}
