console.log("HEY LOGIN");
import data from "./data.js";

const loginForm = document.querySelector("#login-form");
const userNameInp = document.querySelector("#user-name");
const passwordInp = document.querySelector("#user-password");
const rememberMe = document.querySelector("#remember-me");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const localUsers = JSON.parse(localStorage.getItem("users")) || [];
  console.log("user name: ", userNameInp.value);
  console.log("user password: ", passwordInp.value);

  const check = localUsers.find(
    (x) => x.username == userNameInp.value && x.password == passwordInp.value
  );
  if (check) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Signed In successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      check.isLogged = true;
      localStorage.setItem("users", JSON.stringify(localUsers));
    }).then(()=>{
        window.location.replace('index.html');
    });
  }
  else{
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "username or password is incorrect!",
        showConfirmButton: false,
        timer: 1500,
      })
  }
});
