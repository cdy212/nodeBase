const UserAgent = require('user-agents'); 
  
const userAgent = new UserAgent({ deviceCategory: 'mobile' }); 
var urlencode = require('urlencode'); console.log(urlencode('변환')); console.log(urlencode.decode('%EB%B3%80%ED%99%98'));

console.log(userAgent.toString());
const text = "%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86%E3%81%94%E3%81%96%E3%81%84%E3%81%BE%E3%81%99";//urlencode("ありがとうござい");
const textt = urlencode("ありがとうございます");//urlencode("ありがとうござい");

console.log(textt);

var request = require('request'); 

var options = { url : `https://translate.google.com/translate_a/single?client=webapp&sl=ja&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&ssel=5&tsel=5&xid=45662847&kc=1&tk=729748.910612&q=${text}`
, headers: 
{ 'User-Agent':userAgent.toString() } 

}; 

setTimeout(translate, 500000, "홍길동", "안녕하세요."); 

async function translate(){
   await request(options,async function(error, response, html){ 
      if (error) {console.log(error)}; 
      console.log(html)

      return html;
      
  });

  console.log(retval);

 
}
