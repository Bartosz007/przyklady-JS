/// <reference path="funkcje.js" />
/// <reference path="dane.js" />
/// <reference path="operacje.js" />
var Generacja={
    init : function(){
        //--------ekran ładowania-----
        var div=document.createElement("div")
        div.id="screeny"
        document.body.appendChild(div)
        var ig=document.createElement("img")
        ig.id="screen"
        ig.src="img/czolowka.jpg"
        div.appendChild(ig)
        
        var aux=document.createElement("audio")
        aux.autoplay=true
        aux.id="aud"
        aux.loop=true
        div.appendChild(aux)
        
        var scr=document.createElement("source")
        scr.id="uoo"
        scr.src="music/hejnal.ogg"        
        scr.type="audio/ogg"
        aux.appendChild(scr)
        //--------pojemnik
        var div=document.createElement("div")
        div.id="pojemnik"
        document.body.appendChild(div) 
        //-------pozycja
        var div2=document.createElement("div")
        div2.id = "pozycja"
        div2.className="napis"
        var txt = document.createTextNode("You are by road shire")
        div2.appendChild(txt)
        div.appendChild(div2)
        //---------pojemnik z obrazem
        var div2=document.createElement("div")
        div2.id="obraz"
        div.appendChild(div2)

        //---------kompas
        var div2=document.createElement("div")
        div2.id="kompas_dv"
        div.appendChild(div2)
        
        var km=document.createElement("img")
        km.id="kompas"
        km.src="img/kompas.bmp"
        div2.appendChild(km)
    //litery-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        var pm=["N","","S","W"]
        for(var i=0;i<4;i++){
            var div4=document.createElement("div")   
            div4.id="p"+i
            div4.className="pozycjee"
            div4.textContent=pm[i]
            div2.appendChild(div4)
        }
    //literty-end-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        //----------pojemnik z podpisami
        var div3=document.createElement("div")
        div3.id="pojemnik_podpisy"
        div.appendChild(div3)
        //-----------kierunek
        var div2=document.createElement("div")
        div2.id = "kierunek"
        div2.className = "napis"
        var txt = document.createTextNode("You can go NORTH,EAST,WEST,SOUTH")
        div2.appendChild(txt)
        div3.appendChild(div2)
        //----------widok
        var div2=document.createElement("div")
        div2.id = "widok"
        div2.className = "napis"
        div2.createTextNode = "co widzę"
        var txt = document.createTextNode("You see nothing")
        div2.appendChild(txt)
        div3.appendChild(div2)
        //------------inwentarz
        var div2 = document.createElement("div")
        var txt = document.createTextNode("You carrying nothing")        
        div2.id = "inwentarz"
        div2.className = "napis"
        div2.appendChild(txt)
        div3.appendChild(div2)
        //-------------wejscie
        var div2 = document.createElement("div")
        var txt = document.createTextNode("What now?")
        div2.id = "dv_wejscie"
        div2.appendChild(txt)

        var it=document.createElement("input")
        it.id="wejscie"
        it.setAttribute("type", "text")
        div2.appendChild(it)
        
        div3.appendChild(div2) 
        //-----pojemnik zapasowy
        var div2=document.createElement("div")
        div2.id = "gps"
        div3.appendChild(div2)
        
        var div5=document.createElement("div")        
        div5.id = "voc"
        for(var i=0;i<historia.length;i++){
            var akapit=document.createElement("p")  
            akapit.textContent=slownik[i]
            div5.appendChild(akapit)
        }
        div2.appendChild(div5)
        
        var div5=document.createElement("div")
        div5.id = "goss"
        for(var i=0;i<historia.length;i++){
            var akapit=document.createElement("p")  
            akapit.textContent=historia[i]
            div5.appendChild(akapit)
        }        
        
        div2.appendChild(div5)
        //-----wiadomosc
        var div2 = document.createElement("div")
        div2.id = "messg"
        div3.appendChild(div2)
        
        var a = dn[y + x]

        var d = a.strony.split(",")
        var t = ""
        for (var i = 0; i < d.length; i++) {
            if (i != d.length - 1)
                t = t + d[i].toUpperCase()+","
            else
                t = t + d[i].toUpperCase()
        }

        var dc = document.createElement("img")
        dc.style.backgroundColor = a.kolor
        dc.src = "img/" + a.plik
        dc.id = "image"
        document.getElementById("obraz").appendChild(dc)

        document.getElementById("pozycja").textContent = a.opis
        document.getElementById("kierunek").textContent = "You can go " + t
        document.getElementById("widok").textContent = "You see nothing"
        document.getElementById("inwentarz").textContent = "You carrying nothing"
        
        document.getElementById("wejscie").focus();
    }
}
