class Product {
  static id = 1;
  constructor(name, imgSrc,costPrice, salePrice, discountPercentage) {
    this.id = Product.id++;
    this.imgSrc = imgSrc;
    this.name = name;
    this.costPrice = costPrice;
    if (salePrice > costPrice) this.salePrice = salePrice;
    else throw new Error("sale price cannot be less than cost price");
    if (discountPercentage >= 0 && discountPercentage <= 100)
      this.discountPercentage = discountPercentage;
    else throw new Error("discount percentage should be between 0-100");
  }
  calcProfit() {
    const profit =
      (this.salePrice * this.discountPercentage) / 100 - this.costPrice;
    return profit;
  }
  calcPrice(){
    return Number(this.salePrice - (this.salePrice*this.discountPercentage)/100).toFixed(2);
  }
  hasDiscount(){
    if (this.discountPercentage > 0) {
       return true;
    }
    else{
      return false;
    }
  }
}

export class User{
  static id = 1;
  //private field
  // #password;
  constructor(username, email, password) {
    this.id = User.id++;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isLogged = false;
  }
  // get password(){
  //   return this.#password;
  // }
  // set password(val){
  //   if (val.length>5) {
  //     this.#password = val;
  //   }
  //   else{
  //     throw new Error('password invalid type')
  //   }
  // }
}

export default Product
// export const x = 54;
// export const func = ()=>{

// }
