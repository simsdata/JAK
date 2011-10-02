(function(){  

describe("Browser", function(){
    var browser, version;

	/**
	 * pomocne metody
	 */		 		
	
	function browserDetect() {
		if (document.all && !window.opera) {
			browser =  'ie';
		} else if (navigator.userAgent.match(/chrome/i)) {
			browser = "chrome";
		} else if (window.opera) {
			browser = 'opera';
		//} else if (navigator.userAgent.indexOf('Safari') != -1 || navigator.userAgent.indexOf('iPhone') != -1) {
		} else if (navigator.vendor != 'KDE' && document.childNodes && !document.all && !navigator.taintEnabled && !navigator.accentColorName) {
			browser = 'safari';
		} else if ((navigator.vendor == 'KDE') || (document.childNodes) && (!document.all) && (!navigator.taintEnabled))  {
			browser = 'konqueror';
		} else if (document.addEventListener) {
			browser = 'gecko';
		}
	}
	
	
	function _ieVersion() {
		try {
			window.getSelection();
			return '9';
		} catch(e) {
			if (window.localStorage) {
				return '8';
			} else if(typeof window.external.AddSearchProvider == 'unknown') {
				return '7';
			} else if(document.implementation.hasFeature != null) {
				return '6';
			} else if (document.implementation.hasFeature == null && document.namespaces != null){
				return '5.5';
			} else if (document.namespaces == null && document.getElementById ) {
				return '5';
			} else {
				return '4';
			}
		}
	}
	
	
	function versionDetect() {
		var ie  = false /*@cc_on || true @*/;
		if (ie) { 
			version = _ieVersion();
		} 
	    
	    
	    if (browser == 'opera') {
	    	version = window.opera.version();
		}
		
		if (browser == 'gecko') {
			version = (Array.every) ? '1.5' : version; //FF1.5+
			version = (window.Iterator) ? '2' : version; //FF2+
			version = (window.postMessage) ? '3' : version; //FF3+
			version = (window.JSON) ? '3.5' : version; //FF3.5+
			version = (document.readyState !== undefined) ? '3.6' : version; //FF3.6++
		} 
		
		if (browser == 'konqueror') {
			var num = navigator.userAgent.indexOf('KHTML') + 6;
			var part = navigator.userAgent.substring(num);
			var end = part.indexOf(' ');
			version = part.substring(0,end - 2);
		}
		
		if (browser == "chrome") {
			var r = navigator.userAgent.match(/chrome\/([0-9]+)/i);
			version = r[1];
		}
		
		if (browser == 'safari') {
			if (document.getCSSCanvasContext) {
				version = 4;
			} else {
				version = 3;
			}
		}
	}
	
	/**
	 * pri spusteni testu
	 */		 		
	beforeEach(function () {
	   browser = 'oth';
	   version = '0';
	   browserDetect();
	   versionDetect();
	});
		
        
	it("should return right browser version and type. It tries to obtain this information in different way than JAK", function(){	
		/**
		 * testove metody, testujeme schopnost ziskat browser a jeho verzi, ve vetsine pripadu se snazime zjistit to jinak nez pouziva nase knihovna
		 */		 				
		expect(browser).toEqual(JAK.Browser.client);
        expect(version*1).toEqual(JAK.Browser.version*1);

    });	
});	

})();