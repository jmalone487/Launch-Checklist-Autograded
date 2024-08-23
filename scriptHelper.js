// Write your helper functions here!
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch data");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

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

function validateInput(testInput) {
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
    // Validate inputs
    let pilotStatus = validateInput(pilot);
    let copilotStatus = validateInput(copilot);
    let fuelLevelStatus = validateInput(fuelLevel);
    let cargoMassStatus = validateInput(cargoMass);

    // Check for empty fields
    if (pilotStatus === "Empty" || copilotStatus === "Empty" || fuelLevelStatus === "Empty" || cargoMassStatus === "Empty") {
        alert("All fields are required!");
        return; // Stop execution if any field is empty
    }

    // Check for valid input types
    if (pilotStatus !== "Not a Number" || copilotStatus !== "Not a Number" || fuelLevelStatus !== "Is a Number" || cargoMassStatus !== "Is a Number") {
        alert("Please enter valid information for each field!");
        return; // Stop execution if any field has invalid data
    }

    // Update pilot and copilot status
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

    // Initialize variables for launch status
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.getElementById("faultyItems");
    faultyItems.style.visibility = "visible";

    // Check fuel level
    if (fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else if (cargoMass > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    } else {
        // If everything is fine, set the shuttle as ready for launch
        faultyItems.style.visibility = "hidden";
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    }
}

module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
module.exports.addDestinationInfo = addDestinationInfo;
