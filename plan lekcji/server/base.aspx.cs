using System;

using System.Data.SqlClient;
using System.Data;

public partial class server_base : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        string odp = "";
        string sql = "";

        try
        {
            conn.Open();

            switch (Request["action"])
            {
                case "create":                    
                    SqlCommand commandC = new SqlCommand();
                    commandC.Connection = conn;
                    
                    commandC.CommandText = "CREATE TABLE Godziny (id INTEGER, odG VARCHAR(2), odM VARCHAR(2),doG VARCHAR(2),doM VARCHAR(2))";
                    commandC.ExecuteNonQuery();
                    commandC.CommandText = "CREATE TABLE Lekcje (idL INTEGER IDENTITY(1,1), nrS VARCHAR(30), dayFK INTEGER, hourFK INTEGER, subjectFK INTEGER, userFK INTEGER)";
                    commandC.ExecuteNonQuery();
                    commandC.CommandText = "CREATE TABLE Przedmioty (idP INTEGER IDENTITY(1,1), lessShort VARCHAR(30), lessLong VARCHAR(30))";
                    commandC.ExecuteNonQuery();
                    commandC.CommandText = "CREATE TABLE Dni (idD INTEGER, dayShort VARCHAR(20), dayLong VARCHAR(20))";
                    commandC.ExecuteNonQuery();
                    commandC.CommandText = "CREATE TABLE Logowanie (idU INTEGER IDENTITY(1,1), loginU VARCHAR(30), passwdU VARCHAR(8000), kolTL VARCHAR(300),kolGL VARCHAR(300),kolDOD VARCHAR(300))";
                    commandC.ExecuteNonQuery();

                    odp = "Utworzono tabele";
                    break;

                case "drop":
                    SqlCommand commandDR = new SqlCommand();
                    commandDR.Connection = conn;
                    
                    commandDR.CommandText = "DROP TABLE Godziny";
                    commandDR.ExecuteNonQuery();
                    commandDR.CommandText = "DROP TABLE Lekcje";
                    commandDR.ExecuteNonQuery();
                    commandDR.CommandText = "DROP TABLE Przedmioty";
                    commandDR.ExecuteNonQuery();
                    commandDR.CommandText = "DROP TABLE Dni";
                    commandDR.ExecuteNonQuery();
                    commandDR.CommandText = "DROP TABLE Logowanie";
                    commandDR.ExecuteNonQuery();

                    odp = "Usunięto tabelę";
                    break;
                    
                case "make":
                    SqlCommand commandM = new SqlCommand();
                    commandM.Connection = conn;

                    commandM.CommandText = "DELETE FROM Godziny ";
                    commandM.ExecuteNonQuery();
                    commandM.CommandText = "DELETE FROM Lekcje ";
                    commandM.ExecuteNonQuery();
                    commandM.CommandText = "DELETE FROM Przedmioty ";
                    commandM.ExecuteNonQuery();
                    commandM.CommandText = "DELETE FROM Dni ";
                    commandM.ExecuteNonQuery();
                    commandM.CommandText = "DELETE FROM Logowanie ";
                    commandM.ExecuteNonQuery();
                    //-----------------tabela godziny
                    for (int i = 0; i < 14; i++){
                        sql = "INSERT INTO Godziny (id, odG, odM, doG, doM) VALUES("+(i+1)+",'00','00','00','00')";                        
                        commandM.CommandText = sql;
                        commandM.Connection = conn;
                        commandM.ExecuteNonQuery();
                    }
                    //---------------------tabela dni
                    string[] dayS = { "PON", "WT", "SR", "CZW", "PT" };
                    string[] dayL = { "Poniedzialek", "Wtorek", "Sroda", "Czwartek", "Piatek" };

                    for (int i = 0; i < 5; i++){
                        sql = "INSERT INTO Dni (idD, dayShort, dayLong) VALUES('"+(i+1)+"','"+dayS[i]+"','"+dayL[i]+"')";
                        commandM.CommandText = sql;
                        commandM.Connection = conn;
                        commandM.ExecuteNonQuery();
                    }
                    //-----------------------tabela logowanie
                   /* sql = "INSERT INTO Logowanie (loginU, passwdU) VALUES('test','testpasswd')";
                    commandM.CommandText = sql;
                    commandM.Connection = conn;
                    commandM.ExecuteNonQuery();*/
                    //-------------------tabela przedmioty
                    string[] subjectS = { "POL", "MAT", "ANG", "AK", "WF" };
                    string[] subjectL = { "jezyk polski", "matematyka", "jezyk angielski", "aplikacje klienckie", "wychowanie fizyczne" };

                    for (int i = 0; i < subjectS.Length; i++)
                    {
                        sql = "INSERT INTO Przedmioty (lessShort , lessLong) VALUES('" + subjectS[i] + "','" + subjectL[i] + "')";
                        commandM.CommandText = sql;
                        commandM.Connection = conn;
                        commandM.ExecuteNonQuery();
                    }
                    //---------------tabela lekcje
                    

                    odp = "Dodano dane";
                    break;

                case "delete":
                    SqlCommand commandD = new SqlCommand();
                    commandD.Connection = conn;
                    
                    commandD.CommandText ="DELETE FROM Godziny ";
                    commandD.ExecuteNonQuery();
                    commandD.CommandText = "DELETE FROM Lekcje ";
                    commandD.ExecuteNonQuery();
                    commandD.CommandText = "DELETE FROM Przedmioty ";
                    commandD.ExecuteNonQuery();
                    commandD.CommandText = "DELETE FROM Dni ";
                    commandD.ExecuteNonQuery();
                    commandD.CommandText = "DELETE FROM Logowanie ";
                    commandD.ExecuteNonQuery();

                    odp = "Usunięto dane";
                    break;
            }

                
                conn.Close();
                Response.Write(odp);
            

        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
        finally
        {
            conn.Close();
        }

    }
}

