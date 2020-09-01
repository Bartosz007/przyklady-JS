/// <reference path="ui.js" />
var Loging = {
    caph: function () {
        var licznik = 0, sumowanie = 0
        var liczba = Math.floor((Math.random() * 3));

        for (var i = 0; i < 4; i++) {
            var dv = $("<div>")
            dv.attr("class", "capt")
            dv.attr("id", "cp" + i)

            var img = $("<img>")
            img.attr("class", "cpPic")
            img.attr("id", "pic" + i)
            img.attr("value", i)
            img.attr("src", Captcha_data.pliki[liczba][i])
            $(dv).append(img)

            $("#panelCap").append(dv)
        }
        $("#CAPnapis").text(Captcha_data.opis[liczba])

        $(".cpPic").click(function () {
            $(this).css("border", "2px green solid")
            $(this).css("width", "19vw")
            licznik++
            sumowanie = sumowanie + Captcha_data.sprawdzanie[liczba][($(this).attr("value"))]

            if (licznik > 2 && sumowanie == 1) {
                UI.methods.Messege("Jestes robotem")
                $(".cpPic").css("border", "0")
                $(".cpPic").css("width", "20vw")
                Loging.reset()

            } else if (licznik > 2 && sumowanie == 0) {
                $("#CAPnapis").fadeOut(300, function () { })
                $("#panelCap").fadeOut(300, function () { })
                $("#refH").fadeOut(300, function () { })
                setTimeout(function () {
                    $("#logowanie").fadeIn(300, function () { })
                    $("form").fadeIn(300, function () { })
                }, 300);
                Loging.reset()
            }
        })
        $("#refH").click(function () {
            Loging.reset()
        })
    },
    reset: function () {
        $("#CAPnapis").empty()
        $("#panelCap").empty()
        licznik = 0
        sumowanie = 0
        Loging.caph()
    },
}

var Captcha_data = {

    opis: ["Wskaż blok mieszkalny", "Wskaż niedzwidzie", "Wskaż owoce"],
    pliki: [["/../gfx/captcha/blok1.jpg", "/../gfx/captcha/blok2.jpg", "/../gfx/captcha/blok3.jpg", "/../gfx/captcha/blok4.jpg"],
        ["/../gfx/captcha/mis1.jpg", "/../gfx/captcha/mis2.jpg", "/../gfx/captcha/mis3.jpg", "/../gfx/captcha/mis4.jpg"],
        ["/../gfx/captcha/owoc1.jpg", "/../gfx/captcha/owoc2.jpg", "/../gfx/captcha/owoc3.jpg", "/../gfx/captcha/owoc4.jpg"]],
    sprawdzanie: [[0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 0, 0]],
}