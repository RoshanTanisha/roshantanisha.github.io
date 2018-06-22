//@author: Tanisha R. Bhayani

xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        load_posts(this);
    }
}
xhr.open("GET", "blog_list.xml", true);
xhr.send();
function load_posts() {
    xmlDoc = xhr.responseXML;
    post = xmlDoc.getElementsByTagName("posts");
    content = document.getElementById("content");
    var string = "", tag, link;
    for (i = 0; i < post.length; i++) {
        for (j = 0; j < post[i].children.length; j++) {
            tag = post[i].children[j].nodeName;
            // console.log("TAG :: ", tag);
            if (tag == "title") {
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
            } else if (tag == "short_text") {
                string += "<i>" + post[i].children[j].innerHTML + "</i><hr>";
            } else {
                string += "<u>" + post[i].children[j].innerHTML + "</u>&nbsp;&nbsp;";
            }
        }
    }
    content.innerHTML += string;
}