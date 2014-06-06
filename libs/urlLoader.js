var colors = require('colors');
exports.getTargetUrl = function(routes, host){
	var url = {target : ""};
	var elemUrl = host.split(":")[0];

	url.target = writeUrl(routes,elemUrl);

	return url;	
}

writeUrl = function(routes,url){
	var firstIndex = null, i = 0;
	var elemUrl = url.split(".");
	var countMembre = elemUrl.length;

	if(countMembre == 2){
		elemUrl.unshift("*");
		countMembre ++;
	}

	for(i=0; i<routes.length; i++){
		if(routes[i] != null)
		firstIndex = matchRoute(routes[i].source.split("."), elemUrl, firstIndex, i);	
	}

	console.log("(",url,firstIndex, routes[firstIndex].source ,routes[firstIndex].target,")");
	return routes[firstIndex].target
}

function matchRoute(elemRoute, elemUrl, firstIndex, index){
	var match = 0;
	var maxToMatch = elemRoute.length;
	var i = 0;

	if(maxToMatch == 2){
		elemRoute.unshift("*");
		maxToMatch ++;
	}
	

	if(maxToMatch == 1){
		if(firstIndex == null)
			firstIndex = index;
	}else{

		for(i=0; i<maxToMatch;i++){
			if(elemRoute[i] == "*" || elemRoute[i] === elemUrl[i]){
				match ++;
			}
		}
		if(match == maxToMatch){
			if(firstIndex == null)
				firstIndex = index;
		}
	}

	return firstIndex;
}