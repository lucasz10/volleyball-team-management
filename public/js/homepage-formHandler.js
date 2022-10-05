const createTeamHandler = async () => {
  const teamName = document.querySelector("#teamname-create").value.trim();

  if (!teamName) {
    alert("Error: Please enter a team name!");
    return;
  }

  const newTeam = {
    teamName: teamName,
  };

  const response = await fetch("/api/teams/createTeam", {
    method: "POST",
    body: JSON.stringify(newTeam),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Team Created Successfully!");
    document.location.reload();
  } else {
    alert("Failed to create account.");
  }
};

document
  .querySelector(".createTeam-form")
  .addEventListener("submit", createTeamHandler);
