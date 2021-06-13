const Product = require("../model/Product");
const Profile = require("../model/Profile");

module.exports = {
  async getProducts(req, res) {
    const stringidUser = req.user.id;
    const admin = stringidUser === 1;
    const products = await Product.findAll();
    const profile = await Profile.findOne({ where: { id: stringidUser } });

    if (!admin) {
      res.redirect("/");
    }

    res.render("registerProducts", { products: products, profile: profile });
  },

  async insertProducts(req, res) {
    let nameProduct = req.body.nameProduct;
    let imageProduct = req.body.imageProduct;
    let priceProduct = req.body.priceProduct;

    await Product.create({
      nameProduct: nameProduct,
      imageProduct: imageProduct,
      priceProduct: priceProduct,
    });

    res.redirect("/admin/register-products");
  },

  async deleteProducts(req, res) {
    const idProductDel = req.body.id_ProductDel
    console.log("O id do produto é "+idProductDel)
    if(idProductDel !== undefined){
        if(!isNaN(idProductDel)){
         await Product.destroy({where: {id: idProductDel}})
          res.redirect("/admin/register-products");
        }else{
          res.redirect("/admin/register-products");
        }
      }else{
        res.redirect("/admin/register-products");
      }
    }
};
