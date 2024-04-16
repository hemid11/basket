const localUsers = JSON.parse(localStorage.getItem("users"));
const localBasket = JSON.parse(localStorage.getItem("basket"));
const linkUL = document.querySelector(".links");

function renderHeader() {
  if (localUsers.some((x) => x.isLogged)) {
    const currentUser = localUsers.find((x) => x.isLogged);
    linkUL.innerHTML = `  <li><a href="index.html">Home</a></li>
        <li><b>${currentUser.username}</b></li>
        <li><button class="btn btn-outline-primary logout">logout</button></li>`;
    const logOut = document.querySelector(".logout");
    logOut.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User logged out Successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            currentUser.isLogged = false;
            localStorage.setItem("users", JSON.stringify(localUsers));
            // window.location.replace('login.html');
            //recursion
            renderHeader();
          });
        }
      });
    });
  } else {
    linkUL.innerHTML = ` <li><a href="index.html">Home</a></li>
    <li><a href="login.html">Login</a></li>
    <li><a href="register.html">Register</a></li>`;
  }
}

renderHeader();
