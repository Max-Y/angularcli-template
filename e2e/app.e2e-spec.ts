import { TestProjectAngularCliPage } from './app.po';

describe('test-project-angular-cli App', () => {
  let page: TestProjectAngularCliPage;

  beforeEach(() => {
    page = new TestProjectAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
