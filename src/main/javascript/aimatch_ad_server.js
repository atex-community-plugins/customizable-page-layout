var aim_apnpageNum = Math.round(Math.random() * 100000000000);
var aim_SA = Math.round(Math.random() * 9);

var aim_adServer	= "http://data.apn.co.nz/apnnz";
var aim_h_Server	= '/hserver';
var aim_j_Server	= '/jserver';

function aimRenderAd(adWidth,adHeight,adSizeName,adSpace,srandpos){
	var random		= Math.round(Math.random() * 10000000000);
	var adCache = '/random=' + random + '/viewid=' + aim_apnpageNum;
	var adSize = '/size=' + adSizeName + '/SA=' + aim_SA;
	var NadCache = adCache;
	var NadSize = adSize;
	var NadSpace = adSpace;

	if (srandpos.length) NadSize = NadSize + srandpos;
	if (typeof keyword !== 'undefined' && keyword.length) NadCache = NadCache + '/KEYWORD=' + keyword;
	/* Please review site target variable */
	var _siteTarget = '/SITE=NZH';
	if (typeof siteTarget !== 'undefined') _siteTarget = siteTarget;
	
	$('<iframe/>')
	.attr({
		'id': NadSpace ,
		'height':adHeight ,
		'width': adWidth ,
		'scrolling':'no' ,
		'allowtransparency':'true' ,
		'marginWidth':'0' ,
		'marginHeight':'0' ,
		'vspace':'0' ,
		'hspace':'0' ,
		'noresize':'true' ,
		'frameBorder':'0' ,
		'align':'left' ,
		'style':'border:0px none;padding: 0px ;margin: 0px ;',
		'src': aim_adServer + aim_h_Server + _siteTarget + NadSize + NadCache
	})
	.appendTo('div#Div' + adSpace);
}

function aimRenderJServerAd(ad_size,keyword,pos,parent_div_id){
	var random	= Math.round(Math.random() * 10000000000);
	var adCache = '/random=' + random + '/viewid=' + aim_apnpageNum;
	var adSize = '/size=' + ad_size + '/SA=' + aim_SA;
	var NadCache = adCache;
	var NadSize = adSize;
	
	if (pos.length) NadSize = NadSize + pos;
	if (keyword.length) NadCache = NadCache + '/KEYWORD=' + keyword;
	
	document.write('<SCRIPT SRC="'+ aim_adServer + aim_j_Server + siteTarget + NadSize + NadCache +'"></SCRIPT>');
}

function expandDiv(ifmid,width,height){
		$('#Div' + ifmid + ',iframe#' + ifmid).css({"width":width + "px","height":height + "px"});
}

function SetCss(CssData){
	if(CssData.length){
		var sRaw = unescape(CssData);
		var a=0;
		var aTemp1 = sRaw.split(',');
		var aCssSettings = Array(aTemp1.length);
		
		for(a in aTemp1){
			aCssSettings[a] = Array(2);
			aCssSettings[a] = aTemp1[a].split('|');
		}
		if(aCssSettings.length){
			for(a=0; a < aCssSettings.length; a++){
				if(aCssSettings[a].length == 2){
					aCssSettings[a][1] = aCssSettings[a][1].replace(/!/,"!important");
					$(aCssSettings[a][0]).css('cssText', aCssSettings[a][1]);
				}
			}
		}
	}
}