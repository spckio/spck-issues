var __awaiter=this&&this.__awaiter||function(e,t,r,a){return new(r||(r=Promise))((function(n,c){function o(e){try{l(a.next(e))}catch(e){c(e)}}function s(e){try{l(a.throw(e))}catch(e){c(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,s)}l((a=a.apply(e,t||[])).next())}))},__generator=this&&this.__generator||function(e,t){var r,a,n,c,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return c={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function s(c){return function(s){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,a&&(n=2&c[0]?a.return:c[0]?a.throw||((n=a.return)&&n.call(a),0):a.next)&&!(n=n.call(a,c[1])).done)return n;switch(a=0,n&&(c=[2&c[0],n.value]),c[0]){case 0:case 1:n=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,a=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!n||c[1]>n[0]&&c[1]<n[3])){o.label=c[1];break}if(6===c[0]&&o.label<n[1]){o.label=n[1],n=c;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(c);break}n[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],a=0}finally{r=n=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,s])}}};bot.commands=[{command:"ls clipboard",help:"List all clipboard values."},{command:"copy",help:"Copy to default clipboard."},{command:"copy <name>:string",help:"Copy value to a named clipboard."},{command:"copyswap <name1>:string <name2>:string",help:'Swaps the values stored in "name1" and "name2".'},{command:"paste",help:"Paste from default clipboard."},{command:"paste <name>:string",help:'Paste from "name" in clipboard.'},{command:"del copy <name>:string",help:"Removes a clipboard value."},{command:"clear clipboard",help:"Clears the clipboard."}],bot.oncomplete=function(e,t){var r=e.match(/^(copy |paste |del copy |copyswap |copyswap \w+ )/);if(r&&r[0]){var a=r[0];return t.storage.getItem("clipboard").then((function(e){return e?Object.keys(e).map((function(t){return{command:a+t,help:e[t]}})):[]}))}return bot.commands},bot.take=function(e){return/^(copy \w+|paste \w+|del copy \w+|copyswap \w+ \w+|ls clipboard|copy|paste|cut|clear clipboard)/.test(e.trim())},bot.onmessage=function(e,t){return __awaiter(this,void 0,void 0,(function(){var r,a,n,c,o,s,l,p,u,i,d,m,b,y,f,h,g,w,v,x;return __generator(this,(function(_){switch(_.label){case 0:switch(e=e.trim(),r=t.storage,a=t.editor,e){case"ls clipboard":return[3,1];case"clear clipboard":return[3,3];case"copy":return[3,7];case"paste":return[3,8];case"cut":return[3,9]}return[3,10];case 1:return[4,r.getItem("clipboard")];case 2:return n=_.sent()||{},c=Object.keys(n).reduce((function(e,t){return e+"|"+t+"|"+n[t]+"|\n"}),"|Name|Value|\n|---|---|\n"),bot.reply(c,0),[3,37];case 3:return _.trys.push([3,5,,6]),[4,r.setItem("clipboard",{})];case 4:return _.sent(),bot.reply("Cleared clipboard.",1500),[3,6];case 5:return _.sent(),bot.reply("Error occurred in clearing clipboard.",3e3),[3,6];case 6:return[3,37];case 7:return a.execCommand("copy"),[3,37];case 8:return a.execCommand("paste"),[3,37];case 9:return a.execCommand("cut"),[3,37];case 10:return(o=e.match(/^copy\s(\w+)$/))&&o[1]?(h=o[1],[4,r.getItem("clipboard")]):[3,19];case 11:return s=_.sent()||{},[4,a.getSelectedText()];case 12:return(p=_.sent())?[3,14]:[4,a.getLine()];case 13:p=_.sent(),_.label=14;case 14:l=p,s[h]=l,_.label=15;case 15:return _.trys.push([15,17,,18]),[4,r.setItem("clipboard",s)];case 16:return _.sent(),bot.reply('Copied to "'+h+'".',1500),[3,18];case 17:return _.sent(),bot.reply("Out of storage: clear the clipboard to make space.",3e3),[3,18];case 18:return[2];case 19:return(u=e.match(/^del copy (\w+)$/))&&u[1]?[4,r.getItem("clipboard")]:[3,25];case 20:delete(i=_.sent()||{})[u[1]],_.label=21;case 21:return _.trys.push([21,23,,24]),[4,r.setItem("clipboard",i)];case 22:return _.sent(),bot.reply('Deleted clipboard "'+u[1]+'"',1500),[3,24];case 23:return _.sent(),bot.reply("Out of storage: delete from clipboard to make space.",3e3),[3,24];case 24:return[2];case 25:return(d=e.match(/^copyswap (\w+) (\w+)$/))&&d[1]&&d[2]?[4,r.getItem("clipboard")]:[3,31];case 26:m=_.sent()||{},b=m[d[1]],y=m[d[2]],m[d[1]]=y,m[d[2]]=b,_.label=27;case 27:return _.trys.push([27,29,,30]),[4,r.setItem("clipboard",m)];case 28:return _.sent(),bot.reply('Swapped clipboard "'+d[1]+'" "'+d[2]+'"',1500),[3,30];case 29:return _.sent(),bot.reply("Out of storage: delete from clipboard to make space.",3e3),[3,30];case 30:return[2];case 31:return(f=e.match(/^paste\s(\w+)$/))&&f[1]?(h=f[1],[4,r.getItem("clipboard")]):[3,36];case 32:return g=_.sent()||{},"string"!=typeof(w=g[h])?[3,34]:(v=w.split("\n"),[4,a.getSelectionRanges()]);case 33:return x=_.sent(),v.length==x.length?[2,a.replaceTextRanges(x.map((function(e,t){return{text:v[t],range:e}})))]:[2,a.replaceTextRanges(x.map((function(e){return{text:w,range:e}})))];case 34:bot.reply('Clipboard value "'+h+'" not found.',3e3),_.label=35;case 35:return[2];case 36:bot.reply("["+t.name+'] Unknown command: "'+e+'"',2500),_.label=37;case 37:return[2]}}))}))};