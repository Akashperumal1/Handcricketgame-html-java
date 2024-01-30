import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ScorecardServlet")
public class ScorecardServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int wickets = Integer.parseInt(request.getParameter("wickets"));
        int overs = Integer.parseInt(request.getParameter("overs"));
        int target = Integer.parseInt(request.getParameter("target"));
        String result = request.getParameter("result");

        ScoreCard gameStatsDAO = new ScoreCard();
        boolean success = gameStatsDAO.saveGameStatsToDatabase(wickets, overs, target, result);

        if (success) {
            response.getWriter().write("Game stats saved successfully!");
        } else {
            response.getWriter().write("Failed to save game stats!");
        }
    }
}
