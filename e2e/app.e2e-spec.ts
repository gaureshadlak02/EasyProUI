import { EasyProPage } from './app.po';

describe('easy-pro App', function() {
  let page: EasyProPage;

  beforeEach(() => {
    page = new EasyProPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
