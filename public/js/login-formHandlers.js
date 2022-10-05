const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

const createUserHandler = async () => {
  event.preventDefault();
  console.log("Creating User");

  const username = document.querySelector("#username-create").value.trim();
  const email = document.querySelector("#email-create").value.trim();
  const password = document.querySelector("#password-create").value.trim();

  if (username.length < 8 || !username) {
    alert("Error: Please enter a valid username.");
    return;
  }

  if (!email) {
    alert("Error: Please enter a valid email.");
    return;
  }

  if (password.length < 8 || !password) {
    alert("Error: Please enter a valid password.");
    return;
  }

  const newUser = {
    username: username,
    email: email,
    password: password,
  };

  const response = await fetch("/api/users/createUser", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("Account Created Successfully! Logging into your new account...");
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", createUserHandler);
