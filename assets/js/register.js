import { User } from "./class.js";

const registerForm = document.querySelector("#register-form");
const userNameInp = document.querySelector("#user-name");
const userEmailInp = document.querySelector("#user-email");
const userPasswordInp = document.querySelector("#user-password");
const userConfirmPassInp = document.querySelector("#user-confirm-password");




registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newUser = new User(
    userNameInp.value,
    userEmailInp.value,
    userPasswordInp.value
  );
  resetForm();
  //set user to localStorage
  const localUsers = JSON.parse(localStorage.getItem('users'));
  localUsers.push(newUser);
  localStorage.setItem('users',JSON.stringify(localUsers));
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "User Signed Up successfully",
    showConfirmButton: false,
    timer: 1500,
  }).then((result) => {
    //redirect login page
    window.location.replace("login.html");
  });
});

function resetForm() {
  userNameInp.value = "";
  userEmailInp.value = "";
  userPasswordInp.value = "";
  userConfirmPassInp.value = "";
}
