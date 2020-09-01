using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.Security;

public partial class server_log : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        try
        {
            conn.Open();
            string[] znaki = { "\"", "'", "<", ">", "javascript", ",", ".", ":", ";", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "+", "\\", "[", "]", "/", "?", "|", "{", "}", " ", "_", "=" };
            string login = Request["login"];
            string haslo = Request["haslo"];

            for (int i = 0; i < znaki.Length; i++)
            {
                for (int j = 0; j < login.Length; j++)
                    login = login.Replace(znaki[i], "");

                for (var j = 0; j < haslo.Length; j++)
                    haslo = haslo.Replace(znaki[i], "");
            }
            string zaszyfrowane = FormsAuthentication.HashPasswordForStoringInConfigFile(haslo, "SHA1");

            string sql = "SELECT * FROM Logowanie WHERE (Logowanie.loginU='"+login+"')";
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            DataTable dt = new DataTable();
            da.Fill(dt);
            StringBuilder sb = new StringBuilder();
            if (dt.Rows.Count == 0){
                string sqlR = "INSERT INTO Logowanie (loginU, passwdU,kolTL,kolGL,kolDOD) VALUES('" + login+"','"+zaszyfrowane+"','#1954FF','#ff3300','#1AA648')";
                SqlCommand command = new SqlCommand();
                command.CommandText = sqlR;
                command.Connection = conn;
                command.ExecuteNonQuery();

                sql = "SELECT * FROM Logowanie WHERE (Logowanie.loginU='" + login + "')";
                da = new SqlDataAdapter(sql, conn);
                dt = new DataTable();
                da.Fill(dt);
                sb = new StringBuilder();

                for (int i = 0; i < 70; i++)
                {
                    command.Connection = conn;
                    if (i < 14)
                    {
                        sql = "INSERT INTO Lekcje (nrS,dayFK,hourFK,subjectFK,userFK ) VALUES('109','1','" + (i + 1) + "','1','"+ dt.Rows[0][0] + "')";
                    }
                    else if (i >= 14 && i < 28)
                    {
                        sql = "INSERT INTO Lekcje (nrS,dayFK,hourFK,subjectFK,userFK ) VALUES('109','2','" + (i - 13) + "','2','" + dt.Rows[0][0] + "')";
                    }
                    else if (i >= 28 && i < 42)
                    {
                        sql = "INSERT INTO Lekcje (nrS,dayFK,hourFK,subjectFK,userFK ) VALUES('109','3','" + (i - 27) + "','3','" + dt.Rows[0][0] + "')";
                    }
                    else if (i >= 42 && i < 56)
                    {
                        sql = "INSERT INTO Lekcje (nrS,dayFK,hourFK,subjectFK,userFK ) VALUES('109','4','" + (i - 41) + "','4','" + dt.Rows[0][0] + "')";
                    }
                    else if (i >= 56)
                    {
                        sql = "INSERT INTO Lekcje (nrS,dayFK,hourFK,subjectFK,userFK ) VALUES('109','5','" + (i - 55) + "','5','" + dt.Rows[0][0] + "')";
                    }
                    command.CommandText = sql;
                    command.ExecuteNonQuery();
                }

                Response.Write("aaa");

            } else if(zaszyfrowane == dt.Rows[0][2].ToString()){
                sb.Append("{\"tb\":[");
                sb.Append("\"nr\":" + "\"" + dt.Rows[0][0] + "\",");
                sb.Append("\"log\":" + "\"" + dt.Rows[0][1] + "\",");
                sb.Append("\"has\":" + "\"" + dt.Rows[0][2] + "\"");
                sb.Append("]}");
                
                Response.Write("bbb,"+ dt.Rows[0][0]);
            }else
            {
                Response.Write("ccc");
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