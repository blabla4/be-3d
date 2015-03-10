define([], function() {
  return {
		get: function(file, callback) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					callback(JSON.parse(xmlhttp.responseText));
				}
			};
			xmlhttp.open("GET", "/conf/" + file, true);
			xmlhttp.send();
		}
  };
});
