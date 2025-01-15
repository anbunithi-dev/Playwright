// @ts-check
const { test, expect, chromium } = require('@playwright/test');

test('fill the form',async({page})=>{

  // const browser = await chromium.launch({headless:false})

  // const context = await browser.newContext()

  // const page = await context.newPage()

  // Resolve , Reject
  await page.goto("https://demoqa.com/")

  // attribute [attributename = value]
  await page.locator("[class=card-body]").filter({hasText:"Elements"}).click()

  await page.getByText("Forms").click()

  await page.getByText("Practice Form").click()

  await page.getByPlaceholder("First Name").fill("Anbunithi")

  await page.getByPlaceholder("Last Name").fill("Rajendran")

  await page.getByPlaceholder("name@example.com").fill("anbu@gmail.com")

  await page.getByText("Male",{exact:true}).click()
  
  await page.getByRole("textbox",{name:"Mobile Number"}).fill("1234567890")

 //await page.locator('#subjectsContainer').click()

 const subject = page.locator('#subjectsInput')
 await subject.fill("English")
 await subject.press('Enter')
 
 await page.getByText("Sports").click()
 
await page.getByRole('textbox',{name:"Current"}).fill("Chennai 600 0028")
 
await page.getByText("English").click()

  const dateOfBirth = page.locator('#dateOfBirthInput')
  await dateOfBirth.fill("11 jan 2023")
  

  const filePath = 'C:\\Users\\rajen\\Pictures\\honey-bees-337695_1280.jpg';
  await page.locator('#uploadPicture').setInputFiles(filePath)

  await page.getByText("Select State").click()

  await page.getByText("Rajasthan").click()

 await page.getByText("Select City").click()

  await page.getByText("Jaipur",{ exact: true }).click()
 
  await page.waitForTimeout(4000)
})

