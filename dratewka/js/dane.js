var dn = []
var y = 4
var x = 7
y = y.toString()
x = x.toString()

function Dane(opis, plik, kolor, strony, przedmioty,przedmiotyUse) {
    this.opis = opis
    this.plik = plik
    this.kolor = kolor
    this.strony = strony
    this.przedmioty = przedmioty
    this.przedmiotyUse = przedmiotyUse
}

dn[11] = new Dane("You are inside a brimstone mine", "11.gif", "rgb(235,211,64)", "east","A SPADE,1", "A SPADE,SULPHUR,1, You are digging... (timeout) and digging... (timeout) That's enough sulphur for you")
dn[12] = new Dane("You are at the entrance to the mine", "12.gif", "rgb(89,93,87)", "east,west", "","")
dn[13] = new Dane("A hill", "13.gif", "(117,237,243)", "east,south,west", "A STONE,1;","")
dn[14] = new Dane("Some bushes", "14.gif", "rgb(202,230,51)", "east,west", "","")
dn[15] = new Dane("An old deserted hut", "15.gif", "rgb(220,204,61)", "east,west", "A BUCKET,1;","")
dn[16] = new Dane("The edge of a forest", "16.gif", "rgb(167,245,63)", "east,west", "","")
dn[17] = new Dane("A dark forest", "17.gif", "rgb(140,253,99)", "south,west", "MUSHROOMS,1;","")

dn[21] = new Dane("A man nearby making tar", "21.gif", "rgb(255,190,99)", "south,west", "", "A BUCKET,TAR,1,You got a bucket full of tar")
dn[22] = new Dane("A timber yard", "22.gif", "rgb(255,190,99)", "east,south,west", "","")
dn[23] = new Dane("You are by a roadside shrine", "23.gif", "rgb(167,245,63)", "north,east,south,west", "A KEY,1;","")
dn[24] = new Dane("You are by a small chapel", "24.gif", "rgb(212,229,36)", "east,west", "","")
dn[25] = new Dane("You are on a road leading to a wood", "25.gif", "rgb(167,245,63)", "east,south,west", "","")
dn[26] = new Dane("You are in a forest", "26 i 65.gif", "rgb(167,245,63)", "east,west", "","")
dn[27] = new Dane("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)", "north,west", "A BERRIES,1;","")

dn[31] = new Dane("You are by the Vistula River", "31.gif", "rgb(122,232,252)", "north,east", "","")
dn[32] = new Dane("You are by the Vistula River", "32.gif", "rgb(140,214,255)", "north,west", "A FISH,1;","")
dn[33] = new Dane("You are on a bridge over river", "33.gif", "rgb(108,181,242)", "north,south", "", "")
dn[34] = new Dane("You are by the old tavern", "34.gif", "rgb(255,189,117)", "east", "", "MUSHROOMS,MONEY,1,The tavern owner paid you money")
dn[35] = new Dane("You are at the town's end", "35.gif", "rgb(255,190,99)", "north,south,east", "","")
dn[36] = new Dane("You are in a butcher's shop", "36.gif", "rgb(255,188,102)", "south", "", "BERRIES,WOOL,1,The butcher gave you wool")
dn[37] = new Dane("You are in a cooper's house", "37.gif", "rgb(255,188,102)", "south", "", "MONEY,A BARREL,1,The cooper sold you a new barrel")

dn[41] = new Dane("You are in the Wawel Castle", "41.gif", "rgb(255,176,141)", "east", "","A DRAGONSKIN SHOES,A PRIZE,1,THE END")
//dn[41] = new Dane("You are in the Wawel Castle", "41.gif", "rgb(255,176,141)", "east", "A POT,1","A POT,A PRIZE,1,THE END")
dn[42] = new Dane("You are inside a dragon's cave", "42.gif", "rgb(198,205,193)", "east", "","")
dn[43] = new Dane("A perfect place to set a trap", "43.gif", "rgb(255,176,141)", "north,west", "","")
dn[44] = new Dane("You are by the water mill", "44.gif", "rgb(255,190,99)", "east", "A BAG,1","")
dn[45] = new Dane("You are at a main crossroad", "45.gif", "rgb(255,190,99)", "north,east,south,west", "","")
dn[46] = new Dane("You are on a town street", "46.gif", "rgb(255,190,99)", "north,east,west", "","")
dn[47] = new Dane("You are in a frontyard of your house", "47.gif", "rgb(255,190,99)","north,south,west","")
dn[54] = new Dane("You are by a swift stream", "54.gif", "rgb(108,181,242)", "east", "","")
dn[55] = new Dane("You are on a street leading forest", "55.gif", "rgb(255,190,99)", "north,south,west", "A KNIFE,1;","")
dn[56] = new Dane("You are in a woodcutter's backyard", "56.gif", "rgb(255,190,99)", "south", "", "A KEY,AN AXE,1,You opened a tool shed and took an axe")
dn[57] = new Dane("You are in a shoemaker's house", "57.gif", "rgb(254,194,97)", "north", "", "A BAG,A RAG,1,You used your tools to make a rag")
dn[64] = new Dane("You are in a bleak funeral house", "64.gif", "rgb(254,194,97)", "east", "A SPADE,1;","")
dn[65] = new Dane("You are on a path leading to the wood", "26 i 65.gif", "rgb(167,245,63)", "north,east,west", "","")
dn[66] = new Dane("You are at the edge of a forest", "66.gif", "rgb(167,245,63)", "north,east,west", "","")
dn[67] = new Dane("You are in a deep forest", "27 i 67.gif", "rgb(140,253,99)", "west", "", "AN AXE,STICKS,1,You cut sticks for sheeplegs")

lk43=["STICKS,SHEEPLEGS,You prepared legs for your fake sheep","A BARREL,A SHEEPTRUNK,You made a nice sheeptrunk","WOOL,A SHEEPSKIN,You prepared skin for your fake sheep","A RAG,A SHEEPHEAD,You made a fake sheephead","SULPHUR,A SOLID POISON,You prepared a solid poison","TAR,A LIQUID POISON,You prepared a liquid poison"]

var historia=["The  woodcutter lost  his home key...","The butcher likes fruit... The cooper","is greedy... Dratewka plans to make a","poisoned  bait for the dragon...  The","tavern owner is buying food  from the","pickers... Making a rag from a bag...","Press any key"]

var slownik=["NORTH or N, SOUTH or S","WEST or W, EAST or E","TAKE (object) or T (object)","DROP (object) or D (object)",	"USE (object) or U (object)","GOSSIPS or G, VOCABULARY or V","Press any key"]

lkt=[0,0,0,0,0,0]
var ekwipunek = ""

