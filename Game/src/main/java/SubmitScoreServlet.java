import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@WebServlet("/SubmitScoreServlet")
public class SubmitScoreServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userName = request.getParameter("userName");
        String teamName = request.getParameter("teamName");

        // Call JDBC method to insert data into the database
        DatabaseManager.insertData(userName, teamName);

        // Redirect to app.js
        response.sendRedirect("./html/intro.html");
    }
}

