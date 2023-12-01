const postData=async({url:e,data:t,headers:n,isReturn:o=!0})=>{const r=await fetch(e,{method:"POST",mode:"cors",headers:n,body:JSON.stringify(t)});if(o)return r.json()},getCookies=async(e,t)=>{var n=new Promise((function(n,o){chrome.cookies.get({url:e,name:t},(function(e){n(e?e.value:"no_cookie")}))}));return await n};function showInputKey(){gldiv=document.getElementById("mk_gldiv"),gldiv.innerHTML="\n  <div class='div-input-key'>\n    <input class='input-key' id=\"key\" placeholder=\"Укажите свой ключ\" name=\"key\" />\n    <button class='save'>Сохранить</button>\n  </div>\n\n  ",document.querySelector(".save").addEventListener("click",(function(){var e=document.querySelector('input[name="key"]').value.trim();""===e?error("Введите ключ!"):validKey(e)}))}async function showKeyInfo(e,t,n,o){chrome.storage.local.set({bot:!0,key:e,key2:t}),gldiv=document.getElementById("mk_gldiv"),gldiv.innerHTML=`\n\n        <div class='div-key'>\n          <div>\n            <b>${e}</b>\n            <span id="mk_comment_key" style="display:block"></span>\n          </div>\n          <div class='del_svg'>\n            <svg class="deleteBtn" id="deleteBtn" fill="none" height="24" viewBox="-2 -1 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M7 0H13C14.1046 0 15 0.89543 15 2V3H18C19.1046 3 20 3.89543 20 5V7C20 8.10457 19.1046 9 18 9H17.9199L17 20C17 21.1046 16.1046 22 15 22H5C3.89543 22 3 21.1046 3.00345 20.083L2.07987 9H2C0.89543 9 0 8.10457 0 7V5C0 3.89543 0.89543 3 2 3H5V2C5 0.89543 5.89543 0 7 0ZM2 5H5H15H18V7H2V5ZM4.08649 9H15.9132L15.0035 19.917L15 20H5L4.08649 9ZM13 2V3H7V2H13Z" fill="#4e4e53" fill-rule="evenodd"></path></svg>   \n          </div>\n        </div>\n        <div class='settings'>\n        </div>\n        `;let r=chrome.runtime.getManifest(),a={};if(a.ver=r.version,a.key=e,a.key2=t,a.lastValidationDate=new Date(o)||"",e){const e=await postData({url:"https://api.mkeeper.ru/Direct/hs/licenseinfo",data:a});chrome.storage.local.set({licenseDate:e.date}),document.getElementById("mk_comment_key").textContent=e.text}let i=document.getElementById("deleteBtn");i.addEventListener("click",deleteKey),i.key=e,i.key2=t,setCookies()}async function deleteKey(e){data={},data.key=e.currentTarget.key,data.key2=e.currentTarget.key2,postData({url:"https://api.mkeeper.ru/Direct/hs/licensedel",data,isReturn:!1}),chrome.storage.local.remove("key"),chrome.storage.local.remove("key2"),chrome.storage.local.remove("licenseDate"),document.querySelector(".div-key").remove(),showInputKey()}function checkAdvBot(){let e=document.getElementById("adv-bot").checked;chrome.storage.local.set({bot:e})}function setCookies(){(async()=>{let[e]=await Promise.allSettled([getCookies("https://seller.wildberries.ru","WBToken")]);chrome.storage.local.set({WBToken:e.value},(function(){}))})()}async function validKey(e){var t={key:e};try{var n=await fetch("https://api.mkeeper.ru/Direct/hs/license",{method:"post",mode:"cors",body:JSON.stringify(t)});if(200===n.status){var o=await n.json();0==o.error?(document.getElementById("key"),setTimeout((function(){chrome.storage.local.set({key:e,key2:o.key2,t:0},(function(){})),chrome.runtime.onMessage.addListener(chrome.storage.local.get(["key"],(function(e){chrome.runtime.setUninstallURL(`https://api.mkeeper.ru/Direct/hs/del?key=${e.key}`)}))),showKeyInfo(e,o.key2)}),1e3)):error(o.text)}else error("Введен невалидный ключ!")}catch(e){error("Проверьте соединение с интернетом!"),console.log(e)}}function error(e){document.querySelector(".error").innerText=e,setTimeout((function(){document.querySelector(".error").innerText=""}),2e3)}chrome.storage.local.get(["key","key2","bot","lastValidation"],(function(e){"key"in e?showKeyInfo(e.key,e.key2,e.bot,e.lastValidation):showInputKey()}));