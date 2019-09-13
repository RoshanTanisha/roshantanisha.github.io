console.log('load_talk.js loaded...');

(document.onready = function() {

    console.log('document.onready');

    let xml_document = 'xmls/talks.xml';
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
        $xml.find('session').each(function(){
            $title = '<div class="popover-header text-justify">' + $(this).find("title").text().trim() + '</div>';
            $gist = '<div class="popover-body text-justify">' + $(this).find("gist").text().trim() + '</div>';
            $organizer_link = $(this).find("organizer_link").text().trim();
            $organizer = '<div class="container"><a href="' + $organizer_link + '" class="page-link' +
                ' text-justify">' + $(this).find("organizer").text().trim() + '</div></a>';
            $slide_link = $(this).find("link").text().trim();
            $place = $(this).find("place").text().trim();
            $date_place_slide = '<div class="container-fluid"><span class="text-left"><i' +
                ' class="fa fa-location-arrow"></i>' + $(this).find("place").text().trim() + '&nbsp;<i class="fa' +
                ' fa-calendar-check-o"></i>' + $(this).find("date").text().trim() + '</span>&nbsp;<span' +
                ' class="align-content-end"><i class="fa fa-slideshare"></i><a href="' + $slide_link + '">Slides</a></span></div>';
            $codes = $(this).find("code");

            if ($codes.length !== 0) {
                $code_html = '<div class="container container-fluid"><i class="fa fa-code"></i>';

                $codes.each(function () {
                    $code_html += '<a href="' + $(this).find("code_link").text().trim() + '" class="nav-link">Code: ' +
                        $(this).find("code_title").text().trim() + '</a>';
                });
                $code_html += '</div>';
            }else{
                $code_html = '';
            }
            $("#content").append('<div class="container container-fluid">' + $title + $organizer + $date_place_slide + $code_html + $gist + '</div>');
        });
    }
}
