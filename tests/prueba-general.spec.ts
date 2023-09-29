import { test, expect, Locator } from '@playwright/test'

test('prueba general juego', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  const cartas = page.locator('.carta-contenedor')
  await expect(cartas).toHaveCount(2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '2' }).click()
  await expect(cartas).toHaveCount(2 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '3' }).click()
  await expect(cartas).toHaveCount(3 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '4' }).click()
  await expect(cartas).toHaveCount(4 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '3' }).click()
  await expect(cartas).toHaveCount(3 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '2' }).click()
  await expect(cartas).toHaveCount(2 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '1' }).click()
  await expect(cartas).toHaveCount(2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '4' }).click()
  await expect(cartas).toHaveCount(4 * 2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.getByRole('button', { name: '1' }).click()
  await expect(cartas).toHaveCount(2)
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.locator('.carta-espalda').first().click()
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await page.locator('main:nth-child(2) > .carta > .carta-contenedor > .carta-espalda').click()
  await expect(page.getByRole('heading', { name: 'Intentos: 1' })).toContainText('1')
  await page.getByRole('button', { name: 'Aceptar' }).click()
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await expect(cartas).toHaveCount(2)
})

test('contador de intentos', async ({ page }) => {
  // verificaciones generales
  await page.goto('http://localhost:5173/')
  let cartas = page.locator('.carta-contenedor')
  await expect(cartas).toHaveCount(2)
  await page.getByRole('button', { name: '2' }).click()
  cartas = page.locator('.carta-contenedor')
  await expect(cartas).toHaveCount(4)
  // obtener las cartas
  const lCartas = await cartas.all()
  const cartasImagenes:string[] = []
  for (const c of lCartas) {
    const img = await c.locator('.carta-frente > img').getAttribute('src') ?? ''
    cartasImagenes.push(img)
  }
  // buscar carta que matchea con la primera, y una que no
  const primeraC = 0
  const matchPrimera = cartasImagenes.lastIndexOf(cartasImagenes[0])
  const noMatch = matchPrimera === 1 ? 2 : 1
  // el match del no Match
  const noMatchMatch = cartasImagenes.findIndex((carta, index) => index !== noMatch && carta === cartasImagenes[noMatch])

  // probar fallar y que el contador tome bien el valor
  for (let i = 0; i < 5; i++) {
    await expect(page.getByRole('heading', { name: 'Intentos: ' + i })).toBeVisible()
    await page.locator('.carta-contenedor').nth(primeraC).click()
    await page.locator('.carta-contenedor').nth(noMatch).click()
  }
  // apretar de forma correcta
  await page.locator('.carta-contenedor').nth(primeraC).click()
  await page.locator('.carta-contenedor').nth(matchPrimera).click()

  await page.waitForTimeout(500) // Esperar un medio segundo (ajusta el tiempo según sea necesario)
  // await page.locator('.carta-contenedor').nth(matchPrimera).locator('xpath=ancestor::main').locator('.mostrar')

  await page.locator('.carta-contenedor').nth(noMatch).click()
  await page.locator('.carta-contenedor').nth(noMatchMatch).click()

  // prueba general final, el juego vuelve al estado inicial
  await page.getByRole('button', { name: 'Aceptar' }).click()
  await expect(page.getByRole('heading', { name: 'Intentos: 0' })).toContainText('0')
  await expect(cartas).toHaveCount(4)
})
