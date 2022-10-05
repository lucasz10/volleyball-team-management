const createPlayerHandler = async () => {
  const teamId = parseInt($("#team_id").text());

  const firstName = document.querySelector("#firstname-create").value.trim();
  const lastName = document.querySelector("#lastname-create").value.trim();
  const birthdate = document.querySelector("#birthdate-create").value.trim();
  const playNum = document.querySelector("#playNum-create").value.trim();
  const playPos = document.querySelector("#playPos-create").value.trim();
  const playNotes = document.querySelector("#playNotes-create").value.trim();

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
  const teamId = parseInt($("#team_id").text());

  const eventType = document.querySelector("#eventtype-create").value.trim();
  const eventName = document.querySelector("#eventname-create").value.trim();
  const eventDate = document.querySelector("#eventDate-create").value.trim();

  if (!eventName) {
    alert("Error: Please enter a team name!");
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
  .querySelector("#create-player")
  .addEventListener("submit", createPlayerHandler);

document
  .querySelector("#create-event")
  .addEventListener("submit", createEventHandler);
