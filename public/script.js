const reg_btn = document.querySelector(".register_btn");
const log_btn = document.querySelector(".login_btn");
const register_form = document.querySelector("#register_form");
const login_form = document.querySelector("#login_form");
const error_container = document.querySelector(".error_msg");
const error_container_login = document.querySelector(".error_msg_login");

const login_div = document.querySelector(".login");
const register_div = document.querySelector(".register");

register_div.style.display = "none";

error_container.style.display = "none";
error_container_login.style.display = "none";

reg_btn.addEventListener("click", () => {
  login_div.style.display = "none";
  register_div.style.display = "flex";
});

log_btn.addEventListener("click", () => {
  register_div.style.display = "none";
  login_div.style.display = "flex";
});

async function sendData() {
  // Clear the error container
  let child = error_container.lastElementChild;
  while (child) {
    error_container.removeChild(child);
    child = error_container.lastElementChild;
  }
  // Associate the FormData object with the form element
  const formData = new FormData(register_form);

  try {
    const response = await fetch("/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("user_email"),
        name: formData.get("user_name"),
        password: formData.get("password"),
      }),
    });
    const result = await response.json();

    if (result.errors) {
      Object.values(result.errors).forEach((error) => {
        console.log(error.msg);
        // create a list item element
        const error_msg = document.createElement("li");
        error_msg.textContent = error.msg;
        // append the error message to the error container
        error_container.appendChild(error_msg);
        error_container.style.display = "block";
        error_container.style.color = "red";
      });
    } else {
      let child = error_container.lastElementChild;
      while (child) {
        error_container.removeChild(child);
        child = error_container.lastElementChild;
      }
      error_container.style.display = "none";
    }
  } catch (e) {
    const error_msg = document.createElement("li");
    error_msg.textContent = "Something went wrong. Please try again later.";
    error_container.appendChild(error_msg);
    error_container.style.display = "block";
    error_container.style.color = "red";
    console.error(e);
  }
}

async function getLogin() {
  // Clear the error container
  let child = error_container_login.lastElementChild;
  while (child) {
    error_container_login.removeChild(child);
    child = error_container_login.lastElementChild;
  }
  // Associate the FormData object with the form element
  const formData = new FormData(login_form);

  try {
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("user_email"),
        password: formData.get("password"),
      }),
    });
    const result = await response.json();

    if (result.errors) {
      Object.values(result.errors).forEach((error) => {
        console.log(error.msg);
        // create a list item element
        const error_msg = document.createElement("li");
        error_msg.textContent = error.msg;
        // append the error message to the error container
        error_container_login.appendChild(error_msg);
        error_container_login.style.display = "block";
        error_container_login.style.color = "red";
      });
    } else {
      let child = error_container_login.lastElementChild;
      while (child) {
        error_container_login.removeChild(child);
        child = error_container_login.lastElementChild;
      }
      error_container_login.style.display = "none";
      login_form.reset();
    }
  } catch (e) {
    const error_msg = document.createElement("li");
    error_msg.textContent = "Something went wrong. Please try again later.";
    error_container_login.appendChild(error_msg);
    error_container_login.style.display = "block";
    error_container_login.style.color = "red";
    console.error(e);
  }
}

// Take over form submission
register_form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

login_form.addEventListener("submit", (event) => {
  event.preventDefault();
  getLogin();
});
