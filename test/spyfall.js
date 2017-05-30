describe('Spyfall Game', function () {
  var gameId;

  it('should allow host to create a game', function () {
    Host.url('./');

    Host.click('#btn-new-game');

    Host.setValue('#player-name', 'Lisa');

    Host.click('#create-game input[type="submit"]');

    Host.waitForExist('h4=Waiting For Players...');

    gameId = Host.getText('.access-code span');

    expect(gameId).to.have.length.above(0);
  })

  it('should allow others to join the game', function () {
    Guest.url('./');

    Guest.click('#btn-join-game');

    Guest.setValue('#access-code', gameId);

    Guest.setValue('#player-name', 'Bob');

    Guest.click('input[value="Join"]');

    Guest.waitForExist('h4=Waiting For Players...');

    expect(Guest.getUrl()).to.contain(gameId);
  })

  it('should show Bob in list of names on Host browser', function () {
    // Wait for Bob to be added to the list
    Host.waitForExist('li=Bob');

    // Double check that he's in the right spot
    var playerList = Host.getText('.lobby-player-list li');

    expect(playerList).to.have.length(2);

    expect(playerList[1]).to.equal('Bob');
  })

  it('should allow host to start game', function () {
    Host.click('button=Start Game');

    browser.waitForExist('.game-countdown');

    var isGameStarted = browser.isExisting('.status-container');

    expect(isGameStarted).to.deep.equal({ Host: true, Guest: true });
  })

  it('should assign one person as the spy and not show the location', function () {
    // get both players statuses
    var status = browser.getText('.player-status');

    // determine which one is the spy
    var spy, notSpy;
    if (status.Host == 'You are the spy!') {
      spy = 'Host';
      notSpy = 'Guest';
    } else {
      spy = 'Guest';
      notSpy = 'Host';
    }

    // double check that the statuses are right
    expect(status[spy]).to.equal('You are the spy!');
    expect(status[notSpy]).to.equal('You are not the spy!');

    // check that the location is shown/not shown
    var isLocationShowing = browser.isExisting('.current-location');

    expect(isLocationShowing[spy], 'location is not shown to spy').to.be.false;
    expect(isLocationShowing[notSpy], 'location is shown to non-spies').to.be.true;
  })
})