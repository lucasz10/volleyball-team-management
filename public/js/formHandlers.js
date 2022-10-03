const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};


const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

const createUserHandler = async () => {

  const username = document.querySelector('#username-create').value.trim();
  const email = document.querySelector('#email-create').value.trim();
  const password = document.querySelector('#password-create').value.trim();

  if(username.length < 8 || username.contains(' ')){
      alert("Error: Please enter a valid username.")
      return;
  }

  if(email.contains(' ')){
      alert("Error: Please enter a valid email.")
      return;
  }

  if(password.length < 8 || password.contains(' ')){
      alert("Error: Please enter a valid password.")
      return;
  }

  const newUser = 
      {
          username: username,
          email: email,
          password: password
      };
  
  const response = await fetch('/api/users/createUser', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
  })

  if(response.ok){
      alert("Account Created Successfully! Logging into your new account...")
      document.location.replace('/')
  } else {
      alert("Failed to create account.")
  }
};

const createTeamHandler = async () => {

  const teamName = document.querySelector('#teamname-create').value.trim();

  if(!teamName) {
      alert("Error: Please enter a team name!")
      return;
  }

  const newTeam = 
  {
      teamName: teamName,
      teamWins: 0,
      teamLosses: 0,
  }

  const response = await fetch('/api/teams/createTeam', {
      method: 'POST',
      body: JSON.stringify(newTeam),
      headers: { 'Content-Type': 'application/json' },
  })

  if(response.ok){
      alert("Team Created Successfully!")
      document.location.replace('/teams')
  } else {
      alert("Failed to create account.")
  }

}
  
const createPlayerHandler = async () => {

}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#logout').addEventListener('click', logout);

document.querySelector('#create-user').addEventListener('submit', createUserHandler);

document.querySelector('#create-team').addEventListener('submit', createTeamHandler);

document.querySelector('#create-player').addEventListener('submit', createPlayerHandler);



