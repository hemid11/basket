import Product from './class.js';

const products = [
  new Product('skittles','https://m.media-amazon.com/images/I/61z1SisDxhL._AC_UF894,1000_QL80_.jpg',2,5,0),
  new Product('twix','https://bazarstore.az/cdn/shop/products/30075830.jpg?v=1693621583',1,4,20),
  new Product('M&Ms','https://cdn.media.amplience.net/i/marsmmsprod/ct2140_img_01_1000842913_4010241060_4010241061',3,6.4,10),
  new Product('snikkers','https://i1.sndcdn.com/artworks-000247286475-xc23fx-t500x500.jpg',1,3.5,30),
];

const data = {
  products: products
}

export default data;
