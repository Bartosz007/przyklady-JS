using System;
using System.Data.SqlClient;

public partial class server_update : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        try
        {
            conn.Open();
            //Request["action"]
            string id = Request["id"];
            string poz = Request["poz"];
            string hour = Request["hr"];
            string min = Request["min"];
            string sql = "UPDATE Godziny SET "+poz+"G = "+hour+", "+poz+"M  = "+min+" WHERE id = "+id;
            SqlCommand command = new SqlCommand();
            command.CommandText = sql;
            command.Connection = conn;
            command.ExecuteNonQuery();
        //    Response.Write("POzyt"); 
            conn.Close();
            
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