//js file of confirmed working scripts.


$(document).ready(function() {

    /* Product viewer slider  - 2 sliders that synch */
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        respondTo: '.moreinfo-td1.slick-slider'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: false,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true,
        respondTo: '.moreinfo-td1.slick-slider'
    });

    /*  Ribbon code - taken from  slick:  http://kenwheeler.github.io/slick/     */
    $('.cs-ribbon-container').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: false
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* Product Template Image viewer - hide synched-slide-show-ribbon if less than one image  */
        var slideImages = $('img.slick-slide').length;
        console.log(slideImages);
        if (slideImages <= 2) {
            $('.slider-nav img.slick-slide').hide();
            console.log(slideImages);
        }
    /* end ribbon code  */

    /* Shrinking Header  */
    $(document).on("scroll", function(){
        if
      ($(document).scrollTop() > 100){
          $(".cs-navbar-constrain").addClass("shrink");
            updateSliderMargin();
        }
        else
        {
            $(".cs-navbar-constrain").removeClass("shrink");
            updateSliderMargin();
        }
    });



}); //End $(document).ready

// prevents the enter key from selecting things user doesn't want. - I'm not convinced this is workign the way it's intended to.
$(function() {
    $('#freeoptinput').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
        }
    });
});

/*  -------------  Product Page - CART DISCOUNT CALCULATION / TOTAL ------------------   */
function applyDiscountPrimer(form) {
    $('#tabs_1 :input:radio:checked').click();
}

function applyDiscount(form) {
    var selected = false;
    var price;
    var inputs = form.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].name == "117:finopt:0") {
            if (inputs[i].checked == true) {
                selected = true;
                //console.log();
                break;
            }
        }
    }
    var qnty = document.getElementById("qnty").value
    price = parseFloat(document.getElementById("price").value.substring(1)); //0.7;
    var origPrice = price;

    if ($('#cs-volume-purchasing-1')[0]) {
        if (qnty >= 100) {
            price = origPrice * 0.7;
            $('td.cs-ten-to-twentyfour').removeClass('selected');
            $('td.cs-twentyfive-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').addClass('selected');
        } else if (qnty >= 50) {
            price = origPrice * 0.75;
            $('td.cs-ten-to-twentyfour').removeClass('selected');
            $('td.cs-twentyfive-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').addClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        } else if (qnty >= 25) {
            price = origPrice * 0.9;
            $('td.cs-ten-to-twentyfour').removeClass('selected');
            $('td.cs-twentyfive-to-fortynine').addClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        } else if (qnty >= 10) {
            price = origPrice * 0.95;
            $('td.cs-ten-to-twentyfour').addClass('selected');
            $('td.cs-twentyfive-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        } else if (qnty <= 9) {
            price = origPrice;
            $('td.cs-ten-to-twentyfour').removeClass('selected');
            $('td.cs-twentyfive-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        }
    } else if ($('#cs-volume-purchasing-2')[0]) {
        //console.log("this is volume purchasing group 1");
        if (qnty >= 100) {
            price = origPrice * 0.75;
            $('td.cs-ten-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').addClass('selected');
        } else if (qnty >= 50) {
            price = origPrice * 0.9;
            $('td.cs-ten-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').addClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        } else if (qnty >= 10) {
            price = origPrice * 0.95;
            $('td.cs-ten-to-fortynine').addClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        } else if (qnty <= 9) {
            price = origPrice;
            $('td.cs-ten-to-fortynine').removeClass('selected');
            $('td.cs-fifty-to-ninetynine').removeClass('selected');
            $('td.cs-hundred-plus').removeClass('selected');
        }
    }

    document.getElementById("price").value = "$" + price.toFixed(2);
    document.getElementById("qbtPriceEachDiv").innerHTML = "Price Each: &nbsp <br/>" + "$" + price.toFixed(2);

    var total = price * qnty;
    document.getElementById("qbtTotalPriceDiv").innerHTML = "<b>Total:&nbsp $" + "<span class='currency'>" + total.toFixed(2) + "</b>";


    if (document.getElementById("freeoptstart")) {
        document.getElementById("freeopt").value = document.getElementById("freeoptstart").value + " " + document.getElementById("freeoptinput").value;
    }

    var savings = (origPrice - price) * qnty;
    if (savings > 0) {
        $('#qbtSavingsDiscount').show().html('Total Savings: $' + savings.toFixed(2));
        $('#qbtSavingsYou').show().html('You Saved: <br/>$' + savings.toFixed(2));
    } else {
        $('#qbtSavingsDiscount').hide();
        $('#qbtSavingsYou').hide();
    }


    // QBIT PRODUCTS CODE
    if (typeof universal_variable != "undefined") {
        universal_variable.product.unit_price = parseFloat(origPrice);
        universal_variable.product.unit_sale_price = parseFloat(price.toFixed(2));
        universal_variable.product.size = $(':input[name$=":finopt:0"]:checked:first').val();
    }
}

$('#qnty').keyup(function() {
    // do the Ajax request or any other request
    applyDiscountPrimer(document.mainform)
});
/*  changing the bold on the selected Material/Size (aka the radio checked row)   */
// $(':input[name$=":finopt:0"]:checked').val();   //this returns the material name
//    $(':input[name$=":finopt:0"]:checked').addClass("now-selected");

//this add works, adding it to the first row
// $('.orderopt-td1:first').closest('table.orderopt').addClass('now-selected');
// $('input[name="myRadio"]:checked).closest('table.orderopt').addClass('now-selected');
//function highlightrow {}
//$( "input[type=checkbox]" ).on( "click", highlightRow );


$('form[name="mainform"]').submit(function() {
    if (!$(':input[name$="finopt:0"]:checked').length) {
        alert('Oops!  Please choose a Size/Material option.');
        return false;
    }
    return true;
});




/*  -------------  Product Page  - Top Menu Mini Cart Execution ------------------   */
//there is no way this will work as written below - learn how it works first!  and where are these parameters coming from and where are they defined?
DisplayMiniCart("ss_cart_0001212582", "Subtotal");

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

/*  -------------  Product Page  - Active Tab stuff ------------------   */
var activeIndex1 = 1;

function activateTab1(index) {
    if (activeIndex1 != index) {
        document.getElementById("tab1li" + activeIndex1).parentNode.className = "";
        document.getElementById("tab1s" + activeIndex1).style.display = "none";
        activeIndex1 = index
        document.getElementById("tab1li" + activeIndex1).parentNode.className = "over";
        document.getElementById("tab1s" + activeIndex1).style.display = "block";
    }
}
