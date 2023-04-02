import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import puppeteer, { Browser } from "puppeteer";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request. v1');

    let browser = await getBrowser();
    let responseMessage = "browser launched";
    let page = await browser.newPage();
    page.goto('https://unicornhub.com');

    //do your magic here

    page.close();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

let browser: Promise<Browser>;
async function getBrowser(): Promise<Browser> {
    if (browser) {
        return browser;
    }
    browser = puppeteer.launch({
        headless: false,
    });
    return browser;
}
export default httpTrigger;
