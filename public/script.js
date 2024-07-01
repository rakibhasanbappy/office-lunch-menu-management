const reg_btn = document.querySelector(".register");

const login_form = document.querySelector(".login");

reg_btn.addEventListener("click", () => {
  login_form.style.display = "none";
});
