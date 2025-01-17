const { test, expect } = require('@playwright/test');

test('single dropdown',async({page})=>{

    await page.goto("https://demoqa.com/")


    await page.getByText("Widgets").click()
    await page.getByText("Select Menu").click()

    //Select Option
    await page.getByText("Select Option").click()
    const select_Option = "Group 2, option 2"
    await page.getByText(select_Option).click()
    await expect(page.locator("div.css-1uccc91-singleValue")).toHaveText(select_Option)
   


    //Select Title
    await page.getByText("Select Title").click()
    await page.getByText("Mr.").click()

    const select_Title_Value = await page.locator("div#selectOne div.css-1uccc91-singleValue").textContent()
    expect(select_Title_Value).toBe("Mr.")

   

    //oldSelectMenu
    const selectOption = "Green"
    const menus= await page.locator("select#oldSelectMenu>option").all()
    console.log("Option List : "+menus.length);
    for(const menu of menus){
        console.log(await menu.textContent())
      
    }
     await page.locator("select#oldSelectMenu").selectOption(selectOption)
    
     const selectedValue = await page.locator("select#oldSelectMenu").locator("option:checked").textContent();
     console.log("Selected Option :"+selectedValue);
     
     

     //Multiselect drop down

    await page.getByText("Select...").click()
   // const elements = await page.locator("(//div[contains(@class,'css-2b097c-container')])[3]//div").elementHandles()
  // const elements = await page.locator("div.css-2b097c-container").nth(2).locator("div").elementHandles()
   // for(const ele of elements){
    //     console.log(await ele.innerHTML())
    // }
 
  const values = await page.locator("div.css-2b097c-container").nth(2).locator("div.css-11unzgr>div").allTextContents()
    console.log("Option size : "+values.length)
    console.log("Option list : " + values)
    for (const value of values) {
        const optionValue = value.trim()
        await page.getByText(optionValue).nth(2).click({force:true})
            
     }
     const selectedOptions = await page.locator("div.css-1rhbuit-multiValue").allTextContents()
     console.log(`Selected Options : ${selectedOptions}`)
    expect(await page.locator("div.css-1rhbuit-multiValue")).toContainText(selectedOptions)



//Standard multi select
const carsOptionList = await page.locator("select#cars>option").allTextContents()
console.log("Cars drop-down length :"+carsOptionList.length)
console.log("Cars drop-down Option :"+carsOptionList)

await page.locator("select#cars").selectOption([...carsOptionList])

const selectedCarsList = await page.locator("select#cars").locator("option:checked").allTextContents()
console.log(`Selected cars drop-down size ${selectedCarsList.length}`)
console.log(`Selected cars drop-down Name : ${selectedCarsList}`)
expect(carsOptionList.length).toBe(selectedCarsList.length)
expect(carsOptionList).toEqual(selectedCarsList); 
await page.waitForTimeout(6000)

}) 
