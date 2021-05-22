console.log('load_talk.js loaded...');

(document.onready = function() {

    console.log('document.onready');

    let xml_document = 'xmls/projects.xml';
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
        $num_projs_row = 5;
        $total = $xml.find('project').length;
        $xml.find('project').each(function(index, value){
            // $title = '<div class="popover-header font-weight-bold">' + $(this).find("title").text().trim() + '</div>';
            // $description = '<div class="popover-body text-justify">' + $(this).find("description").text().trim() + '</div>';
            // $tech_stack = '<div class="popover-body"> <u class="font-weight-bold">Tech Stack:</u> ' + $(this).find("tech_stack").text().trim() + '</div>';
            // $("#content").append('<div class="container container-fluid">' + $title + $description + $tech_stack + '</div>');
            if ((index != 0 && index % $num_projs_row == 0) || index == $total - 1) {
                $("#content").append($row_string + '</div>');
            }
            if (index % $num_projs_row == 0) {
                $row_string = '<div class="container row">'
            }
            $title = '<div class="flip-card-front flip-card-style px-2 py-2 py2 px2">' + $(value).find("title").text().trim() + '</div>';

            $description = '<div class="flip-card-back flip-card-style"><p>' +  $(value).find("description").text().trim() + '</p><p><u>' + $(value).find("tech_stack").text().trim() + '</u></p></div>';
            $div_string = '<div class="flip-card col-lg py-2 py2 mx2 mx-2 px2 px-2 my2 my-2"><div class="flip-card-inner">' + $title + $description + '</div></div>';

            $row_string += $div_string;

            // $("#content").append($div_string);
            // console.log('div_string = ', $div_string);
            console.log('index = ', index);
        });
    }
}
