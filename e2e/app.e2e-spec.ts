import { GuessItPage } from './app.po';

describe('guess-it App', () => {
  let page: GuessItPage;

  beforeEach(() => {
    page = new GuessItPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
