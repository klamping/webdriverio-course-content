var cart = require('./cart.page.js');

describe("Cart Functionality", function () {
  beforeEach(function () {
    browser.url("/product-page.html");
  });

  it('should only let you buy after setting a quantity', function () {
    var isBtnEnabled = cart.btn.isEnabled();
    expect(isBtnEnabled, "'buy now' should be disabled to begin").to.be.false;

    // Add qty
    cart.qty.setValue(10);

    isBtnEnabled = cart.btn.isEnabled();
    expect(isBtnEnabled, "'buy now' is now enabled").to.be.true;
  });

  describe("checkout process", function () {
    beforeEach(function () {
      // Add qty
      cart.qty.setValue(10);

      // Click "buy now"
      cart.btn.click();
    });

    it('should disable buy now button during processing', function () {
      // Verify "buy now" is disabled
      var isBtnEnabled = cart.btn.isEnabled();
      expect(isBtnEnabled, "'buy now' should be disabled after clicking").to.be.false;

      var btnText = cart.btn.getText();
      expect(btnText, "Verify 'buy now' text has changed").to.contain("Purchasing");
    });

    it('should show a thank you message with qty and type', function () {
      // waitForExist "thank you message"
      cart.thankYou.waitForExist();

      // verify is has proper qty and type
      var thankText = cart.thankYou.getText();
      expect(thankText).to.contain("10 T-800 Model 101");
    });

    it('should clear input after completion', function () {
      // waitForValue for qty input
      cart.qty.waitForValue(null, true);
    });

    it('should reset button text after purchase completes', function () {
      // wait for button to return back to 'buy now'
      browser.waitUntil(function () {
        return cart.btn.getText() !== 'Purchasing...'
      }, 3000);

      // Verify button now says 'buy now'
      var btnText = cart.btn.getText();
      expect(btnText).to.equal('Buy Now');
    })

    it('should hide thank you message after clicking close button', function () {
      // waitForExist "thank you message"
      cart.thankYou.waitForExist();

      // Click close button
      $(".close-button").click();

      // use "reverse" flag to wait for it to disappear
      cart.thankYou.waitForVisible(null, true);
    });
  });
});