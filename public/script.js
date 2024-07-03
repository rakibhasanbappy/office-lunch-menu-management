const reg_btn = document.querySelector(".register_btn");
const log_btn = document.querySelector(".login_btn");
const register_form = document.querySelector("#register_form");

const login_div = document.querySelector(".login");
const register_div = document.querySelector(".register");

register_div.style.display = "none";

reg_btn.addEventListener("click", () => {
  login_div.style.display = "none";
  register_div.style.display = "flex";
});

log_btn.addEventListener("click", () => {
  register_div.style.display = "none";
  login_div.style.display = "flex";
});

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(register_form);

  try {
    const response = await fetch("/user/create", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
register_form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
