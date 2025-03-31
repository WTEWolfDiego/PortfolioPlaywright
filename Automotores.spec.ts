import { test, expect, chromium, Page } from '@playwright/test';
import { PTS } from './Funciones2';

let d:any=0
let page: Page;
let browser:any
let context:any

test.describe("Automation - Automotores Example",() =>{

    test.use({
        viewport:{width:1500, height:700},
    })

    const sleep = (ms) =>{

        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    
    test.beforeAll(async ()=>{

        console.log('Test Base Initialization');
        browser=await chromium.launch({ headless: false, slowMo: 100 })
        context=await browser.newContext({
            recordVideo:{
                dir:"./Videos/",
                mode:"on",
                size:{
                    width:1900,
                    height: 700
                }
            }
        });
        
        
        page=await context.newPage()
        d= new PTS(page);
    
        await d.openURL("https://frontend.wildar.dev/Autos");
    //	await f.scroll(0,500,1000);
        console.log('Test Base finish');
    });


    test("Test 1:Page Verification",async () =>{

        await d.verifyTitle("Registro de Automóviles - Registro de Automóviles","https://frontend.wildar.dev/Autos");
        console.log("Title and URL of the page: Verified")

    });

    test("Test 2: Searching for a non existing vehicule", async ()=>{

        await d.writeValue("#marca","Chevrolet");
        await d.writeValue("#modelo","Corsa");
        await d.writeValue("#anio","1995");
        await d.writeValue("#precioMin","10000");
        await d.writeValue("#precioMax","30000");
        console.log("Search fields are completed");
        await d.elementClick("//button[@type='submit']");
        await page.waitForTimeout(3000);
        await d.assertingText("//div[@class='alert alert-info']","No se encontraron resultados para la búsqueda especificada.");

    });

    test("Test 3: Cleaning all the filters with 'Limpiar' button", async ()=>{

        await d.writeValue("#marca","Chevrolet");
        await d.writeValue("#modelo","Corsa");
        await d.writeValue("#anio","1995");
        await d.writeValue("#precioMin","10000");
        await d.writeValue("#precioMax","30000");
        console.log("Search fields are completed");
        await d.elementClick("//a[@href='/Autos' and @class='btn btn-secondary']");
        await page.waitForTimeout(3000);
        console.log("Cleaning the fields --- Completed")
        

    });

    test("Test 4: Verifying the existing item in the table", async ()=>{

    await d.findingTableRecords();  
    console.log("Retrieving table information --- Completed")              
    

    })

    test("Test 5: Accessing to the registered card details section", async ()=>{

        await d.elementClick("//a[@href='/Autos/Detalle/110']");
        await d.assertingText("h1","Detalle del Auto");
        console.log("The car details section was accessed");
    
    })
    
    
    test("Test 6: Registering a new car", async()=>{

        await d.elementClick("//div/a[@href='/Autos/Crear']");
        await d.writeValue("#Marca","Alfa Romeo");
        await d.writeValue("#Modelo","Z3");
        await d.writeValue("#NumeroChasis","11111111111111111");
        await d.writeValue("#Anio","2015");
        await d.writeValue("#Precio","100,000.00");
        await d.writeValue("#Color","Verde");
        await d.chooseValue("#Estado","Usado");
        await d.elementClick("//input[@type='submit']");
        page.waitForTimeout(2000)
        console.log("The new car has been succesfully created");


    })


    test("Test 7: Editing the existing car in the table", async ()=>{

        await d.elementClick("//tr[2]/td/a[@class='btn btn-warning btn-sm']");
        await d.writeValue("#Marca","Chevrolet");
        await d.writeValue("#Modelo","Cruiser");
        await d.writeValue("#Anio","2020");
        await d.writeValue("#Precio","40.000");
        await d.writeValue("#Color","Azul");
        await d.elementClick("//input[@type='submit']");
        console.log("Existing car details have been succesfully modified");


    })

    test("Test 8: Deleting the new car in the table", async ()=>{

        
        await d.elementClick("//tr[2]/td/a[@class='btn btn-danger btn-sm']"),
        await d.elementClick("//input[@type='submit']");
        console.log("the car has been succesfully deleted");

    })


    test.afterAll(async ()=>{

       console.log('After all tests are finished');
       console.log("Test set execution Accomplished");
       await page.close()
       await context.close()
       await browser.close()
    });




});