using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;//do plików
using System.Text;//do kodowania


public partial class SaveFile : System.Web.UI.Page
{
    private string PATH = HttpContext.Current.Server.MapPath("pliki/text.txt");

    protected void Page_Load(object sender, EventArgs e)//start strony
    {
        //odbóir przesłanych danych
        Response.AppendHeader("Access-Control-Allow-Origin", "*");
        string nazwa = Request["nazwa"];
        string kolor = Request["kolor"];
        string dataa = Request["dataa"];
        string tablica = Request["tablica"];

        if (nazwa != null && dataa != null && tablica != null && kolor!=null)
        {
            Save(nazwa,dataa,tablica,kolor);
            Response.Write("Trasa wycieczki została zapisana");
        }
        else {
            Response.Write("Wystąpił błąd");
        }
        
    }
    //zapis pliku
    private void Save(string nazwa,string dataa,string tablica,string kolor) {

       // Response.Write("start2");
        StreamWriter writer = new StreamWriter(PATH, true, Encoding.Default);//scieżka,dopisywanie,kodowanie
        writer.WriteLine("["+nazwa + ","+kolor+"," + dataa +tablica+"],");   //wypisze to z czasem
        writer.Close();//zamykanie
    }

}