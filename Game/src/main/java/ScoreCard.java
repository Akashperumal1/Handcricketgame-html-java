import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ScoreCard {
    // Method to save game statistics to the database
    public boolean saveGameStatsToDatabase(int wickets, int overs, int target, String result) {
        String url = "jdbc:mysql://localhost:3306/ngpdb";
        String username = "root";
        String password = "";

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(url, username, password);
            String sql = "INSERT INTO game_stats (wickets, overs, target, result) VALUES (?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, wickets);
            pstmt.setInt(2, overs);
            pstmt.setInt(3, target);
            pstmt.setString(4, result);

            int rowsInserted = pstmt.executeUpdate();
            
            // Return true if at least one row was inserted
            return rowsInserted > 0;
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            return false;
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
