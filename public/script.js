const reg_btn = document.querySelector(".register_btn");
const log_btn = document.querySelector(".login_btn");

const login_form = document.querySelector(".login");
const register_form = document.querySelector(".register");

register_form.style.display = "none";

reg_btn.addEventListener("click", () => {
  login_form.style.display = "none";
  register_form.style.display = "flex";
});

log_btn.addEventListener("click", () => {
  register_form.style.display = "none";
  login_form.style.display = "flex";
});
