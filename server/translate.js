const puppeteer = require('puppeteer');
//참조 : https://medium.com/@pks2974/puppeteer-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-a252bffbb2a8

//원본 : https://dev.to/sonyarianto/practical-puppeteer-access-to-google-translate-to-translate-a-text-160j

let browser =null;
let page =null;
let launchOptions = { headless: true, args: ['--start-maximized'] };
//브라우저 시작
//let launchOptions = { headless: false, args: ['--start-maximized'] };

let sourceLang = 'ja', targetLang = 'ko';
    
async function trans2(sourceString){
    
    if(browser==null){
        browser= await puppeteer.launch(launchOptions)
    }
    

    if(page==null){
         page = await browser.newPage();
        // set viewport and user agent (just in case for nice viewing)
        
        // await page.setViewport({width: 1366, height: 768});
        // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.goto(`https://translate.google.com/#view=home&op=translate&sl=${sourceLang}&tl=${targetLang}`);
    }
    

    // detect the source textarea for input data (source string)
    await page.evaluate( () => document.getElementById("source").value = "")
    
    await page.waitForSelector('#source');
    //await page.waitFor(1000);
    // await page.type('#source', "");
    // await page.waitFor(1000);
    // string that we want to translate and type it on the textarea
    //let sourceString = 'Apa kamu sadar kalau muka kamu itu jelek sekali?';
    //let sourceString = '바꾸는게 되려남 음';


    await page.type('#source', sourceString);

    // wait for the result container available
    await page.waitForSelector('.result-shield-container');
    await page.waitFor(1000);

    // get the result string (translated text)
    const translatedResult = await page.evaluate(() => {
        return document.querySelectorAll('.result-shield-container')[0].textContent;
    });

    // display the source and translated text to console
    // console.log(`${sourceLang}: ${sourceString}\n${targetLang}: ${translatedResult}`);
      console.log(`${targetLang}: ${translatedResult}`);
    
//    await page.screenshot({path: 'example.png'});

//    await page.waitFor(1000);
    //await browser.close();
}



async function test(){
    for (var index = 0; index < 10000; index++) {
    await trans2("1Mayflash XBOX1 ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロール', N'Mayflash XBOX ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロールxxxxxxxx"+index);
        
    }
    
    // await trans2("2Mayflash XBOX1 ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロール', N'Mayflash XBOX ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロールxxxxxxxxxx2");
    // await trans2("3Mayflash XBOX1 ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロール', N'Mayflash XBOX ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロールxxxxxxxxxxx3");
    // await trans2("4Mayflash XBOX1 ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロール', N'Mayflash XBOX ONE メディア リモコン 互換 高品質のスマートな家庭用TV DVDメディアリモートコントロールxxxxxxxxxxxx4");
}

test();




