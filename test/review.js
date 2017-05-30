var request = require('sync-request');
var reviewForm = require('./reviewForm.page.js');
var Review = require('./Review.page.js');

describe('The product review form', function () {
  beforeEach(function() {
    //  Go to the product page
    browser.url("./product-page.html");
  })

  it('should add a review when submitted properly', function () {
    reviewForm.submit("email@example.com", "This is the review")

    //  Assert that our review now appears in the list
    var hasReview = browser.isExisting(".comment=This is the review");

    expect(hasReview, "comment text exists").to.be.true;
  });
  it('should show an error message if the input is wrong', function () {
    // assert that error message isn't showing to start
    var isErrorShowing = reviewForm.formError.isVisible();
    expect(isErrorShowing).to.be.false;

    // submit form without entering content
    reviewForm.submit();

    // assert that error message is now showing
    var isErrorShowing = reviewForm.formError.isVisible();
    expect(isErrorShowing).to.be.true;
  });
  it('should hide the error message when input is corrected', function () {
    // submit form without entering content
    reviewForm.submit();

    // assert that error message is now showing
    var isErrorShowing = reviewForm.emailError.isVisible();
    expect(isErrorShowing).to.be.true;

    reviewForm.submit("email@example.com");

    var isErrorShowing = reviewForm.emailError.isVisible();
    expect(isErrorShowing).to.be.false;

    reviewForm.submit("email@example.com", "This is the review");

    var isMainErrorShowing = reviewForm.formError.isVisible();
    var isContentErrorShowing = reviewForm.reviewError.isVisible();

    expect(isMainErrorShowing).to.be.false;
    expect(isContentErrorShowing).to.be.false;

  });
  it('should focus on the first invalid input field on error', function () {
    var emailHasFocus = browser.hasFocus("#review-email");
    expect(emailHasFocus, "email should not have focus").to.be.false;

    reviewForm.submit();

    emailHasFocus = browser.hasFocus("#review-email");
    expect(emailHasFocus, "email should now have focus").to.be.true;

    reviewForm.submit("email@example.com");

    var contentHasFocus = browser.hasFocus("#review-content");
    expect(contentHasFocus, "review content field should have focus").to.be.true;
  });

  it('should allow multiple reviews', function () {
    var res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');

    var comments = JSON.parse(res.getBody().toString('utf8'));

    comments.forEach(function (comment, idx) {
        reviewForm.submit(comment.email, comment.name);
        var review = new Review(idx + 3);

        var email = review.email.getText();
        expect(email).to.equal(comment.email);

        var reviewText = review.comment.getText();
        expect(reviewText).to.equal(comment.name);
    })
  })
});