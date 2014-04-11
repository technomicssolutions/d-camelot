function ProfileEditController($scope, $element, $http, $timeout, share, $location)
{
    $scope.geo_location = "";
    $scope.progressing_flag = false;
    $scope.mobile_is_verified = false;
    $scope.verified_mobile_no = false;
    $scope.errors = false; 
    $scope.verify_client = false;
    $scope.client_verify_flag= false; 
    $scope.saved_client_details_flag = false;
    $scope.not_verified_email = false;  
    $scope.verified_email = false;
    $scope.email_verify = false; 
    $scope.sucess_sent_email = false;
    $scope.location_flag = false; 
    $scope.error_locaton_flag = false;
    $scope.year = [];
    $scope.single_image = {};
    $scope.single_image.src = "";
    $scope.before_photo = {};
    $scope.before_photo.src = "";
    $scope.after_photo = {};
    $scope.after_photo.src = "";
    $scope.profile_pic = {};
    $scope.profile_pic.src = "";
    $scope.more_pic = {};
    $scope.more_pic.src = "";
    $scope.face_to_face_calendar = true;
    $scope.booked_calendar = false;
    $scope.boot_camps_calendar = false;
    $scope.online_mentoring_calendar = false;
    $scope.media_type = '';

    var input = document.id('drg_file');
    var list = document.id('droplist');
    var drop = document.id('droppable');

    var more_photos_input = document.id('drg_files');
    var more_photos_list = document.id('droplists');
    var more_photos_drop = document.id('droppables');

    $scope.save_profile_pic = function(){
        
        var file = $scope.inputFiles.getFiles()[0];
        if(file) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append("csrfmiddlewaretoken" , $scope.csrf_token)
            var url = "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/save_profile_pic/";
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function(data) {
                $scope.userprofile.profile_pic = data.image_path;            
                console.log("Successfully Saved");
            });
        } else {
            var snap = document.getElementById('hidden_snap');
            var params = {
                'snap': snap.value,
                "csrfmiddlewaretoken" : $scope.csrf_token
            }            
            if(snap) {
                $http({
                    method : 'post',
                    url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/save_profile_pic/",
                    data : $.param(params),
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).success(function(data, status) {
                });
            }
        }
        
    }

    $scope.inputFiles = new Form.MultipleFileInput(input, list, drop, {
        onDragenter: drop.addClass.pass('hover', drop),
        onDragleave: drop.removeClass.pass('hover', drop),
        onDrop: function(){
            drop.removeClass.pass('hover', drop);
            
            $scope.upload_profile_pic();
        },
        onChange: function(){
        }
    });
    console.log("inputFiles", $scope.inputFiles);
    $scope.inputFiles = new Form.MultipleFileInput(more_photos_input, more_photos_list, more_photos_drop, {
        onDragenter: more_photos_drop.addClass.pass('hover', more_photos_drop),
        onDragleave: more_photos_drop.removeClass.pass('hover', more_photos_drop),
        onDrop: function(){
            more_photos_drop.removeClass.pass('hover', more_photos_drop);
            
            $scope.upload_profile_pic();
        },
        onChange: function(){
        }
    });
    $scope.upload_profile_pic = function(){
        
        var file = $scope.inputFiles.getFiles()[0];        
        var fd = new FormData();
        fd.append('file', file);
        fd.append("csrfmiddlewaretoken" , $scope.csrf_token)
        $http.post('/file_upload/', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).success(function(data) {
            $scope.userprofile.profile_pic = data.image_path;            

        });
    }
    for(var i=1930; i<=2000; i++){
      $scope.year.push(i);
    }
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
            'group_workout': false,
          })
        }
        $scope.calendar.time_slots.push(t);
      }
    }
    $scope.userprofile = {
        'first_name': '',
        'last_name': '',
        'gender': 'female',
        'dob_day': 'Day',
        'dob_month': 'Month',
        'dob_year': 'Year',
        'age': '',
        'country': 'select',
        'time_zone': 'select',
        'work_email': '',
        'mobile_code': '',
        'mobile_number': '',
        'body_weight': '',
        'body_fat': '',
        'body_type': '',
        'skype': '',
        'profession': 'select',
        'year_of_experience': '-5',
        'facilities': [],
        'quick_bio': '',
        'professional_description': '',
        'is_insured': 'true',
        'have_first_aid_cer': 'true',
        'have_cpr_cer': 'true',
        'language': 'select',
        'personal_training_expertises': [],
        'body_part_expertises': [],
        'qualifications': [],
        'achievements': [],
        'references':[],
        'reviews':[],
        'suburbs': [],
    }
    $scope.achievemet = '';
    $scope.new_qualification = false;
    $scope.client = {
        'first_name': '',
        'last_name': '',
        'gender': 'female',
        'dob_day': 'Day',
        'dob_month': 'Month',
        'dob_year': 'Year',
        'age': '',
        'country': 'select',
        'start_date_day': 'Day',
        'end_date_day': 'Day',
        'start_date_month': 'Month',
        'start_date_year': 'Year',
        'start_weight': 'select',
        'start_weight_unit': 'kg',
        'end_date_month': 'Month',
        'end_date_year': 'Year',
        'end_weight': 'select',
        'end_weight_unit': 'kg',
        'story_written_by': 'client',
        'story': '',
        'is_member': '',
        'single_image_path': ''
    }
    $scope.location_details = {
        'map_coordinates': '',
        'correct_location': '',
        'primary_suburb': 'select',
        'is_willing_to_travel': 'true',
        'how_far':'select',
        'list_of_suburbs': [],

    }
    $scope.list1 = 'select';
    $scope.list2 = 'select';
    $scope.list3 = 'select';
    $scope.list4 = 'select';
    $scope.list5 = 'select';
    
    $scope.init = function(csrf_token, user_id, user_slug, user_type)
    {
      $scope.csrf_token = csrf_token;
      $scope.user_id = user_id;
      $scope.client_tocken = '';
      $scope.user_slug = user_slug;
      $scope.user_type = user_type;
      $selected_timezones = [];
      get_countries($scope);
      get_time_zone($scope);
      get_languages($scope);
      console.log('calling get profile');
      $scope.get_profile();
      $scope.get_facilities_used();      
      $scope.get_qualifications();
      $scope.get_buyers();
      $scope.get_body_part_expertises();
      $scope.get_personal_training_expertises();
      $scope.file_upload('single_image.src');
      $scope.file_upload('before_photo.src');
      $scope.file_upload('after_photo.src');
      $scope.file_upload('profile_pic.src');
      $scope.file_upload('more_pic.src');
      $scope.get_calendar();
      $scope.disputereviewerror_flag = false;
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
                $scope.save_geo_code();    
            }         
        }.bind($scope)); 
    }
    $scope.save_geo_code = function(){
        $('#address_val').val($scope.correct_location);
        $('#map_val').val($scope.geo_location);
        var latitude = $scope.geo_location;
        var chartBase = 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569';
        new SimpleMap({
            zoom_class: '',
            multiple_markers: false,
        });
    }
    $scope.select_calendar = function(calendar){
      if(calendar == 'face_to_face'){
        $scope.face_to_face_calendar = true;
        $scope.booked_calendar = false;
        $scope.boot_camps_calendar = false;
        $scope.online_mentoring_calendar = false; 
        $scope.group_workout_calendar = false;       
      } else if(calendar == 'booked'){
        $scope.face_to_face_calendar = false;
        $scope.booked_calendar = true;
        $scope.boot_camps_calendar = false;
        $scope.online_mentoring_calendar = false;
        $scope.group_workout_calendar = false;        
      } else if(calendar == 'boot_camps'){
        $scope.face_to_face_calendar = false;
        $scope.booked_calendar = false;
        $scope.boot_camps_calendar = true;
        $scope.online_mentoring_calendar = false;
        $scope.group_workout_calendar = false;        
      } else if(calendar == 'online_mentoring'){
        $scope.face_to_face_calendar = false;
        $scope.booked_calendar = false;
        $scope.boot_camps_calendar = false;
        $scope.online_mentoring_calendar = true;
        $scope.group_workout_calendar = false;        
      } else if(calendar == 'group_workout'){
        $scope.face_to_face_calendar = false;
        $scope.booked_calendar = false;
        $scope.boot_camps_calendar = false;
        $scope.online_mentoring_calendar = false; 
        $scope.group_workout_calendar = true;        
      }
    }
    $scope.select_time_slot = function(time, day, element){
      if($scope.face_to_face_calendar){        
        element.face_to_face = !(element.face_to_face);
      } else if($scope.booked_calendar){
        element.booked = !(element.booked);
      } else if($scope.boot_camps_calendar){
        element.boot_camps = !(element.boot_camps);
      } else if($scope.online_mentoring_calendar){
        element.online_mentoring = !(element.online_mentoring);
      } else if($scope.group_workout_calendar){
        element.group_workout = !(element.group_workout);
      }
    }
    
    $scope.file_upload = function(name){
      $scope.$watch(name, function(newValue, oldValue) { 
          if(name == 'single_image.src') {
            var file = $scope.single_image.src;
          } else if (name == 'before_photo.src'){
            var file = $scope.before_photo.src;
          } else if (name == 'after_photo.src'){
            var file = $scope.after_photo.src;
          } else if(name == 'profile_pic.src'){
            var file = $scope.profile_pic.src;
            var image = new Image();
            var _URL = window.URL || window.webkitURL;
            image.onload = function(){
                console.log("image is loading");
              var width = parseInt(image.width);
              var height = parseInt(image.height);
              if(width != height){
                $scope.image_error = true;
                $scope.dimension_ok = false;                
                return false;
              } else {
                $scope.image_error = false;
                $scope.dimension_ok = true;
                console.log('dimension ok');
              }            
            };
          } else if(name == 'more_pic.src'){
            var file = $scope.more_pic.src;
            var image = new Image();
            var _URL = window.URL || window.webkitURL;
            image.onload = function(){
                console.log("image is loading");
              var width = parseInt(image.width);
              var height = parseInt(image.height);
              if(width != height){
                $scope.image_error = true;
                $scope.dimension_ok = false;                
                return false;
              } else {
                $scope.image_error = false;
                $scope.dimension_ok = true;
                console.log('dimension ok');
              }            
            };
          }
          if(file != ''){
            var fd = new FormData();
            fd.append('file', file);
            fd.append("csrfmiddlewaretoken" , $scope.csrf_token)
            $http.post('/file_upload/', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function(data) {
              if(name == 'single_image.src') {
                $scope.client.single_image_path = data.image_path;
              } else if(name == 'before_photo.src') {
                $scope.client.before_photo_path = data.image_path;
              } else if(name == 'after_photo.src') {
                $scope.client.after_photo_path = data.image_path;
              } else if(name == 'profile_pic.src') {
                $scope.userprofile.profile_pic = data.image_path;
                console.log('$scope.userprofile.profile_pic', $scope.userprofile.profile_pic);
              } else if(name == 'more_pic.src') {
                $scope.userprofile.pic = data.image_path;
                console.log('$scope.userprofile.profile_pic', $scope.userprofile.profile_pic);
              }
            })
            .error(function(){
            });
          }          
      });
    }
    $scope.get_facilities_used = function(){
        $http({
            method : 'get',
            url : "/facilities_used/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.facilities = data.facilities;               
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.get_qualifications = function(){
        $http({
            method : 'get',
            url : "/professional_qualifications/",

            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.qualifications = data.qualifications;                 
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.get_body_part_expertises = function(){
        $http({
            method : 'get',
            url : "/body_part_expertises/",

            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.body_part_expertises = data.body_part_expertises;               
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
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
    $scope.add_new_qualification = function(){
      if($scope.new_qualification){
        $scope.userprofile.qualifications.push($scope.qualification);
        $scope.qualifications.push({
          'title': $scope.qualification,
          'checked': true,
        });
        $scope.new_qualification = false;
        $scope.qualification = '';
      } else {
        $scope.new_qualification = true;
      }
    }
    $scope.get_profile = function(){
        $http({
            method : 'get',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log('data', data);
            $scope.userprofile = angular.fromJson(data.userprofile);
            $scope.select_time_zone(); 
            // if ($scope.userprofile.request_from) {
            //     if ($scope.userprofile.request_from.length > 0) {
            //         for(var i=0;i<$scope.userprofile.request_from.length;i++){
            //             $scope.request_from = $scope.userprofile.request_from[i].request_from_id
            //         }
            //     }
            // }           
            if ($scope.userprofile.facilities) {
                if ($scope.userprofile.facilities.length > 0) {
                    for(var i=0; i < $scope.userprofile.facilities.length; i++){
                        for(var j=0; j < $scope.facilities.length; j++){
                            if($scope.userprofile.facilities[i] == $scope.facilities[j].title){
                              $scope.facilities[j].checked = true;
                            }
                        }
                    }
                }
            } else {
                $scope.userprofile.facilities = [];
            }
            if ($scope.userprofile.qualifications) {
                if ($scope.userprofile.qualifications.length > 0) {
                    for(var i=0; i < $scope.userprofile.qualifications.length; i++){
                        for(var j=0; j < $scope.qualifications.length; j++){
                            if($scope.userprofile.qualifications[i] == $scope.qualifications[j].title){
                              $scope.qualifications[j].checked = true;
                            }
                        }
                    }
                }
            } else {
                $scope.userprofile.qualifications = [];
            }
            if ($scope.userprofile.achievements) {
                if($scope.userprofile.achievements.length < 7) { 
                  if($scope.userprofile.achievements.length == 0){
                    $scope.userprofile.achievements.push('', '', '');
                  } else if($scope.userprofile.achievements.length < 3){
                    $scope.userprofile.achievements.push('');
                  }

                }  
            } else {
                $scope.userprofile.achievements = [];
                $scope.userprofile.achievements.push('', '', '');                
            }
            if ($scope.userprofile.is_insured) {
                $scope.userprofile.is_insured = data.userprofile.is_insured.toString();
            }
            if ($scope.userprofile.have_first_aid_cer) {
                $scope.userprofile.have_first_aid_cer = data.userprofile.have_first_aid_cer.toString();
            }
            if ($scope.userprofile.have_cpr_cer) {
                $scope.userprofile.have_cpr_cer = data.userprofile.have_cpr_cer.toString(); 
            }
            if ($scope.userprofile.body_part_expertises) {
                if ($scope.userprofile.body_part_expertises.length > 0) {
                    for(var i=0; i < $scope.userprofile.body_part_expertises.length; i++){
                        for(var j=0; j < $scope.body_part_expertises.length; j++){
                            if($scope.userprofile.body_part_expertises[i] == $scope.body_part_expertises[j].title){
                              $scope.body_part_expertises[j].checked = true;
                            }
                        }
                    }
                }
            } else {
                $scope.userprofile.body_part_expertises = [];
            }
            if ($scope.userprofile.personal_training_expertises) {
                if ($scope.userprofile.personal_training_expertises.length > 0) {
                    for(var i=0; i < $scope.userprofile.personal_training_expertises.length; i++){
                        for(var j=0; j < $scope.personal_training_expertises.length; j++){
                            if($scope.userprofile.personal_training_expertises[i] == $scope.personal_training_expertises[j].title){
                              $scope.personal_training_expertises[j].checked = true;
                            }
                        }
                    }
                }
            } else {
                $scope.userprofile.personal_training_expertises = [];
            } 
            if (data.userprofile.email_verification){
                $scope.verified_email = true;

            } else {
                $scope.not_verified_email = true;
            } 
            if (data.userprofile.mobile_verification) {
                $scope.mobile_is_verified = true;
                $scope.verified_mobile_no = true;
            } else {
                $scope.mobile_is_verified = false;
                $scope.verified_mobile_no = false;
            }
            if($scope.userprofile.seller_calendar){
                $scope.calendar = $scope.userprofile.seller_calendar;
            } 
            if ($scope.userprofile.country == 'Australia' || $scope.userprofile.profession == 'Personal Trainer') {
                $scope.location_flag = true;
                for(i = 0; i < $scope.userprofile.location_details.length; i++) {
                    $scope.location_details = $scope.userprofile.location_details[i];
                    $('#map_val').val($scope.location_details.map_coordinates);
                    $('#address_val').val($scope.location_details.correct_location);
                    new SimpleMap({
                        zoom_class: '',
                        multiple_markers: false
                    }); 
                    if ($scope.userprofile.location_details[i]['is_willing_to_travel'] == 'false') {
                        $scope.location_details.how_far = 'select';
                        $scope.location_details.list1 = 'select';
                        $scope.location_details.list2 = 'select';
                        $scope.location_details.list3 = 'select';
                        $scope.location_details.list4 = 'select';
                        $scope.location_details.list5 = 'select';
                    }
                }
            } 

        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        }); 
    }
    $scope.add_facilities = function(title){
        if($scope.userprofile.facilities.indexOf(title) == -1){
            $scope.userprofile.facilities.push(title);
        } else {
            var index = $scope.userprofile.facilities.indexOf(title);
            $scope.userprofile.facilities.splice(index, 1);
        }
    };
    $scope.add_personal_training_expertise = function(title) {
        if($scope.userprofile.personal_training_expertises.indexOf(title) == -1){
            $scope.userprofile.personal_training_expertises.push(title);
        } else {
            var index = $scope.userprofile.personal_training_expertises.indexOf(title);
            $scope.userprofile.personal_training_expertises.splice(index, 1);
        } 
        
    }
    $scope.add_achievement = function(title) {
        if($scope.userprofile.achievements.indexOf(title) == -1){
            $scope.userprofile.achievements.push(title);
        } else {
            var index = $scope.userprofile.achievements.indexOf(title);
            $scope.userprofile.achievements.splice(index, 1);
        } 
    }
    $scope.add_body_part_expertise = function(title) {
        if($scope.userprofile.body_part_expertises.indexOf(title) == -1){
            $scope.userprofile.body_part_expertises.push(title);
        } else {
            var index = $scope.userprofile.body_part_expertises.indexOf(title);
            $scope.userprofile.body_part_expertises.splice(index, 1);
        } 
    }
    $scope.send_request = function(name){
      if(name == 'training_expertise'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '384px',
            'message_padding': '0px',
            'left': '28%',
            'top': '175px',
            'height': 200,
            'content_div': '#request_content'
        });
        var height = $(document).height();
        $scope.popup.set_overlay_height(height);
        $scope.popup.show_content();
      } else if (name == 'email_request') {
        $scope.email_request = new DialogueModelWindow({
            'dialogue_popup_width': '384px',
            'message_padding': '0px',
            'left': '28%',
            'top': '175px',
            'height': 200,
            'content_div': '#email_request_content'
        });
        var height = $(document).height();
        $scope.email_request.set_overlay_height(height);
        $scope.email_request.show_content();
      } else if (name == 'mobile_no_verification') {
        $scope.mobile_no_verify = new DialogueModelWindow({
            'dialogue_popup_width': '384px',
            'message_padding': '0px',
            'left': '28%',
            'top': '175px',
            'height': 200,
            'content_div': '#mobile_no_verification'
        });
        var height = $(document).height();
        $scope.mobile_no_verify.set_overlay_height(height);
        $scope.mobile_no_verify.show_content();
      }
    };
    
    $scope.add_qualification_to_userprofile = function(title){
        if($scope.userprofile.qualifications.indexOf(title) == -1){
            $scope.userprofile.qualifications.push(title);
        } else {
            var index = $scope.userprofile.qualifications.indexOf(title);
            $scope.userprofile.qualifications.splice(index, 1);
        }
    };
    $scope.add_new_achievements = function(){
      if($scope.userprofile.achievements.length < 7){
        $scope.userprofile.achievements.push(['']);
      }  

    }
    $scope.select_time_zone = function() {
        var country = $scope.userprofile.country;
        $scope.selected_timezones = $scope.time_zone[country];
    }
    $scope.calculate_age = function(){
        var date = new Date();
        var current_year = date.getFullYear(); 
        var age = current_year - parseInt($scope.userprofile.dob_year);
        $scope.userprofile.age = age;
    }
    $scope.calculate_client_age = function(){
        var date = new Date();
        var current_year = date.getFullYear(); 
        var age = current_year - parseInt($scope.client.dob_year);
        $scope.client.age = age;
    }
    $scope.get_buyers = function(){
        $http({
            method : 'get',
            url : "/buyers/",
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.buyers = data.buyers;
        });
    }
    $scope.fill_client_details = function(){
      console.log($scope.selected_client);
      var selected = $scope.selected_client;
      for(var i=0; i<$scope.buyers.length; i++){
        if($scope.buyers[i].first_name == selected){
          $scope.client.first_name = $scope.buyers[i].first_name;
          $scope.client.last_name = $scope.buyers[i].last_name;
          $scope.client.gender = $scope.buyers[i].gender;
          $scope.client.age = $scope.buyers[i].age;
          $scope.client.country = $scope.buyers[i].country;
          $scope.client.dob_day = $scope.buyers[i].dob_day;
          $scope.client.dob_month = $scope.buyers[i].dob_month;
          $scope.client.dob_year = $scope.buyers[i].dob_year;
        }
      }
    }  
    $scope.save_direct_deposit_payout = function(){
        params = { 
            "name_on_account" : $scope.name_on_account,
            "account_type" : $scope.account_type,          
            "routing_number": $scope.routing_number,
            "account_number" : $scope.account_number,
            "payout_method" : $scope.payout_method,
            "country" : $scope.payout_country,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/save_direct_deposit_payout/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.userprofile.payoutmethods.unshift(angular.fromJson(data.direct_payout)[0]); 
            $scope.second_window = false;
            $scope.third_window = false;
            $scope.fourth_window = false;
            $scope.fifth_window = false;             
            $scope.popup.hide_popup(); 

            $scope.payout_country = '';
            $scope.payout_method = '';
            $scope.paypal_email = '';
            $scope.payout_paypal_currency = '';
            $scope.name_on_account = '';
            $scope.account_type = '';
            $scope.routing_number = '';
            $scope.account_number = '';

        }).error(function(data, success){
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });

    }  
    $scope.paypal_email_edit_validation = function() {

        if($scope.paypal_edit_email == undefined || $scope.paypal_edit_email == ''){
            $scope.error_display = "Please Enter Email Associated With Your Existing Paypal Account";
            $scope.error_flag = true;
        }
        else if ($scope.payout_paypal_edit_currency == undefined || $scope.payout_paypal_edit_currency == ''){
            $scope.error_display = "Please Select Currency";
            $scope.error_flag = true;
        }
        else {
            $scope.edit_first_window = false; 
            $scope.edit_second_window = true;
            $scope.error_flag = false;
        }
    }
    $scope.paypal_email_validation = function(){
        if($scope.paypal_email == undefined || $scope.paypal_email == ''){
            $scope.error_display = "Please Enter Email Associated With Your Existing Paypal Account";
            $scope.error_flag = true;
        }
        else if ($scope.payout_paypal_currency == undefined || $scope.payout_paypal_currency == ''){
            $scope.error_display = "Please Select Currency";
            $scope.error_flag = true;
        }
        else {
            $scope.fourth_window=true; 
            $scope.third_window=false; 
            $scope.second_window=false; 
            $scope.first_window=false;
            $scope.error_flag = false;
        }
    }
    $scope.residence_selection = function(){
        
        if ($scope.payout_country == undefined || $scope.payout_country == ''|| $scope.payout_country == 'select') {            
            $scope.error_display = "Please Select A Country Of Residence";
            $scope.error_flag = true;
        }      
        else {
            $scope.second_window=true;
            $scope.error_flag = false;
        }
    } 
    $scope.edit_direct_deposit_payout_cancel = function () {
        $scope.edit_fifth_window = false;
        $scope.popup.hide_popup(); 
        $scope.payoutmethod.payout_manage_button = '';  

    }       
    $scope.edit_payout_cancel = function(){
        $scope.edit_first_window = false;
        $scope.edit_second_window = false;
        $scope.popup.hide_popup();
        $scope.payoutmethod.payout_manage_button = '';         
    }
    $scope.payout_popup_cancel = function(){                
        $scope.second_window = false;
        $scope.third_window = false;
        $scope.fourth_window = false;
        $scope.fifth_window = false;        
        $scope.popup.hide_popup();
        
        $scope.payout_country = '';
        $scope.payout_method = '';
        $scope.paypal_email = '';
        $scope.payout_paypal_currency = '';
        $scope.name_on_account = '';
        $scope.account_type = '';
        $scope.routing_number = '';
        $scope.account_number = '';

        
    }
    $scope.remove_payout_method = function(payoutmethod){        
        params = {
            'payout_id' : payoutmethod.payoutmethod_id,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/remove_paypal_payout_method/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully removed");
            payoutmethod.payout_manage_button = '';  
            var index = $scope.userprofile.payoutmethods.indexOf(payoutmethod); 
            $scope.userprofile.payoutmethods.splice(index,1);       
        }).error(function(data, success){
            
        });
    }
    $scope.make_default = function(payoutmethod){
                
        params = {
            "paypal_email" : payoutmethod.paypal_email,
            'payout_method' : payoutmethod.payout_method,
            'payout_currency' : payoutmethod.payout_currency,
            'payout_country' : payoutmethod.payout_country,
            'paypal_email' : payoutmethod.paypal_email,
            'payout_default' : payoutmethod.payout_default,
            'payout_id' : payoutmethod.payoutmethod_id,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/make_default_paypal_payout/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully defaulted");
            payoutmethod.payout_manage_button = '';  
            payoutmethod.is_default=true; 
            $scope.userprofile.payoutmethods = angular.fromJson(data.payouts);

        }).error(function(data, success){
            
        });

    }
    $scope.edit_directdeposit_payout = function() {

        params = {
            "paypal_name_on_account" : $scope.name_on_account_edit,
            "paypal_account_type" : $scope.account_type_edit,
            "paypal_routing_number" : $scope.routing_number_edit,
            "paypal_account_number" : $scope.account_number_edit,
            "payout_id" : $scope.payoutmethod.payoutmethod_id,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/edit_direct_deposit_payout/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully edited direct_payout");
            $scope.popup.hide_popup(); 
            $scope.payoutmethod.payout_manage_button = '';              
            $scope.payoutmethod = angular.fromJson(data.direct_payout)[0];  
            $scope.userprofile.payoutmethods[$scope.current_payoutmethod_index] =  angular.fromJson(data.direct_payout)[0];             
        }).error(function(data, success){
            
        });
    }
    $scope.edit_paypal_payout = function(){        

        params = { 
            "paypal_email" : $scope.paypal_edit_email,
            "currency" : $scope.payout_paypal_edit_currency,
            "former_paypal_email" : $scope.payoutmethod.paypal_email,
            "former_paypal_currency" : $scope.payoutmethod.payout_currency,
            'payout_id' : $scope.payoutmethod.payoutmethod_id,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/edit_paypal_payout/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("Successfully edited");
            $scope.popup.hide_popup(); 
            $scope.payoutmethod.payout_manage_button = '';              
            $scope.payoutmethod = angular.fromJson(data.paypal)[0];  
            $scope.userprofile.payoutmethods[$scope.current_payoutmethod_index] =  angular.fromJson(data.paypal)[0];             
        }).error(function(data, success){
            
        });

    }
    $scope.manage_payout_methods = function(payoutmethod){
        if (payoutmethod.payout_manage_button=='edit'){
            $scope.payoutmethod = payoutmethod;            
            $scope.current_payoutmethod_index = $scope.userprofile.payoutmethods.indexOf(payoutmethod);
            if (payoutmethod.payout_method == 'PayPal'){                
                $scope.edit_first_window = true;
                $scope.edit_second_window = false;   
                $scope.paypal_edit_email = payoutmethod.paypal_email;
                $scope.payout_paypal_edit_currency = payoutmethod.payout_currency;       
                show_popup('paypal_payoutmethod_edit', $scope); 
            }
            else if(payoutmethod.payout_method == 'Direct Deposit'){                
                console.log("In else ");
                $scope.name_on_account_edit = payoutmethod.payout_name_on_ac;
                $scope.account_type_edit = payoutmethod.payout_ac_type;
                $scope.routing_number_edit = payoutmethod.payout_routing_number;
                $scope.account_number_edit = payoutmethod.payout_ac_no;
                $scope.edit_fifth_window = true;
                show_popup('directdeposit_payoutmethod_edit', $scope);
            }
            

        }
        else if(payoutmethod.payout_manage_button=='remove'){
            $scope.remove_payout_method(payoutmethod);
        }
        else if(payoutmethod.payout_manage_button=='default'){            
            $scope.make_default(payoutmethod);
        }
    }
    $scope.save_paypal_payout = function(){        
        
        params = { 
            "paypal_email" : $scope.paypal_email,
            "currency" : $scope.payout_paypal_currency,          
            "country": $scope.payout_country,
            "payout_method" : $scope.payout_method,
            "country" : $scope.payout_country,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/save_paypal_payout/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            $scope.userprofile.payoutmethods.unshift(angular.fromJson(data.paypal)[0]);             
            $scope.popup.hide_popup(); 

            $scope.payout_country = '';
            $scope.payout_method = '';
            $scope.paypal_email = '';
            $scope.payout_paypal_currency = '';
            $scope.name_on_account = '';
            $scope.account_type = '';
            $scope.routing_number = '';
            $scope.account_number = '';

        }).error(function(data, success){
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });

    }
    $scope.choose_payoutmethod = function(){
        $scope.error_flag = false; 
        $scope.payoutmethod = $scope.payout_method;
        
        if ($scope.payoutmethod == 'PayPal'){            
            $scope.third_window=true; 
            $scope.second_window=false;
        }
        else if ($scope.payoutmethod == 'Direct Deposit'){            
            $scope.fifth_window = true;
            $scope.second_window = false;
        }
        else {            
            $scope.error_display = "Please Select A Payoutmethod";
            $scope.error_flag = true;
        }
        
    }
    $scope.show_popup_payout_methods = function(name) {
        show_popup(name, $scope);
        $scope.second_window = false;
        $scope.third_window = false;
        $scope.fourth_window = false;
    }
    $scope.writereference = function(){
        params = {
            'reference_description': $scope.write_reference,
            'referred_about_id': $scope.request_from.request_from_id,
            'relationship' : $scope.reference_relationship,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/write_reference/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status) {
            console.log("success");
            $scope.request_from.is_written = true;
            $scope.popup.hide_popup();            
            $scope.userprofile.referencesbyme.unshift(angular.fromJson(data.reference)[0]);
            
        }).error(function(data, success){
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.show_popup_writereference = function(name, requestfrom) {
        
        $scope.request_from = requestfrom;        
        show_popup(name, $scope);
    }
    $scope.dispute_review = function(review){
        $scope.disputereviewerror_flag = false;
        params = {
            'reviewed_by' : review.review_clientname,
            'review_description' : review.review_description,
            'review_date' : review.review_date,
            'csrfmiddlewaretoken' : $scope.csrf_token,            
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/dispute_review/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data,status){            
            console.log("disputed_successfully");
            review.review_is_disputed = angular.fromJson(data.disputed);            
            console.log("MESSAGE :"+(data.message)); 
            
            if (data.message == ''||data.message == undefined){
                $scope.disputereviewerror_flag = false;
            }
            else {
                $scope.disputereviewerror_flag = true;
                $scope.error_msg_indisputereview = data.message;
            }         
            
        }).error(function(data, status) {                
                $scope.error_message = data.message;
                $scope.error_flag = true;
        });
    }
    $scope.reference_accept = function(reference){
        
        params ={
            'referred_by_id' : reference.referred_by_id,
            'reference_date' : reference.reference_date,
            'reference_desc' : reference.reference_description,
            "csrfmiddlewaretoken" : $scope.csrf_token,            
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/accept_reference/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data,status) {
            reference.reference_is_approved = angular.fromJson(data.accepted);
        }).error(function(data, status) {                
                $scope.error_message = data.message;
                $scope.error_flag = true;
        });
        
    }
    $scope.send_reference_request = function(){        
        $scope.reference_request_email = $scope.reference_request_email;        
        if ($scope.reference_request_email==''||$scope.reference_request_email == undefined){                    
            $scope.emailerror_flag = true;  
            $scope.error_msg = 'Enter an email id';        
        }
        else {
            $scope.emailerror_flag = false;
            params = {
                'reference_request_email': $scope.reference_request_email,                
                "csrfmiddlewaretoken" : $scope.csrf_token
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/reference_request_email/",
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                if (data.error_message == ''||data.error_message == undefined){
                    $scope.emailerror_flag = false;
                }
                else {
                    $scope.emailerror_flag = true;
                    $scope.error_msg = data.error_message;
                }
                $scope.email_verify = false;
                $scope.personal_progressing_flag = false;
                $scope.sent_email = true;
                $timeout(function() {
                    $scope.error_flag = false;
                    $scope.sent_email = false;
                }, 5000);     
            }).error(function(data, status)            {
                
                $scope.error_message = data.message;
                $scope.error_flag = true;
            });
        }
    }        
        
    $scope.work_email_verification = function() {
        $scope.work_email = $scope.userprofile.work_email;
        if ($scope.work_email == '' || $scope.work_email == undefined) {
            $scope.email_verify = true;

        } else {
            $scope.email_verify = false;
            params = {
                'work_email': $scope.work_email,
                "csrfmiddlewaretoken" : $scope.csrf_token
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/trust_and_verification/email/token/",
                data : $.param(params),
                headers : {
                 'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status)
            {
                $scope.email_verify = false;
                $scope.personal_progressing_flag = false;
                $scope.sent_email = true;
                $timeout(function() {
                    $scope.error_flag = false;
                    $scope.sent_email = false;
                }, 5000);     
            }).error(function(data, status)
            {
                // $scope.personal_progressing_flag = false;
                $scope.error_message = data.message;
                $scope.error_flag = true;
            });
        }
    }
    $scope.save_personal_details = function(){
        $scope.personal_progressing_flag = true;
        params = {
            'first_name': $scope.userprofile.first_name,
            'last_name': $scope.userprofile.last_name,
            'gender': $scope.userprofile.gender,
            'dob_day': $scope.userprofile.dob_day,
            'dob_month': $scope.userprofile.dob_month,
            'dob_year': $scope.userprofile.dob_year,
            'age': $scope.userprofile.age,
            'country': $scope.userprofile.country,
            'time_zone': $scope.userprofile.time_zone,
            'work_email': $scope.userprofile.work_email,
            'mobile_code': $scope.userprofile.mobile_code,
            'mobile_number': $scope.userprofile.mobile_number,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/personal_details/",
            data : $.param(params),
            headers : {
             'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
          $scope.personal_progressing_flag = false;
               
        }).error(function(data, status)
        {
            $scope.personal_progressing_flag = false;
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.verify_mobile_no = function(verification_type) {
        $scope.verification_type = verification_type;
        $scope.body_profile_progressing_flag = true;
        if ($scope.verification_type == 'sms') {
            $scope.media_type = 'mobile_sms';
        } else {
            $scope.media_type = 'mobile_call';
        }

        params = {
          'verification_type': $scope.verification_type,
          'media_type': $scope.media_type,
          "csrfmiddlewaretoken" : $scope.csrf_token
        }
        var url = "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/trust_and_verification/"+$scope.media_type+"/";
        $http({
          method : 'get',
          url : url,
          data : $.param(params),
          headers : {
           'Content-Type' : 'application/x-www-form-urlencoded'
          }
        }).success(function(data, status)
        {
            if (data.result == 'success') {
                $scope.send_request('mobile_no_verification');
            } else {
                $scope.message = data.message;
                $scope.errors = true; 
            }
            console.log('success');
        }).error(function(data, status)
        {
            console.log('error');
        });
    }
    $scope.check_mobile_verification_code = function () {
        params = {
          'verification_code': $scope.verification_code,
          'media_type': $scope.media_type,
          "csrfmiddlewaretoken" : $scope.csrf_token
        }
        var url = "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/trust_and_verification/"+$scope.media_type+"/";
        $http({
          method : 'post',
          url : url,
          data : $.param(params),
          headers : {
           'Content-Type' : 'application/x-www-form-urlencoded'
          }
        }).success(function(data, status)
        {
            console.log(data);
            console.log('success');
            $scope.mobile_no_verify.hide_popup();
            $scope.verified_mobile_no = true;
        }).error(function(data, status)
        {
            console.log('error');
        });
    }
    $scope.save_body_profile = function(){
      $scope.body_profile_progressing_flag = true;
      params = {
          'body_weight': $scope.userprofile.body_weight,
          'body_fat': $scope.userprofile.body_fat,
          'body_type': $scope.userprofile.body_type,
          "csrfmiddlewaretoken" : $scope.csrf_token
      }
      $http({
          method : 'post',
          url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/bodyprofile/",
          data : $.param(params),
          headers : {
           'Content-Type' : 'application/x-www-form-urlencoded'
          }
      }).success(function(data, status)
      {
            $scope.body_profile_progressing_flag = false;   
            if (data.email_verification){
                $scope.verified_email = true; 
            } else {
                $scope.not_verified_email = true;
            } 
      }).error(function(data, status)
      {
          $scope.body_profile_progressing_flag = false;
          $scope.error_message = data.message;
          $scope.error_flag = true;
      });
    }
    $scope.save_skype_id = function(){
      $scope.skypeid_progressing_flag = true;
      params = {
          'skype_id': $scope.userprofile.skype,
          "csrfmiddlewaretoken" : $scope.csrf_token
      }
      $http({
          method : 'post',
          url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/skype_id/",
          data : $.param(params),
          headers : {
           'Content-Type' : 'application/x-www-form-urlencoded'
          }
      }).success(function(data, status)
      {
          $scope.skypeid_progressing_flag = false;   
      }).error(function(data, status)
      {
          $scope.skypeid_progressing_flag = false;
          $scope.error_message = data.message;
          $scope.error_flag = true;
      });
    }
    $scope.save_calendar = function(){
      $scope.calendar_progressing_flag = true;
      params = {
          'calendar': angular.toJson($scope.calendar),
          "csrfmiddlewaretoken" : $scope.csrf_token
      }
      $http({
          method : 'post',
          url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/calendar/",
          data : $.param(params),
          headers : {
           'Content-Type' : 'application/x-www-form-urlencoded'
          }
      }).success(function(data, status)
      {
          $scope.calendar_progressing_flag = false;   
      }).error(function(data, status)
      {
          $scope.calendar_progressing_flag = false;
          $scope.error_message = data.message;
          $scope.error_flag = true;
      });
    }
    $scope.get_geo_codes = function() {
        var address = $scope.location_details.correct_location.split(',');
        $scope.get_geocode($scope, address[0], address[1], address[2], address[3]);
    }
    $scope.save_professional_details = function(){
        $scope.professional_progressing_flag = true;
        params = {
            'profession': $scope.userprofile.profession,
            'year_of_experience': $scope.userprofile.year_of_experience,
            'facilities': JSON.stringify($scope.userprofile.facilities),
            'quick_bio': $scope.userprofile.quick_bio,
            'professional_description': $scope.userprofile.professional_description,
            'is_insured': $scope.userprofile.is_insured,
            'have_first_aid_cer': $scope.userprofile.have_first_aid_cer,
            'have_cpr_cer': $scope.userprofile.have_cpr_cer,
            'language': $scope.userprofile.language,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/professional_details/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
                $scope.professional_progressing_flag = false;   
        }).error(function(data, status)
        {
            $scope.professi
            onal_progressing_flag = false;
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });      
    }
    $scope.send_training_expertise_request = function() {
        $scope.professional_progressing_flag = true;
        params = {
            'personal_training_expertise': $scope.personal_training_expertise,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/professional_details/send_training_expertise_request/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
            $scope.professional_progressing_flag = false;   
        }).error(function(data, status)
        {
            $scope.professional_progressing_flag = false;
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });
    }
    $scope.save_expertise = function(){
        $scope.professional_progressing_flag = true;
        
        params = {
            'qualifications': JSON.stringify($scope.userprofile.qualifications),
            'achievements': JSON.stringify($scope.userprofile.achievements),
            'personal_training_expertises': JSON.stringify($scope.userprofile.personal_training_expertises),
            'body_part_expertises': JSON.stringify($scope.userprofile.body_part_expertises),
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/professional_details/profile_edit_professional_expertise/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
                $scope.professional_progressing_flag = false;   
        }).error(function(data, status)
        {
            $scope.professional_progressing_flag = false;
            $scope.error_message = data.message;
            $scope.error_flag = true;
        });  
    }
    $scope.send_email_verification_request = function(){
      // $scope.professional_progressing_flag = true;
        params = {
            'client_email_id': $scope.client_email_id,
            'client_tocken': $scope.client_tocken,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'post',
            url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/client_tranformations/send_client_verification_request/",
            data : $.param(params),
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {
                // $scope.professional_progressing_flag = false;  
                $scope.error_flag = true;
                $scope.error_messages = 'Your Client Verification Request was Sent Successfully';
                $timeout(function() {
                    $scope.error_flag = false;
                    $scope.email_request.hide_popup();
                }, 5000);
                $scope.client.first_name = '';
                $scope.client.last_name = '';
                $scope.client.gender = 'female';
                $scope.client.dob_day = 'Day';
                $scope.client.dob_month = 'Month';
                $scope.client.dob_year = 'Year';
                $scope.client.age = '';
                $scope.client.country = 'select';
                $scope.client.start_date_day = 'Day';
                $scope.client.end_date_day = 'Day';
                $scope.client.start_date_month = 'Month';
                $scope.client.start_date_year = 'Year';
                $scope.client.start_weight = 'select';
                $scope.client.start_weight_unit = 'kg';
                $scope.client.end_date_month = 'Month';
                $scope.client.end_date_year = 'Year';
                $scope.client.end_weight = 'select';
                $scope.client.end_weight_unit = 'kg';
                $scope.client.story_written_by = 'client';
                $scope.client.story = '';
                $scope.client.after_photo_path = '';
                $scope.client.before_photo_path = '';
                $scope.client.single_image_path = '';
        }).error(function(data, status)
        {
            // $scope.professional_progressing_flag = false;
            $scope.error_messages = data.message;
            $scope.error_flag = true;
        }); 
    }
    $scope.preview = function(){
      document.location.href = '/'+$scope.user_type+'/'+$scope.user_slug+'/profile/';
    }
    $scope.client_verification = function(confirmation) {
        if (confirmation == 'yes') {
            $scope.verify_client = false;
            $scope.client_verify_flag = true;
        } else {
            $scope.verify_client = false;
            $scope.client = {
                'first_name': '',
                'last_name': '',
                'gender': 'female',
                'dob_day': 'Day',
                'dob_month': 'Month',
                'dob_year': 'Year',
                'age': '',
                'country': 'select',
                'start_date_day': 'Day',
                'end_date_day': 'Day',
                'start_date_month': 'Month',
                'start_date_year': 'Year',
                'start_weight': 'select',
                'start_weight_unit': 'kg',
                'end_date_month': 'Month',
                'end_date_year': 'Year',
                'end_weight': 'select',
                'end_weight_unit': 'kg',
                'story_written_by': 'client',
                'story': '',
                'after_photo_path' : '',
                'before_photo_path' :'',
                'single_image_path' :'',
            }
        }
    }
    $scope.client_details_date_validation = function(){ 
        if ($scope.client.dob_day == 'Day') {
            $scope.error_message = 'Please Choose the day in Birthday';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.dob_month == 'Month') {
            $scope.error_message = 'Please Choose the Month in Birthday';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.dob_year == 'Year') {
            $scope.error_message = 'Please Choose the Year in Birthday';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.start_date_day == 'Day') {
            $scope.error_message = 'Please Choose the Day in Start Date';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.start_date_month == 'Month') {
            $scope.error_message = 'Please Choose the Month in Start Date';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.start_date_year == 'Year') {
            $scope.error_message = 'Please Choose the Year in Start Date';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.end_date_day == 'Day') {
            $scope.error_message = 'Please Choose the Day in End Date';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.end_date_month == 'Month') {
            $scope.error_message = 'Please Choose the Month in End Date';
            $scope.error_flag = true;
            return false;
        } else if($scope.client.end_date_year == 'Year') {
            $scope.error_message = 'Please Choose the Year in End Date';
            $scope.error_flag = true;
            return false;
        } 
        return true;
    }
    $scope.save_client_transformation = function(flag) {
        is_valid = $scope.client_details_date_validation();
        params = {
            'first_name': $scope.client.first_name,
            'last_name': $scope.client.last_name,
            'gender': $scope.client.gender,
            'dob_day': $scope.client.dob_day,
            'dob_month': $scope.client.dob_month,
            'dob_year': $scope.client.dob_year,
            'age': $scope.client.age,
            'country': $scope.client.country,
            'start_date_day': $scope.client.start_date_day,
            'end_date_day': $scope.client.end_date_day,
            'start_date_month': $scope.client.start_date_month,
            'start_date_year': $scope.client.start_date_year,
            'start_weight': $scope.client.start_weight,
            'start_weight_unit': $scope.client.start_weight_unit,
            'end_date_month': $scope.client.end_date_month,
            'end_date_year': $scope.client.end_date_year,
            'end_weight': $scope.client.end_weight,
            'end_weight_unit': $scope.client.end_weight_unit,
            'story_written_by': $scope.client.story_written_by,
            'story': $scope.client.story,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        var fd = new FormData();
        fd.append('single_image', $scope.single_image.src);
        fd.append('before_photo', $scope.before_photo.src);
        fd.append('after_photo', $scope.after_photo.src);
        for(var key in params){
          fd.append(key, params[key]);
        }
        if(is_valid) {
            $scope.error_flag = false;
            $scope.professional_progressing_flag = true;    
            var url = "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/client_tranformations/";
            if(!$scope.saved_client_details_flag) {
                $http.post(url, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    
                }).success(function(data, status)
                {
                    $scope.saved_client_details_flag = true;
                    $scope.client_tocken = data.client_tocken;
                    $scope.personal_progressing_flag = false;
                    if(flag == 'add_another') {
                        $scope.verify_client = true;
                    } else {
                        $scope.client_verify_flag= true; 
                    }
                    $scope.message = 'Added the details';             
                }).error(function(data, status)
                {
                    $scope.personal_progressing_flag = false;
                    $scope.error_message = data.message;
                    $scope.error_flag = true;
                });
            } else {
                $scope.error_flag = true;
                $scope.error_message = 'Data is Already Saved';
                console.log('You are already saved this data');
            }
        }
    }
    $scope.get_list_of_suburbs = function() {
        if ($scope.list1 !='select') {
            $scope.location_details.list_of_suburbs.push($scope.list1);
        }
        if ($scope.list2 !='select') {
            $scope.location_details.list_of_suburbs.push($scope.list2);
        } 
        if ($scope.list3 !='select') {
            $scope.location_details.list_of_suburbs.push($scope.list3);
        }
        if ($scope.list4 !='select') {
            $scope.location_details.list_of_suburbs.push($scope.list4);
        }
        if ($scope.list5 !='select') {
            $scope.location_details.list_of_suburbs.push($scope.list5);
        }
    }
    $scope.location_details_validation = function() {
        if($scope.location_details.is_willing_to_travel) {
            $scope.get_list_of_suburbs();
            if ($scope.location_details.list_of_suburbs.length == 0 && $scope.location_details.how_far == 'select') {
                $scope.error_locaton_flag = true;
                $scope.error_message = 'Please answer any of the two questions above';
                return false;
            } else if ($scope.location_details.list_of_suburbs.length > 0 && $scope.location_details.how_far != 'select') {
                $scope.error_locaton_flag = true;
                $scope.error_message = 'Please answer only one of the two questions above';
                return false;
            } else if ($scope.location_details.list_of_suburbs.length < 5 && $scope.location_details.how_far == 'select') {
                $scope.error_locaton_flag = true;
                $scope.error_message = 'Please choose 5 suburbs';
                return false;
            }
            $scope.error_locaton_flag = false;
            return true;
        } 
    }
    $scope.save_location = function(){
        $scope.location_details.list_of_suburbs = [];
        $scope.is_valid = $scope.location_details_validation();
        $scope.geo_location = $('#map_val').val();
        if ($scope.location_details.correct_location == '' || $scope.location_details.correct_location == undefined) {
            $scope.location_details.correct_location = $('#address_val').val();
        }
        if ($scope.is_valid) {
            params = {
                'map_coordinates': $scope.geo_location,
                'address': $scope.location_details.correct_location, 
                'primary_suburb': $scope.location_details.primary_suburb,
                'is_willing_to_travel': $scope.location_details.is_willing_to_travel,
                'how_far_from_primary_suburb': $scope.location_details.how_far,
                'list_of_suburbs': JSON.stringify($scope.location_details.list_of_suburbs),
                "csrfmiddlewaretoken" : $scope.csrf_token
            }
            $http({
                method : 'post',
                url : "/"+$scope.user_type+"/"+$scope.user_slug+"/profile/edit/save_location/",
                data : $.param(params),
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status)
            {
                console.log('success');
            }).error(function(data, status)
            {
                console.log('error');
            });
        } else {
            $scope.location_details.list_of_suburbs = [];
        }
    }
    $scope.take_webcam_snap = function(){
        console.log($scope.snap_profile_pic);
    }
}