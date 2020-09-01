/// <reference path="settings.js" />

var UI = {

    init: function () {
        $("#menusett").click(function () {
            $("#settingsScreen").toggleClass("animuj");
            $("#menu").fadeIn(300, function () { })
        })

        $("#menutoday").click(function () {
            $("#todayScreen").fadeOut(300, function () { })
            $("#screens .menu-icon").css("width", "4vw")
            $("#screens .menu-icon").css("height", "4vw")
        })

        $(".me").click(function () {
            switch ($(this).index()) {
                case 0:
                    $("#settingsScreen").toggleClass("animuj");
                    $("#menu").fadeOut(300, function () { })
                    break;
                case 1:
                    $("#todayScreen").fadeIn(300, function () { })
                    $(this).fadeIn(300, function () { })
                    break;
                case 2:
                    $("#weekScreen").fadeIn(300, function () { })
                    $(this).fadeIn(300, function () { })
                    break;
            }
        })

        $(".me2").click(function () {
            switch ($(this).index()) {
                case 0:
                    $("#settingsScreenv2").fadeIn(500, function () { })
                    $("#screens .menu-icon").css("width", "9vw")
                    $("#screens .menu-icon").css("height", "9vw")
                    break;
                case 1:
                    $("#todayScreen").fadeIn(300, function () { })
                    $("#screens .menu-icon").css("width", "9vw")
                    $("#screens .menu-icon").css("height", "9vw")
                    break;
                case 2:
                    $("#weekScreen").fadeIn(300, function () { })
                    $("#screens .menu-icon").css("width", "9vw")
                    $("#screens .menu-icon").css("height", "9vw")
                    break;
            }
        })

        $(".db").click(function () {
            UI.methods.Operacje($(this).index())
        })

        $("#alert").click(function () {
            UI.methods.Alert()
        })
        $("#menuhours").click(function () {
            $("#hoursScreen").fadeOut(500, function () { })
        })

        $("#menuweek").click(function () {
            $("#weekScreen").fadeOut(300, function () { })
            $("#screens .menu-icon").css("width", "4vw")
            $("#screens .menu-icon").css("height", "4vw")
        })

        $("#main-menu-v2").click(function () {
            $("#menu-v2").animate({ bottom: "0" }, 'slow');
            $("#main-menu-v2-close").css("display", "block")
        })
        $("#main-menu-v2-close").click(function () {
            $("#menu-v2").animate({ bottom: "-42vh" }, 'slow');
            $("#main-menu-v2-close").css("display", "none")
        })

        $("#menusettv2").click(function () {
            $("#settingsScreenv2").fadeOut(500, function () { })
            $("#screens .menu-icon").css("width", "4vw")
            $("#screens .menu-icon").css("height", "4vw")
        })

        $("#settDatabase").click(function () {
            $("#databaseScreen").animate({ left: "0" }, 'slow')
        })

        $("#menudatabase").click(function () {
            $("#databaseScreen").animate({ left: "-100%" }, 'slow')
        })

        $("#settHours").click(function () {
            $("#hoursScreen").fadeIn(300, function () { })
        })
        $("#logIN").click(function () {
            $("#logIN").css("background", "#ff3300")
            if ($("#login-text").val() == "" || $("#login-passwd").val() == "")
                UI.methods.Messege("Brak loginu i/lub hasła")
            else {
                UI.methods.Logowanie($("#login-text").val(), $("#login-passwd").val())
            }

            $("#login-text").val("")
            $("#login-passwd").val("")
        })

        $("#settColors").click(function () {
            $("#colorsScreen").fadeIn(500, function () { })

        })

        //-----------------------------mauseouty/overy-----------------        
        $("#zapis,#checkpanel img,.komorki-change-hours,.komorki-change-minutes,.me2,.me,.ms2,.ms2-v2,#zapis,.komorkiDzis-przedmiot,.komorkiDzis-sala,.komorkiTydzien-D,.db,.komorki,.komorkiTod,.komorkiTdo").mouseover(function () {
            $(this).css("background-color", Settings.colors.kdodatkowy)
        })
        $("#zapis,#checkpanel img,.komorki-change-hours,.komorki-change-minutes,.me2,.me,.ms2,.ms2-v2,#zapis,.komorkiDzis-przedmiot,.komorkiDzis-sala,.komorkiTydzien-D,.db,.komorki,.komorkiTod,.komorkiTdo").mouseout(function () {
            $(this).css("background-color", Settings.colors.kglowny)
        })
    },

    methods: {

        Operacje: function (aaa) {

            switch (aaa) {
                case 0:
                    var obj = {
                        action: "create",
                    }
                    break;

                case 1:
                    var obj = {
                        action: "drop",
                    }
                    break;

                case 2:
                    var obj = {
                        action: "make",
                    }
                    break;

                case 3:
                    var obj = {
                        action: "delete",
                    }
                    break;
                case 4:
                    var obj = {
                        action: "download",
                    }
                    break;
            }

            if (aaa < 4) {
                Database.methods.createTables(obj)
                 .done(function (response) {
                     UI.methods.Messege(response)
                 })
                 .fail(function (response) {
                     UI.methods.Messege(response.responseText)
                 })
            }

            if (aaa == 4) {
                Database.methods.readTables(obj)
                 .done(function (response) {
                     UI.methods.Download(response)
                 })
                 .fail(function (response) {
                     UI.methods.Download(response.responseText)
                 })
            }

        },
        Update: function (min, hr, poz, id) {
            var obj = {
                action: "update",
                id: id,
                poz: poz,
                hr: hr,
                min: min,
            }
            Database.methods.updateTables(obj)
                .done(function (response) {
                    // alert(response)
                })
                .fail(function (response) {
                    alert(response.responseText)
                })
            if (poz == "od") {
                $("#komorka_" + (id - 1) + "_1").text(hr + ":" + min)
            } else {
                $("#komorka_" + (id - 1) + "_2").text(hr + ":" + min)
            }
        },
        Messege: function (bbb) {
            $("#alertContent").text(bbb)
            $("#alertContent").css("background", Settings.colors.kdodatkowy)
            $("#alert").fadeIn(300, function () { })
            $("#logIN").css("background", Settings.colors.kdodatkowy)
        },
        Alert: function () {
            $("#alert").fadeOut(500, function () { })
        },
        Download: function (ddd) {

            var a = "Pobrano dane"
            UI.methods.Messege(a)

            var odp = JSON.parse(ddd)

            $("#hours-context").empty()
            for (var i = 0; i < 14; i++) {
                var dv = $("<div>")
                dv.attr("class", "wiersze")
                dv.attr("id", "wiersz" + i)
                $("#hours-context").append(dv)

                for (var j = 0; j < 3; j++) {
                    var dv2 = $("<div>")
                    dv2.attr("class", "komorki")
                    dv2.css("background", Settings.colors.kglowny)
                    dv2.mouseover(function () {
                        $(this).css("background-color", Settings.colors.kdodatkowy)
                    })
                    dv2.mouseout(function () {
                        $(this).css("background-color", Settings.colors.kglowny)
                    })
                    dv2.attr("id", "komorka_" + i + "_" + j)
                    switch (j) {
                        case 0:
                            dv2.text(odp.godziny[i].id)
                            break;
                        case 1:
                            if (odp.godziny[i].odM == "0")
                                odp.godziny[i].odM = "00"
                            if (odp.godziny[i].odM == "5")
                                odp.godziny[i].odM = "05"
                            dv2.text(odp.godziny[i].odG + ":" + odp.godziny[i].odM)
                            dv2.attr("class", "komorkiTod")
                            dv2.attr("value", (i + 1))
                            break;
                        case 2:
                            if (odp.godziny[i].doM == "0")
                                odp.godziny[i].doM = "00"
                            if (odp.godziny[i].doM == "5")
                                odp.godziny[i].doM = "05"
                            dv2.text(odp.godziny[i].doG + ":" + odp.godziny[i].doM)
                            dv2.attr("class", "komorkiTdo")
                            dv2.attr("value", (i + 1))
                            break;
                    }
                    $("#wiersz" + i).append(dv2)
                }
            }
            $(".komorkiTod,.komorkiTdo").click(function () {
                var tt = $(this).text()

                if (tt[1] == ":") {
                    $("#hours").text(tt[0])
                    $("#minutes").text(tt[2] + tt[3])
                } else {
                    $("#hours").text(tt[0] + tt[1])
                    $("#minutes").text(tt[3] + tt[4])

                }

                var a = $(this).attr("class")[8] + $(this).attr("class")[9]
                var b = $(this).attr("value")
                $("#dataP").text(a)
                $("#dataI").text(b)
                $("#changeScreen").fadeIn(300, function () { })
            })
        },
        Screens: function (user) {
            var dzien = new Date;
            dzien = dzien.getDay()

            var obj = {
                action: "today",
                day: dzien,
                user: user,
            }
            Database.methods.screenTables(obj)
                .done(function (response) {
                    var odp = JSON.parse(response)
                    UI.generacion.dzis(odp)
                    UI.generacion.tydzien(odp)
                })
                .fail(function (response) {
                    alert(response.responseText)
                })

        },
        Logowanie: function (log, passwd) {
            var znaki = ["\"", "'", "<", ">", "javascript", ",", ".", ":", ";", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "\\", "[", "]", "/", "?", "|", "{", "}", " ", "_", "="]
            for (var i = 0; i < znaki.length; i++) {

                for (var j = 0; j < log.length; j++)
                    log = log.replace(znaki[i], "")

                for (var j = 0; j < passwd.length; j++)
                    passwd = passwd.replace(znaki[i], "")
            }

            var obj = {
                login: log,
                haslo: passwd,
            }
            Database.methods.logTables(obj)
               .done(function (response) {
                   UI.methods.Ef_log(response)
               })
               .fail(function (response) {
                   console.log(response.responseText)
               })
        },
        Ef_log: function (odp) {
            odp = odp.split(",")
            Settings.user = odp[1]
            switch (odp[0]) {
                case "aaa":
                    UI.methods.Messege("Dodano użytkownika")
                    $("#logIN").css("background", "#1AA648")
                    break;
                case "bbb":
                    UI.methods.koloryWys(0, 0, 0, 1)
                    UI.methods.Messege("Zalogowano pomyślnie")
                    $("#captchaScreen").fadeOut(500, function () { })
                    UI.methods.Screens(odp[1].toString())
                   

             //       UI.methods.koloryWys(Settings.colors.tlo, Settings.colors.kglowny, Settings.colors.kdodatkowy, 0)
                    break;
                case "ccc":
                    UI.methods.Messege("Podałeś złe hasło")
                    $("#logIN").css("background", "#1AA648")
                    break;
            }
        },
        kolorkiF: function (index, kolor) {
            switch (index) {
                case 0:
                    $("#clock").css("background-color", Settings.colors.tlo)
                    $("#logowanie").css("background-color", Settings.colors.tlo)
                    $("#main").css("background-color", Settings.colors.tlo)
                    break;
                case 1:
                    $("#checkpanel").css("background-color", Settings.colors.kglowny)
                    $("#hourHeader").css("background-color", Settings.colors.kglowny)
                    $(".komorki-change-hours").css("background-color", Settings.colors.kglowny)
                    $(".komorki-change-minutes").css("background-color", Settings.colors.kglowny)
                    $("#content-content-page,#zapis").css("background-color", Settings.colors.kglowny)
                    $("#databaseScreen").css("background-color", Settings.colors.kglowny)
                    $(".wiersze,.komorki,.komorkiTod,.komorkiTdo ").css("background-color", Settings.colors.kglowny)
                    $("#refH").css("background-color", Settings.colors.kglowny)
                    $("#menu-v2").css("background-color", Settings.colors.kglowny)
                    $(".komorkiDzis-numer,.komorkiDzis-sala,.komorkiDzis-przedmiot,.komorkiTydzien-D").css("background-color", Settings.colors.kglowny)
                    $("#naglWeekPoniedzialek,#naglWeekWtorek,#naglWeekSroda,#naglWeekCzwartek,#naglWeekPiatek").css("background-color", Settings.colors.kglowny)
                    $(".me").css("background-color", Settings.colors.kglowny)
                    $("#settingsScreen,.ms2-v2,#kolory-napisy p,#zapis").css("background-color", Settings.colors.kglowny)
                    $(".ms2").css("background-color", Settings.colors.kglowny)
                    break;
                case 2:
                    $("#alertContent").css("background-color", Settings.colors.kdodatkowy)
                    $("input[type='button']").css("background-color", Settings.colors.kdodatkowy)
                    break;
            }
        },
        koloryWys: function (tlo, kgl, kdod, j) {
            switch (j) {
                case 0:
                    var obj = {
                        k1: tlo,
                        k2: kgl,
                        k3: kdod,
                        action: "upd",
                        user: Settings.user,
                    }
                    Database.methods.colorsTables(obj)
                        .done(function (response) {
                            UI.methods.Messege(response)
                        })
                        .fail(function (response) {
                            UI.methods.Messege(response.responseText)
                        })
                    break;
                case 1:
                    var obj = {
                        action: "dow",
                        user: Settings.user,
                    }

                    Database.methods.colorsTables(obj)
                    .done(function (response) {
                        var kk = JSON.parse(response)
                        Settings.colors.tlo = kk.kolory[0]
                        Settings.colors.kglowny = kk.kolory[1]
                        Settings.colors.kdodatkowy = kk.kolory[2]
                        UI.methods.kolorkiF(0);
                        UI.methods.kolorkiF(1);
                        UI.methods.kolorkiF(2);
                    })
                    .fail(function (response) {
                        console.log(response.responseText)
                    })
                    break;
            }

        },

    },

    generacion: {
        picker_godziny: function () {
            $("#hourContent-Hours").empty()
            $("#hourContent-Minutes").empty()
            for (var i = 0; i < 14; i++) {
                var dv3 = $("<div>")
                dv3.attr("class", "komorki-change-hours")
                dv3.attr("id", "komorka-change-hours_" + i)
                dv3.text((i + 7))
                $("#hourContent-Hours").append(dv3)
            }
            var czas = 0
            for (var i = 0; i < 12; i++) {
                var dv4 = $("<div>")
                dv4.attr("class", "komorki-change-minutes")
                dv4.attr("id", "komorka-change-minutes_" + i)

                if (czas < 10)
                    dv4.text("0" + czas)
                else
                    dv4.text(czas)

                czas += 5
                $("#hourContent-Minutes").append(dv4)
            }
            var hour = "", minute = ""
            $(".komorki-change-hours").click(function () {
                hour = $(this).text()

                $("#hours").text(hour)
            })

            $(".komorki-change-minutes").click(function () {
                minute = $(this).text()
                $("#minutes").text(minute)
            })

            $("#accept").click(function () {

                var a = $("#dataP").text()
                var b = $("#dataI").text()

                if (hour == "" || minute == "") {
                    var g = "Podaj pełny czas"
                    UI.methods.Messege(g)
                }
                else {
                    UI.methods.Update(minute, hour, a, b)
                    $("#changeScreen").fadeOut(500, function () { })
                    hour = ""
                    minute = ""
                }

            })
            $("#deny").click(function () {
                $("#changeScreen").fadeOut(500, function () { })
            })

        },
        dzis: function (dzis) {
            $("#screen-content").empty()
            for (var i = 0; i < 14; i++) {
                var dv = $("<div>")
                dv.attr("class", "wierszeDzis")
                dv.attr("id", "wierszDzis" + i)
                $("#screen-content").append(dv)

                for (var j = 0; j < 3; j++) {
                    var dv2 = $("<div>")
                    dv2.css("background", Settings.colors.kglowny)
                    dv2.mouseover(function () {
                        $(this).css("background-color", Settings.colors.kdodatkowy)
                    })
                    dv2.mouseout(function () {
                        $(this).css("background-color", Settings.colors.kglowny)
                    })
                    switch (j) {
                        case 0:
                            dv2.attr("class", "komorkiDzis-numer")
                            dv2.text(dzis.today[i].id)
                            dv2.attr("id", "komorkaDzis-numer_" + i + "_" + j)
                            break;
                        case 1:
                            dv2.attr("class", "komorkiDzis-sala")
                            dv2.text(dzis.today[i].nrS)
                            dv2.attr("id", "komorkaDzis-sala_" + i + "_" + j)
                            break;
                        case 2:
                            dv2.attr("class", "komorkiDzis-przedmiot")
                            dv2.text(dzis.today[i].lessLong)
                            dv2.attr("id", "komorkaDzis-przedmiot_" + i + "_" + j)
                            break;
                    }

                    $("#wierszDzis" + i).append(dv2)
                }

            }

        },
        tydzien: function (wk) {
            var dv = $("<div>")
            dv.attr("id", "naglWeek")
            $("#weekScreen").append(dv)
            var day = ["Poniedzialek", "Wtorek", "Sroda", "Czwartek", "Piatek"]
            for (var i = 0; i < 5; i++) {
                var dv2 = $("<div>")
                dv2.attr("id", "naglWeek" + day[i])
                dv2.attr("class", "naglowkiWeek")
                dv2.css("background", Settings.colors.kglowny)
                dv2.mouseover(function () {
                    $(this).css("background-color", Settings.colors.kdodatkowy)
                })
                dv2.mouseout(function () {
                    $(this).css("background-color", Settings.colors.kglowny)
                })
                dv2.text(day[i])
                $(dv).append(dv2)
            }

            for (var i = 0; i < 14; i++) {
                var dv = $("<div>")
                dv.attr("class", "wierszeWeek")
                dv.attr("id", "wierszWeek" + i)
                $("#week-content").append(dv)

                for (var j = 0; j < 6; j++) {
                    var dv2 = $("<div>")
                    switch (j) {
                        case 0:
                            dv2.attr("class", "komorkiTydzien-numer")
                            dv2.text(i + 1)
                            dv2.attr("id", "komorkaTydzien-numer" + i + "_" + j)
                            break;
                        case 1:
                            dv2.attr("class", "komorkiTydzien-D")
                            dv2.text(wk.week[i].lessShort + " s." + wk.week[i].nrS)
                            dv2.attr("id", "komorkaTydzien-D_" + i + "_" + j)
                            break;
                        case 2:
                            dv2.attr("class", "komorkiTydzien-D")
                            dv2.text(wk.week[i + 14].lessShort + " s." + wk.week[i + 14].nrS)
                            dv2.attr("id", "komorkaTydzien-D_" + i + "_" + j)
                            break;
                        case 3:
                            dv2.attr("class", "komorkiTydzien-D")
                            dv2.text(wk.week[i + 28].lessShort + " s." + wk.week[i + 28].nrS)
                            dv2.attr("id", "komorkaTydzien-D_" + i + "_" + j)
                            break;
                        case 4:
                            dv2.attr("class", "komorkiTydzien-D")
                            dv2.text(wk.week[i + 42].lessShort + " s." + wk.week[i + 42].nrS)
                            dv2.attr("id", "komorkaTydzien-D_" + i + "_" + j)
                            break;
                        case 5:
                            dv2.attr("class", "komorkiTydzien-D")
                            dv2.text(wk.week[i + 56].lessShort + " s." + wk.week[i + 56].nrS)
                            dv2.attr("id", "komorkaTydzien-D_" + i + "_" + j)
                            break;
                    }
                    dv2.css("background", Settings.colors.kglowny)
                    dv2.mouseover(function () {
                        $(this).css("background-color", Settings.colors.kdodatkowy)
                    })
                    dv2.mouseout(function () {
                        $(this).css("background-color", Settings.colors.kglowny)
                    })
                    $("#wierszWeek" + i).append(dv2)
                }
            }
        },
        kolory: function () {
            var tlo =
                ["#3300CC", "#3300FF", "#3333FF", "#3333CC", "#0066FF", "#0033FF", "#3366FF",
                "#3366CC", "#000066", "#000033", "#0000FF", "#000099", "#0033CC", "#0000CC",
                "#336699", "#0066CC", "#99CCFF", "#6699FF", "#003366", "#6699CC"]
            var glowne =
                ["#CC6600", "#993300", "#CC6633", "#FF9933", "#FF9966", "#FF6633", "#CC9670",
                "#CC3300", "#FF3300", "#663333", "#996666", "#993333", "#FF6600", "#CC9999",
                "#FF6666", "#FF3333", "#CC3333", "#990000", "#CC0000", "#FF0000"]

            var dodatkowe =
                ["#009900", "#33FF00", "#66FF00", "#99FF00", "#66CC00", "#339900", "#33CC00",
                "#99CC66", "#99CC33", "#669933", "#336600", "#669900", "#99CC00", "#CCFF66",
                "#CCFF33", "#CCFF00", "#999900", "#333300", "#666600", "#999933"]
            var stk = [Settings.colors.tlo, Settings.colors.kglowny, Settings.colors.kdodatkowy]
            for (var i = 0; i < 20; i++) {
                var dv = $("<div>")
                dv.attr("class", "kolorki-tla")
                dv.css("background-color", tlo[i])
                dv.click(function () {
                    Settings.colors.tlo = $(this).css("background-color")
                    UI.methods.kolorkiF(0);
                })
                $("#kolory-tla").append(dv)

                var dv = $("<div>")
                dv.attr("class", "kolorki-glowne")
                dv.css("background-color", glowne[i])
                dv.click(function () {
                    Settings.colors.kglowny = $(this).css("background-color")
                    UI.methods.kolorkiF(1);
                })
                $("#kolory-glowne").append(dv)

                var dv = $("<div>")
                dv.attr("class", "kolorki-dodatkowe")
                dv.css("background-color", dodatkowe[i])
                $("#kolory-dodatkowe").append(dv)
                dv.click(function () {
                    Settings.colors.kdodatkowy = $(this).css("background-color")
                })
            }
            $("#zapis").click(function () {
                UI.methods.koloryWys(Settings.colors.tlo, Settings.colors.kglowny, Settings.colors.kdodatkowy, 0)
                $("#colorsScreen").fadeOut(500, function () { })
            })
            $("#menuColor").click(function () {
                Settings.colors.tlo = stk[0]
                UI.methods.kolorkiF(0);
                Settings.colors.kglowny = stk[1]
                UI.methods.kolorkiF(1);
                Settings.colors.kdodatkowy = stk[2]
                UI.methods.kolorkiF(2);
                $("#colorsScreen").fadeOut(500, function () { })
            })
        },
    },

}
