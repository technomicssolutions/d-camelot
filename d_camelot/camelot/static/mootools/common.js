var geocoder;
var Slider = new Class({
    Implements: [Options],
    options:{
        imageSliderDiv: '.slide',
        slideshowContainer: 'carousel-inner',
        controlDiv: '.carousel-indicators',
        delay: 5000,
        effectDuration: 500,
        startMargin: 0,
        minMargin: -820,
        midMargin: 820,
        maxMargin: 1640,
        activeOptions : {
            'transition' : 'linear',
            'duration' : 1000
        },
        slideOptions: {   
            'transition' : 'linear', 
            'duration' : 1000,
            //'link': 'cancel'
        }
    },
    initialize: function(element) {
        console.log(element);
        this.element = element;
        this.slides = this.element.getElements('.slide');
        this.lastInd = this.slides.length - 1;
        this.leftControl = this.element.getElement('.next_arrow');
        this.rightControl = this.element.getElement('.prev_arrow');
        this.currentIndex = 0;
        this.nextIndex = 1;
        this.thirdIndex = 2;
        this.timer = null;
        this.clicked = false;
        this.slideToLeft = true;
        this.currentSlide = this.slides[this.currentIndex];
        this.currentSlide.setStyle('margin-left', this.options.startMargin);
        this.leftControl.addEvent('click', function(ev){
            ev.stop();
            this.slideLeft(this.currentIndex);
        }.bind(this));
        this.rightControl.addEvent('click', function(ev){
            ev.stop();
            this.slideRight();
        }.bind(this));
        if (this.slides.length > 1) {
            this.nextSlide = this.slides[this.nextIndex];
            this.thirdSlide = this.slides[this.thirdIndex];
            this.nextSlide.setStyle('margin-left', this.options.midMargin);
            this.thirdSlide.setStyle('margin-left', this.options.maxMargin);
            this.effects = new Fx.Elements(this.slides, this.options.slideOptions);
        }
        this.rightControl.setStyle('display', 'none');
    },
    
    slideLeft: function(index) {
        //this.reset();
        var effect = {};

        if(this.nextIndex == this.lastInd){
            this.leftControl.setStyle('display', 'none');
        } else {
            this.leftControl.setStyle('display', 'block');
        }
        if(this.currentIndex == 0){
            this.rightControl.setStyle('display', 'none');
        } else {
            this.rightControl.setStyle('display', 'block');
        }
        
        effect[this.currentIndex] = {'margin-left': [this.options.startMargin, this.options.minMargin]};
        effect[this.nextIndex] = { 'margin-left': [this.options.midMargin, this.options.startMargin]};
        effect[this.thirdIndex] = { 'margin-left': [this.options.maxMargin, this.options.midMargin]};
        this.currentIndex = this.nextIndex;
        this.nextIndex = this.thirdIndex;
        this.thirdIndex = this.thirdIndex  + 1;
        this.timer = $clear(this.timer);              
        this.effects.start(effect);
    },
    slideRight: function(index) {
        //this.reset();
        var effect = {};        
        effect[this.nextIndex] = {'margin-left': [this.options.midMargin, this.options.maxMargin]};        
        effect[this.currentIndex] = {'margin-left': [this.options.startMargin, this.options.midMargin]};
        effect[this.currentIndex - 1] = {'margin-left': [this.options.minMargin, this.options.startMargin]};
        this.thirdIndex = this.nextIndex;
        this.nextIndex = this.currentIndex;
        this.currentIndex = this.currentIndex - 1; 
        this.slideToLeft = false;
        this.timer = $clear(this.timer);     
        if(this.currentIndex == 0){
            this.rightControl.setStyle('display', 'none');
        } else {
            this.rightControl.setStyle('display', 'block');
        }   
        if(this.nextIndex == this.lastInd){
            this.leftControl.setStyle('display', 'none');
        } else {
            this.leftControl.setStyle('display', 'block');
        }        
        this.effects.start(effect);
    },
    
});
// var geocodePosition =function(pos) {
	
// }
var Archive = new Class({
	Implements: [Options],
	options: {
		
	},
	initialize: function(elements) {
		this.elementss = elements;
		this.elementss.each(function(ind, element){
			parent_elements = element.getElements('.parent');
			parent_elements.each(function(el, index){
				el.addEvent('click', function(ev){
					ev.stop();
					if(ev.target.hasClass('parent')) {
						this.open_close_service(ev.target);
					} else {
						this.open_close_service(ev.target.getParent());
					}					
				}.bind(this));
			}.bind(this));
		}.bind(this));	
	},
	open_close_service: function(el){
		var uls = el.getElements('ul');
		uls.each(function(ul){
			if(el.hasClass('active')){
				ul.setStyle('display', 'none');
			} else {
				ul.setStyle('display', 'block');
				parents = ul.getElements('.parent');
				parents.each(function(parent){
					parent.addClass('active');
				})
			}
		})
		if(el.hasClass('active')){
			el.removeClass('active');
		} else if(!el.hasClass('blog_name')) {
			el.addClass('active');
		}		
	}	
});

/*var DialogueModelWindow = new Class({
	Implements: [Options],
	options: {
		'pop_window': '#dialogue_popup',
		'overlay': '#overlay',
		'message_padding': '30px',
		'dialogue_popup_width': '400px',
		'left': ' 35%',
		'top': '20%',
		'height': 100,
		'content_div': ''
	},
	initialize: function(options) {
		window.scrollTo(0,0);
		this.setOptions(options);
		this.message = ""
		this.overlay = $$(this.options.overlay);
		this.pop_window = $$(this.options.pop_window);
		var height = $(document).height();
		this.set_overlay_height(height);
		this.set_message(this.message);
		this.hide_popup();
		this.close_pop_up = this.pop_window.getElement('.close_pop');		
		this.close_pop_up.addEvent('click', function(ev){
			ev.stop();
			this.hide_popup();
		}.bind(this));
		//this.set_left();
		this.set_top();
	},
	show_popup: function(){
		// this.overlay.setStyle('display', 'block');
		// this.pop_window.setStyle('width', '0px');
		// this.pop_window.setStyle('height', '0px');
		// this.pop_window.setStyle('display', 'block');
		this.overlay.setStyle('display', 'block');
        this.pop_window.setStyle('width', this.options.dialogue_popup_width);
        this.pop_window.setStyle('height', this.options.height);
        this.pop_window.setStyle('display', 'block');
		// this.pop_window.morph({
		// 	'width': this.options.dialogue_popup_width,
		// 	'height': this.options.height,
		// });
	},	
	show_content: function(){		
		$$(this.options.content_div)[0].setStyle('display', 'block');
		this.show_popup();
	},
	hide_popup: function(){
		this.overlay.setStyle('display', 'none');
		this.pop_window.setStyle('display', 'none');
		if($$(this.options.content_div).length > 0)
			$$(this.options.content_div)[0].setStyle('display', 'none');
	},
	set_message: function(message){
		this.message = message;
		this.pop_window.getElement('.message').set('html', message);
		this.pop_window.getElement('.message').setStyle('padding', this.options.message_padding);
		this.show_popup();
	},
	set_overlay_height: function(height){
		this.overlay.setStyle('height', height+"px");
	},
	set_left: function(){
		this.pop_window.setStyle('left', this.options.left);
	},
	set_top: function(){
		this.pop_window.setStyle('margin-top', this.options.top);
	},	
});

var TabView = new Class({
	Implements: [Options],
	options: {
		tab_header: '.tab_header',
		tabs: '.tab',
		current_header: 'current'
	},
	initialize: function(options) {
		this.setOptions(options);
		this.tab_headers = $$(this.options.tab_header);
		this.tabs = $$(this.options.tabs);
		if(this.tab_headers.length > 0) {
			this.tabs.each(function(tab, index){	
				if(index!=0)			
					tab.setStyle('display', 'none');
			}.bind(this));
			this.current_index = 0;
			this.tabs[this.current_index].setStyle('display', 'block');
			this.tab_headers.each(function(header, ind){
				if(header.hasClass('current')){
					this.tabs[this.current_index].setStyle('display', 'none');			
					this.current_index = ind;
					this.tabs[this.current_index].setStyle('display', 'block');			
				}
				header.addEvent('click', function(ev){
					ev.stop();	
					this.change_tab(ind);
				}.bind(this));
			}.bind(this));		
		}		
	},
	change_tab: function(ind){
		var tab = this.tabs[ind];
		this.tabs[this.current_index].setStyle('display', 'none');
		this.tab_headers[this.current_index].removeClass(this.options.current_header);
		this.tab_headers[ind].addClass(this.options.current_header);
		tab.setStyle('display', 'block');
		this.current_index = ind;
	}
});
// 'latitude': 'POINT (-27.87 135.34)',  'geometry': '#map_coordinates',
var SimpleMap = new Class({
	Implements: [Options],
    options: {
        'map_canvas': '#map-canvas',
        'geometry': '#map_coordinates',
        'marker_url': '',
        'zoom_level': 4,
        'zoom_class': '',
        'map_address_button': '.map_address', 
        'latitude': 'POINT (-27.87 134.34)',
        'multiple_markers': false,
        'coordinate_class': '#map_val',
		'address_class': '#address_val',
    },
    initialize: function(options){
    	geocoder = new google.maps.Geocoder();
        this.setOptions(options);
        this.element = $$(this.options.map_canvas)[0];
        this.geometry = $(this.options.geometry);
        this.zooms = [];
        this.marker_url = this.options.marker_url;
        this.geometry_value = this.geometry.val();
        if(this.geometry_value != '' && this.geometry_value != undefined) {
        	var latitude = this.geometry_value;
            
        } else {
        	var latitude = this.options.latitude;
            this.geometry.value = this.options.latitude;
        }  
        if(this.options.zoom_class == ''){
            this.zooms.push(this.options.zoom_level);
        } else {
            var zo = $$(this.options.zoom_class);
            zo.each(function(z, index){
                this.zooms.push(parseInt(z.value));
            }.bind(this));
        }  
        latitude = latitude.replace('POINT (','');
        latitude = latitude.replace(')','');
        latitude = latitude.replace(', ',' ');
        latitude = latitude.split(' ');
        this.latlng = new google.maps.LatLng(latitude[0], latitude[1]);
        this.mapOptions = {
            zoom: this.zooms[0],
            center: this.latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.element, this.mapOptions);
        
        // $('#map_val').val('POINT(-24.87 134.34)');
        this.coordinates = $$(this.options.coordinate_class);
        this.address = $$(this.options.address_class);
        this.coordinates.each(function(coordinate, index){
        	var lang = coordinate.value.replace('POINT (','').replace(')','').replace(', ',' ').split(' ');
        	if (lang[0]) {
        		latitude = lang
        	}
            var latlng = new google.maps.LatLng(latitude[0], latitude[1]);
            if(!this.options.multiple_markers){
                this.map.setCenter(latlng);
            }
            var pinColor = "FE7569";
            var image = new google.maps.MarkerImage(
                "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(35,35),
                new google.maps.Point(0,0),
                new google.maps.Point(17,28)
            );               

            var marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                draggable:true,
                icon: image
            }); 
            google.maps.event.addListener(marker, 'click', function(mouseEvent) {
                var infowindow = new google.maps.InfoWindow({
                    content: this.address[index].value,
                });
                infowindow.open(this.map, marker);
            }.bind(this));
            google.maps.event.addListener(marker, 'dragend', function(mouseEvent) {
            	$(coordinate_class).val('POINT ('+mouseEvent.latLng.lat()+' '+mouseEvent.latLng.lng()+')');
            	
            	geocoder.geocode({
					latLng: mouseEvent.latLng
				}, function(responses) {
					if (responses && responses.length > 0) {
						marker.formatted_address = responses[0].formatted_address;
						$(address_class).val(responses[0].formatted_address);
						$$('#address').set('text',responses[0].formatted_address);
					} else {
						marker.formatted_address = 'Cannot determine address at this location.';
					}
					$$('#current').set('text','Marker dropped: '+ marker.formatted_address);
					// var infowindow = new google.maps.InfoWindow({
	    //                 content: marker.formatted_address,
	    //             });
					// infowindow.open(this.map, marker);
				});
            }.bind(this)); 
            google.maps.event.addListener(marker, 'dragstart', function(mouseEvent){
				$$('#current').set('text','Currently dragging marker...');
			}.bind(this));
        }.bind(this));         
        google.maps.event.addListener(this.map, 'zoom_changed', function(mouseEvent) {
            this.zoom_level.set('value',this.map.getZoom());
        }.bind(this));          
    }, 
    resizeMap: function() {
    	google.maps.event.trigger(this.map, 'resize'); 
    },    
});*/
var CamelotSlider = new Class({
	Implements: [Options],
    options:{
        container: '.slide_container',
        slider: '.slider',
        start_margin: 250,
        slide_width: 1088,
        activeOptions : {
            'transition' : 'linear',
            'duration' : 1000
        },
        slideOptions: {   
            'transition' : 'linear', 
            'duration' : 1000,
            //'link': 'cancel'
        }
    },
    initialize: function(element) {
    	
    	this.margin_interval = this.options.slide_width - this.options.start_margin
        this.current_margin = 0 - this.options.start_margin;
        this.slider = $$(this.options.slider)[0];
        this.slider.setStyle('margin-left', this.current_margin);
        this.start_margin = this.current_margin;
        this.slides = this.slider.getElements('.slide');
        this.slider_width = this.options.slide_width * this.slides.length;
        this.slider.setStyle('width', this.slider_width);
        this.effects= new Fx.Tween(this.slider, {
		    duration: 'long',
		    transition: 'linear',
		    link: 'cancel',
		    property: 'margin-left'
		});
        console.log(this.effects, this.slider);
    	/*this.effects.addEvent('complete', function() {
            if (!this.clicked) {
                this.timer = this.autoSlide.delay(this.options.delay, this);            
            }
        }.bind(this));*/
        this.forward_transition.delay(1000, this);
    },
    forward_transition: function() {
    	console.log("transition", this.current_margin, this.slider_width, this.margin_interval);
        var effect = {};
        if(Math.abs(this.current_margin) >= this.slider_width) {
        	console.log('moving to backward', Math.abs(this.current_margin), this.current_margin);
        	this.new_margin = this.current_margin;
        	this.backward_transition.delay(5000, this);
        } else {
        	var new_margin = parseInt(this.current_margin) - parseInt(this.margin_interval);
        }
        flag = 0
        /*if(clicked) {
            flag = (this.currentIndex > this.nextIndex) ? 1 : 0;
            // this.effects.cancel();
        } */
        //this.slider.tween('margin-left', this.current_margin, new_margin);
        /*if (flag==0){
            effect[this.currentIndex] = {'margin-left': [this.current_margin, new_margin]};
        } else {
            effect[this.currentIndex] = {'margin-left': [this.current_margin, new_margin]};
        }*/
        this.effects.start(this.current_margin, new_margin);
        this.current_margin = new_margin;
        this.forward_transition.delay(5000, this);
    },
    backward_transition: function() {
    	this.current_margin = this.new_margin;
    	console.log("adding", this.current_margin, this.start_margin);
        var new_margin = parseInt(this.current_margin) + parseInt(this.margin_interval);
                console.log(this.current_margin, new_margin);

        if(this.current_margin <= this.start_margin){
        	this.forward_transition.delay(5000, this);
        }
        
        this.effects.start(this.current_margin, new_margin);
        this.current_margin = new_margin;
        this.backward_transition.delay(5000, this);
    }, 
    autoSlide: function() {
        this.currentImage = this.slides[this.currentIndex];
        /*this.controls[this.currentIndex].addClass('active');*/
        this.nextIndex = (this.currentIndex<this.slides.length-1)? (this.currentIndex+1): 0;
        this.nextImage = this.slides[this.nextIndex];
        /*this.nextImage.addClass('active');*/
        this.transition(this.currentImage, this.nextImage, false);        
    },
    slideOnClick: function(index) {
        this.reset();
        this.timer = $clear(this.timer);
        this.nextIndex = index;
        this.currentImage = this.slides[this.currentIndex];
        this.nextImage = this.slides[this.nextIndex];
        /*this.currentImage.removeClass('active');
        this.nextImage.addClass('active');*/
        this.transition(this.currentImage,this.nextImage,true);	
    },
    reset: function(){
        this.slides.each(function(image,index){
            if(index!=this.currentIndex) {
                image.setStyle('margin-left',this.options.minMargin);
            }           
        }.bind(this));
    }
});
window.addEvent('domready',function() {
	console.log("gfjgkjdkj");
	var myScroll = new Fx.SmoothScroll({
		duration: 200,
	},window);
    /*new CamelotSlider();*/
	if($$('.slide_container').length > 0){
		new Slider($$('.slide_container')[0]);
	}
	
});

