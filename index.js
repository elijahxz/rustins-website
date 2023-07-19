$(document).ready(function(){
	let IMAGES = [];
	let IMG_NUM = 0; // atob(string)
  	var MAX_WIDTH = 350;
	var SLIDESHOW_MANAGER; 

	if ($(window).width() > 1400){
		MAX_WIDTH = 350;
	}
	else if ($(window).width() < 450){
		MAX_WIDTH = 280;
	}
	else if ($(window).width() <= 1400){
	  	var width = $(window).width();
	  	var percent_30 = (width * .3);
		MAX_WIDTH = (width - percent_30);
	}
	$(".slideshow-div").width(MAX_WIDTH);
	$(".slideshow-div").height(MAX_WIDTH);
	$("#slideshow").width(MAX_WIDTH - 70);
	$("#slideshow").height(MAX_WIDTH - 70);
  	

	$.get("images.txt", function(data){
		var lines = data.split('\n');
	  	lines.pop();
	    $.each(lines, function(n, elem){
			IMAGES.push(elem);
		    IMG_NUM ++;
		});
		showSlides(1);
	  	startSlideshow();
	});	

	// load other templates
	$("#navholder").load("navbar.html");
	$("#quote").load("quote.html");
	
	// add navbar classes .. timeout waits untill their loaded
	setTimeout(() => {
		$("#home").addClass("active");
	}, "1000");

	function stopSlideshow(){
		SLIDESHOW_MANAGER = clearInterval(SLIDESHOW_MANAGER);
	}
	
	function startSlideshow(){
		SLIDESHOW_MANAGER = window.setInterval(function(){
			showSlides(1);
		}, 2500);
	}
	
	// give the user 5.5 seconds to look at that slide, then start the slideshow again;
	function resetSlideshow(){
		if (SLIDESHOW_MANAGER){
			stopSlideshow();
			setTimeout(() => {
				startSlideshow();
			}, "3500");
		}
	}

	$(".prev").on('click', function(){
		resetSlideshow();
		showSlides(-1);
	});
	
	$(".next").on('click', function(){
		resetSlideshow();
		showSlides(1);
	});
	$(window).resize(function(){
		if ($(window).width() > 1400){
			MAX_WIDTH = 350;
		}
		else if ($(window).width() < 450){
			MAX_WIDTH = 280;
		}
		else if ($(window).width() <= 1400){
			var width = $(window).width();
			var percent_30 = (width * .3);
			MAX_WIDTH = (width - percent_30);
		}
		$(".slideshow-div").width(MAX_WIDTH);
		$(".slideshow-div").height(MAX_WIDTH);
		$("#slideshow").width(MAX_WIDTH - 70);
		$("#slideshow").height(MAX_WIDTH - 70);
	});	
	function showSlides(n) {
		var slideshow = $("#current_image");
		var slideshow_bg = slideshow.attr("src");
		var image, next_image;
		for (image = 0; image < IMG_NUM; image++){
			var current_image = atob(IMAGES[image]);
			if (slideshow_bg.indexOf(current_image) > -1){
				break;
			}
		}
		image = image + n;
		if( image >= IMG_NUM )
			image = 0;
		else if ( image < 0 )
			image = IMG_NUM - 1;
		next_image = "/images/" + atob(IMAGES[image]);
		slideshow.attr("src", next_image);
	}
  	function update_image_width(slideshow){	
	   	var width = slideshow.width("");
	  	var height = slideshow.height("");
	   	var width = slideshow.width();
	  	var height = slideshow.height();
	  	var ratio = width / MAX_WIDTH;
	  	var new_height = (height/ratio);
	  	var new_width = (width/ratio);
	  	if (new_height > MAX_WIDTH){
			ratio = new_height / MAX_WIDTH;
		  	new_height = new_height / ratio;
		  	new_width = new_width / ratio
		}
	   	slideshow.width(new_width);
	  	slideshow.height(new_height);
	  	
	  	$("#slideshow").height(MAX_WIDTH);
	  	$("#slideshow").width(MAX_WIDTH);


	}
	
});
