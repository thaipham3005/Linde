var project = document.getElementById("project").children[0];
project.innerHTML = "linde";

var host = window.location.origin;
var title = document.querySelectorAll(".header .title h2 a");
title[0].href = host;
var title2 = document.querySelectorAll(".header .title h3 a");
title2[0].href = host + "/" + project.innerHTML;

function loadMOM() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status == 200)) {
            var listdoc = JSON.parse(this.responseText);
            var list = document.getElementById("list-doc");
            for (i = 0; i < listdoc.length; i++) {
                list.innerHTML += "<li loc = '" + listdoc[i]["location"] + "'>" + listdoc[i]["mom_no"] + "</li>";
            }

            var doc = list.children;
            for (i = 0; i < listdoc.length; i++) {
                doc[i].addEventListener('click', function() {

                    document.getElementById("content-view").src = window.location.href + this.getAttribute("loc");

                    var siblings = this.parentNode.children;
                    Array.from(siblings).forEach(
                        s => s.classList.remove("active")
                    );
                    this.classList.toggle("active");

                });
            }
        }
    };

    xmlhttp.open("GET", "mom.json", true);
    xmlhttp.send();
}

function activeOptions() {
    var opts = document.getElementsByClassName("option");
    var parent = opts.parentNode;
    Array.from(opts).forEach(
        opt => opt.addEventListener('click', function() {
            var siblings = this.parentNode.children;
            Array.from(siblings).forEach(
                s => s.classList.remove("active")
            );
            this.classList.toggle("active");
        })
    );
}

function activeModules() {
    var opts = document.getElementsByClassName("module");
    var parent = opts.parentNode;
    Array.from(opts).forEach(
        opt => opt.addEventListener('click', function() {
            var siblings = this.parentNode.children;
            Array.from(siblings).forEach(
                s => s.classList.remove("active")
            );
            this.classList.toggle("active");
        })
    );
}

function loadForms() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && (this.status == 200)) {
            var forms = JSON.parse(this.responseText);
            var menu = document.getElementById("menu-list");
            for (i = 0; i < forms.length; i++) {
                menu.innerHTML += "<li class = 'option'><a href='" + forms[i]["location"] + "'><i class='" + forms[i]["icon"] + "'></i><span>" + forms[i]["option"] + "</span></li>";
            }
            var current = window.location.pathname;
            var opt = menu.children;
            for (i = 0; i < forms.length; i++) {
                var item = opt[i];
                var loc = item.children[0].getAttribute("href");

                if (current == loc) {
                    item.classList.toggle("active");
                    var link = forms[i]["link"];
                    document.getElementById("content-view").src = link;

                }

                // opt[i].addEventListener('click', function() {
                //     document.getElementById("content-view").src = forms[i]["link"];
                //     console.log(forms[i]["link"]);

                //     var siblings = this.parentNode.children;
                //     Array.from(siblings).forEach(
                //         s => s.classList.remove("active")
                //     );
                //     this.classList.toggle("active");


                // });
            }


        }
    };

    xmlhttp.open("GET", "/Project-info/linde/forms/forms.json", true);
    xmlhttp.send();
}
