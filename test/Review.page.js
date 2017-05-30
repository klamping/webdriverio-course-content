class Review {
  constructor(reviewIndex) {
    this.reviewContainer = $(".reviews > .comment:nth-of-type(" + reviewIndex + ")");
  }

  get email () { return this.reviewContainer.element('.email'); }
  get comment () { return this.reviewContainer.element('.comment'); }
}

module.exports = Review;