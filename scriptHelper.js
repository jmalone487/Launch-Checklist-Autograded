// Write your helper functions here!
// scriptHelper.js

// Function to validate input
function validateInput(input) {
    if (input === "") {
        return "Empty";
    } else if (isNaN(input)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

// Function to handle form submission and update shuttle status
function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");

    // Validation check: All fields must be filled
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" ||
        validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        alert("All fields are required!");
        return;
    }

    // Validation check: Pilot and co-pilot names should be strings, fuel level and cargo mass should be numbers
    if (validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number" &&
        validateInput(fuelLevel) === "Is a Number" && validateInput(cargoMass) === "Is a Number") {

        // Update pilot and co-pilot status
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        // Check fuel level
        if (fuelLevel < 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        }
        // Check cargo mass
        else if (cargoMass > 10000) {
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        }
        // Everything is good, shuttle is ready
        else {
            faultyItems.style.visibility = "hidden";
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
        }
    } else {
        alert("Make sure to enter valid information for each field!");
    }
}

// Function to fetch planetary data
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(response => response.json());

    return planetsReturned;
}

// Function to pick a random planet from the list
function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
}

// Function to update the mission destination with the selected planet
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

// Export the functions
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
module.exports.addDestinationInfo = addDestinationInfo;

