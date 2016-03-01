//from Product Page
$(function() {
    $('#freeoptinput').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
        }
    });
});


//from the header, Product Page Cart stuff

$(function() {
    var $ = jQuery;
    // set default size option
    var defaultoption = "[-- PRODUCT.Field11 --]";
    if (!defaultoption.match(/Empty/i)) {
        var tmp = defaultoption.split(' ');
        //$("#tabs_1 span:contains('"+tmp[0]+"')").click();
        /*$("#tabs_1 span").each(function() {
            var label=$(this).text();
            var re=new RegExp("^"+tmp[0]+" *$");
            if (re.test(label)) {$(this).click()}
        });*/
        var firstmatch = 1;
        $('.orderopt > tbody > tr > td').each(function() {
            if ($(this).text().trim() == "[-- PRODUCT.Field11 --]") {
                if (firstmatch) {

                    /*setTimeout(function() {
                        $(this).prev().find(':radio').click().each(function() {
                            $('#price').val($(this).parent().next().next().text());
                        });
                    }, 1000);*/

                    $(this).prev().find(':radio').click().each(function() {
                        $('#price').val($(this).parent().next().next().text());
                    });
                    var $tabsnameel = $(this).parents('div');
                    var tabsname = $tabsnameel.attr('id');
                    tabsname = tabsname.replace('tab1s', 'tab1li');
                    $('#' + tabsname).click();
                    //console.log();
                    firstmatch = 0;
                    //setTimeout(function() {applyDiscountPrimer(document.mainform);},1000);   //debug nov 27
                }
                $(this).css('font-weight', 'bold').append(' *');
            }
        });
        $('#mostpopular').show();
    };
    // end default size option

    // set multi-language option list
    var field14 = "[-- PRODUCT.Field14 --]"; //pull values from field14 into pathname
    if ((field14.length) && (!field14.match(/Empty/i))) {
        var c = "";
        var pathname = location.pathname;
        pathname = pathname.substring(1, pathname.length);
        var items = field14.split('\|');
        if (items[0].match(/^portrait *$/i)) { //if field14 = "portrait" just show the 2 orientation icons
            items.shift();
            var imgUrl = $('#multilanguage').parent().find('img:first').attr('src');
            imgUrl = imgUrl.replace('/300/', '/150/');
            imgUrl = imgUrl.replace('_300.gif', '_150.gif');
            var parts = imgUrl.split('\/');
            var landscape = parts.pop().replace(/(.*[A-Z][A-Z][A-Z])P(\-[0-9]+.*)/, '$1$2');
            var portrait = landscape.replace(/(.*[A-Z][A-Z][A-Z]+)(\-[0-9]+.*)/, '$1P$2');
            var landscapeUrl = pathname.replace(/(.*[A-Z][A-Z][A-Z])P(\-[0-9]+.*)/, '$1$2');
            var portraitUrl = landscapeUrl.replace(/(.*[A-Z][A-Z][A-Z]+)(\-[0-9]+.*)/, '$1P$2');
            c += '<div class="orntIcon" data-path="' + portraitUrl + '" id="portrait-icon" style="cursor:pointer;height:100px;float:left;margin-left:15px;margin-right:5px">' +
                '<img src="' + parts.join('/') + '/' + portrait + '" width=100><br>Portrait</div>';
            c += '<div class="orntIcon" data-path="' + landscapeUrl + '" id="landscape-icon" style="cursor:pointer;width:100px;float:left;margin-top:9px">' +
                '<img src="' + parts.join('/') + '/' + landscape + '" width=100><br><span style="position:relative;top:-9px">Landscape</span></div><br style="clear:both">';
            $('#multilanguage').css('padding-top', 37);

        }
        if (items.length) {
            var noPortrait = (c.length) ? "" : " noPortrait";
            if (noPortrait) {
                $('#multilanguage').addClass('shorter')
            };
            c += '<div class="languagelist' + noPortrait + '">Language: <select id="multilanguage_list">';
            var orientationList = "";
            for (i = 0; i < items.length; i++) {
                var vals = items[i].split(';');
                var sel = "";
                if (pathname == vals[1]) {
                    sel = "SELECTED"
                }
                c += '<option value="' + vals[1] + '" ' + sel + '>' + vals[0] + '</option>\n';
            }


            c += '</select></div>';
        }
        if (c) {
            $('#multilanguage').show();
            var volposition = $('.block2').offset(); // position = { left: 42, top: 567 }
            var cellposition = $('#multilanguage').parent().offset();
            var prodimageheight = $('#multilanguage').parent().find('img:first').attr('height');
            var imageposition = $('#multilanguage').parent().find('img:first').offset();
            if ((c.match(/multilanguage_list/)) && (field14.match(/^portrait/i))) {
                $('#multilanguage').addClass('taller')
            };
            if (prodimageheight < 235) {
                $('#multilanguage').html(c).css({
                    'top': 50
                });
            } else {
                $('#multilanguage').html(c);
            }

            $('#multilanguage_list').change(function() {
                location = $(this).val() + "?ref=" + escape(pathname);
            });
            $('div.orntIcon').click(function() {
                var path = $(this).attr('data-path');
                location = path;
            });
        }
    }


    /*Set default price*/
    $('#qnty').change(function() {
        applyDiscountPrimer(document.mainform)
    });

    $('form[name="mainform"]').submit(function() {
        if (!$(':input[name$="finopt:0"]:checked').length) {
            alert('Oops!  Please choose a Size/Material option.');
            return false;
        }
        return true;
    });

    $('#tabs3').css('display', 'none');
    $('#schemacode').hide();
    //$("div.pr-review-engine").insertBefore("div.pr-contents:first");
    /*Truncate Sign Wording*/
    var maxlen = 185;
    var wording = $('#wording').html();
    var wordingtrunc = wording.substring(0, maxlen) + " . . . <div style='font-weight:normal;font-size:9pt;cursor:pointer;color:blue;text-decoration:underline' id='wordingexpand'>more...</div>"
    if (wording.length > maxlen) {
        $('#wording').html(wordingtrunc);
        $('#wordingexpand').live('click', function() {
            $('#wording').html(wording + "<div style='font-weight:normal;font-size:9pt;cursor:pointer;color:blue;text-decoration:underline' id='wordingcontract'>less...</div>");
        });
        $('#wordingcontract').live('click', function() {
            $('#wording').html(wordingtrunc);
        });
    }


    var totalImage = $('.MagicScroll img').size();
    if (totalImage < 4) {
        totalImage = totalImage;
    } else {
        totalImage = 4;
    }

    // MagicScroll.options = {
    //     'width': 772,
    //     'items': totalImage
    // }

});

var activeIndex = 1;

function activateTab(index) {
    if (activeIndex != index) {
        document.getElementById("tabli" + activeIndex).className = "";
        document.getElementById("tabs" + activeIndex).style.display = "none";
        activeIndex = index
        document.getElementById("tabli" + activeIndex).className = "over";
        document.getElementById("tabs" + activeIndex).style.display = "block";
    }
}


//cookie code from PRoduct Page

function Set_Cookie(name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());

    /*
    if the expires variable is set, make the correct 
    expires time, the current script below will set 
    it for x number of days, to make it for hours, 
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));

    document.cookie = name + "=" + escape(value) +
        ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ((secure) ? ";secure" : "");
}

function Get_Cookie(check_name) {
    // first we'll split this cookie up into name/value pairs
    // note: document.cookie only returns name=value, not the other components
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false; // set boolean t/f default f

    for (i = 0; i < a_all_cookies.length; i++) {
        // now we'll split apart each name=value pair
        a_temp_cookie = a_all_cookies[i].split('=');


        // and trim left/right whitespace while we're at it
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        // if the extracted name matches passed check_name
        if (cookie_name == check_name) {
            b_cookie_found = true;
            // we need to handle case where cookie has no value but exists (no = sign, that is):
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            // note that in cases where cookie is initialized but no value, null is returned
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return "";
    }
}


var thisprodimage = '<a href=\"' + location.href + '\" class=\"rvlink\"><img src="http://cdn.compliancesigns.com/media/[-- IMAGE PRODUCT.Graphic --]" border=0 hspace=3 vspace=3></a>';
var rv1 = Get_Cookie('rv1');
var rv2 = Get_Cookie('rv2');
var rv3 = Get_Cookie('rv3');
var rv4 = Get_Cookie('rv4');
var rv5 = Get_Cookie('rv5');
if (rv1.length) {
    document.write('<h4 class="recentlyviewed">Recently viewed:</h4>')
    document.write('<div class="recentlyviewed">');
    document.write('<TABLE><TR VALIGN=TOP>');
    document.write('<TD>' + rv1 + '</TD>');
    document.write('<TD>' + rv2 + '</TD>');
    document.write('<TD>' + rv3 + '</TD>');
    document.write('<TD>' + rv4 + '</TD>');
    //document.write('<TD>'+rv5+'</TD>');
    document.write('</TR></TABLE>');
    document.write('</div>')
}
if ((thisprodimage != rv1) && (thisprodimage != rv2) && (thisprodimage != rv3) && (thisprodimage != rv4)) {
    Set_Cookie('rv5', rv4, 365, "/", ".compliancesigns.com", "");
    Set_Cookie('rv4', rv3, 365, "/", ".compliancesigns.com", "");
    Set_Cookie('rv3', rv2, 365, "/", ".compliancesigns.com", "");
    Set_Cookie('rv2', rv1, 365, "/", ".compliancesigns.com", "");
    Set_Cookie('rv1', thisprodimage, 365, "/", ".compliancesigns.com", "");
}


jQuery(document).ready(function($) {
//Hides the Schema at the bottom once the page has been loaded
$('#schema_org').hide();


//from footer, this controls the scrolling of the customer messages in the footer - customer reviews

//new pausescroller(name_of_message_array, CSS_ID, CSS_classname, pause_in_miliseconds)
// new pausescroller(pausecontent, "pscroller1", "someclass", 10000)
        

//New Static Shrinking header tests
$(document).on("scroll", function(){
		if
      ($(document).scrollTop() > 60){
		  $(".shrinking-header").addClass("shrink");
		}
		else
		{
			$(".shrinking-header").removeClass("shrink");
		}
	});
});