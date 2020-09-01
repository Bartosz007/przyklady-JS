using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;

public partial class server_screens : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        try
        {
            conn.Open();
            SqlCommand command = new SqlCommand();
            command.Connection = conn;

            string dzien = Request["day"];
            string usr = Request["user"];
            //uwaga na weekendy!!!!!!!
            string sql = "SELECT Przedmioty.lessLong, Lekcje.nrS FROM Lekcje LEFT JOIN Dni ON (Lekcje.dayFK = Dni.idD) LEFT JOIN Przedmioty ON (Lekcje.subjectFK = Przedmioty.idP) WHERE (Lekcje.userFK = " + usr + " AND Lekcje.dayFK = " + dzien + ")";

            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable dt = new DataTable();
            da.Fill(dt);
            StringBuilder sb = new StringBuilder();

            sb.Append("{\"today\":");
            sb.Append("[");

            for (int i = 0; i < 14; i++)
            {
                sb.Append("{");
                sb.AppendLine();
                sb.Append("\"id\":" + "\"" + (i + 1) + "\",");
                sb.Append("\"nrS\":" + "\"" + dt.Rows[i][1] + "\",");
                sb.Append("\"lessLong\":" + "\"" + dt.Rows[i][0] + "\"");
                if (i != 13)
                    sb.Append("},");
                else
                    sb.Append("}");
            }
            sb.Append("],");

            sql = "SELECT Przedmioty.lessShort, Lekcje.nrS FROM Lekcje LEFT JOIN Przedmioty ON(Lekcje.subjectFK = Przedmioty.idP) LEFT JOIN Logowanie ON (Lekcje.userFK = Logowanie.idU) WHERE (Lekcje.userFK = "+usr+")";
            da = new SqlDataAdapter(sql, conn);
            dt = new DataTable();
            da.Fill(dt);

            sb.Append("\"week\":");
            sb.Append("[");

            for (int i = 0; i < 70; i++)
            {
                sb.Append("{");
                sb.AppendLine();
                sb.Append("\"id\":" + "\"" + (i + 1) + "\",");
                sb.Append("\"nrS\":" + "\"" + dt.Rows[i][1] + "\",");
                sb.Append("\"lessShort\":" + "\"" + dt.Rows[i][0] + "\"");


                if (i != 69)
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
        }
    }
}