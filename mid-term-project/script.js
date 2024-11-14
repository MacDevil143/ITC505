// Define the story structure as an array of objects
const storyStages = {
    start: {
        text: "You find yourself at a crossroads in a mysterious forest. What will you do?",
        choices: [
            { text: "Go left", consequence: "leftPath" },
            { text: "Go right", consequence: "rightPath" }
        ],
        image: "Bos-Nederland-Epe-e1719389547661.jpg"  // Replace with your local image
    },
    leftPath: {
        text: "You walk down the left path and encounter a strange creature. What will you do?",
        choices: [
            { text: "Talk to the creature", consequence: "talkCreature" },
            { text: "Run away", consequence: "runAway" }
        ],
        image: "animals_hero_lizards.jpg"  // Replace with your local image
    },
    rightPath: {
        text: "The right path takes you to a peaceful village. Do you want to explore?",
        choices: [
            { text: "Talk to the villagers", consequence: "talkVillagers" },
            { text: "Walk away", consequence: "walkAway" }
        ],
        image: " a-village-overview-ai-artwork-851.webp"  // Replace with your local image
    },
    talkCreature: {
        text: "The creature seems friendly. It invites you to its home.",
        choices: [{ text: "Accept", consequence: "acceptCreature" }],
        image: "stock-vector-animal-and-their-homes-flash-cards-printable-flash-card-illustrating-monkey-hamster-dolphin-1826731262.jpg"  // Replace with your local image
    },
    acceptCreature: {
        text: "The adventure ends here.",
        choices: [{ text: "restart", consequence: "start" }],
        image: "istockphoto-1404030356-612x612.jpg"  // Replace with your local image
    },
    runAway: {
        text: "Do you choose exit from the game?",
        choices: [
            { text: "Yes", consequence: "start" },
            { text: "No", consequence: "leftPath" }
        ],
        image: "istockphoto-1320033559-612x612.jpg"  // Replace with your local image
    },
    talkVillagers: {
        text: "The villagers are very friendly. They invite you to their home.",
        choices: [{ text: "Accept", consequence: "acceptvillagers" }],
        image: "a-village-overview-ai-artwork-851.webp"  // Replace with your local image
    },
    acceptvillagers: {
        text: "The adventure ends here.",
        choices: [{ text: "restart", consequence: "start" }],
        image: "istockphoto-1404030356-612x612.jpg"  // Replace with your local image
    },
    walkAway: {
        text: "Do you choose exit from the game?",
        choices: [
            { text: "Yes", consequence: "start" },
            { text: "No", consequence: "rightPath" }
        ],
        image: "istockphoto-1320033559-612x612.jpg"  // Replace with your local image
    },
    // Add additional stages if needed
};

// Initialize the game state
let currentStage = "start";

// Function to start the game
function startGame() {
    currentStage = "start";
    updatePage();
}

// Function to update the page based on the current stage
function updatePage() {
    const stage = storyStages[currentStage];

    // Update story text
    document.getElementById("story-text").textContent = stage.text;

    // Update image
    document.getElementById("story-image").src = stage.image;

    // Clear any previous choices
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    // Create new choices
    stage.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            currentStage = choice.consequence;
            updatePage();
        };
        choicesContainer.appendChild(button);
    });

    // If there are no choices, display the end screen
    if (stage.choices.length === 0) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    document.getElementById("story-text").textContent = "The adventure ends here.";
    document.getElementById("choices-container").innerHTML = "";
    document.getElementById("story-image").src = "istockphoto-1404030356-612x612.jpg";  // Replace with your local end image
}

// Start the game when the page loads
window.onload = startGame;
