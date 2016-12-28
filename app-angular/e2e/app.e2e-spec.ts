import { AppAngularPage } from './app.po';

describe('app-angular App', function() {
  let page: AppAngularPage;

  beforeEach(() => {
    page = new AppAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
