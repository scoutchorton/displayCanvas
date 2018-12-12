window.onload=function(){
	var c = new simpleCanvas('c');
	var f=false;
	var drawInterval, pMouseX, pMouseY;
	c.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
	window.resize=function(){
		c.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
	}

	c.background();
	c.c.lineWidth=1;
	c.ele.addEventListener('mousedown',function(){
		pMouseX=mouseX;
		pMouseY=mouseY;
		drawInterval=setInterval(function(){
			c.line(pMouseX, pMouseY, mouseX, mouseY);
			pMouseX=mouseX;
			pMouseY=mouseY;
		}, 100/3);
	});
	c.ele.addEventListener('mouseup',function(){
		clearInterval(drawInterval);
	});

	document.getElementById('penSize').innerHTML=c.c.lineWidth;
	window.canvClear = function(){
		c.background();
	}
	window.savePicture=function(){
		var a=document.createElement('a');
		a.href=c.ele.toDataURL('image/png');
		a.download='drawingCanvas_output_' + (new Date().toLocaleTimeString().split(' ').join('_').split(':').join('_')) + '.png';
		a.click();
	}
	window.penBigger = function(){
		c.c.lineWidth+=1;
		document.getElementById('penSize').innerHTML=c.c.lineWidth;
	}
	window.penSmaller = function(){
		c.c.lineWidth-=1;
		document.getElementById('penSize').innerHTML=c.c.lineWidth;
	}
	window.penColor = function(){
		document.getElementById('color').jscolor.show();
	}
	window.updateFill=function(z){
		c.stroke(z.rgb[0], z.rgb[1], z.rgb[2]);
		document.getElementById('toolbar').style.borderLeft="3px solid " + document.getElementById('colorStyle').style.backgroundColor;
		document.getElementById('toolbar').style.borderRight="3px solid " + document.getElementById('colorStyle').style.backgroundColor;
	}
	window.toggleFullscreen=function(){
		//https://www.w3schools.com/howto/howto_js_fullscreen.asp
		if(f){
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) { /* Firefox */
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { /* IE/Edge */
				document.msExitFullscreen();
			}
			f=false;
			document.getElementById('fullscreenIcon').innerHTML="fullscreen";
		}else{
			var elem=document.documentElement;
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			}
			f=true;
			document.getElementById('fullscreenIcon').innerHTML="fullscreen_exit";
		}
	}
}
