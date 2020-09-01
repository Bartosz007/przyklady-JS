using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;

public partial class server_kolory : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        try
        {
            conn.Open();
            string sql;
            switch (Request["action"]){
                case "upd":
                    var ktlo = Request["k1"];
                    var kglo = Request["k2"];
                    var kdod = Request["k3"];
                    var user = Request["user"];

                    sql = "UPDATE Logowanie SET kolTL = '" + ktlo + "', kolGL = '" + kglo + "', kolDOD ='"+kdod+"' WHERE idU = '" + user+"'";
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();

                    Response.Write("Zapisano kolory");

                    break;
                case "dow":
                    var usr = Request["user"];
                    sql = "SELECT * FROM Logowanie WHERE idU='"+usr+"'";
                    SqlDataAdapter da = new SqlDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    StringBuilder sb = new StringBuilder();
                    sb.Append("{\"kolory\":");
                    sb.Append("[");
                    sb.Append("\""+dt.Rows[0][3]+"\",");
                    sb.Append("\"" + dt.Rows[0][4] + "\",");
                    sb.Append("\"" + dt.Rows[0][5] + "\"");
                    sb.Append("]");
                    sb.Append("}");
                    Response.Write(sb.ToString());
                    break;
            }
            

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