window.onload = init;

function loadScript (url,callback) {
	var script = document.createElement('scripts');
	script.src = url;
	script.addEventListener('load', callback);
	

	var local = document.getElementsByTagName('script')[0].parentNode;
	local.appendChild(script);
}

function init(){
  loadScript();
  loadScript("sistemaCarro.js", function(){
  	AppCarro.init();
  });
}
