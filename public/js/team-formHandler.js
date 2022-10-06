const createPlayerHandler = async () => {
  const teamId = document.querySelector("#team_id").dataset.teamId;

  const firstName = document.querySelector("#firstname-create").value.trim();
  const lastName = document.querySelector("#lastname-create").value.trim();
  const birthdate = document.querySelector("#birthdate-create").value.trim();
  const playNum = document.querySelector("#playNum-create").value.trim();
  const playPos = document.querySelector("#playPos-create").value.trim();
  const playNotes = document.querySelector("#playNotes-create").value.trim();

  if (playPos === "Please select a position") {
    alert("Error: Please select a position!");
    return;
  }

  const newPlayer = {
    first_name: firstName,
    last_name: lastName,
    player_birthdate: birthdate,
    player_number: playNum,
    position: playPos,
    player_notes: playNotes,
    team_id: teamId,
  };

  const response = await fetch("/api/players/createPlayer", {
    method: "POST",
    body: JSON.stringify(newPlayer),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Player added successfully!");
    document.location.reload();
  } else {
    alert("Failed to create player.");
  }
};

const createEventHandler = async () => {
  const teamId = document.querySelector("#team_id").dataset.teamId;

  const eventType = document.querySelector("#eventtype-create").value.trim();
  const eventName = document.querySelector("#eventname-create").value.trim();
  const eventDate = document.querySelector("#eventDate-create").value.trim();

  if (!eventName) {
    alert("Error: Please enter a team name!");
    return;
  }

  if (eventType === "Please select an event type") {
    alert("Error: Please select an event type!");
    return;
  }

  const newEvent = {
    event_type: eventType,
    event_name: eventName,
    event_date: eventDate,
    team_id: teamId,
  };

  const response = await fetch("/api/events/createEvent", {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Event Created Successfully!");
    document.location.reload();
  } else {
    alert("Failed to create account.");
  }
};

document
  .querySelector(".createplayer-form")
  .addEventListener("submit", createPlayerHandler);

document
  .querySelector(".createevent-form")
  .addEventListener("submit", createEventHandler);
