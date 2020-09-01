using System;
using System.Data.SqlClient;
using System.Data;
using System.Text;

public partial class server_read : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        try
        {

            conn.Open();

            string sql = "SELECT * FROM Godziny";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable dt = new DataTable();
            da.Fill(dt);
            
            StringBuilder sb = new StringBuilder();
            sb.Append("{\"godziny\":");
            sb.Append("[");
            for (int i = 0; i < 14; i++) {
                sb.Append("{");
                sb.AppendLine();
                sb.Append("\"id\":"+ "\"" +dt.Rows[i][0] + "\",");
                sb.Append("\"odG\":" + "\"" + dt.Rows[i][1] + "\",");
                sb.Append("\"odM\":" + "\"" + dt.Rows[i][2] + "\",");
                sb.Append("\"doG\":" + "\"" + dt.Rows[i][3] + "\",");
                sb.Append("\"doM\":" + "\"" + dt.Rows[i][4] + "\"");

                if (i != 13)
                    sb.Append("},");
                else
                    sb.Append("}");
            }
            sb.Append("]");
            sb.Append("}");
            Response.Write(sb.ToString());
            conn.Close();


        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
        finally
        {
            conn.Close();
           // Response.Write("połączenie zamkniete");
        }
    }
}