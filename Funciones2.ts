import { expect, Page } from "@playwright/test";
export class PTS {

    readonly page: Page;

    constructor(page: Page) {
	    this.page= page;
    };

    async openURL(urlvalue){
	    await this.page.goto(urlvalue)
	    await this.page.waitForTimeout(1500)
    };


    async verifyTitle(titleValue:string,urlvalue:string){

        await expect(this.page).toHaveTitle(titleValue)
        console.log("The page title is: " + titleValue)
        await expect(this.page).toHaveURL(urlvalue)
        console.log("the URL is: " + urlvalue)

    }

    async chooseValue(selector:string,value:string){

        await this.page.selectOption(selector,{value: value})
        console.log("Testing to choose an option")

    }

    async writeValue(selector:string,value:string){

        await this.page.locator(selector).fill(value);
        console.log("The field" + selector + "has been completed");


    }

    async elementClick(selector:string){

        await this.page.locator(selector).click();


    }

    async assertingText(selector:string,expectedMessage:string){

        const message = this.page.locator(selector)
        
        await expect(message).toHaveText(expectedMessage);

    }

    async findingTableRecords(){

        const rows=this.page.locator('.table table-striped table-hover')
        let totalRows=await rows.count()
        
        for (let i=0;i < totalRows;i++){

            const marca= rows.nth(i).locator('td:nth.child(1)').innerText();
            console.log(`"Found item: marca " + ${marca}`);
            const modelo= rows.nth(i).locator('td:nth.child(2)').innerText();
            console.log(`"Found item: modelo " + ${modelo}`);
            const chasis= rows.nth(i).locator('td:nth.child(3)').innerText();
            console.log(`"Found item: chasis " + ${chasis}`);
            const anio= rows.nth(i).locator('td:nth.child(4)').innerText();
            console.log(`"Found item: año " + ${anio}`);
            const color= rows.nth(i).locator('td:nth.child(5)').innerText();
            console.log(`"Found item: color " + ${color}`);
            const estado= rows.nth(i).locator('td:nth.child(6)').innerText();
            console.log(`"Found item: estado " + ${estado}`);
            const precio= rows.nth(i).locator('td:nth.child(7)').innerText();
            console.log(`"Found item: Precio " + ${precio}`);
            this.page.waitForTimeout(3000);

        }
        


    }

}
