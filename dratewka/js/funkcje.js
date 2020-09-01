/// <reference path="operacje.js" />
/// <reference path="dane.js" />
/// <reference path="generacja.js" />
var Funkcje = {
    autofocu_s: function (e) {
        setTimeout(function () {
            document.getElementById("wejscie").focus()
        }, 10);
    },
    load_s:function(e){
        
        setTimeout(function () {
            document.getElementById("screeny").focus()
        }, 10);
        if(e.which !=116){
            if(Funkcje.cache.load==0){
                document.getElementById("screen").src="img/opis_A.jpg"
                Funkcje.cache.load=1        
            }
            else if(Funkcje.cache.load==1){
                document.getElementById("screen").src="img/opis_B.jpg"
                Funkcje.cache.load=2
            }else if(Funkcje.cache.load==2){
                document.getElementById("screeny").style.display="none"             
                document.getElementById("wejscie").value = null
                document.body.onkeyup=null
                document.getElementById("aud").pause()
                setTimeout(function () {
                    document.getElementById("wejscie").focus()
                }, 10);
            }
            
        }
    },
    onkeypres_s: function (e) {
        if (e.which != 13) {
            document.getElementById("wejscie").style.textTransform = "uppercase"
        } else {
            var czynnosc = document.getElementById("wejscie").value.toLowerCase()
            document.getElementById("wejscie").value = ""
            switch (czynnosc) {
                case "n":
                    czynnosc = "north"
                    break;
                case "e":
                    czynnosc = "east"
                    break;
                case "s":
                    czynnosc = "south"
                    break;
                case "w":
                    czynnosc = "west"
                    break;
            }
            var gg = czynnosc.split(" ")
            if (czynnosc == "north" || czynnosc == "east" || czynnosc == "south" || czynnosc == "west") {
                Funkcje.zmiana_pozycji(czynnosc);
            } else if (gg[0] == "take" || gg[0] == "t") {
                if (gg.length > 1 && gg[2] != "" && gg[1]!="")
                    Funkcje.takee(gg);

            } else if (gg[0] == "drop" || gg[0] == "d") {
                if (ekwipunek != "")
                    Funkcje.dropp(gg);
                else
                    Funkcje.messege("You are not carrying it")
            } else if (gg[0] == "use" || gg[0] == "u") {                
                if(ekwipunek!="" && ((gg[2] != "" && gg[1]!="") || gg[1]!="A" && gg[2]!="SHEEP" ))
                    Funkcje.usee(gg);
                else if(gg[1]=="a" && gg[2]=="sheep" )
                    Funkcje.nowykrol()
                else
                    Funkcje.messege("You aren't carrying anything like that") 
            }else if(czynnosc=="gossips" || czynnosc=="g"){
                document.getElementById("gps").style.display="block"
                document.getElementById("goss").style.display="block"                
                document.body.onkeyup=function(){
                    if(Funkcje.cache.wysiwtlanie==1){
                        document.getElementById("gps").style.display="none"
                        document.getElementById("goss").style.display="none"
                        document.getElementById("wejscie").value=""
                        Funkcje.autofocu_s()
                        document.body.onkeyup=null
                        Funkcje.cache.wysiwtlanie=0
                    }else{
                        Funkcje.cache.wysiwtlanie++
                    }
                }
                    
            }else if(czynnosc=="vocabulary" || czynnosc=="v"){
                document.getElementById("gps").style.display="block"
                document.getElementById("voc").style.display="block"                
                document.body.onkeyup=function(){
                    if(Funkcje.cache.wysiwtlanie==1){
                        document.getElementById("gps").style.display="none"
                        document.getElementById("voc").style.display="none"
                        document.getElementById("wejscie").value=""
                        Funkcje.autofocu_s()
                        document.body.onkeyup=null
                        Funkcje.cache.wysiwtlanie=0
                    }else{
                        Funkcje.cache.wysiwtlanie++
                    }
                }
            }else if(czynnosc=="")
                document.getElementById("wejscie").value=""
            else {
                Funkcje.messege("Try another word or V for vocabulary")
            }
        }

    },
    zmiana_pozycji: function (aaa) {
        com=[0,0,0,0]
        var stan = 0
        var a = dn[y + x]
        var d = a.strony.split(",")
        var t = ""
        for (var i = 0; i < d.length; i++) {
            if (i != d.length - 1)
                t = t + d[i].toUpperCase() + ","
            else
                t = t + d[i].toUpperCase()
        }

        for (var i = 0; i < d.length; i++) {
            if (d[i] == aaa)
                stan = 1
        }
        if (stan == 1 && aaa == "north") {
            Funkcje.messege("You are going north...")
            y = parseInt(y)
            y--
        } else if (stan == 1 && aaa == "east") {
            Funkcje.messege("You are going east...")
            x = parseInt(x)
            x++
        } else if (stan == 1 && aaa == "south") {
            Funkcje.messege("You are going south...")
            y = parseInt(y)
            y++
        } else if (stan == 1 && aaa == "west" && y+x!=43) {
            Funkcje.messege("You are going west...")
            x = parseInt(x)
            x--
        }else if(stan == 1 && aaa == "west" && y+x==43){
            document.getElementById("wejscie").disabled = true
            document.getElementById("messg").style.display="block"
            document.getElementById("messg").textContent="You can't go that way..."
            setTimeout(function(){ 
                document.getElementById("messg").textContent="The dragon sleeps in a cave!"
            }, 2000);
            setTimeout(function(){ 
                document.getElementById("wejscie").disabled = false
                document.getElementById("messg").style.display="none"
                document.getElementById("wejscie").focus()
            }, 4000);
        }else
            Funkcje.messege("You can't go that way")

        y = y.toString()
        x = x.toString()
        var a = dn[y + x]

        var d = a.strony.split(",")
        for(var i=0;i<d.length;i++){
            if(d[i]=="north")
                com[0]=1
            else if(d[i]=="east")
                com[1]=1
            else if(d[i]=="south")
                com[2]=1
            else if(d[i]=="west")
                com[3]=1
        }
        
        setTimeout(function(){ 
            if(com[0]==1)
                document.getElementById("p0").textContent="N"
            else
                document.getElementById("p0").textContent=""
            
            if(com[1]==1)
                document.getElementById("p1").textContent="E"
            else
                document.getElementById("p1").textContent=""
        
            if(com[2]==1)
                document.getElementById("p2").textContent="S"
            else
                document.getElementById("p2").textContent=""
            
            if(com[3]==1)
                document.getElementById("p3").textContent="W"
            else
                document.getElementById("p3").textContent=""
        }, 1000);
        
        var t = ""
        for (var i = 0; i < d.length; i++) {
            if (i != d.length - 1)
                t = t + d[i].toUpperCase() + ","
            else
                t = t + d[i].toUpperCase()
        }
        
        var p = a.przedmioty.split(";")
        p.sort(function(a, b){return b-a});
        for (var i = 0; i < p.length; i++) {
            p[i] = p[i].split(",")
        }
        
        var txt = ""
        for (var i = 0; i < p.length; i++) {       
            if (p[i][0] != "" && i!=p.length-1) 
                txt += p[i][0] + ", "
            else if(p[i][0] != "" && i==p.length-1)
                txt += p[i][0]                    
        }
        if(p.length==1)
            txt=p[0][0]
        else if(p.length==2)
            txt=p[0][0]+p[1][0]
            
            setTimeout(function(){ 
                
                document.getElementById("obraz").innerHTML = ""
                var dc = document.createElement("img")
                dc.style.backgroundColor = a.kolor
                dc.src = "img/" + a.plik
                dc.id = "image"
                document.getElementById("obraz").appendChild(dc)
                
                if (txt == "")
                    document.getElementById("widok").textContent = "You see nothing"
                else
                    document.getElementById("widok").textContent = "You see " + txt
                    
                if (ekwipunek == "")
                    document.getElementById("inwentarz").textContent = "You carrying nothing"
                else
                    document.getElementById("inwentarz").textContent = "You carrying " + ekwipunek
                    
                    document.getElementById("pozycja").textContent = a.opis
                    document.getElementById("kierunek").textContent = "You can go " + t
            
            }, 1000);
    },
    takee: function (czyn) {
        y = y.toString()
        x = x.toString()
        var a = dn[y + x]
        czyn = czyn.splice(1, czyn.length)
        czyn = czyn.join(" ").toUpperCase()
        
        var p = a.przedmioty.split(";")
        p.sort(function(a, b){return b-a});
        for (var i = 0; i < p.length; i++) {
            p[i] = p[i].split(",")
            
        }
        
        var lk =10
        for (var i = 0; i < p.length; i++) {
            if (czyn == p[i][0])
                lk = i
        }

        if (lk!=10 && ekwipunek == "" && p[lk][1] == 1 /*&& p.length<3*/) {
            ekwipunek = p[lk][0]
            Funkcje.messege("You are taking "+ekwipunek)
            setTimeout(function(){ 
            document.getElementById("inwentarz").textContent = "You carrying " + ekwipunek
            }, 1000);
            p.splice(lk, 1)
            var txt = ""
            for (var i = 0; i < p.length; i++) {
                if (p[i][0] != "" && i!=p.length-1) 
                    txt += p[i][0] + ", "
                else if(p[i][0] != "" && i==p.length-1)
                    txt += p[i][0]  
            }
            
            setTimeout(function(){ 
                if (txt == "")
                    document.getElementById("widok").textContent = "You see nothing"
                else
                    document.getElementById("widok").textContent = "You see " + txt
            }, 1000);


        } else if(lk==10)
            Funkcje.messege("There isn't anything like that here")
        else if (p[lk][1] == 0)
            Funkcje.messege("You can't carry it")
        else if (ekwipunek != "")
            Funkcje.messege("You are carrying something")
            
        
        for (var i = 0; i < p.length; i++) 
            p[i] = p[i].join(",")
        p.sort(function(a, b){return b-a});
        p=p.join(";")
        a.przedmioty=p

    },
    dropp: function (czyn) {

        y = y.toString()
        x = x.toString()
        var a = dn[y + x]
        czyn = czyn.splice(1, czyn.length)
        czyn = czyn.join(" ").toUpperCase()
        
        var p = a.przedmioty.split(";")
        p.sort(function(a, b){return b-a});
        for (var i = 0; i < p.length; i++)
            p[i] = p[i].split(",")
            
        var pmc=0  
        for (var i = 0; i < p.length; i++){
            if(p[i][1]==1)
                pmc++
            p[i] = p[i].join(",")
        }
        
        Funkcje.messege("You are about to drop "+czyn)
        if (pmc < 3 && ekwipunek==czyn) {
            var txt = czyn+",1"
            p.push(txt)

            for (var i = 0; i < p.length; i++)
                p[i] = p[i].split(",")     

            var txt = ""
            for (var i = 0; i < p.length; i++) {
                if (p[i][0] != "" && i!=p.length-1) 
                    txt += p[i][0] + ", "
                else if(p[i][0] != "" && i==p.length-1)
                    txt += p[i][0]  
            }

            for (var i = 0; i < p.length; i++)
                p[i] = p[i].join(",")

            p = p.join(";")
            a.przedmioty = p
            ekwipunek = ""           
            setTimeout(function(){ 
                if (txt == "")
                    document.getElementById("widok").textContent = "You see nothing"
                else
                    document.getElementById("widok").textContent = "You see " + txt
                    document.getElementById("inwentarz").textContent = "You carrying nothing"              
            }, 1000);
            
        }else if(p.length>=4)
            Funkcje.messege("You can't store any more here")
        else if(ekwipunek!=czyn)
            Funkcje.messege("You are not carrying it")

    },
    usee: function (czyn) {
        y = y.toString()
        x = x.toString()
        var a = dn[y + x]
        if(a.przedmiotyUse!="" && ((y+x)!=43)|| Funkcje.cache.smierc==1){
            czyn = czyn.splice(1, czyn.length)
            czyn = czyn.join(" ").toUpperCase()
            var zmiena = a.przedmiotyUse.split(",")   
            if(zmiena[0]==ekwipunek && zmiena[2]==1){
                ekwipunek=zmiena[1]
                document.getElementById("inwentarz").textContent = "You carrying "+ ekwipunek
                a.przedmiotyUse=""
                if((y+x)!=11)
                    Funkcje.messege(zmiena[3])
                else{
                    document.getElementById("wejscie").disabled = true
                    document.getElementById("messg").style.display="block"
                    document.getElementById("messg").textContent="You are digging..."
                    setTimeout(function(){ 
                        document.getElementById("messg").textContent="and digging..."
                    }, 2000);
                    setTimeout(function(){ 
                        document.getElementById("messg").textContent="That's enough sulphur for you"
                    }, 4000);
                    setTimeout(function(){ 
                        document.getElementById("wejscie").disabled = false
                        document.getElementById("messg").style.display="none"
                        document.getElementById("wejscie").focus()
                    }, 6000);
                   
                }
            }  
        }
        else if ((y + x) == 43) {  
            var tt=lk43
            var akt=20
            czyn = czyn.splice(1, czyn.length)
            czyn = czyn.join(" ").toUpperCase()           
            
            for(var i=0;i<tt.length;i++){
                tt[i]=tt[i].split(",")                
            }      
            for(var i=0;i<tt.length;i++){
                if(tt[i][0]==czyn)
                    akt=i
            }
            
            if(akt!=20){
                lkt[akt]=1
                akt=tt[akt]
                Funkcje.messege(akt[2])            
                var p = a.przedmioty.split(";")           
                p.sort(function(a, b){return b-a});
                var txt = akt[1]+",0"                
                p.push(txt)
                p.sort(function(a, b){return b-a});
                
                for (var i = 0; i < p.length; i++)
                p[i] = p[i].split(",")
                
                
                var txt = ""
                for (var i = 0; i < p.length; i++) {
                    if (p[i][0] != "" && i!=p.length-1) {
                        txt += p[i][0] + ", "
                    }else if (p[i][0] != "" && i==p.length-1) {
                        txt += p[i][0]
                    }
                }
                
                p = p.join(";")
                a.przedmioty = p
                ekwipunek=""
                
                if (txt == "")
                    document.getElementById("widok").textContent = "You see nothing"
                else
                    document.getElementById("widok").textContent = "You see " + txt               
                    
                document.getElementById("inwentarz").textContent = "You carrying nothing"

            }else
                Funkcje.messege("You aren't carrying anything like that ")
                
                var suma=0
                for(var i=0;i<6;i++){
                    suma+=lkt[i]
                }
            if(suma==6){
                Funkcje.dragon()
            }
            
              for(var i=0;i<tt.length;i++){
                tt[i]=tt[i].join(",")                
            }  
        }
        else{
            Funkcje.messege("Nothing happened")
        }
        
        if(ekwipunek=="A PRIZE")
            Funkcje.end()
    },
    dragon:function (){
        Funkcje.cache.smierc=1
        var a = dn[y + x]
        var p = a.przedmioty.split(";")    
        for (var i = 0; i < p.length; i++)
            p[i] = p[i].split(",")
       
        for(var i=0;i<p.length;i++){
            if(p[i][1]==0)
                p.splice(i,1)
        }
        
        var txt = [["A SHEEP"],["0"]]
            p.push(txt)
        p.sort(function(a, b){return b-a});
        var txt = ""
        for (var i = 0; i < p.length; i++) {
            if (p[i][0] != "" && i!=p.length-1) {
                txt += p[i][0] + ", "
            }else if (p[i][0] != "" && i==p.length-1) {
                txt += p[i][0]
            }
        }
        p = p.join(";")
        a.przedmioty = p
        ekwipunek = ""     
        
        document.getElementById("widok").textContent = "You see " + txt  
        
        document.getElementById("wejscie").disabled = true
        document.getElementById("messg").style.display="block"
        document.getElementById("messg").textContent="Your fake sheep is full of poison and ready to be eaten by the dragon"
        setTimeout(function(){ 
            document.getElementById("wejscie").disabled = false
            document.getElementById("messg").style.display="none"
            document.getElementById("wejscie").focus()
        }, 10000)
        
    },
    nowykrol:function(){
        
        document.getElementById("wejscie").disabled = true
        document.getElementById("messg").style.display="block"
        document.getElementById("messg").textContent="The dragon noticed your gift..."
        setTimeout(function(){ 
            document.getElementById("messg").textContent="The dragon ate your sheep and died!"
        }, 2000);
        setTimeout(function(){ 
            document.getElementById("wejscie").disabled = false
            document.getElementById("messg").style.display="none"
            document.getElementById("wejscie").focus()
        }, 4000);
        
        var a=dn[43]
        var p = a.przedmioty.split(";")
       
        for (var i = 0; i < p.length; i++) {
            p[i] = p[i].split(",")      
            if(p[i][0]=="A SHEEP")
                p[i][0]="A DEAD DRAGON"
        }
        var txt = ""
            for (var i = 0; i < p.length; i++) {
                if (p[i][0] != "") {
                    txt += p[i][0] + ", "
                }
            }
        document.getElementById("widok").textContent = "You see " + txt
        for (var i = 0; i < p.length; i++)
            p[i] = p[i].join(",")
            
        p = p.join(";")
        a.przedmioty = p
        var zp=dn[43].przedmioty
        
        dn[43] = new Dane("A perfect place to set a trap", "smok.bmp", "rgb(255,176,141)", "north,west", zp,"A KNIFE,A DRAGONSKIN,1,You cut a piece of dragon's skin")
        dn[57].przedmiotyUse="A DRAGONSKIN,A DRAGONSKIN SHOES,1,You used your tools to make shoes"
        dn[42].strony="east,west"
    
        document.getElementById("obraz").innerHTML = ""
        var a=dn[43]
        var dc = document.createElement("img")
        dc.style.backgroundColor = a.kolor
        dc.src = "img/" + a.plik
        dc.id = "image"
        document.getElementById("obraz").appendChild(dc)
        
        
        
    },
    messege:function(msg){
        document.getElementById("wejscie").disabled = true
        document.getElementById("messg").style.display="block"
        document.getElementById("messg").textContent=msg
        setTimeout(function(){ 
            document.getElementById("wejscie").disabled = false
            document.getElementById("messg").style.display="none"
            document.getElementById("wejscie").focus()
        }, 1000);
    },
    cover:function(){
        setTimeout(function () {
            document.getElementById("gps").focus()
        }, 10);        
    },
    end:function(){
        setTimeout(function () {
            document.getElementById("screen").src="img/theend.png"
            document.getElementById("screeny").style.display="block"
            document.getElementById("aud").play()
        }, 1000);
    },
    cache:{
        load:0,
        smierc:0,
        wysiwtlanie:0,
    },    
}
