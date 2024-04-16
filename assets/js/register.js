import { User } from "./class.js";

const registerForm = document.querySelector("#register-form");
const userNameInp = document.querySelector("#user-name");
const userEmailInp = document.querySelector("#user-email");
const userPasswordInp = document.querySelector("#user-password");
const userConfirmPassInp = document.querySelector("#user-confirm-password");

// ad
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
}

//email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//sifre
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    return passwordRegex.test(password);
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = userNameInp.value;
  const email = userEmailInp.value;
  const password = userPasswordInp.value;
  const confirmPassword = userConfirmPassInp.value;

  if (!validateUsername(username)) {
    alert("Ad standartlara uygun deyil");
    return;
  }

 
  if (!validateEmail(email)) {
    alert("E-mail duzgun deyil");
    return;
  }

 
  if (!validatePassword(password)) {
    alert("Sifre dogru deyil.1boyuk herf 1 reqem ve an 5 uzunluqda olmalidir");
    return;
  }


  if (password !== confirmPassword) {
    alert("2 SIFRE EYNI DEYIL,EYNI DAXIL EDIN");
    return;
  }


  const newUser = new User(username, email, password);


  resetForm();

 
  let localUsers = JSON.parse(localStorage.getItem('users')) || [];
  localUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(localUsers));

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "istifadeci elavee edildi",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {

    window.location.replace("login.html");
  });
});

function resetForm() {
  userNameInp.value = "";
  userEmailInp.value = "";
  userPasswordInp.value = "";
  userConfirmPassInp.value = "";
}
