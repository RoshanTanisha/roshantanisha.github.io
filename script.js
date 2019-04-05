//@author: Tanisha R. Bhayani

console.log("script script.js loaded...");

function load_content(what_to_load){
    var content_link = null;
    var tag_name = null;
    var content_tag_name = null;
    if (what_to_load === "blog_content") {
        content_link = "blog_list.xml";
        tag_name = "posts";
        content_tag_name = "content";
    }
    // console.log("content_link = ", content_link);
    // console.log("tag_name = ", tag_name);
    // console.log("content_tag_name = ", content_tag_name);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            load_posts(this);
        }
    }
    xhr.open("GET", content_link, true);
    xhr.send();
    function load_posts() {
        xmlDoc = xhr.responseXML;
        post = xmlDoc.getElementsByTagName(tag_name);
        content = document.getElementById(content_tag_name);
        var string = "", tag, link;
        for (i = 0; i < post.length; i++) {
            for (j = 0; j < post[i].children.length; j++) {
                tag = post[i].children[j].nodeName;
                console.log("TAG :: ", tag);
                if (tag === "title") {
                    try {
                        link = post[i].children[j].nextElementSibling;
                        // console.log("$$", link.innerHTML);
                    } catch (e) {
                        console.log(e);
                    }
                    // console.log("String::")
                    string += "<a href = \"" + link.innerHTML + "\"><h3>" + post[i].children[j].innerHTML + "</h3></a><br>";
                    // console.log(string);
                    j++;
                } else if (tag === "short_text") {
                    string += "<i>" + post[i].children[j].innerHTML + "</i><hr>";
                } else {
                    console.log(post[i].children[j].innerHTML);
                    string += "<u>" + post[i].children[j].innerHTML + "</u>&nbsp;&nbsp;";
                }
            }
        }
        content.innerHTML += string;
    }
}