/// <reference path="funkcje.js" />
/// <reference path="generacja.js" />
var Operacje = {
    events: function () {        
        document.getElementById("wejscie").onblur = Funkcje.autofocu_s
        document.getElementById("wejscie").onkeyup = Funkcje.onkeypres_s
        document.body.onkeyup=Funkcje.load_s
    }
}