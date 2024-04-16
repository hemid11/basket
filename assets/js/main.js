import data from "./data.js";

const cardsRow = document.querySelector(".cards-row");
const tBody = document.querySelector("tbody");

window.addEventListener("load", () => {
  if (!localStorage.getItem("basket")) {
    localStorage.setItem("basket", JSON.stringify([]));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  if (!localStorage.getItem("wishlist")) {
    localStorage.setItem("wishlist", JSON.stringify([]));
  }
});

data.products.forEach((product) => {
  cardsRow.innerHTML += `  <div class="col-lg-3 col-md-6 col-sm-12">
    <div class="card">
        <div class="heart" data-id="${product.id}" data-name="${product.name}"><i class="fa-regular fa-heart" style="color: #ff0000;"></i></div>
        <img class="card-img-top" height="240" src="${product.imgSrc}" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <h5>${
              product.hasDiscount()
                ? `<del class="text-secondary">${product.salePrice}$</del> ${product.calcPrice()}`
                : Number(product.salePrice).toFixed(2)
            }$</h5>
            <button data-id=${product.id} data-name=${product.name} class="btn btn-outline-primary basket-btn">Basket</button>
            <button data-id=${product.id} class="btn btn-outline-danger delete-btn">Delete</button>
        </div>
    </div>
</div>`;
});

const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", function () {
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
        const prodIdx = data.products.findIndex((x) => x.id === this.getAttribute("data-id"));
        this.closest(".col-lg-3").remove();
        data.products.splice(prodIdx, 1);
        const localBasket = JSON.parse(localStorage.getItem("basket"));
        const idx = localBasket.findIndex((x) => x.id == this.getAttribute("data-id"));
        localBasket.splice(idx, 1);
        localStorage.setItem("basket", JSON.stringify(localBasket));
        renderBasketTableHTML(localBasket, data.products);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  });
});

const basketBtns = document.querySelectorAll(".basket-btn");
basketBtns.forEach((basketBtn) => {
  basketBtn.addEventListener("click", function (e) {
    const localBasketArr = JSON.parse(localStorage.getItem("basket"));
    const currentProdID = this.getAttribute("data-id");
    const foundDuplicate = localBasketArr.find((x) => x.id === currentProdID);
    if (foundDuplicate) {
      foundDuplicate.count++;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${this.getAttribute("data-name")} count increased`,
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      localBasketArr.push({ id: currentProdID, count: 1 });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${this.getAttribute("data-name")} added to basket`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    localStorage.setItem("basket", JSON.stringify(localBasketArr));
    renderBasketTableHTML(localBasketArr, data.products);
  });
});

//local basket
const basketArr = JSON.parse(localStorage.getItem("basket"));

//refresh
basketArr && renderBasketTableHTML(basketArr, data.products);

function renderBasketTableHTML(basketArr, productArr) {
  tBody.innerHTML = "";
  basketArr.forEach((basketItem) => {
    const currentProd = productArr.find((x) => x.id == basketItem.id);
    tBody.innerHTML += ` <tr data-id=${currentProd.id}>
        <th scope="row">${currentProd.id}</th>
        <td>${currentProd.name}</td>
        <td><img width="80" height="80"
                src="${currentProd.imgSrc}"
                alt="${currentProd.name}"></td>
        <td><b>${Number(currentProd.calcPrice() * basketItem.count).toFixed(
          2
        )}</b></td>
        <td><i>${basketItem.count}</i></td>
        <td><button class="btn btn-outline-warning increase-btn"><i class="fa-solid fa-plus"></i></button>
        </td>
        <td><button class="btn btn-outline-warning decrease-btn"><i class="fa-solid fa-minus"></i></button>
        </td>
        <td><button class="btn btn-outline-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`;

    //increase
    const increaseBtns = document.querySelectorAll(".increase-btn");
    increaseBtns.forEach((increaseBtn) => {
      increaseBtn.addEventListener("click", function () {
        if (this.classList.contains("btn-outline-danger")) {
          this.classList.replace("btn-outline-danger", "btn-outline-warning");
        }
        const id = this.closest("tr").getAttribute("data-id");
        const localBasket = JSON.parse(localStorage.getItem("basket"));
        const item = localBasket.find((x) => x.id == id);
        item.count++;
        //update local storage
        localStorage.setItem("basket", JSON.stringify(localBasket));
        //render HTML
        renderBasketTableHTML(localBasket, data.products);
        //sweet alert
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "basket item increased",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    });
    //decrease
    const decreaseBtns = document.querySelectorAll(".decrease-btn");
    decreaseBtns.forEach((decreaseBtn) => {
      decreaseBtn.addEventListener("click", function () {
        const id = this.closest("tr").getAttribute("data-id");
        const localBasket = JSON.parse(localStorage.getItem("basket"));
        const item = localBasket.find((x) => x.id == id);
        if (item.count == 1) {
          this.classList.replace("btn-outline-warning", "btn-outline-danger");
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `cannot decrease to zero`,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          item.count--;
          localStorage.setItem("basket", JSON.stringify(localBasket));
          renderBasketTableHTML(localBasket, data.products);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `basket item decreased`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    });
    //delete
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", function () {
        const id = this.closest("tr").getAttribute("data-id");
        const localBasket = JSON.parse(localStorage.getItem("basket"));
        const idx = localBasket.findIndex((x) => x.id == id);
        localStorage.setItem("basket", JSON.stringify(localBasket));
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
            localBasket.splice(idx, 1);
            renderBasketTableHTML(localBasket, data.products);
            localStorage.setItem("basket", JSON.stringify(localBasket));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });
    });
  });
}

const clearAll = document.querySelector(".clear-basket");

clearAll.addEventListener("click", () => {
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
      tBody.innerHTML = "";
      localStorage.setItem("basket", JSON.stringify([]));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
});

console.log(
  "TEST: ",
  JSON.parse(localStorage.getItem("users")).some((x) => !x.isLogged)
);
if (
  JSON.parse(localStorage.getItem("users")).every((x) => x.isLogged === false)
) {
  window.location.replace("register.html");
}

// Heart icon functionality
const heartIcons = document.querySelectorAll(".heart");

heartIcons.forEach((heartIcon) => {
  heartIcon.addEventListener("click", function () {
    const productId = this.getAttribute("data-id");
    const productName = this.getAttribute("data-name");

    const localWishlist = JSON.parse(localStorage.getItem("wishlist"));
    const foundIndex = localWishlist.findIndex((item) => item.id === productId);

    if (foundIndex !== -1) {
      localWishlist.push({ id: productId, name: productName });
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
      this.innerHTML = '<i class="fa-solid fa-heart" style="color: #ff0000;"></i>';
      
    } else {
      localWishlist.splice(foundIndex, 1);
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
      this.innerHTML = '<i class="fa-regular fa-heart" style="color: #ff0000;"></i>';  
    }
  });
});
