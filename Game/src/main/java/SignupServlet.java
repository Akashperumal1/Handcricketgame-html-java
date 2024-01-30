import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet("/SignupServlet")
public class SignupServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {
            // Establish database connection
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/ngpdb", "root", "");

            // Prepare SQL statement for user insertion
            String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, username);
                preparedStatement.setString(2, email);
                preparedStatement.setString(3, password);

                // Execute the SQL statement
                int rowsAffected = preparedStatement.executeUpdate();

                if (rowsAffected > 0) {
                    // User inserted successfully
                    response.sendRedirect("./index.html"); // Redirect to index.html
                } else {
                    // User insertion failed
                    response.getWriter().println("User insertion failed");
                }
            }

            // Close the database connection
            connection.close();

        } catch (SQLException e) {
            e.printStackTrace();
            // Handle the SQL exception, you may choose to log it or handle it as needed
            response.getWriter().println("Error during user insertion");
        }
    }
}
