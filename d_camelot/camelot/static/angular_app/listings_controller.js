function SellerListingController($scope, $element, $http, $timeout, $location) {

    $scope.calendar = {
      time_slots: [],
    }
    $scope.profile_description = '';
    $scope.profile_details  = {
        'description': '',
        'location_coordinates': '',
        'location_address': '',
        'calendar': ''
    }
    // personal training 

    $scope.sample = "";
    $scope.sellerlistings = {}
    $scope.error_message_flag = false 
    $scope.correct_location = '';   
    
    $scope.description_mode = 'unique description';
    $scope.location_mode = 'unique location';
    $scope.unique_location_flag = true;

    // personal training end

    // boot camp
    $scope.sample = "";
    $scope.sellerlistings = {}

    // bootcamp end


    // nutrition plan 

    $scope.description_text_flag = true;
    
    $scope.nutrition_plans = {
        'title': '',
        'focus_on_plan': [],
        'description_mode': 'unique description',
        'descriptions': '',
        'need_to_know': '',
        'currency': 'select',
        'pricing_matrix': []
    }
    $scope.nutrition_plan_pricing_matrix = {
        price_matrix : [],
    }

    $scope.nutrition_plans_ready_to_download = {
        'content_of_plan': [],
        'title_of_listing': '',
        'title_of_plan': '',
        'focus_of_plan' : [],
        'no_of_weekly_meal_plan': '',
        'does_include_shopping_list': '',
        'cost_of_ingredients': '',
        'no_recipes': '',
        'need_to_know': '',
        'total_price': '',
        'currency': '',
    }

    // nutrition plan end

    // group workout 

    var google_map;
    $scope.group_workout_google_map = '';
    $scope.error_message_flag = false

    $scope.description_mode = 'unique description';
    $scope.location_mode = 'unique location';
    $scope.unique_location_flag = true;

    // end group workout

    /************************* Waivers and Policies Tab ***********************************************/

    $scope.waivers_policies = {
        'personal_training' : '',
        'boot_camp' : '',
        'fitness_program' : '',
        'nutrition_plan' : '',
        'online_mentoring' : '',
        'general_consent' : '',
        'fitness_assessment_consent' : '',
        'cancellation_policy' : '',
        'late_policy' : '',
    }
    $scope.is_valid = false;
    
    // Error flags

    $scope.error_flag_personal_training = false;
    $scope.error_flag_boot_camp = false;
    $scope.error_flag_fitness_program = false;
    $scope.error_flag_nutrition_plan = false;
    $scope.error_flag_online_mentoring = false;
    $scope.error_flag_fitness_assessment_consent = false;
    $scope.error_flag_general_consent = false;
    $scope.error_flag_cancellation_policy =  false;
    $scope.error_flag_late_policy =  false;

    // Progressing flags 

    $scope.personal_progressing_flag = false;
    $scope.boot_camp_progressing_flag = false;
    $scope.fitness_program_progressing_flag = false;
    $scope.nutrition_plan_progressing_flag = false;
    $scope.online_mentoring_progressing_flag = false;
    $scope.general_consent_progressing_flag = false;
    $scope.fitness_assessment_consent_progressing_flag = false;
    $scope.cancellation_policy_progressing_flag = false;
    $scope.late_policy_progressing_flag = false;

    // Waivers and policy types 

    $scope.policy_type = '';
    $scope.consent_type = '';
    $scope.listing_type = '';

    // Error messages 

    $scope.error_message_personal_training = '';
    $scope.error_message_boot_camp = '';
    $scope.error_message_fitness_program = '';
    $scope.error_message_nutrition_plan = '';
    $scope.error_message_online_mentoring = '';
    $scope.error_message_general_consent = '';
    $scope.error_message_fitness_assessment_consent = '';
    $scope.error_message_cancellation_policy = '';
    $scope.error_message_late_policy = '';


    /************************* Waivers and Policies Tab End ***********************************************/


    $scope.init = function(csrf_token, user_id, user_type, user_slug) {

        // personal training

        $scope.csrf_token = csrf_token;
        $scope.user_type = user_type;
        $scope.user_slug = user_slug;        
        $scope.get_pricing_matrix('personal_training');  
        $scope.personal_training_tab = new TabView({
            tabs: '.one_on_one_personal_training_tab',
            tab_header: '.one_on_one_personal_training_tab_header',         
        });

        $scope.get_listings();

        $scope.button_create = true;
        new SimpleMap({
            zoom_class: '',
            multiple_markers: false
        }); 

        // end personal training

        // bootcamp

        $scope.bootcamps_tab = new TabView({
            tabs: '.bootcamps_tab',
            tab_header: '.bootcamps_tab_header',         
        });
        $scope.get_pricing_matrix('boot_camp'); 
       
       // end bootcamp

        // group workout 

        $scope.group_workout_google_map = new SimpleMap({
            map_canvas: '#map-canvas-group_workout',
            zoom_class: '',
            multiple_markers: false,
            coordinate_class: '#map_val_group_workout',
            address_class: '#address_val_group_workout'
        });

        $scope.get_pricing_matrix('group_workout');
         
        $scope.group_workout_tab = new TabView({
            tabs: '.group_workout_tab',
            tab_header: '.group_workout_tab_header',         
        });
        
        $scope.get_group_workout_listings();
        $scope.button_create = true;


        // group workout end

        // nutrition plans

        $scope.get_personal_training_expertises();
        $scope.get_nutrition_plan_pricing_matrix();
        $scope.get_nutrition_tags();

        // end nutrition plans

        $scope.get_waivers_policies();
        // common js methods :- remove this comment after integration
        $scope.get_profile_details();

    }



    $scope.get_listings = function(){
        
        $http({
            method : 'get',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/personal_training/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            // $scope.sellerlistings = angular.fromJson(data.listings);            
            $scope.seller_personal_training_listings = angular.fromJson(data.listings);                      
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        }); 

        // bootcamp

        $http({
            method : 'get',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/boot_camp/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.seller_boot_camp_listings = angular.fromJson(data.listings);            
                      
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        }); 

    }

    $scope.get_profile_details = function(){
        params = {
            'csrfmiddlewaretoken': $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile_details/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.profile_details  = angular.fromJson(data.userprofile);
            $scope.profile_description = $scope.profile_details.description;
                         
        }).error(function(data, success){
            
        });
    }

    $scope.seller_group_workout_map = function(){
        
        console.log('in js method'+$scope.group_workout_google_map.map.center);
        var latlng = new google.maps.LatLng(-27.87, 134.34);
        $scope.group_workout_google_map.map.setCenter(latlng);
    
    }

    // Personal training tab Angular methods


    $scope.calendar = {
      time_slots: [],
    }
    $scope.get_calendar = function(){
      var times = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', 'Noon', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'];
      var days = ['SUN', 'MON', 'TEU', 'WED', 'THU', 'FRI', 'SAT'];
      for(var i=0; i<times.length; i++){
        var t = {
          'time': times[i],
          'days': [],
        }
        for(var j=0; j<days.length; j++){
          t.days.push({
            'day': days[j],
            'face_to_face': false,
            'booked': false,
            'boot_camps': false,
            'online_mentoring': false,
          })
        }
        $scope.calendar.time_slots.push(t);
      }
    }
    $scope.personal_training_pricing_matrix = {
        price_matrix : [],
    }

    $scope.save_personal_training = function(mode_of_saving){   

        $scope.geo_location = $('#map_val').val();
        if ($scope.correct_location == '' || $scope.correct_location == undefined) {
            $scope.correct_location = $('#address_val').val();
        }
        $scope.location_address = $('#address_val').val();
           
        params = {             
            "description_mode" : $scope.description_mode,
            "description" : $scope.description_text,
            "need_to_know" : $scope.need_to_know,
            "location_mode" : $scope.location_mode,
            "geo_code" : $scope.geo_location,
            "location" : $scope.correct_location,
            "pricing_matrix_currency" : $scope.price_matrix_currency,            
            "pricing_matrix" : angular.toJson($scope.pricing_matrix),
            "mode_of_saving" : mode_of_saving,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/personal_training/savefornow/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {  

            $scope.sellerlistings = angular.fromJson(data.listings);            
                         
        }).error(function(data, success){
            
        });
    }
    $scope.description_updation = function(){
        var value = $scope.description_mode
        if (value == 'profile description'){
                    
            $scope.description_text = $scope.profile_description;
        }
        else if(value == 'unique description'){
            $scope.description_text = '';
        }
    }
    $scope.location_updation = function(){
        var value = $scope.location_mode
        if (value == 'profile location'){
            $scope.unique_location_flag = false;    

            $('#map_val').val($scope.profile_details.location_coordinates);
            $('#address_val').val($scope.profile_details.location_address);
            $scope.correct_location = $scope.profile_details.location_address;

        }
        else if(value == 'unique location'){

            $scope.unique_location_flag = true;
            $('#map_val').val('');
            $('#address_val').val('');
            $scope.correct_location = '';
        }
    }

    $scope.create_or_edit = function(value,listing){        
        if (value=='create'){   
            console.log("create new");
            $scope.button_create = true;
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
            $scope.personal_training_tab.change_tab(2); 

        }  
        else if(value == 'edit'){            
            
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);            
            $scope.button_create = false;
            $scope.no_of_session_former = listing.no_of_sessions;
            $scope.length_of_session_former = listing.length_of_session;
            $scope.price_matrix_currency = listing.currency;
            $scope.price = listing.price;
            $scope.no_of_session = listing.no_of_sessions;
            $scope.length_of_session = listing.length_of_session;            
            $scope.personal_training_tab.change_tab(2);
            $scope.mode_of_editing = value; 
        }   
        else if(value == 'quick_list'){

            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);            
            $scope.button_create = false;
            $scope.no_of_session_former = listing.no_of_sessions;
            $scope.length_of_session_former = listing.length_of_session;
            $scope.price_matrix_currency = listing.currency;
            $scope.price = listing.price;
            $scope.no_of_session = listing.no_of_sessions;
            $scope.length_of_session = listing.length_of_session;            
            $scope.personal_training_tab.change_tab(2); 
            $scope.mode_of_editing = value;
            
        }     
    }
    $scope.edit_listing = function(){
        
        params = {             
            "price" : $scope.price,
            "no_of_session" : $scope.no_of_session,
            "length_of_session" : $scope.length_of_session,
            "pricing_matrix_currency" : $scope.price_matrix_currency,
            "number" : $scope.no_of_session_former, 
            "session" : $scope.length_of_session_former,
            "mode_of_editing" : $scope.mode_of_editing,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/personal_training/edit/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {   
            console.log("edited");
            $scope.personal_training_tab.change_tab(1);
            $scope.sellerlistings.listings[$scope.current_listing_index] =  angular.fromJson(data.listings)[0];             
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
            $scope.title_text = ''

        }).error(function(data, success){
            
        });

    }

    $scope.validate_newlisting_form = function(){
        if($scope.no_of_session == '' || $scope.no_of_session == undefined){
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select no of session';
            return false;
        }
        else if($scope.length_of_session == '' || $scope.length_of_session == undefined){
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select length of session';
            return false;
        }
        else if($scope.price_matrix_currency == '' || $scope.price_matrix_currency == undefined){
            
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select pricing matrix currency';
            return false;
        }
        else if($scope.price == '' || $scope.price == undefined){
            
            $scope.error_message_flag = true;
            $scope.error_message = 'Please enter price value for listing';
            return false;
        }
        else {
           
            return true;
        }
    }
    $scope.create_and_publish = function(save_mode){
        
        $scope.is_valid = $scope.validate_newlisting_form();
        if ($scope.is_valid){
                params = {             
                "price" : $scope.price,
                "no_of_session" : $scope.no_of_session,
                "length_of_session" : $scope.length_of_session,
                "pricing_matrix_currency" : $scope.price_matrix_currency, 
                "mode_of_saving" : save_mode,           
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/personal_training/create_and_publish/",
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log("Successfully created"); 
                console.log(data);
                if (data.result == 'ok')  {
                    $scope.sellerlistings.listings.unshift(angular.fromJson(data.listings)[0]); 
                    $scope.personal_training_tab.change_tab(1);
                    $scope.no_of_session = '';
                    $scope.length_of_session = '';
                    $scope.price = '';
                    $scope.price_matrix_currency = '';
                    $scope.title_text = '' 
                    $scope.error_message_flag = false
                }  
                else {
                    $scope.error_message_flag = true
                    $scope.error_message = data.listings[0]['error_message']
                    
                }
                       
            }).error(function(data, success){
                
            });
        }

    }
    $scope.show_sample_listing = function(){

        
        // $scope.get_pricing_matrix();  
        
        
        $scope.sample = 'sample goes here';
        $scope.price = $scope.pricing_matrix['price_matrix'][2]['sessions'][0]['price'];
        $scope.currency = $scope.price_matrix_currency;
        
        show_popup('show_sample_listing', $scope); 
    }

    $scope.get_geo_codes = function() {
        console.log("in get geo code");
        var address = $scope.correct_location.split(',');
        $scope.get_geocode($scope, address[0], address[1], address[2], address[3]);
    }

    $scope.get_geocode = function(address, city, state, zip){
        // console.log(address, city, state, zip);
        var geocoder = new google.maps.Geocoder(); 
        var country = 'Australia';     
        var add = address+', '+city+', '+state+', '+zip+', '+country;
        geocoder.geocode({'address': add}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latlng = results[0].geometry.location; 
                $scope.geo_location = 'POINT ('+latlng.lat()+" "+latlng.lng() +')'; 
                $('#map_val').val($scope.geo_location);
                // $scope.save_geo_code();    
            }         
        }.bind($scope)); 
    }


    // perosonal training end 

    // bootcamp
     $scope.boot_camp_pricing_matrix = {
        price_matrix : [],
    }

    $scope.load_edit_listing=function(){

            $scope.btn_view_listing=false;
            $scope.btn_save_now=true;
            $scope.btn_publish_changes=false;
            $scope.btn_update=false;
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
        }
    $scope.create_or_edit = function(value,listing){ 

        if (value=='create'){   
            $scope.btn_view_listing=false;
            $scope.btn_save_now=true;
            $scope.btn_publish_changes=false;
            $scope.btn_update=false;
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
            $scope.bootcamps_tab.change_tab(2);
        }  
        else if(value == 'edit'){            
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);       
            $scope.btn_view_listing=false;
            $scope.btn_save_now=false;
            $scope.btn_publish_changes=false;
            $scope.btn_update=true;
            $scope.view_data(listing);
        }   
        else if(value == 'view'){
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);    
            $scope.btn_view_listing=false;
            $scope.btn_save_now=false;
            $scope.btn_publish_changes=false;
            $scope.btn_update=false;
            $scope.view_data(listing);
        }
        else if(value == 'quick_list'){
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);            
            $scope.btn_view_listing=false;
            $scope.btn_save_now=false;
            $scope.btn_publish_changes=true;
            $scope.btn_update=false;
            $scope.view_data(listing);
        }   
    }
    $scope.view_data=function(listing){

        $scope.no_of_session_former = listing.no_of_sessions;
        $scope.length_of_session_former = listing.length_of_session;
        $scope.price_matrix_currency = listing.currency;
        $scope.price = listing.price;
        $scope.no_of_session = listing.no_of_sessions;
        $scope.length_of_session = listing.length_of_session;            
        $scope.bootcamps_tab.change_tab(2);
        $scope.mode_of_editing = value;
    }
    $scope.create_and_publish = function(save_mode){

        params = {             
            "price" : $scope.price,
            "no_of_session" : $scope.no_of_session,
            "length_of_session" : $scope.length_of_session,
            "pricing_matrix_currency" : $scope.price_matrix_currency, 
            "mode_of_saving" : save_mode,           
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/boot_camp/create_and_publish/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            if (data.result == 'ok')  {
                $scope.sellerlistings.listings.unshift(angular.fromJson(data.listings)[0]); 
                $scope.bootcamps_tab.change_tab(1);
                $scope.no_of_session = '';
                $scope.length_of_session = '';
                $scope.price = '';
                $scope.price_matrix_currency = '';
                $scope.title_text = '' ;
                $scope.error_message_flag = false
            }  
            else {
                $scope.error_message_flag = true
                $scope.error_message = data.listings[0]['error_message']
                
            }
                   
        }).error(function(data, success){
            
        });

    }

    $scope.edit_listing = function(editing_mode){
        
        params = {             
            "price" : $scope.price,
            "no_of_session" : $scope.no_of_session,
            "length_of_session" : $scope.length_of_session,
            "pricing_matrix_currency" : $scope.price_matrix_currency,
            "number" : $scope.no_of_session_former, 
            "session" : $scope.length_of_session_former,
            "mode_of_editing" : editing_mode,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/boot_camp/edit/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {   
            $scope.bootcamps_tab.change_tab(1);
            $scope.sellerlistings.listings[$scope.current_listing_index] =  angular.fromJson(data.listings)[0];             
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
            $scope.title_text = ''

        }).error(function(data, success){
            
        });

    }

    $scope.description_updation = function(){
        var value = $scope.description_mode
        if (value == 'profile description'){
                
            $scope.description_text = $scope.profile_description;
            
        }
        else if(value == 'unique description'){
            $scope.description_text = '';
        }
    }
    $scope.save_boot_camp = function(){   
        console.log($scope.boot_camp_pricing_matrix);      
        params = {      
            "titleoflisting":$scope.title_of_listing,
            "length_of_pass" :$scope.length_of_pass,
            "gender_of_group":$scope.gender_of_group,
            "no_of_classes_per_week":$scope.no_of_class_per_week,
            "description_mode" : $scope.description_mode,
            "description" : $scope.description_text,
            "need_to_know" : $scope.need_to_know,
            "location_mode" : $scope.location_mode,
            "location_details" : $scope.location_val,
            "increase_the_amount_you_sell": $scope.increase_the_amount_you_sell,
            "pricing_matrix_currency" : $scope.price_matrix_currency,            
            "pricing_matrix" : angular.toJson($scope.pricing_matrix),
            "csrfmiddlewaretoken" : $scope.csrf_token,        
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/boot_camp/savefornow/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.sellerlistings = angular.fromJson(data.listings);
            $scope.title_of_listing ="";
            $scope.length_of_pass="";
            $scope.gender_of_group ="";
            $scope.no_of_class_per_week ="";
            $scope.description_mode ="";
            $scope.description_text ="";
            $scope.need_to_know ="";
            $scope.location_mode ="";
            $scope.location_val ="";
            $scope.increase_the_amount_you_sell ="";
            $scope.price_matrix_currency =""; 
        }).error(function(data, success){
            
        });
    }

    // bootcamp end  

    /************************* Group Workout Tab ***********************************************/

    $scope.group_workout_pricing_matrix = {
        price_matrix : [],
    }
    $scope.get_pricing_matrix = function(listing_type){

        if (listing_type == 'personal_training') {
            var no_of_people = ['1', '2', '3', '4', '5', '6', '7'];
            var session = ['30', '45', '60', '90'];
            for(var i=0; i<no_of_people.length; i++){
                var matrix = {
                    'no' : no_of_people[i],
                    'sessions' : [],
                }
            
                for(var j=0; j<session.length; j++){
                    matrix.sessions.push({
                        'session': session[j],
                        'price' : '',
                    })
                }
                $scope.personal_training_pricing_matrix.price_matrix.push(matrix);
            }
            console.log($scope.personal_training_pricing_matrix);
        } else if (listing_type == 'group_workout') {
            var no_of_people = ['1', '2', '3', '4', '5', '6', '7'];
            var session = ['30', '45', '60', '90'];
            for(var i=0; i<no_of_people.length; i++){
                var matrix = {
                    'no' : no_of_people[i],
                    'sessions' : [],
                }
            
                for(var j=0; j<session.length; j++){
                    matrix.sessions.push({
                        'session': session[j],
                        'price' : '',
                    })
                }
                $scope.group_workout_pricing_matrix.price_matrix.push(matrix);
            }
            console.log($scope.group_workout_pricing_matrix);
        } else if (listing_type == 'boot_camp') {

            var no_of_people = ['1', '2', '3', '4', '5', '6', '7'];
            var session = ['30', '45', '60', '90'];
            for(var i=0; i<no_of_people.length; i++){
                var matrix = {
                    'no' : no_of_people[i],
                    'sessions' : [],
                }
            
                for(var j=0; j<session.length; j++){
                    matrix.sessions.push({
                        'session': session[j],
                        'price' : '',
                    })
                }
                $scope.boot_camp_pricing_matrix.price_matrix.push(matrix);
            }
            console.log($scope.boot_camp_pricing_matrix);
        }
    }
    $scope.save_group_workouts = function(mode_of_saving){  
     
        $scope.geo_location = $('#map_val').val();
        if ($scope.correct_location == '' || $scope.correct_location == undefined) {
            $scope.correct_location = $('#address_val').val();
        }
        $scope.location_address = $('#address_val').val();

        params = { 
           
            "description_mode" : $scope.description_mode,
            "description" : $scope.description_text,
            "need_to_know" : $scope.need_to_know,
            "location_mode" : $scope.location_mode,
            "geo_code" : $scope.geo_location,
            "location" : $scope.correct_location,
            "pricing_matrix_currency" : $scope.price_matrix_currency,            
            "pricing_matrix" : angular.toJson($scope.pricing_matrix),
            "mode_of_saving" : mode_of_saving,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/group_workouts/savefornow/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully Saved");
            $scope.sellerlistings = angular.fromJson(data.listings);
                         
        }).error(function(data, success){
            
        });
    }

    $scope.create_or_edit = function(value,listing){        
        if (value=='create'){
            
            $scope.button_create = true;
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
            $scope.group_workout_tab.change_tab(2); 
        }  
        else if(value == 'edit'){
            console.log(listing);
            console.log("In edit");
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);
            $scope.button_create = false;
            $scope.no_of_session_former = listing.no_of_sessions;
            $scope.length_of_session_former = listing.length_of_session;
            $scope.price_matrix_currency = listing.currency;
            $scope.price = listing.price;
            $scope.no_of_session = listing.no_of_sessions;
            $scope.length_of_session = listing.length_of_session;
            $scope.mode_of_editing = value;
            // should set the values in boxes
            $scope.group_workout_tab.change_tab(2); 
        }  
        else if(value == 'quick_list'){
            console.log(listing);
            console.log("In quick_list");
            $scope.current_listing_index = $scope.sellerlistings.listings.indexOf(listing);
            $scope.button_create = false;
            $scope.no_of_session_former = listing.no_of_sessions;
            $scope.length_of_session_former = listing.length_of_session;
            $scope.price_matrix_currency = listing.currency;
            $scope.price = listing.price;
            $scope.no_of_session = listing.no_of_sessions;
            $scope.length_of_session = listing.length_of_session;
            $scope.mode_of_editing = value;
            // should set the values in boxes
            $scope.group_workout_tab.change_tab(2); 
        } 
    }

    $scope.edit_listing = function(){
        
        console.log("In edit");
        params = {             
            "price" : $scope.price,
            "no_of_session" : $scope.no_of_session,
            "length_of_session" : $scope.length_of_session,
            "pricing_matrix_currency" : $scope.price_matrix_currency,
            "number" : $scope.no_of_session_former, 
            "session" : $scope.length_of_session_former,
            "mode_of_editing" : $scope.mode_of_editing,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/group_workouts/edit/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully edited");            
            $scope.group_workout_tab.change_tab(1);
            $scope.sellerlistings.listings[$scope.current_listing_index] =  angular.fromJson(data.listings)[0];             
            $scope.no_of_session = '';
            $scope.length_of_session = '';
            $scope.price = '';
            $scope.price_matrix_currency = '';
                         
        }).error(function(data, success){
            
        });

    }

    $scope.validate_newlisting_form = function(){
        if($scope.no_of_session == '' || $scope.no_of_session == undefined){
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select no of session';
            return false;
        }
        else if($scope.length_of_session == '' || $scope.length_of_session == undefined){
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select length of session';
            return false;
        }
        else if($scope.price_matrix_currency == '' || $scope.price_matrix_currency == undefined){
            
            $scope.error_message_flag = true;
            $scope.error_message = 'Please select pricing matrix currency';
            return false;
        }
        else if($scope.price == '' || $scope.price == undefined){
            
            $scope.error_message_flag = true;
            $scope.error_message = 'Please enter price value for listing';
            return false;
        }
        else {
           
            return true;
        }
    }

    $scope.create_and_publish = function(save_mode){
        $scope.is_valid = $scope.validate_newlisting_form();
        if ($scope.is_valid){

            params = {             
                "price" : $scope.price,
                "no_of_session" : $scope.no_of_session,
                "length_of_session" : $scope.length_of_session,
                "pricing_matrix_currency" : $scope.price_matrix_currency,            
                "mode_of_saving" : save_mode,
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/group_workouts/create_and_publish/",
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log("Successfully created");
                if (data.result == 'ok')  {
                    $scope.sellerlistings.listings.unshift(angular.fromJson(data.listings)[0]); 
                    $scope.group_workout_tab.change_tab(1);
                    $scope.no_of_session = '';
                    $scope.length_of_session = '';
                    $scope.price = '';
                    $scope.price_matrix_currency = '';
                    $scope.error_message_flag = false

                }
                else{
                    $scope.error_message_flag = true
                    $scope.error_message = data.listings[0]['error_message']
                }

                             
            }).error(function(data, success){
                
            });
        }

    }
    $scope.get_group_workout_listings = function(){
        $http({
            method : 'get',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/group_workouts/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.sellerlistings = angular.fromJson(data.listings);            
            console.log($scope.sellerlistings);           
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        }); 
    }

    $scope.description_updation = function(){
        var value = $scope.description_mode
        if (value == 'profile description'){
            console.log("Successfully Fetched");                
            $scope.description_text = $scope.profile_description;
            
        }
        else if(value == 'unique description'){
            $scope.description_text = '';
        }
    }

    $scope.location_updation = function(){
        var value = $scope.location_mode
        if (value == 'profile location'){
            $scope.unique_location_flag = false;       

            $('#map_val_group_workout').val($scope.profile_details.location_coordinates);
            $('#address_val_group_workout').val($scope.profile_details.location_address);
            $scope.correct_location = $scope.profile_details.location_address;
            $scope.correct_location = data.address;
        }
        else if(value == 'unique location'){
            $scope.unique_location_flag = true;
            $('#map_val_group_workout').val('');
            $('#address_val_group_workout').val('');
            $scope.correct_location = '';
        }
    }

    $scope.show_sample_listing_groupworkout = function() {

        // $scope.get_pricing_matrix();  
        
        $scope.sample = 'sample goes here';
        $scope.price = $scope.pricing_matrix['price_matrix'][2]['sessions'][0]['price'];
        $scope.currency = $scope.price_matrix_currency;
        console.log($scope.price);
        console.log($scope.sample);
        console.log($scope.currency);
        show_popup('show_sample_listing_groupworkout', $scope); 
    }

    $scope.get_geo_codes = function() {
        console.log("in get geo code");
        var address = $scope.correct_location.split(',');
        $scope.get_geocode($scope, address[0], address[1], address[2], address[3]);
    }

    $scope.get_geocode = function(address, city, state, zip){
        // console.log(address, city, state, zip);
        var geocoder = new google.maps.Geocoder(); 
        var country = 'Australia';     
        var add = address+', '+city+', '+state+', '+zip+', '+country;
        geocoder.geocode({'address': add}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latlng = results[0].geometry.location; 
                $scope.geo_location = 'POINT ('+latlng.lat()+" "+latlng.lng() +')'; 
                $('#address_val_group_workout').val($scope.geo_location);
                // $scope.save_geo_code();    
            }         
        }.bind($scope)); 
    }

    /************************* Group Workout Tab End***********************************************/


    /************************* Nutrition Plan Tab ***********************************************/


     $scope.get_personal_training_expertises = function(){
        $http({
            method : 'get',
            url : "/personal_training_expertises/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.personal_training_expertises = data.personal_training_expertises;               
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
        
    }
    $scope.get_nutrition_plan_pricing_matrix = function(){
        var duration = ['1', '2', '3', '4', '5', '6'];
        console.log(duration.length);
        for(var i=0; i<duration.length; i++){
            var matrix = {
                'duration' : duration[i],
                'price' : '',
            }
            $scope.nutrition_plan_pricing_matrix.price_matrix.push(matrix);
        }
        console.log('hiii',$scope.nutrition_plan_pricing_matrix);
    }

    $scope.add_personal_training_expertise = function(title) {
        if($scope.nutrition_plans.focus_on_plan.indexOf(title) == -1){
            $scope.nutrition_plans.focus_on_plan.push(title);
        } else {
            var index = $scope.nutrition_plans.focus_on_plan.indexOf(title);
            $scope.nutrition_plans.focus_on_plan.splice(index, 1);
        } 
        
    }
    $scope.get_description = function(value) {

        if (value == 'profile description'){

            // $scope.description_text_flag = false;              
            $scope.nutrition_plans.descriptions = $scope.profile_description;

        } else {
            // $scope.description_text_flag = false;
            $scope.nutrition_plans.descriptions = '';
        }
    }
    $scope.nutrition_plan_save_for_now = function() {
        
        $scope.nutrition_plans.pricing_matrix = angular.toJson($scope.nutrition_plan_pricing_matrix.price_matrix);
        params = {
            "csrfmiddlewaretoken": $scope.csrf_token,
            'nutrition_plans': angular.toJson($scope.nutrition_plans),
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/nutrition_plans/custom_made_plan/save_for_now/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log('data === ', data);
        }).error(function(data, success){
            
        });
    }
    $scope.get_nutrition_tags = function() {
        $http({
            method : 'get',
            url : "/nutrition_tags/",

            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.nutrition_tags = data.nutrition_tags;               
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.add_nutrition_tag = function(title) {

        if($scope.nutrition_plans_ready_to_download.focus_of_plan.indexOf(title) == -1){
            $scope.nutrition_plans_ready_to_download.focus_of_plan.push(title);
        } else {
            var index = $scope.nutrition_plans_ready_to_download.focus_of_plan.indexOf(title);
            $scope.nutrition_plans_ready_to_download.focus_of_plan.splice(index, 1);
        } 
        
    }
    $scope.add_content_of_plan = function(title) {

        if($scope.nutrition_plans_ready_to_download.content_of_plan.indexOf(title) == -1){
            $scope.nutrition_plans_ready_to_download.content_of_plan.push(title);
        } else {
            var index = $scope.nutrition_plans_ready_to_download.content_of_plan.indexOf(title);
            $scope.nutrition_plans_ready_to_download.content_of_plan.splice(index, 1);
        } 
    }
    
    /************************* Nutrition Plan Tab End***********************************************/


    /************************* Waivers and Policies Tab ***********************************************/


    // Get the waivers, consent , policy data form the back-end

    $scope.get_waivers_policies = function() {
        $http({
            method : 'get',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/waivers_policies/",

            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.waivers_policies = angular.fromJson(data.waivers_policies);
                         
        }).error(function(data, status)
        {
            
        });
    }

    // Save Waivers content

    $scope.save_waivers = function(listing_type) {

        if (listing_type == 'personal_training') {
            if($scope.waivers_policies.personal_training == '' || $scope.waivers_policies.personal_training == undefined) {
                $scope.error_flag_personal_training = true;
                $scope.error_message_personal_training = 'General Personal Training cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.listing_type = listing_type;
                params = {             
                    "csrfmiddlewaretoken" : $scope.csrf_token,
                    'personal_training': $scope.waivers_policies.personal_training,
                }
                $scope.error_flag_personal_training = false;
                $scope.error_message_personal_training = '';
            }
            
        } else if (listing_type == 'boot_camp') {
            if ($scope.waivers_policies.boot_camp == '' || $scope.waivers_policies.boot_camp == undefined) {
               
                $scope.error_flag_boot_camp = true;
                $scope.error_message_boot_camp = 'Boot Camp cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.listing_type = listing_type;
                params = {             
                    "csrfmiddlewaretoken" : $scope.csrf_token,
                    'boot_camp': $scope.waivers_policies.boot_camp,
                } 
                $scope.error_flag_boot_camp = false;
                $scope.error_message_boot_camp = '';
            }
            
        } else if (listing_type == 'fitness_program') {
            if ($scope.waivers_policies.fitness_program =='' || $scope.waivers_policies.fitness_program == undefined) {
                
                $scope.error_flag_fitness_program = true;
                $scope.error_message_fitness_program = 'Fitness Program cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.listing_type = listing_type;
                params = {             
                    "csrfmiddlewaretoken" : $scope.csrf_token,
                    'fitness_program': $scope.waivers_policies.fitness_program,
                } 
                $scope.error_flag_fitness_program = false;
                $scope.error_message_fitness_program = '';
            }
                   
        } else if (listing_type == 'nutrition_plan') {
            if ($scope.waivers_policies.nutrition_plan == '' || $scope.waivers_policies.nutrition_plan == undefined) {
                
                $scope.error_flag_nutrition_plan = true;
                $scope.error_message_nutrition_plan = 'Nutrition Plan cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.listing_type = listing_type;
                params = {             
                    "csrfmiddlewaretoken" : $scope.csrf_token,
                    'nutrition_plan': $scope.waivers_policies.nutrition_plan,
                }
                $scope.error_flag_nutrition_plan = false;
                $scope.error_message_nutrition_plan = '';
            }
                
        } else if (listing_type == 'online_mentoring') {
            if($scope.waivers_policies.online_mentoring == '' || $scope.waivers_policies.online_mentoring == undefined) {
                
                $scope.error_flag_online_mentoring = true;
                $scope.error_message_online_mentoring = 'Online Mentoring cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.listing_type = listing_type;
                params = {             
                    "csrfmiddlewaretoken" : $scope.csrf_token,
                    'online_mentoring': $scope.waivers_policies.online_mentoring,
                }
                $scope.error_flag_online_mentoring = false;
                $scope.error_message_online_mentoring = '';
            }
                
        }

        if ($scope.is_valid) {
            if ($scope.listing_type == 'personal_training') {
                $scope.personal_progressing_flag = true;
            } else if($scope.listing_type == 'boot_camp') {
                $scope.boot_camp_progressing_flag = true;
            } else if($scope.listing_type == 'fitness_program') {
                $scope.fitness_program_progressing_flag = true;
            } else if($scope.listing_type == 'nutrition_plan') {
                $scope.nutrition_plan_progressing_flag = true;
            } else if($scope.listing_type == 'online_mentoring') {
                $scope.online_mentoring_progressing_flag = true;
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/waivers/edit/"+$scope.listing_type+'/',
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log("Successfully edited");
                $scope.get_waivers_policies();
                $scope.personal_progressing_flag = false;
                $scope.personal_progressing_flag = false;
                $scope.boot_camp_progressing_flag = false;
                $scope.fitness_program_progressing_flag = false;
                $scope.nutrition_plan_progressing_flag = false;
                $scope.online_mentoring_progressing_flag = false;
                             
            }).error(function(data, success){
                
            });
        }
        
    }

    // Save Consent forms 

    $scope.save_consent = function(consent_type) {

        if (consent_type == 'general_consent') {

            if ($scope.waivers_policies.general_consent == '' || $scope.waivers_policies.general_consent == undefined) {
                $scope.error_flag_general_consent = true;
                $scope.error_message_general_consent = 'General Consent cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.consent_type = consent_type;
                params = {
                    'csrfmiddlewaretoken': $scope.csrf_token,
                    'general_consent': $scope.waivers_policies.general_consent,
                }
                $scope.error_flag_general_consent = false;
                $scope.error_message_general_consent = '';
            }

        } else if (consent_type == 'fitness_assessment_consent') {

            if($scope.waivers_policies.fitness_assessment_consent == '' || $scope.waivers_policies.fitness_assessment_consent == undefined) {
                $scope.error_flag_fitness_assessment_consent = true;
                $scope.error_message_fitness_assessment_consent = 'Fitness Assessment Consent cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.is_valid = true;
                $scope.consent_type = consent_type;
                params = {
                    'csrfmiddlewaretoken': $scope.csrf_token,
                    'fitness_assessment_consent': $scope.waivers_policies.fitness_assessment_consent ,
                }
                $scope.error_flag_fitness_assessment_consent = false;
                $scope.error_message_fitness_assessment_consent = '';
                
            }
        }

        if ($scope.is_valid) {
            if ($scope.consent_type == 'general_consent') {
                $scope.general_consent_progressing_flag = true;
            } else if($scope.consent_type == 'fitness_assessment_consent') {
                $scope.fitness_assessment_consent_progressing_flag = true;
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/consent/edit/"+$scope.consent_type+'/',
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log("Successfully edited");
                $scope.get_waivers_policies();
                $scope.general_consent_progressing_flag = false;
                $scope.fitness_assessment_consent_progressing_flag = false;
                             
            }).error(function(data, success){
                
            });
        }
    }

    // Save policies

    $scope.save_policy = function(policy_type) {

        if(policy_type == 'cancel') {

            if ($scope.waivers_policies.cancellation_policy == '' || $scope.waivers_policies.cancellation_policy == undefined) {
                $scope.error_flag_cancellation_policy =  true;
                $scope.error_message_cancellation_policy = 'Cancellation policy cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.policy_type = policy_type;
                $scope.error_flag_cancellation_policy =  false;
                $scope.error_message_cancellation_policy = '';
                $scope.is_valid = true;
                params = {
                    'cancellation_policy' : $scope.waivers_policies.cancellation_policy,
                    'csrfmiddlewaretoken': $scope.csrf_token,
                }
            }
        } else if (policy_type == 'late') {
            if($scope.waivers_policies.late_policy == '' || $scope.waivers_policies.late_policy == undefined) {
                $scope.error_flag_late_policy = true;
                $scope.error_message_late_policy = 'Late policy cannot be null';
                $scope.is_valid = false;
            } else {
                $scope.policy_type = policy_type;
                $scope.error_flag_late_policy =  false;
                $scope.error_message_late_policy = '';
                $scope.is_valid = true;
                params = {
                    'late_policy' : $scope.waivers_policies.late_policy,
                    'csrfmiddlewaretoken': $scope.csrf_token,
                }
            }
        }
        if($scope.is_valid) {
            if ($scope.policy_type == 'cancel') {
                $scope.cancellation_policy_progressing_flag = true;
            } else if ($scope.policy_type == 'late') {
                $scope.late_policy_progressing_flag = true;
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/policy/edit/"+$scope.policy_type+'/',
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log("Successfully edited");
                $scope.cancellation_policy_progressing_flag = false;
                $scope.late_policy_progressing_flag = false;
                             
            }).error(function(data, success){
                
            });
        }
    }
    /************************* Waivers and Policies Tab End***********************************************/


}

// function FitnessProgramListingController($scope, $element, $http, $timeout, share, $location){
//     $scope.product_pdf = {};
//     $scope.product_pdf.src = "";
// 	$scope.init = function(csrf_token, user_id, user_type, user_slug)
//     {
//     	$scope.csrf_token = csrf_token;
//         $scope.user_type = user_type;
//         $scope.user_slug = user_slug;
//     	$scope.fitness = {
//             'title_info': '',
//             'title_explanation': '',
//             'client_goal': '',
//             'client_goal_explanation': '',
//             'area_of_focus': '',
//             'fitness_level': '',
//             'fitness_level_explanation': '',
//             'program_duration': '',
//             'duration_explanation': '',
//             'location_mode': '',
//             'location': '',
//             'description': '',
//             'need_to_know': '',
//             'total_price': '',
//             'pricing_currency': '',
//             'pricing_description': '',
//             'upload_doccument_description': '',
//             'product_description': '',
//             'amount_sell': '',
//             // 'product_pdf.src':'',
        
//         }
//         $scope.get_personal_training_expertises();
        
//     }

//     $scope.save_fitness_info = function(){
//         var file = $scope.product_pdf.src;
//         // alert("not pdf")
//         if(file.type != 'application/pdf'){
//             alert("not pdf")
//         }
//         else{
//             params = {
//                 'fitness':angular.toJson($scope.fitness),
//                 "csrfmiddlewaretoken" : $scope.csrf_token,
//             }
//             console.log($scope.fitness);
//             var fd = new FormData();
//             fd.append('product_pdf', $scope.product_pdf.src);
//             for(var key in params){
//               fd.append(key, params[key]);
//             }
//              var url = "/"+$scope.user_type+"/"+$scope.user_slug+"/listings/fitness-program/savefornow/";
//              $http.post(url, fd, {
//                 transformRequest: angular.identity,
//                 headers: {'Content-Type': undefined}
                
//             }).success(function(data, status)
//           {
//                 console.log("Successfully Saved");
        
//           }).error(function(data, status)
//           {
//               alert(status);
//           });
//         }
//     }
//     $scope.get_personal_training_expertises = function(){
//         $http({
//             method : 'get',
//             url : "/personal_training_expertises/",

//             headers : {
//              'Content-Type' : 'application/x-www-form-urlencoded'
//             }
//         }).success(function(data, status)
//         {
//             $scope.personal_training_expertises = data.personal_training_expertises;               
//         }).error(function(data, status)
//         {
//             $scope.error_message = data.message;
//             $scope.error_flag = true;
//         });
        
//     }

//     document.querySelector('#fileSelect').addEventListener('click', function(e) {
//     document.querySelector('#fileElem').click();
//     }, false);
// // MY Text NEED TO BE CHECKED
//     // $scope.file_upload = function(name){
//     //   var extention;
//     //   $scope.$watch(name, function(newValue, oldValue) { 
//     //       if(name == 'product_pdf.src') {
//     //         var file = $scope.product_pdf.src;
//     //         alert(file.type)
//     //         extention = file.name.split('.');
//     //       }
//     //       if(extention[1] == 'pdf'){
//     //         alert();
//     //         var fd = new FormData();
//     //         fd.append('file', file);
//     //         fd.append("csrfmiddlewaretoken" , $scope.csrf_token)
//     //         $http.post('/file_upload_pdf/', fd, {
//     //             transformRequest: angular.identity,
//     //             headers: {'Content-Type': undefined}
//     //         }).success(function(data) {
//     //           alert("ok");
//     //         })
//     //         .error(function(){
//     //             alert("not ok");
//     //         });
//     //       } else {
//     //         alert("not a pdf file");
//     //       }         
//     //   });
//     // }
      

// }
