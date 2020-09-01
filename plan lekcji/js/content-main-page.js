/// <reference path="main.js" />

var Contentmainpage = {

    init: function () {
        setInterval(Contentmainpage.makeClock, 100)
    },
    makeClock: function () {//tworze tą funkcje i wyżej wywołuję co sekundę
        var data = new Date()
        var time = data.toLocaleTimeString()
        $("#clock").text(time)
    }
} 