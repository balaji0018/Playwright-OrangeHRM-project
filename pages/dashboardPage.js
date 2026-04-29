export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
  }

  async verifyLogin() {
  await this.dashboardHeader.waitFor();
}

  async goToPIM() {
    await this.pimMenu.click();
  }
}