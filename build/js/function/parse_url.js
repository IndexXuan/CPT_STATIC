function parseURL(url){var a=document.createElement("a");return a.href=url,{source:url,protocol:a.protocol.replace(":",""),host:a.hostname,port:a.port,query:a.search,params:function(){for(var s,ret={},seg=a.search.replace(/^\?/,"").split("&"),len=seg.length,i=0;len>i;i++)seg[i]&&(s=seg[i].split("="),ret[s[0]]=s[1]);return ret}(),file:(a.pathname.match(/\/([^\/?#]+)$/i)||[,""])[1],hash:a.hash.replace("#",""),path:a.pathname.replace(/^([^\/])/,"/$1"),relative:(a.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],segments:a.pathname.replace(/^\//,"").split("/")}}