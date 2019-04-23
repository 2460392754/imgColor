import downloadjs from 'downloadjs'

function base64ToBlob() {
	// 	var array = new Int8Array([17, -45.3]);
	// 	
	// 	try{
	// 		var jpeg = new Blob( [array], {type : "image/jpeg"});
	// 	}
	// 	catch(e){
	// 	    // TypeError old chrome and FF
	// 	    window.BlobBuilder = window.BlobBuilder ||
	// 	    window.WebKitBlobBuilder ||
	// 	    window.MozBlobBuilder ||
	// 	    window.MSBlobBuilder;
	// 	    if(e.name == 'TypeError' && window.BlobBuilder){
	// 	    	var bb = new BlobBuilder();
	// 	    	bb.append([array.buffer]);
	// 	    	var jpeg = bb.getBlob("image/jpeg");
	// 	    }
	// 	    else if(e.name == "InvalidStateError"){
	// 	        // InvalidStateError (tested on FF13 WinXP)
	// 	        var jpeg = new Blob( [array.buffer], {type : "image/jpeg"});
	// 	    }
	// 	    else{
	// 	        // We're screwed, blob constructor unsupported entirely
	// 	    }
	// 	}

	// return jpeg;

	const str = 'hello';
	let blob;

	try {
		blob = new Blob([str], {
			type: "text/xml"
		});
	} catch (e) {
		// TypeError old chrome and FF
		window.BlobBuilder = window.BlobBuilder ||
			window.WebKitBlobBuilder ||
			window.MozBlobBuilder ||
			window.MSBlobBuilder;
		if (e.name == 'TypeError' && window.BlobBuilder) {
			const bb = new BlobBuilder();
			bb.append([str]);
			blob = bb.getBlob('text/xml');
			alert(1)
		} else if (e.name == "InvalidStateError") {
			// InvalidStateError (tested on FF13 WinXP)
			blob = new Blob([str], {
				type: "text/xml"
			});
			alert(2)
		} else {
			// We're screwed, blob constructor unsupported entirely
			alert(3)
		}
	}

	// alert(JSON.stringify(blob.size));

	return blob;
}

function download(blob) {
	const name = new Date().getTime() + '_X.txt';
	// 	const href = URL.createObjectURL(blob);
	// 	const a = document.createElement('a');
	// 
	// 	a.download = new Date().getTime() + '_X.txt';
	// 	a.href = href;
	// 	a.click();
	// 	URL.revokeObjectURL(href)

	// downloadjs(blob, name, 'text/plain');
	
	// downloadjs('hello',name,'text/plain');
	
	var str= "hello world",	arr= new Uint8Array(str.length);
	str.split("").forEach(function(a,b){
	  arr[b]=a.charCodeAt();
	});

	downloadjs( arr, "textUInt8Array.txt", "text/plain" );
}


export default {
	base64ToBlob,
	download
}
