import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDataDAO {
    // JDBC Connection parameters
    private static final String jdbcUrl = "jdbc:mysql://localhost:3306/ngpdb";
    private static final String dbUsername = "root";
    private static final String dbPassword = "";

    // Method to insert user data into the database
    public static void insertUserData(String userName, String teamName) {
        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            // Register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Open a connection
            conn = DriverManager.getConnection(jdbcUrl, dbUsername, dbPassword);
            
            if (conn != null) {
                System.out.println("Database connection established successfully!");
            } else {
                System.out.println("Failed to establish database connection!");
                return; // Exit method if connection is not established
            }

            // SQL query to insert data into the database
            String sql = "INSERT INTO user_data (userName, teamName) VALUES (?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userName);
            pstmt.setString(2, teamName);

            // Execute the query
            int rowsAffected = pstmt.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("User data inserted successfully!");
            } else {
                System.out.println("Failed to insert user data!");
            }
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
