function validateEmail(email) { 
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function show_popup(name, $scope){
    if(name == 'login'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '384px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 525,
            'content_div': '#login_content'
        });
        var height = $(document).height();
        $scope.popup.set_overlay_height(height);
        $scope.popup.show_content();
    } else if(name == 'signup_email'){
        $scope.popup = new DialogueModelWindow({
          'dialogue_popup_width': '384px',
          'message_padding': '0px',
          'left': '28%',
          'top': '100px',
          'height': 460,
          'content_div': '#signup_email_container'
        });
        var height = $(document).height();
        $scope.popup.set_overlay_height(height);
        $scope.popup.show_content();
    } else if(name == 'signup'){
        $scope.popup = new DialogueModelWindow({
          'dialogue_popup_width': '384px',
          'message_padding': '0px',
          'left': '28%',
          'top': '100px',
          'height': 520,
          'content_div': '#signup_content'
        });
        var height = $(document).height();
        $scope.popup.set_overlay_height(height);
        $scope.popup.show_content();
    } else if(name == 'write_reference'){
        $scope.popup = new DialogueModelWindow({
          'dialogue_popup_width': '384px',
          'message_padding': '0px',
          'left': '28%',
          'top': '100px',
          'height': 370,
          'content_div': '#write_reference'
        });        
        var height = $(document).height();
        $scope.popup.set_overlay_height(height);
        $scope.popup.show_content();
    } else if(name == 'payout_methods'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '900px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 450,
            'content_div': '#payout_popup_container'
          });        
          var height = $(document).height();
          $scope.popup.set_overlay_height(height);
          $scope.popup.show_content();
    } else if(name == 'paypal_payoutmethod_edit'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '900px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 450,
            'content_div': '#payout_popup_edit_container'
          });        
          var height = $(document).height();
          $scope.popup.set_overlay_height(height);
          $scope.popup.show_content();
    } else if(name == 'directdeposit_payoutmethod_edit'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '900px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 450,
            'content_div': '#direct_method_popup_edit_container'
          });        
          var height = $(document).height();
          $scope.popup.set_overlay_height(height);
          $scope.popup.show_content();
    } else if(name == 'show_sample_listing'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '900px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 450,
            'content_div': '#show_sample_listing_container'
          });        
          var height = $(document).height();
          $scope.popup.set_overlay_height(height);
          $scope.popup.show_content();      
    } else if(name == 'show_sample_listing_groupworkout'){
        $scope.popup = new DialogueModelWindow({
            'dialogue_popup_width': '900px',
            'message_padding': '0px',
            'left': '28%',
            'top': '100px',
            'height': 450,
            'content_div': '#show_sample_listing_groupworkout_container'
          });        
          var height = $(document).height();
          $scope.popup.set_overlay_height(height);
          $scope.popup.show_content();
    }
}
function get_time_zone($scope){
  $scope.time_zone = 
  { 
    'France': [ 
      'UTC−10:00 — most of French Polynesia', 
      'UTC−09:30 — Marquesas Islands', 
      'UTC−09:00 — Gambier Islands', 
      'UTC−08:00 — Clipperton Island',
      'UTC−04:00 (AST) — Guadeloupe, Martinique, Saint Barthelemy, Saint Martin', 
      'UTC−03:00 (PMST) — French Guiana, Saint Pierre and Miquelon', 
      'UTC+01:00 (CET) — Metropolitan France', 
      'UTC+03:00 — Mayotte', 
      'UTC+04:00 — Réunion', 
      'UTC+05:00 — Kerguelen Islands', 
      'UTC+11:00 — New Caledonia', 
      'UTC+12:00 — Wallis and Futuna',
      ], 

    'United States': [
      'UTC−12:00 (unofficial) — Baker Island and Howland Island', 
      'UTC−11:00 (ST) — American Samoa, Jarvis Island, Kingman Reef, Midway Atoll and Palmyra Atoll', 
      'UTC−10:00 (HAT) — Hawaii, most of the Aleutian Islands, and Johnston Atoll', 
      'UTC−09:00 (AKT) — most of the state of Alaska', 
      'UTC−08:00 (PT) — the states on the Pacific coast plus Nevada and parts of Idaho', 
      'UTC−07:00 (MT) — Arizona, Colorado, Montana, New Mexico, Utah, parts of Idaho, Kansas, Oregon, North Dakota, South Dakota, and Texas',
      'UTC−06:00 (CT) — Gulf Coast, Tennessee Valley, U.S. Interior Highlands, Great Plains, and most of Texas', 
      'UTC−05:00 (ET) — the states on the Atlantic coast, the eastern two-thirds of the Ohio Valley, most of Michigan, Bajo Nuevo Bank, Navassa Island and Serranilla Bank',
      'UTC−04:00 (AT) — Puerto Rico, the U.S. Virgin Islands and Palmer Station',
      'UTC+10:00 (ChT) — Guam and the Northern Mariana Islands', 
      'UTC+12:00 (unofficial) — Wake Island, McMurdo Station, and Amundsen–Scott South Pole Station' 
      ],
    'American Samoa': [
      'UTC−11:00 (ST)',  
    ],

    'Russia': [
      'UTC+03:00 (Kaliningrad Time) — Kaliningrad Oblast',
      'UTC+04:00 (Moscow Time) — Most of European Russia and all railroads throughout Russia', 
      'UTC+06:00 (Yekaterinburg Time) — Bashkortostan, Chelyabinsk Oblast, Khanty–Mansia, Kurgan Oblast, Orenburg Oblast, Perm Krai, Sverdlovsk Oblast, Tyumen Oblast, and Yamalia', 
      'UTC+07:00 (Omsk Time) — Altai Krai, Altai Republic, Kemerovo Oblast, Novosibirsk Oblast, Omsk Oblast and Tomsk Oblast', 
      'UTC+08:00 (Krasnoyarsk Time) — Khakassia, Krasnoyarsk Krai and Tuva', 
      'UTC+09:00 (Irkutsk Time) — Buryatia and Irkutsk Oblast', 
      'UTC+10:00 (Yakutsk Time) — Amur Oblast, western Sakha Republic and Zabaykalsky Krai', 
      'UTC+11:00 (Vladivostok Time) — The Jewish Autonomous Oblast, Khabarovsk Krai, Primorsky Krai, central Sakha Republic and Sakhalin Island', 
      'UTC+12:00 (Magadan Time) — Magadan Oblast, eastern Sakha, Kuril Islands, Chukotka and Kamchatka Krai'
      ],
 
    'United Kingdom': [
      'UTC−08:00 — Pitcairn Islands', 
      'UTC−05:00 — Cayman Islands, Turks and Caicos Islands', 
      'UTC−04:00 (AST) — Anguilla, Bermuda, British Virgin Islands, Montserrat', 
      'UTC−03:00 (FKST) — Falkland Islands', 
      'UTC−02:00 — South Georgia and the South Sandwich Islands', 
      'UTC (GMT) — main territory of the United Kingdom, Saint Helena, Ascension and Tristan da Cunha, Guernsey, Isle of Man, Jersey', 
      'UTC+01:00 (CET) — Gibraltar', 
      'UTC+02:00 (EET) — Akrotiri and Dhekelia', 
      'UTC+06:00 — British Indian Ocean Territory'
      ],
  
    'Australia': [
      'UTC+05:00 — Heard and McDonald Islands', 
      'UTC+06:30 — Cocos (Keeling) Islands', 
      'UTC+07:00 (CXT) — Christmas Island', 
      'UTC+08:00 (AWST) — Western Australia', 
      'UTC+09:30 (ACST) — South Australia, Northern Territory', 
      'UTC+10:00 (AEST) — Queensland, New South Wales, Australian Capital Territory, Victoria, Tasmania', 
      'UTC+10:30 — Lord Howe Island', 'UTC+11:30 (NFT) — Norfolk Island' 
      ],
  
    'Canada': [
      'UTC−08:00 (PST) — larger western part of British Columbia, Tungsten and the associated Cantung Mine in Northwest Territories, Yukon', 
      'UTC−07:00 (MST) — Alberta, some eastern parts of British Columbia, most of Northwest Territories, Nunavut (west of 102°W and all communities in the Kitikmeot Region), Lloydminster and surrounding area in Saskatchewan', 
      'UTC−06:00 (CST) — Manitoba, Nunavut (between 85° West and 102°W except western Southampton Island), Ontario (Northwestern Ontario west of 90°W with some exceptions and Big Trout Lake area east of 90°W), Saskatchewan except Lloydminster', 
      'UTC−05:00 (EST) — Nunavut east of 85°W and entire Southampton Island, Ontario east of 90°W (except Big Trout Lake area) plus several more western areas, Quebec (most of province)', 
      'UTC−04:00 (AST) — Labrador (all but southeastern tip), New Brunswick, Nova Scotia, Prince Edward Island, eastern part of Quebec', 
      'UTC−03:30 (NST) — Labrador (southeastern), Newfoundland'
      ],
  
    'Kingdom of Denmark': [
      'UTC−04:00 — Thule Air Base in Greenland', 
      'UTC−03:00 — most of Greenland, including inhabited south coast and west coast', 
      'UTC−01:00 — Ittoqqortoormiit and surrounding area in Greenland s Tunu county', 
      'UTC — (GMT) — Danmarkshavn weather station and surrounding area in Greenland s Tunu county, Faroe Islands', 
      'UTC+01:00 — (CET) — metropolitan Denmark'
    ],
  
    'New Zealand': [
      'UTC−11:00 — Niue', 
      'UTC−10:00 — Cook Islands', 
      'UTC+12:00 — main territory of New Zealand', 
      'UTC+12:45 — Chatham Islands', 'UTC+13:00 — Tokelau'
      ],
  
    'Brazil': [
      'UTC−05:00 (Brasília time −2) — Acre and Southwestern Amazonas', 
      'UTC−04:00 (Brasília time −1) — Most part of the Amazonas State, Mato Grosso, Mato Grosso do Sul, Rondônia, Roraima', 
      'UTC−03:00 (Brasília time) — the Southeast Region, the South Region, the Northeast Region (except some islands), Goias, Distrito Federal, Tocantins, Pará, Amapa', 
      'UTC−02:00 (Brasília time +1) — few islands on the east coast of Brazil (Fernando de Noronha, Trindade, Martin Vaz, Atol das Rocas, Saint Peter and Paul Rocks)'
      ],
  
    'Indonesia': [
      'UTC+07:00 (Western Indonesian Standard Time) — islands of Sumatra, Java, provinces of West Kalimantan and Central Kalimantan', 
      'UTC+08:00 (Central Indonesian Standard Time) — islands of Sulawesi, Bali, provinces of East Nusa Tenggara, West Nusa Tenggara, East Kalimantan and South Kalimantan', 
      'UTC+09:00 (Eastern Indonesian Standard Time) — provinces of Maluku, North Maluku, Papua and West Papua'
      ],
 
    'Kiribati': [
      'UTC+12:00 — Gilbert Islands', 
      'UTC+13:00 — Phoenix Islands', 
      'UTC+14:00 — Line Islands'
      ],
  
    'Mexico': [
      'UTC−08:00 (Zone 3 or Northwest Zone) — the state of Baja California', 
      'UTC−07:00 (Zone 2 or Pacific Zone) — the states of Baja California Sur, Chihuahua, Nayarit, Sinaloa and Sonora', 
      'UTC−06:00 (Zone 1 or Central Zone) — most of Mexico'
      ],
 
    'Chile': ['UTC−06:00 — Easter Island', 'UTC−04:00 — main territory'],
  
    'Democratic Republic of the Congo': [
      'UTC+01:00 (WAT) — western part of the country', 
      'UTC+02:00 (CAT) — eastern part of the country'
      ],
  
    'Ecuador': [
      'UTC−06:00 (GALT) — Galápagos Province', 
      'UTC−05:00 (Ecuador Time) — main territory of Ecuador'
    ],

    'Federated States of Micronesia': [
      'UTC+10:00 — the states of Chuuk and Yap', 
      'UTC+11 — the states of Kosrae and Pohnpei'
    ],
  
    'Kazakhstan': [
      'UTC+05:00 — western Kazakhstan', 
      'UTC+06:00 — eastern Kazakhstan'
    ],
  
    'Kingdom of the Netherlands': [
      'UTC−04:00 (AST) — Caribbean municipalities and constituent countries', 
      'UTC+01:00 (CET) — main territory of the Netherlands'
    ],
 
    'Mongolia': [
      'UTC+07:00 — the provinces of Khovd, Uvs and Bayan-Ölgii', 
      'UTC+08:00 — most of the country'
    ],
  
    'Portugal': [
      'UTC−01:00 — Azores', 'UTC (WET) — Madeira and the main territory of Portugal'
    ],
 
    'Spain': [
      'UTC (WET) — Canary Islands', 
      'UTC+01:00 (CET) — main territory of Spain'
    ],
  
    'Afghanistan': ['UTC+04:30'],
  
    'Albania': ['UTC+01:00 (CET)'],
  
    'Algeria': ['UTC+01:00 (CET)'],
  
    'Andorra': ['UTC+01:00 (CET)'],
  
    'Angola': ['UTC+01:00 (WAT)'],
  
    'Antigua and Barbuda': ['UTC−04:00 (AST)'],
  
    'Argentina': ['UTC−03:00 (ART)'],
  
    'Armenia': ['UTC+04:00'],

    'Austria': ['UTC+01:00 (CET)'],

    'Azerbaijan': ['UTC+04:00'],

    'Bahamas': ['UTC−05:00 (EST)'],

    'Bahrain': ['UTC+03:00'],

    'Bangladesh': ['UTC+06:00 (BDT)'],

    'Barbados': ['UTC−04:00'],

    'Belarus': ['UTC+03:00 (FET)'],

    'Belgium' : ['UTC+01:00 (CET)'],

    'Belize': ['UTC−06:00'],

    'Benin': ['UTC+01:00 (WAT)'],

    'Bhutan': ['UTC+06:00 (BTT)'],

    'Bolivia': ['UTC−04:00'],

    'Bosnia and Herzegovina': ['UTC+01:00 (CET)'],

    'Botswana': ['UTC+02:00 (CAT)'],

    'Brunei' :  ['UTC+08:00'],

    'Bulgaria': ['UTC+02:00 (EET)'],

    'Burkina Faso': ['UTC (GMT)'],

    'Burundi': ['UTC+02:00 (CAT)'],

    'Cambodia': ['UTC+07:00'],

    'Cameroon': ['UTC+01:00 (WAT)'],

    'Cape Verde': ['UTC−01:00 (Cape Verde Time)'],

    'Central African Republic': ['UTC+01:00 (WAT)'],

    'Chad': ['UTC+01:00 (WAT)'],

    'China': ['UTC+08:00 (Chinese Standard Time)'],

    'Colombia' : ['UTC−05:00'],

    'Comoros': ['UTC+03:00 (EAT)'],

    'Republic of the Congo' : ['UTC+01:00 (WAT)'],

    'Costa Rica': ['UTC−06:00'],

    "Côte d'Ivoire": ['UTC (GMT)'],

    'Croatia' : ['UTC+01:00 (CET)'],

    'Cuba' : ['UTC−05:00'],

    'Cyprus': ['UTC+02:00 (EET)'],

    'Czech Republic' : ['UTC+01:00 (CET) (CRT)'],

    'Djibouti' : ['UTC+03:00 (EAT)'],

    'Dominica': ['UTC−04:00'],

    'Dominican Republic': ['UTC−04:00'],

    'East Timor': ['UTC+09:00'],

    'Egypt' : ['UTC+02:00 (EET)'],

    'El Salvador': ['UTC−06:00'],

    'Equatorial Guinea' : ['UTC+01:00 (WAT)'],

    'Eritrea' : ['UTC+03:00 (EAT)'],

    'Estonia': ['UTC+02:00 (EET)'],

    'Ethiopia': ['UTC+03:00 (EAT)'],

    'Fiji' : ['UTC+12:00'],

    'Finland': ['UTC+02:00 (EET)'],

    'Gabon' : ['UTC+01:00 (WAT)'],

    'Gambia' : ['UTC (GMT)'],

    'Georgia' : ['UTC+04:00'],

    'Germany': ['UTC+01:00 (CET)'],

    'Ghana': ['UTC (GMT)'],

    'Greece': ['UTC+02:00 (EET)'],

    'Grenada': ['UTC−04:00'],

    'Guatemala': ['UTC−06:00'],

    'Guinea': ['UTC (GMT)'],

    'Guinea-Bissau': ['UTC (GMT)'],

    'Guyana': ['UTC−04:00'],

    'Haiti': ['UTC−05:00'],

    'Honduras': ['UTC−06:00'],

    'Hong Kong (China)' : ['UTC+08:00 (HKT)'],

    'Hungary': ['UTC+01:00 (CET)'],

    'Iceland': ['UTC (GMT)'],

    'India': ['UTC+05:30 (IST)'],

    'Iran' : ['UTC+03:30 (IRST)'],

    'Iraq' : ['UTC+03:00'],

    'Ireland' : ['UTC (WET)'],

    'Israel' : ['UTC+02:00 (IST)'],

    'Italy ': ['UTC+01:00 (CET)'],

    'Jamaica' : ['UTC−05: :00'],

    'Japan' : ['UTC+09:00 (JST)'],

    'Jordan' : ['UTC+03:00'],

    'Kenya' : ['UTC+03:00 (EAT)'],


    'Korea, North': ['UTC+09:00 (Korea Standard Time)'],

    'Korea, South' :  ['UTC+09:00 (Korea Standard Time)'],

    'Kuwait': ['UTC+03:00 (Arabia Standard Time)'],

    'Kyrgyzstan': ['UTC+06:00'],

    'Laos': ['UTC+07:00'],

    'Latvia': ['UTC+02:00 (EET)'],

    'Lebanon': ['UTC+02:00 (EET)'],

    'Lesotho': ['UTC+02:00'],

    'Liberia': ['UTC (GMT)'],

    'Libya': ['UTC+01:00'],

    'Liechtenstein': ['UTC+01:00 (CET)'],

    'Lithuania': ['UTC+02:00 (EET)'],

    'Luxembourg': ['UTC+01:00 (CET)'],

    'Macau (China)': ['UTC+08:00 (Macau Standard Time)'],

    'Macedonia': ['UTC+01:00 (CET)'],

    'Madagascar': ['UTC+03:00 (EAT)'],

    'Malawi': ['UTC+02:00 (CAT)'],

    'Malaysia': ['UTC+08:00 (Malaysian Standard Time)'],

    'Maldives': ['UTC+05:00'],

    'Mali': ['UTC (GMT)'],

    'Malta': ['UTC+01:00 (CET)'],

    'Marshall Islands': ['UTC+12:00'],

    'Mauritania': ['UTC (GMT)'],

    'Mauritius': ['UTC+04:00 (Mauritius Time)'],

    'Moldova': ['UTC+02:00 (EET)'],

    'Monaco': ['UTC+01:00 (CET)'],

    'Montenegro': ['UTC+01:00 (CET)'],

    'Morocco': ['UTC (WET)'],

    'Mozambique': ['UTC+02:00 (CAT)'],

    'Myanmar': ['UTC+06:30 (MST)'],

    'Zimbawe': ['UTC+02:00 (CAT)'],

    'Zambia': ['UTC+02:00 (CAT)'],

    'Yemen': ['UTC+03:00'],

    'Vietnam': ['UTC+07:00 (Indochina Time)'],

    'Venezuela': ['UTC−04:30'],

    'Vatican City': ['UTC+01:00 (CET)'],

    'Vanuatu': ['UTC+11:00'],

    'Uzbekistan': ['UTC+05:00 (Uzbekistan Time)'],

    'Uruguay': ['UTC−03:00'],

    'United Arab Emirates': ['UTC+04'],

    'Ukraine': ['UTC+02:00 (EET)'],

    'Uganda': ['UTC+03:00 (EAT)'],

    'Tuvalu': ['UTC+12:00'],

    'Turkmenistan': ['UTC+05:00'],

    'Turkey': ['UTC+02:00 (EET)'],

    'Tunisia': ['UTC+01:00 (CET)'],

    'Trinidad and Tobago': ['UTC−04:00'],

    'Tonga': ['UTC+13:00'],

    'Togo': ['UTC (GMT)'],

    'Thailand': ['UTC+07:00 (THA)'],

    'Tanzania': ['UTC+03:00 (EAT)'],

    'Tajikistan': ['UTC+05:00'],

    'Taiwan': ['UTC+08:00'],

    'Syria': ['UTC+02:00 (EET)'],

    'Switzerland': ['UTC+02:00'],

    'Sweden': ['UTC+01:00 (CET)'],

    'Swaziland': ['UTC+02:00'],

    'Suriname': ['UTC−03:00'],

    'Sudan': ['UTC+03:00 (EAT)'],

    'Sri Lanka': ['UTC+05:30 (SLT)'],

    'South Sudan': ['UTC+03:00 (EAT)'],

    'South Africa': ['UTC+02:00 (South African Standard Time)'],

    'Somalia': ['UTC+03:00 (EAT)'],

    'Solomon Islands': ['UTC+11:00'],

    'Slovenia': ['UTC+01:00 (CET)'],

    'Slovakia': ['UTC+01:00 (CET)'],

    'Singapore': ['UTC+08:00 (SST)'],

    'Sierra Leone': ['UTC (GMT)'],

    'Saychelles': ['UTC+04:00 (Seychelles)'],

    'Serbia': ['UTC+01:00 (CET)'],

    'Senegal': ['UTC (GMT)'],

    'Saudi Arabia': ['UTC+03:00 (Arabia Standard Time)'],

    'Sao Tome and Principe': ['UTC GMT'],

    'San Marino': ['UTC+01:00 (CET)'],

    'Samoa': ['UTC+13:00'],

    'Saint Vincent and the Grenadines': ['UTC−04:00'],

    'Saint Lucia': ['UTC−04:00'],

    'Saint Kitts And Nevis': ['UTC−04:00'],

    'Rwanda': ['UTC+02:00 (CAT)'],

    'Romania': ['UTC+02:00 (EET)'],

    'Qatar': ['UTC+03:00 (Arabia Standard Time)'],

    'Poland': ['UTC+01:00 (CET)'],

    'Phiplippines': ['UTC+08:00 (PHT)'],

    'Peru': ['UTC−05:00 (PET)'],

    'Paraguay': ['UTC−04:00'],

    'Namibia': ['UTC+01: :00 (WAT)'],

    'Nauru': ['UTC+12:00'],

    'Nepal': ['UTC+05:45 (Nepal Time)'],

    'Nicaragua': ['UTC−06:00'],

    'Niger': ['UTC+01:00 (WAT)'],

    'Nigeria': ['UTC+01:00 (WAT)'],

    'Norway': ['UTC+01:00 (CET)'],

    'Oman': ['UTC+04:00'],

    'Pakistan': ['UTC+05:00 (PKT)'],

    'Palau': ['UTC+09:00'],

    'Panama': ['UTC−05:00'],

    'Papua New Guinea': ['UTC+10:00'],
  }
} 
function get_countries($scope){
    $scope.countries = [
          'Afghanistan',
          'Albania',
          'Algeria',
          'American Samoa',
          'Andorra',
          'Angola',
          // 'Antarctica',
          'Antigua and Barbuda',
          'Argentina',
          'Armenia',
          // 'Aruba',
          // 'Ashmore and Cartier Islands',
          'Australia',
          'Austria',
          'Azerbaijan',
          'Bahamas',
          'Bahrain',
          'Bangladesh',
          'Barbados',
          // 'Bassas da India',
          'Belarus',
          'Belgium',
          'Belize',
          'Benin',
          'Bhutan',
          'Bolivia',
          'Bosnia and Herzegovina',
          'Botswana',
          // 'Bouvet Island',
          'Brazil',
          'Brunei',
          'Bulgaria',
          'Burkina Faso',
          // 'Burma',
          'Burundi',
          'Cambodia',
          'Cameroon',
          'Canada',
          'Cape Verde',
          'Central African Republic',
          'Chad',
          'Chile',
          'China',
          'Colombia',
          'Comoros',
          'Democratic Republic of the Congo',
          'Republic of the Congo',
          // 'Coral Sea Islands',
          'Costa Rica',
          // "Cote d'Ivoire",
          'Croatia',
          'Cuba',
          'Cyprus',
          'Czech Republic',
          // 'Denmark',
          'Djibouti',
          'Dominica',
          'Dominican Republic',
          'Ecuador',
          'Egypt',
          'El Salvador',
          'Equatorial Guinea',
          'Eritrea',
          'Estonia',
          'Ethiopia',
          // 'Europa Island',
          'Fiji',
          'Finland',
          'France',
          // 'French Southern and Antarctic Lands',
          'Gabon',
          'Gambia',
          // 'Gaza Strip',
          'Georgia',
          'Germany',
          'Ghana',
          // 'Glorioso Islands',
          'Greece',
          'Grenada',
          'Guatemala',
          'Guinea',
          'Guinea-Bissau',
          'Guyana',
          'Haiti',
          // 'Holy See (Vatican City)',
          'Honduras',
          'Hong Kong (China)',
          'Hungary',
          'Iceland',
          'India',
          'Indonesia',
          'Iran',
          'Iraq',
          'Ireland',
          'Israel',
          'Italy',
          'Jamaica',
          // 'Jan Mayen',
          'Japan',
          'Jordan',
          // 'Juan de Nova Island',
          'Kazakhstan',
          'Kenya',
          'Kiribati',
          'Korea, North',
          'Korea, South',
          'Kuwait',
          'Kyrgyzstan',
          'Laos',
          'Latvia',
          'Lebanon',
          'Lesotho',
          'Liberia',
          'Libya',
          'Liechtenstein',
          'Lithuania',
          'Luxembourg',
          'Macau (China)',
          'Macedonia',
          'Madagascar',
          'Malawi',
          'Malaysia',
          'Maldives',
          'Mali',
          'Malta',
          'Marshall Islands',
          'Mauritania',
          'Mauritius',
          'Mexico',
          'Federated States of Micronesia',
          'Moldova',
          'Monaco',
          'Mongolia',
          'Morocco',
          'Mozambique',
          'Namibia',
          'Nauru',
          'Nepal',
          // 'Netherlands',
          // 'Netherlands Antilles',
          'New Zealand',
          'Nicaragua',
          'Niger',
          'Nigeria',
          'Norway',
          'Oman',
          'Pakistan',
          'Palau',
          'Panama',
          'Papua New Guinea',
          // 'Paracel Islands',
          'Paraguay',
          'Peru',
          // 'Philippines',
          'Poland',
          'Portugal',
          'Qatar',
          // 'Reunion',
          'Romania',
          'Russia',
          'Rwanda',
          'Saint Helena',
          'Saint Kitts and Nevis',
          'Saint Lucia',
          'Saint Vincent and the Grenadines',
          'Samoa',
          'San Marino',
          'Sao Tome and Principe',
          'Saudi Arabia',
          'Senegal',
          'Serbia',
          'Seychelles',
          'Sierra Leone',
          'Singapore',
          'Slovakia',
          'Slovenia',
          'Solomon Islands',
          'Somalia',
          'South Africa',
          'Spain',
          // 'Spratly Islands',
          'Sri Lanka',
          'Sudan',
          'Suriname',
          // 'Svalbard',
          'Swaziland',
          'Sweden',
          'Switzerland',
          'Syria',
          'Taiwan',
          'Tajikistan',
          'Tanzania',
          'Thailand',
          // 'Timor-Leste',
          'Togo',
          'Tonga',
          'Trinidad and Tobago',
          // 'Tromelin Island',
          'Tunisia',
          'Turkey',
          'Turkmenistan',
          'Tuvalu',
          'Uganda',
          'Ukraine',
          'United Arab Emirates',
          'United Kingdom',
          'United States',
          'Uruguay',
          'Uzbekistan',
          'Vanuatu',
          'Venezuela',
          'Vietnam',
          // 'West Bank',
          // 'Western Sahara',
          'Yemen',
          'Zambia',
          'Zimbabwe ', 
    ]
}
function get_languages($scope) {
  $scope.languages = [
    'Mandarin', 
    'Spanish', 
    'English',
    'Hindi', 
    'Arabic', 
    'Portuguese', 
    'Bengali', 
    'Russian', 
    'Japanese', 
    'Punjabi', 
    'German', 
    'Javanese', 
    'Wu', 
    'Malay/Indonesian', 
    'Telugu', 
    'Vietnamese', 
    'Korean', 
    'French', 
    'Marathi', 
    'Tamil', 
    'Urdu', 
    'Persian', 
    'Turkish', 
    'Italian', 
    'Cantonese', 
    'Thai', 
    'Gujarati', 
  ]
}

function login_form_validation($scope){
    if($scope.username == undefined || $scope.username == '') {
        $scope.error_message = 'Please Enter your username';
        $scope.error_flag = true;
        return false;
    } else if($scope.password == undefined || $scope.password == '') {
        $scope.error_message = 'Please Enter Password';
        $scope.error_flag = true;
        return false;
    }
    return true;
}

function login($scope, $http, $timeout) {
    $scope.is_valid = login_form_validation($scope);
    if($scope.is_valid) {
        params = {
            'username': $scope.username,
            'password': $scope.password,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
            method : 'Post',
            url : "/login/",
            data : $.param(params),
            headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }).success(function(data, status)
        {

            if(data.result == 'error'){
                $scope.error_message = data.error_value;
                $scope.error_flag = true;
            } else {
                $scope.username = '';
                $scope.password = '';
                $scope.error_message = data.message;
                $scope.error_flag = true;
                $timeout(function() {
                    $scope.error_flag = false;
                    $scope.popup.hide_popup();
                    $scope.error_message = '';
                }, 3000);
            }             
        }).error(function(data, status)
        {
            $scope.error_message = data.error_value;
            $scope.error_flag = true;
        }); 
    }
}

function validate_form($scope){
    if(!(validateEmail($scope.email))) {
        $scope.error_message = 'Please Enter a valid email';
        $scope.error_flag = true;
        return false;
    } else if($scope.password == undefined || $scope.password == '') {
        $scope.error_message = 'Please Enter Password';
        $scope.error_flag = true;
        return false;
    } else if($scope.password.length <=6) {
        $scope.error_message = 'Please use more than 6 letters in the password field';
        $scope.error_flag = true;
        return false;
    }
    return true;
}

function signup($scope, $http, $timeout){
    $scope.is_valid = validate_form($scope);
    if ($scope.is_valid) {
        params = {
            'email': $scope.email,
            'password': $scope.password,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
           method : 'Post',
           url : "/signup/",
           data : $.param(params),
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            if(data.result == 'error'){
                $scope.error_message = data.error;
                $scope.error_flag = true;

            } else {
                $scope.error_message = data.message;
                $scope.error_flag = true;
                $timeout(function() {
                    $scope.error_flag = false;
                    $scope.popup.hide_popup();
                    $scope.error_message = '';
                }, 5000);
            }
            
        }).error(function(data, status)
        {
            $scope.error_message = data.message;
            $scope.error_flag = true;
        }); 
    }
}

function subscribe_now($scope, $http, $timeout){

    $scope.subscribe_message_error = false; 
    $scope.subscribe_error = "Please use the correct email format: example@emailprovider.com"
    if(validateEmail($scope.subscribe_email)) {
        params = {
            'email': $scope.subscribe_email,
            "csrfmiddlewaretoken" : $scope.csrf_token
        }
        $http({
           method : 'Post',
           url : "/subscribe/",
           data : $.param(params),
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            if(data.result == 'error'){
               $scope.subscribe_message_error = true; 
               $scope.subscribe_error = data.error; 
            } else {
                $scope.subscribe_email = ''
                $scope.subscribe_message = true;
                $timeout(function() {
                    $scope.subscribe_message = false;
                }, 5000);
            }
            
        }).error(function(data, status)
        {
            console.log(data);
        }); 
    } else {
       $scope.subscribe_message_error = true; 
    }       
}

function HomeController($scope, $element, $http, $timeout, share, $location)
{
    $scope.signup_flag = false;
    $scope.popup = '';
    $scope.init = function(csrf_token)
    {
        $scope.csrf_token = csrf_token;
    }
    $scope.show_popup = function(name){
      show_popup(name, $scope);
    }
    $scope.hide_popup = function(name){
      $scope.email = '';
      $scope.password = '';
      $scope.username = '';
    }
    $scope.subscribe_now = function(){
        subscribe_now($scope, $http, $timeout);
    }
    $scope.signup = function(){
      signup($scope, $http, $timeout);  
    }
    $scope.login = function(passws_element){
      login($scope, $http, $timeout);
    }
}
function BlogController($scope, $element, $http, $timeout, share, $location)
{
    $scope.blog_list = [];
    $scope.list_view = true;
    $scope.detail_view = false;
    $scope.current_blog = '';
    $scope.blog_board = false;
    $scope.get_top_writers = '';
    $scope.subscribe_message = false;
    $scope.init = function(csrf_token, id, blog_board)
    {
        $scope.csrf_token = csrf_token;
        //$scope.get_blog_list();
        $scope.get_archive();
        $scope.archive_flag = false;
        $scope.get_top_writers(); 
        if(id != ''){
            $scope.detail_view = true;
        } 
        if(blog_board != ''){
            $scope.blog_board = true;
        }       
    }
    $scope.get_archive = function(){
        $http.get('/blog/archive/').success(function(data)
        {
            $scope.year_blog_list = data.year_blog_list;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });
    }
    $scope.archive_view = function(){
        if(!$scope.archive_flag) {
            new Archive($('.archive'));
            $scope.archive_flag = true;
        }
    }
    $scope.show_blog_board = function(){
        $scope.blog_board = true;
        $scope.list_view = false;
        $scope.detail_view = false;
    }
    $scope.subscribe_now = function(){
        subscribe_now($scope, $http, $timeout);
    }
    $scope.get_blog_list = function(){
        $http.get('/blog_list/').success(function(data)
        {
            $location.path('/blog_list/')
            $scope.blog_list = data.blog_list;
            $scope.list_view = true;
            $scope.detail_view = false;
            $scope.blog_board = false;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });
    }
    $scope.blog_detail = function(blog, source){
        var url = "/blog/"+blog.slug+"/";
        window.location.href = url;
        $http.get(url).success(function(data)
        {
            $scope.current_blog = data.blog;
            $location.path(blog.slug+"/");
            $scope.list_view = false;
            $scope.detail_view = true;
            $scope.blog_board = false;
            $timeout(function() {
                if(source == "comment_button"){
                    var pos = $("#comment_plugin").position().top;
                } else {
                    var pos = 100;
                }
                $("body,html").animate({scrollTop: pos}, 1000);
            }, 1000);
             
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });  
    }
    $scope.search_blog = function(){
        var search_key = $scope.blog_search_key;
        params = {
            'search_key': search_key
        }
        $http({
           method : 'get',
           url : "/blog/search/?search_key="+search_key,
           data : $.param(params),
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            $location.path('/blog/search/').search('search_key', search_key)
            $scope.blog_list = data.blog_list;
            $scope.list_view = true;
            $scope.detail_view = false;
            $scope.blog_board = false;
        }).error(function(data, status)
        {
            console.log(data);
        });
    }
    $scope.tag_blog = function(tag){
        var url = '/blog/tag/'+tag;
        $http.get(url).success(function(data)
        {
            $location.path(url);
            $scope.blog_list = data.blog_list;
            $scope.list_view = true;
            $scope.detail_view = false;
            $scope.blog_board = false;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });  
    }  
    $scope.get_blog_tags = function(id){
        var url = '/blog/'+id+'/tags/';
        $http.get(url).success(function(data)
        {
            $scope.blog_tags = data.blog_tags;
            $scope.list_view = true;
            $scope.detail_view = false;
            $scope.blog_board = false;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });  
    }
    $scope.get_top_writers = function(){
        var url = '/blog/top_writers/';
        $http.get(url).success(function(data)
        {
            $scope.top_writers = data.writers;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        }); 
    }    
}

function AboutUsController($scope, $element, $http, $timeout, share, $location)
{
    $scope.init = function(csrf_token)
    {
        $scope.csrf_token = csrf_token;
        var url = '/brand_ambassadors/';
        $http.get(url).success(function(data)
        {
            $scope.brandambassadors = data.brand_ambassadors;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        }); 
        var url = '/leadership_team/';
        $http.get(url).success(function(data)
        {
            $scope.leaders = data.leaders;
        }).error(function(data, status)
        {
            console.log(data || "Request failed");
        });  
    }
}

function ContactUsController($scope, $element, $http, $timeout, share, $location)
{
    $scope.progressing_flag = false;
    $scope.init = function(csrf_token)
    {
        $scope.csrf_token = csrf_token;
        $scope.error_message = '';
        $scope.error_flag = false;
        $scope.success_flag =false;
    }

    $scope.validate_form = function(){
        if($scope.name == undefined || $scope.name == '' ) {
            $scope.error_message = 'Please Enter Name';
            $scope.error_flag = true;
            return false;
        } else if($scope.phone == undefined || $scope.phone == '') {
            $scope.error_message = 'Please Enter Phone';
            $scope.error_flag = true;
            return false;
        } else if(!(validateEmail($scope.email))) {
            $scope.error_message = 'Please use the correct email format example@emailprovider.com';
            $scope.error_flag = true;
            return false;
        }else if($scope.category == undefined || $scope.category == '' ){
            $scope.error_message = 'Please Choose the category';
            $scope.error_flag = true;
            return false;
        } else if($scope.message == undefined || $scope.message == '') {
            $scope.error_message = 'Please Enter Message';
            $scope.error_flag = true;
            return false;
        }
        return true;
    };

    $scope.send = function(){
        $scope.is_valid = $scope.validate_form();
        if($scope.is_valid) {
            $scope.progressing_flag = true;
            params = {
                'name': $scope.name,
                'phone': $scope.phone,
                'email': $scope.email,
                'category': $scope.category,
                'message': $scope.message,
                "csrfmiddlewaretoken" : $scope.csrf_token
            }
            $http({
               method : 'Post',
               url : "/contact_us/",
               data : $.param(params),
               headers : {
                   'Content-Type' : 'application/x-www-form-urlencoded'
               }
            }).success(function(data, status)
            {
                if(data.result == 'error'){
                    $scope.error_message = data.message;
                    $scope.error_flag = true;
                    console.log('error');
                } else {
                    $scope.progressing_flag = false;
                    $scope.error_flag = false;
                    $scope.success_message = 'Thank you. We will be in touch shortly.';
                    $scope.success_flag = true;
                    $scope.name = '';
                    $scope.phone = '';
                    $scope.email = '';
                    $scope.category = '';
                    $scope.message = '';
                    $timeout(function() {
                        $scope.success_flag = false;
                    }, 5000);
                }
                
            }).error(function(data, status)
            {
                $scope.error_message = data.message;
                $scope.error_flag = true;
            });
        } else {
           // $scope.subscribe_message_error = true;
        }
    }
}

function SellerController($scope, $element, $http, $timeout, share, $location)
{
    $scope.init = function(csrf_token)
    {
        $scope.csrf_token = csrf_token;
    }
    $scope.show_popup = function(name){
      show_popup(name, $scope);
    }
    $scope.hide_popup = function(name){
      $scope.username = '';
      $scope.email = '';
      $scope.password = '';
    }
    $scope.validate_form = function(){
        if($scope.first_name == undefined || $scope.first_name == '' ) {
            $scope.error_message = 'Please Enter First Name';
            $scope.error_flag = true;
            return false;
        } else if($scope.sur_name == undefined || $scope.sur_name == '' ) {
            $scope.error_message = 'Please Enter Surname';
            $scope.error_flag = true;
            return false;
        } else if(!(validateEmail($scope.email))) {
            $scope.error_message = 'Please Enter a valid email';
            $scope.error_flag = true;
            return false;
        } else if($scope.password == undefined || $scope.password == '') {
            $scope.error_message = 'Please Enter Password';
            $scope.error_flag = true;
            return false;
        } else if($scope.password.length <=6) {
            $scope.error_message = 'Please use more than 6 letters in the password field';
            $scope.error_flag = true;
            return false;
        }
        return true;
    };
    $scope.mail_signup = function(){
        $scope.is_valid = $scope.validate_form()
        if ($scope.is_valid) {
            params = {
                /*'first_name': $scope.first_name,
                'sur_name': $scope.sur_name,*/
                'email': $scope.email,
                'password': $scope.password,
                "csrfmiddlewaretoken" : $scope.csrf_token
            }
            $http({
               method : 'Post',
               url : "/signup/",
               data : $.param(params),
               headers : {
                   'Content-Type' : 'application/x-www-form-urlencoded'
               }
            }).success(function(data, status)
            {
                if(data.result == 'error'){
                    $scope.error_message = data.error;
                    $scope.error_flag = true;
                } else {
                    $scope.error_message = data.message;
                    $scope.error_flag = true;
                    $timeout(function() {
                        $scope.error_flag = false;
                        $scope.popup.hide_popup();
                    }, 5000);
                }
                
            }).error(function(data, status)
            {
                $scope.error_message = data.message;
                $scope.error_flag = true;
            }); 
        }
        
    }
}



function RegisterYourInterestController($scope, $element, $http, $timeout, share, $location)
{
    $scope.progressing_flag = false;
    $scope.services = [];
    $scope.init = function(csrf_token)
    {
        $scope.csrf_token = csrf_token;
        $scope.error_message = '';
        $scope.error_flag = false;
        $scope.success_flag =false;
    }
    $scope.add_services = function(title) {
        if($scope.services.indexOf(title) == -1){
            $scope.services.push(title);
        } else {
            var index = $scope.services.indexOf(title);
            $scope.services.splice(index, 1);
        }
    }

    $scope.validate_form = function(){
        if($scope.name == undefined || $scope.name == '' ) {
            $scope.error_message = 'Please Enter Name';
            $scope.error_flag = true;
            return false;
        } else if($scope.phone == undefined || $scope.phone == '') {
            $scope.error_message = 'Please Enter Phone';
            $scope.error_flag = true;
            return false;
        } else if($scope.phone.length < 0 || parseInt($scope.phone.charAt(0)) != 0 || !Number($scope.phone)) {
            $scope.error_message = 'Please Enter Valid phone number';
            $scope.error_flag = true;
            return false;
        } else if(!(validateEmail($scope.email))) {
            $scope.error_message = 'Please use the correct email format example@emailprovider.com';
            $scope.error_flag = true;
            return false;
        } else if($scope.profession == undefined || $scope.profession == '' ){
            $scope.error_message = 'Please Choose the profession';
            $scope.error_flag = true;
            return false;
        } 
        return true;
    };
    $scope.send = function(){
        $scope.is_valid = $scope.validate_form();
        if($scope.is_valid) {
            $scope.progressing_flag = true;
            params = {
                'name': $scope.name,
                'phone': $scope.phone,
                'email': $scope.email,
                'profession': $scope.profession,
                'services': JSON.stringify($scope.services),
                "csrfmiddlewaretoken" : $scope.csrf_token,
            }
            $http({
               method : 'Post',
               url : "/register_your_interest/",
               data : $.param(params),
               headers : {
                   'Content-Type' : 'application/x-www-form-urlencoded'
               }
            }).success(function(data, status)
            {
                
                if(data.result == 'error'){
                    console.log('error');
                } else {
                    $scope.progressing_flag = false;
                    $scope.error_flag = false;
                    $scope.success_message = 'Thanks. We will be in touch closer to our launch date';
                    $scope.success_flag = true;
                    $scope.name = '';
                    $scope.phone = '';
                    $scope.email = '';
                    $scope.profession = '';
                    $scope.services = [];
                    $scope.boot_camps = false;
                    $scope.one_on_one_personal_training = false;
                    $scope.fitness_programs = false;
                    $scope.group_workouts = false;
                    $scope.nutrition_guides = false;
                    $scope.online_mentoring = false;
                    $timeout(function() {
                        $scope.success_flag = false;
                    }, 5000);
                }                
            }).error(function(data, status)
            {
                // $scope.progressing_flag = false;
                $scope.error_message = data.message;
                $scope.error_flag = true;
            });
        }
    }
}

function ProfileController($scope, $element, $http, $timeout, share, $location)
{   
    $scope.init = function(csrf_token, user_id, user_slug, user_type)
    {
        $scope.csrf_token = csrf_token;
        $scope.user_id = user_id;
        $scope.user_slug = user_slug;
        $scope.user_type = user_type;
        $selected_timezones = [];
        get_countries($scope);
    }
    $scope.client_verification = function(token) {
        $scope.client_token = token;
        var url = '/'+$scope.user_type+'/'+$scope.user_slug+'/profile/'+$scope.client_token+'/';
        params = {
            'token': $scope.client_token,
            "csrfmiddlewaretoken" : $scope.csrf_token,
        }
        $http({
           method : 'Post',
           url : url,
           data : $.param(params),
           headers : {
               'Content-Type' : 'application/x-www-form-urlencoded'
           }
        }).success(function(data, status)
        {
            if ( data.result == 'success' ) {
                document.location.href = url;
            }
        }).error(function(data, status)
        {
        });
    }
}
