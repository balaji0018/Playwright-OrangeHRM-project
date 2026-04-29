export class PIMPage {
  constructor(page) {
    this.page = page;

    // Add employee
    this.addEmployeeBtn = page.getByRole('button', { name: 'Add' });
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.saveBtn = page.getByRole('button', { name: 'Save' });

    // Search employee
    this.employeeNameInput = this.page
  .locator('form')
  .locator('input[placeholder="Type for hints..."]')
  .first();
    this.searchBtn = page.getByRole('button', { name: 'Search' });

    // Table + delete
    this.employeeRow = (name) => page.getByRole('row', { name: new RegExp(name) });
    this.deleteBtn = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteBtn = page.getByRole('button', { name: 'Yes, Delete' });
  }

  async addEmployee(first, last) {
    await this.addEmployeeBtn.click();
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.saveBtn.click();

    
    await this.page.waitForURL(/viewPersonalDetails/);

await this.page.waitForSelector('.orangehrm-edit-employee-name');
  }

 
async searchEmployee(name) {
  await this.employeeNameInput.fill(name);

  // select dropdown option
  const option = this.page
    .locator('.oxd-autocomplete-dropdown div')
    .filter({ hasText: name })
    .first();

  await option.waitFor();
  await option.click();

  await this.searchBtn.click();
}

  // 🗑 Delete employee
  async deleteEmployee(name) {
  const row = this.page
    .locator('.oxd-table-row')
    .filter({ hasText: name })
    .first();

  // click delete button inside row
  await row.locator('button').nth(1).click();

  // confirm delete
  await this.confirmDeleteBtn.click();
}
}