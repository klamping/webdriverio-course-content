describe('Accordion', function () {
  var activeClass = 'is-active';

  beforeEach(function(){
    browser.url('/');
  })

  it('should have active class on first item to start', function () {
    var classnames = browser.getAttribute('.accordion .accordion-item:first-child', 'class');

    expect(classnames).to.contain('is-active');
  })

  it('should not have active class on other items to start', function () {
    var elementClassnames = browser.getAttribute('.accordion .accordion-item:not(:first-child)', 'class');

    elementClassnames.forEach(function (classname) {
      expect(classname).to.not.contain('is-active');
    });
  })

  it('should remove active class from first item on click', function () {
    browser.click('.accordion .accordion-item:nth-child(2) a');

    var classnames = browser.getAttribute('.accordion .accordion-item:first-child', 'class');
    expect(classnames).to.not.contain('is-active');
  })

  it('should add active class to second item on click', function () {
    browser.click('.accordion .accordion-item:nth-child(2) a');

    var classnames = browser.getAttribute('.accordion .accordion-item:nth-child(2)', 'class');
    expect(classnames).to.contain('is-active');
  })

  it('should handle multiple clicks in rapid succession', function () {
    // click 20 times
    for (var x = 0; x < 20; x++) {
      var num = (x % 3) + 1;
      browser.click('.accordion .accordion-item:nth-child(' + num + ') a');
    }

    var classnames = browser.getAttribute('.accordion .accordion-item:nth-child(' + num + ')', 'class');
    expect(classnames).to.contain('is-active');
  })
})