//@author: Tanisha R. Bhayani

console.log("script load_blog_content.js loaded...");

(document.onready= function () {
    console.log('document loaded');
    short_content_url = "xmls/blog_list.xml";

    let xhr = new XMLHttpRequest();
    xhr.open('GET', short_content_url);

    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            xml_document = xhr.responseXML;
            handle_xml_document(xml_document);
        }
    };

    xhr.send();
    console.log('sending xhr request');
}());

function handle_xml_document(xml_document) {
    if (xml_document === null) {
        return;
    }
    console.log('in handle_xml_document function');
    let POST_PER_ROW = 3;
    console.log('xml_document = ', xml_document);
    $xml = $(xml_document);
    $index = 1;
    $appended = false;
    $appendChildString = '';
    console.log($xml.find('posts'));
    $xml.find('posts').each(function() {
        $appended = false;
        $link = $(this).find("link").text().trim();
        $title = '<a href="' + $link + '"><h5 class="card-title text-xl-center font-weight-bold">' + $(this).find("title").text().trim() + '</h5></a>';
        $datetime = '<small class="card-subtitle">' + $(this).find("date_time").text().trim() + '</small>';
        $blog_image = '<img alt="' + $(this).find("short_text").text().trim() +'" src="' +
        $(this).find("blog_image").text().trim() + '" class="card-img">';
        $shortText = '<div class="card-body">' + $(this).find("short_text").text().trim() + '</div>';
        $appendChildString = $appendChildString + '<div class="card col-md-4 rounded">' + $title + $datetime + $blog_image + $shortText + '</div>';
        if ($index % POST_PER_ROW === 0) {
            $appendChildString = '<div class="card-deck d-flex row">' + $appendChildString + '</div><br/>';
            $("#content").append($appendChildString);
            $appended = true;
            $appendChildString = '';
        }
        $index = $index + 1;
        console.log($index);
    });
    if (!$appended) {
        $("#content").append('<div class="card-deck row">' + $appendChildString + '</div>');
    }
    console.log(document.getElementById("content"));
}
