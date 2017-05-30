class Cart {
  get btn() { return $("#buyNowButton"); }
  get qty() { return $("#qty"); }
  get thankYou() { return $(".callout*=Thank you human"); }
}

module.exports = new Cart();