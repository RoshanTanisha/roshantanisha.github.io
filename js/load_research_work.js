console.log('load_talk.js loaded...');

(document.onready = function() {

    console.log('document.onready');

    let xml_document = 'xmls/research.xml';
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
        $xml.find('research_paper').each(function(){
            $link = $(this).find("link").text().trim();
            if ($link === 'Unpublished') {
                $title = '<div class="popover-header text-justify font-weight-bold">' + $(this).find("title").text().trim() + '[' + $link + ']</div>';
            }else{
                $title = '<div class="popover-header text-justify"><a href="' + $link + '">' + $(this).find("title").text().trim() + '</a></div>';
            }
            $gist = '<div class="popover-body text-justify">' + $(this).find("abstract").text().trim() + '</div>';
            $organizer_link = $(this).find("organizer_link").text().trim();
            $("#content").append('<div class="container container-fluid">' + $title + $gist + '</div>');
        });
    }
}
