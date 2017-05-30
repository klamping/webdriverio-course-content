class ReviewForm {
  get form() { return $("#comment-form"); }
  get email() { return $("#review-email"); }
  get content() { return $("#review-content"); }

  get formError() { return $("p=There are some errors in your review."); }
  get emailError() { return $("p=Please enter a valid email address."); }
  get reviewError () { return $("p=A review without text isn't much of a review."); }

  submit(email, review) {
    if (email) {
        //  Enter the email address
        this.email.setValue(email);
    }

    if (review) {
        //  Enter text in the comment form
        this.content.setValue(review);
    }

    // Submit the review
    this.form.submitForm();
  }
}

module.exports = new ReviewForm();