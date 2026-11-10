const { test, expect } = require('@playwright/test');
const token = 'b'.repeat(64);
const user = { id: '00000000-0000-4000-8000-000000000001', name: 'Leitor de teste', email: 'leitor@example.invalid', role: 'reader' };
const books = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', book_key: 'dom casmurro|machado de assis', prateleira: 2, categoria: 'Romance', grupo: 'Romance', qtd: 2, cover_url: '' },
  { id: 2, titulo: 'O Cortiço', autor: 'Aluísio Azevedo', book_key: 'o cortico|aluisio azevedo', prateleira: 5, categoria: 'Romance', grupo: 'Romance', qtd: 1, cover_url: 'http://127.0.0.1:4173/covers/originais/ad6511e1068886a0f924.jpg' }
];
books.push(
  { ...books[0], id: 3, prateleira: 3, qtd: 1 },
  { ...books[0], id: 4, prateleira: 4, qtd: 3 },
  { ...books[0], id: 5, prateleira: 145, qtd: 2, location_pending: true },
);
async function mockApi(page, authenticated = false) {
  let signedIn = authenticated;
  await page.route('https://ntudlkodpohnveydjikv.supabase.co/functions/v1/library-api/**', async route => {
    const request = route.request();
    const name = new URL(request.url()).pathname.split('/').pop();
    const method = request.method();
    const headers = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET,POST,PATCH,DELETE,OPTIONS' };
    if (method === 'OPTIONS') return route.fulfill({ status: 200, headers, body: '' });
    let data, status = 200;
    if (name === 'signup') data = { ok: true, requires_confirmation: false, role: 'reader' };
    else if (name === 'login') {
      const body = request.postDataJSON();
      if (body.password === 'senha-incorreta') { status = 401; data = { ok: false, error: 'E-mail ou senha incorretos.' }; }
      else { signedIn = true; data = { ok: true, token, user }; }
    } else if (name === 'me') {
      status = signedIn ? 200 : 401;
      data = signedIn ? { ok: true, user } : { ok: false, error: 'Sessão inválida.' };
    } else if (name === 'books') data = { ok: true, books, total: books.length };
    else if (name === 'favorites') data = { ok: true, keys: [] };
    else if (name === 'loans') data = { ok: true, loans: [{ id: 'teste-emprestimo', book_key: books[0].book_key, title: books[0].titulo, author: books[0].autor, shelf: 2, borrower: user.name, borrower_user_email: user.email, contact: '', created_by: 'biblioteca', loan_date: '2001-01-01T12:00:00Z', due_date: '2001-01-02', returned_at: null }] };
    else if (name === 'logout') { signedIn = false; data = { ok: true }; }
    else { status = 403; data = { ok: false, error: 'Operação não incluída neste teste.' }; }
    return route.fulfill({ status, headers, contentType: 'application/json', body: JSON.stringify(data) });
  });
  if (authenticated) await page.addInitScript(value => localStorage.setItem('bmlSessionNewDatabaseV111', value), token);
}
async function noHorizontalOverflow(page, selector = 'body') {
  const overflow = await page.locator(selector).evaluate(element =>
    element.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
}
test('login, validação de erro e cadastro de leitor', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await mockApi(page);
  await page.goto('/');
  await expect(page.locator('#loginForm')).toBeVisible();
  await expect(page.locator('#authModal .auth-dialog-intro p')).toBeHidden();
  await noHorizontalOverflow(page);
  const loginImage = await page.screenshot({ path: testInfo.outputPath('login.png') });
  if (testInfo.project.name === 'celular-390') console.log('BML_SCREENSHOT_LOGIN=' + loginImage.toString('base64'));
  await page.locator('#loginEmail').fill(user.email);
  await page.locator('#loginPassword').fill('senha-incorreta');
  await page.locator('#loginForm [type="submit"]').click();
  await expect(page.locator('#authStatus')).toContainText('senha incorretos');
  await page.locator('#authRegisterLink').click();
  await expect(page.locator('#registerForm')).toBeVisible();
  await expect(page.locator('#authModal .auth-dialog-intro p')).toBeVisible();
  await page.locator('#regName').fill(user.name);
  await page.locator('#regEmail').fill(user.email);
  await page.locator('#regPassword').fill('senha-de-teste-123');
  await page.locator('#registerForm [type="submit"]').click();
  await expect(page.locator('#authModal')).not.toHaveClass(/open/);
  await expect(page.locator('#results .book-card')).toHaveCount(2);
  await noHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('catalogo.png'), fullPage: true });
  expect(errors).toEqual([]);
});
test('pesquisa, filtros, prateleira, conta e empréstimos', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await mockApi(page, true);
  await page.goto('/');
  await expect(page.locator('#results .book-card')).toHaveCount(2);
  await page.locator('#search').fill('zzzz-livro-inexistente');
  await expect(page.locator('#emptyReset')).toBeVisible();
  await page.locator('#emptyReset').click();
  await expect(page.locator('#results .book-card')).toHaveCount(2);
  await page.locator('#searchPanel .bml-filter-action').click();
  await expect(page.locator('#refineAuthor')).toBeVisible();
  await page.locator('#refineAuthor').selectOption({ label: 'Machado de Assis' });
  await expect(page.locator('#results .book-card')).toHaveCount(1);
  await page.locator('#searchPanel .bml-refine-clear').click();
  await expect(page.locator('#results .book-card')).toHaveCount(2);
  await noHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath('filtros.png'), fullPage: true });
  await page.locator('#results .book-card').filter({ hasText: 'Dom Casmurro' }).click();
  await expect(page.locator('#locationModal')).toHaveClass(/open/);
  await expect(page.getByRole('heading', { name: 'Sobre a obra' })).toBeVisible();
  await expect(page.locator('#locationBody .bml-synopsis')).toContainText('Bentinho revisita');
  const rows = page.locator('#locationBody .v96-location-row');
  await expect(rows).toHaveCount(4);
  for (const shelf of [2, 3, 4]) {
    await expect(rows.filter({ hasText: 'Prateleira ' + shelf })).toBeVisible();
  }
  await expect(rows.filter({ hasText: 'Prateleira 2' })).toContainText('1 disponível');
  await expect(rows.filter({ hasText: 'Prateleira 4' })).toContainText('3 disponíveis');
  await expect(rows.last()).toContainText('Localização a confirmar');
  await expect(page.locator('#locationBody .v96-location-head')).toContainText('3 prateleiras');
  const info = await page.locator('#locationBody .bml-detail-info').boundingBox();
  const modal = await page.locator('#locationModal .modal').boundingBox();
  expect(info.x + info.width).toBeLessThanOrEqual(modal.x + modal.width + 1);
  const fichaImage = await page.screenshot({ path: testInfo.outputPath('ficha.png') });
  if (testInfo.project.name === 'celular-390') console.log('BML_SCREENSHOT_FICHA=' + fichaImage.toString('base64'));
  await page.locator('#locationModal [data-close]').click();
  await page.getByRole('button', { name: 'Conta', exact: true }).click();
  await expect(page.locator('#bmlMyLoans')).toBeVisible();
  await page.locator('.bml-back-catalog').click();
  await expect(page.locator('#authModal')).not.toHaveClass(/open/);
  await page.getByRole('button', { name: 'Conta', exact: true }).click();
  await page.locator('#bmlMyLoans').click();
  await expect(page.locator('#loanList')).toContainText('Dom Casmurro');
  await expect(page.locator('#loanList')).toContainText(/Devolução (atrasada|em atraso)/);
  await page.screenshot({ path: testInfo.outputPath('emprestimos.png') });
  expect(errors).toEqual([]);
});
