var p1name = "MS Dhoni";    // current batting player
var p2name = "computer";    // current bowling player
const p1name_span = document.getElementById("p1-name");
const p2name_span = document.getElementById("p2-name");
const p1name_res = document.getElementById("p1-name-res");
const p2name_res = document.getElementById("p2-name-res");
const maxWicket = 10;
const maxOvers = 2.0;
var runs = 0;
var wickets = 0;
const runs_span = document.getElementById("runs");
const wickets_span = document.getElementById("wickets");
var overs = 0.0;
const overs_p = document.getElementById("overs");
var target = 0;
const target_p = document.getElementById("target");
const results_disp_div = document.getElementById("results-disp");
var p1_action_img_span = document.getElementById("p1-action-img");
var p2_action_img_span = document.getElementById("p2-action-img");
const result_message_p = document.getElementById("result-message");
const hand0_div = document.getElementById("hand0");
const hand1_div = document.getElementById("hand1");
const hand2_div = document.getElementById("hand2");
const hand3_div = document.getElementById("hand3");
const hand4_div = document.getElementById("hand4");
const hand5_div = document.getElementById("hand5");
const hand6_div = document.getElementById("hand6");
var inningsCount = 1;

// List of player names
const playerNames = [
    "Ruturaj Gaikwad","Devon Conway", "Ajinkya Rahane", "Moeen Ali", "Shivam Dube",
    "Daryl Mitchell", "MS Dhoni(C)", "Ravindra Jadeja(VC)", "Rachin Ravindra", "Sameer Rizvi"
];
var currentBatsmanIndex = 0;
var p1name = playerNames[currentBatsmanIndex];

var isFirstInning = true;  // Flag to check if it's the first inning
const bowlerNames = [
    "Ravindra Jadeja", "Moeen Ali", "Shivam Dube", "Shardul Thakur", "Deepak Chahar",
    "Daryl Mitchell", "", "Rachin Ravindra", "Matheesha Pathirana", "Maheesh Theekshana","Mustafizur Rahman"
];
var currentBowlerIndex = 0;
var p2name = bowlerNames[currentBowlerIndex];
var oversPerBowler = 1;  // Number of overs each bowler will bowl
var ballsBowledByCurrentBowler = 0;
// Function to get the next bowler name
function getNextBowlerName() {
    if (currentBowlerIndex < bowlerNames.length - 1) {
        currentBowlerIndex++;
    } else {
        // All bowlers have bowled, reset to the first bowler
        currentBowlerIndex = 0;
    }
    ballsBowledByCurrentBowler = 0;
    return bowlerNames[currentBowlerIndex];
}
function isCurrentBowlerOversComplete() {
    return ballsBowledByCurrentBowler >= oversPerBowler * 6;  // Assuming 6 balls per over
}
// Function to get the next player name
function getNextPlayerName() {
    if (currentBatsmanIndex < playerNames.length - 1) {
        return playerNames[++currentBatsmanIndex];
    } else {
        // All batsmen have batted, reset to the first batsman
        currentBatsmanIndex = 0;
        return playerNames[currentBatsmanIndex];
    }
}

// Event listeners for user choices
hand0_div.addEventListener('click', function () {
    game(0);
});

hand1_div.addEventListener('click', function () {
    game(1);
});

hand2_div.addEventListener('click', function () {
    game(2);
});

hand3_div.addEventListener('click', function () {
    game(3);
});

hand4_div.addEventListener('click', function () {
    game(4);
});

hand5_div.addEventListener('click', function () {
    game(5);
});

hand6_div.addEventListener('click', function () {
    game(6);
});

function playBackgroundVideo(p1choice) {
    // Function to play background video based on user's choice
    // Note: Video-related code has been removed
}

function updatePlayerNames() {
    // Update the player names based on the current batsman
    p1name = playerNames[currentBatsmanIndex];
    p1name_span.innerHTML = p1name;
}

function startSecondInnings() {
    alert("Second Innings Started!\nAll the best to both the teams.");

    target = runs + 1; // Set the target based on the runs scored in the first innings
    target_p.innerHTML = "Target: " + target;
    target_p.style.visibility = "visible";

    runs = 0;
    wickets = 0;
    overs = 0.0;

    // Set the initial bowler name based on the current index
    p2name = bowlerNames[currentBowlerIndex];
    p1name_span.innerHTML = p1name; // Assuming p1name is still the batsman's name
    p2name_span.innerHTML = p2name;
    result_message_p.innerHTML = "Second Innings Started! " + p1name + " to chase the target.";
}

function afterBallInSecondInnings() {
    checkSecondInningsGameFlow();
}

function getUsernameFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userName') || 'N/A';
}

function startFirstInnings() {
    alert("Game On!\nAll the best to both the teams.");

    target = 0;
    target_p.style.visibility = "hidden";

    runs = 0;
    wickets = 0;
    overs = 0.0;

    // Set the initial batsman name as the username obtained from query parameters
    p1name = getUsernameFromQuery();
    var newvalue= p1name;
    p1name_span.innerHTML = p1name;

    // Set the initial bowler name
    p2name = getNextBowlerName();
    p2name_span.innerHTML = p2name;

    result_message_p.innerHTML = "The Game Started! Make your first move!";
}



// At the end of the gameOver function:
function gameOver(result) {
    alert("Game Over!");

    // Assume other variables and DOM elements are properly defined and initialized
    
    var winnerName;

    if (inningsCount === 2) { // Check if it's the second innings
        if (runs >= target) {
            winnerName = 'Computer';  // Computer won
        } else {
            winnerName = 'You';  // Player 1 won
        }
    } else {
        // If it's not the second innings, the game is not over yet
        return;
    }

    result_message_p.innerHTML = winnerName + " Won the match!!";

    // Hide certain elements
    hideElements();

    // Ask the user if they want to restart the match
    var restart = confirm("Do you want to restart the match?");
    if (restart) {
        // Redirect to the toss.html page to restart the match
        window.location.href = "toss.html";
    }

    // Print console logs for various game statistics
    console.log("Wickets: " + wickets);
    console.log("Overs: " + overs);
    console.log("Target: " + target);
    console.log("Result: " + (winnerName === 'You' ? "  won" : "lost"));

    // Create a table to display the game statistics
    createGameStatsTable(wickets, overs, target, winnerName);

    // Submit game stats to servlet
    submitGameStatsToServlet(wickets, overs, target, winnerName);
}

// Function to hide certain elements
function hideElements() {
    var elements = document.getElementsByClassName("Choices");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.visibility = "hidden";
    }
    document.getElementById("action-message").style.visibility = "hidden";
}

// Function to create a game statistics table
function createGameStatsTable(wickets, overs, target, winnerName) {
    var gameStatsDiv = document.getElementById("game-stats");
    var table = document.createElement("table");
    table.id = "game-stats-table";
    var tableHTML = "<th>Wickets</th><th>Overs</th><th>Target</th><th>Result</th></tr>";
    tableHTML +=  "</td><td>" + wickets + "</td><td>" + overs + "</td><td>" + target + "</td><td>" + (winnerName === 'You' ? "  won" : "lost") + "</td></tr>";
    table.innerHTML = tableHTML;
    gameStatsDiv.appendChild(table);
    
}


// Function to submit game statistics to servlet
function submitGameStatsToServlet(wickets, overs, target, result) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../ScorecardServlet", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Game stats submitted successfully!");
                console.log(xhr.responseText); // Log the response from the servlet
            } else {
                console.error("Error submitting game stats: " + xhr.status);
            }
        }
    };
    
    var params = "wickets=" + wickets + "&overs=" + overs + "&target=" + target + "&result=" + result;
    xhr.send(params);
    var gameResult = (winnerName === 'You' ? "  won" : "lost"); // Sample result value
gameOver(gameResult); 
}











function getComputerChoice() {
    return Math.floor(Math.random() * 7);
}

function incrementOverCount() {
    let noOfBalls = (overs - Math.floor(overs)).toFixed(1) * 10;
    if (noOfBalls === 5) {
        overs = Math.ceil(overs);
    } else {
        overs += 0.1;
    }

    overs_p.innerHTML = "Overs: " + overs.toFixed(1);

    ballsBowledByCurrentBowler++;
    if (isCurrentBowlerOversComplete()) {
        p2name = getNextBowlerName();
        p2name_span.innerHTML = p2name;
    }
}

function updateActionResults(p1choice, p2choice) {
    results_disp_div.style.visibility = "visible";
    p1name_res.innerHTML = p1name;
    p2name_res.innerHTML = p2name;

    switch (p1choice) {
        case 0:
            p1_action_img_span.src = "../resources/images/hand-with-zero-finger.png";
            break;
        case 1:
            p1_action_img_span.src = "../resources/images/hand-with-one-finger.png";
            break;
        case 2:
            p1_action_img_span.src = "../resources/images/hand-with-two-finger.png";
            break;
        case 3:
            p1_action_img_span.src = "../resources/images/hand-with-three-finger.png";
            break;
        case 4:
            p1_action_img_span.src = "../resources/images/hand-with-four-finger.png";
            break;
        case 5:
            p1_action_img_span.src = "../resources/images/hand-with-five-finger.png";
            break;
        case 6:
            p1_action_img_span.src = "../resources/images/hand-with-thumb-finger.png";
            break;
    }
    switch (p2choice) {
        case 0:
            p2_action_img_span.src = "../resources/images/hand-with-zero-finger.png";
            break;
        case 1:
            p2_action_img_span.src = "../resources/images/hand-with-one-finger.png";
            break;
        case 2:
            p2_action_img_span.src = "../resources/images/hand-with-two-finger.png";
            break;
        case 3:
            p2_action_img_span.src = "../resources/images/hand-with-three-finger.png";
            break;
        case 4:
            p2_action_img_span.src = "../resources/images/hand-with-four-finger.png";
            break;
        case 5:
            p2_action_img_span.src = "../resources/images/hand-with-five-finger.png";
            break;
        case 6:
            p2_action_img_span.src = "../resources/images/hand-with-thumb-finger.png";
            break;
    }
}

function printRuns(run, batsman) {
    switch (run) {
        case 0:
            result_message_p.innerHTML = "a successful defense by " + batsman;
            break;
        case 1:
            result_message_p.innerHTML = "gets one run";
            break;
        case 2:
            result_message_p.innerHTML = "two runs gained";
            break;
        case 3:
            result_message_p.innerHTML = "three runs! good running between the wickets";
            break;
        case 4:
            result_message_p.innerHTML = "boundary!! four runs!!! 🔥";
            break;
        case 5:
            result_message_p.innerHTML = "omg... are they Flash!? gets five runs!!";
            break;
        case 6:
            result_message_p.innerHTML = "and the ball goes beyond! what a sixer! 🔥🔥🔥";
            break;
    }
}

function checkGameFlow() {
    /* game flow */
    if (inningsCount === 1 && wickets === maxWicket || inningsCount === 1 && overs === maxOvers) {
        startSecondInnings();
        inningsCount++;
    } else if (inningsCount === 2 && wickets === maxWicket || inningsCount === 2 && runs >= target || inningsCount === 2 && overs === maxOvers) {
        gameOver();
    } else {
        //startFirstInnings();
    }
}

function scoredRun(p1choice, p2choice) {
    if (inningsCount === 1) {
        if (p1choice === 0) {
            console.log("Scored " + p2choice + " runs!!");
            runs = runs + p2choice;
        } else {
            console.log("Scored " + p1choice + " runs!!");
            runs = runs + p1choice;
        }
        printRuns(p1choice, p1name);
    } else {
        if (p2choice === 0) {
            console.log("Scored " + p1choice + " runs!!");
            runs = runs + p1choice;
        } else {
            console.log("Scored " + p2choice + " runs!!");
            runs = runs + p2choice;
        }
        printRuns(p2choice, p1name);
    }
    runs_span.innerHTML = runs;
    wickets_span.innerHTML = wickets;

    checkGameFlow();
}

function gotOut(p1choice) {
    console.log("OUT!!");
    wickets++;
    runs_span.innerHTML = runs;
    wickets_span.innerHTML = wickets;
    result_message_p.innerHTML = "OUT!!  " + p1name + " loses a wicket 😢";

    updatePlayerNames(); // Update player name for the next batsman

    if (wickets < maxWicket) {
        // Display the next batsman's name in the console
        console.log("Next Batsman: " + getNextPlayerName());
    }

    checkGameFlow();
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    updateActionResults(userChoice, computerChoice);

    if (userChoice === computerChoice) {
        gotOut(userChoice);
    } else {
        scoredRun(userChoice, computerChoice);
    }

    incrementOverCount();
}

function main() {
    // Attach event listeners directly within the main function
    document.getElementById('hand0').addEventListener('click', function () {
        playBackgroundVideo(0);
    });
    document.getElementById('hand1').addEventListener('click', function () {
        playBackgroundVideo(1);
    });
    document.getElementById('hand2').addEventListener('click', function () {
        playBackgroundVideo(2);
    });
    document.getElementById('hand3').addEventListener('click', function () {
        playBackgroundVideo(3);
    });
    document.getElementById('hand4').addEventListener('click', function () {
        playBackgroundVideo(4);
    });
    document.getElementById('hand5').addEventListener('click', function () {
        playBackgroundVideo(5);
    });
    document.getElementById('hand6').addEventListener('click', function () {
        playBackgroundVideo(6);
    });

    startFirstInnings();
}

main();

function displayQueryParameters() {
    var urlParams = new URLSearchParams(window.location.search);
    var userName = urlParams.get('userName') || 'N/A';
    var teamName = urlParams.get('teamName') || 'N/A';
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ` Name: ${userName}<br>Team : ${teamName}`;

    // Assign Player 1's name as Your Name
    var p1Name = document.getElementById('p1-name');
    p1Name.innerHTML = userName;
}

// Call the function on page load
displayQueryParameters();

// Define arrays to store player performances
var batsmenPerformance = [];
var bowlersPerformance = [];

// Function to update batsman's performance
function updateBatsmanPerformance(name, runs) {
    batsmenPerformance.push({ name: name, runs: runs });
}

// Function to update bowler's performance
function updateBowlerPerformance(name, wickets) {
    bowlersPerformance.push({ name: name, wickets: wickets });
}

 
 
 
 
 
 
 //document.addEventListener("DOMContentLoaded", function() {
//    var video = document.getElementById('bg-video');
    
 //   setTimeout(function(){
 //       video.pause(); // Pause the video after 30 seconds
   //     video.style.display = "none"; // Hide the video element
     //   document.body.style.backgroundImage = "url('https://png.pngtree.com/thumb_back/fh260/background/20230630/pngtree-d-illustration-of-a-cricket-pitch-with-a-view-of-the-image_3701619.jpg')"; // Set background image
 //   }, 30000); // 30000 milliseconds = 30 seconds
//});





