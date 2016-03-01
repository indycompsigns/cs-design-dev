/*** BEGIN CSIGNS-SUB INLINE SCRIPTS ***/
$(document).ready(function() {

	jQuery(function($) {
		//something was overriding these settings, so we'll defer until onload.
		window.onload=function() {
			//$('a.zoomicon').show();
			//$('a.zoomicon').fancybox({'transitionIn': 'elastic','hideOnContentClick': 'true','width':600,'height':314,'autoDimensions':false}).show();
			$('a.zoomicon').fancybox({
				autoSize : false,
				maxWidth: 600,
				beforeLoad : function() { 
					//this.width  = 200;
	        		//this.height = 200;
				}
			}).show();
		}
	  //$('a.lightwindow').fancybox({'transitionIn': 'elastic','hideOnContentClick': 'true','type':'iframe','width':850,'height':440})
	});

	jQuery(function() {
		
		//jQuery('body').append(c);
		jQuery('#supportmaildiv').html('');
		//jQuery('.mailtToSupport').attr('href','#').live('click',function() {  //live is deprecated
		jQuery('.mailtToSupport').attr('href','#').on('click',function() {
			jQuery('#mailmodallayer').show();
			jQuery('#mailformdiv').show();
		});
		//jQuery('.closemailform').live('click',function() {//live is deprecated
		jQuery('.closemailform').on('click',function() {
			jQuery('#mailmodallayer').hide();
			jQuery('#mailformdiv').hide();
			jQuery('#supportReplyEmail').val("your@email.address");
			jQuery('#supportSubject').val("Please type the subject here");
			jQuery('#supportMessage').val("Your message here");
		});
		jQuery('#supportReplyEmail').focus(function() {
			if (jQuery(this).val()=="Email Address") {jQuery(this).val("").removeClass("supportFormDefault")}
		}).blur(function() {
			if (jQuery(this).val()=="") {jQuery(this).val("Email Address").addClass("supportFormDefault")}	
		});
		jQuery('#supportSubject').focus(function() {
			if (jQuery(this).val()=="Subject") {jQuery(this).val("").removeClass("supportFormDefault")}
		}).blur(function() {
			if (jQuery(this).val()=="") {jQuery(this).val("Subject").addClass("supportFormDefault")}
		});;
		jQuery('#supportName').focus(function() {
			if (jQuery(this).val()=="Name") {jQuery(this).val("").removeClass("supportFormDefault")}
		}).blur(function() {
			if (jQuery(this).val()=="") {jQuery(this).val("Name").addClass("supportFormDefault")}
		});;
		jQuery('#supportPhone').focus(function() {
			if (jQuery(this).val()=="Phone #") {jQuery(this).val("").removeClass("supportFormDefault")}
		}).blur(function() {
			if (jQuery(this).val()=="") {jQuery(this).val("Phone #").addClass("supportFormDefault")}
		});;
		jQuery('#supportMessage').focus(function() {
			if (jQuery(this).val()=="Your message here") {jQuery(this).val("").removeClass("supportFormDefault")}
		}).blur(function() {
			if (jQuery(this).val()=="") {jQuery(this).val("Your message here").addClass("supportFormDefault")}
		});
//		jQuery('.sendMessageButton').click(function() {
//			jQuery.post(jQuery('#emailSupportForm').attr('action'),jQuery('#emailSupportForm').serialize(),function(data) {
//				jQuery('#mailmaincontent').html(data).css({'padding-top':'50%','text-align':'center'});
//			});
//		});
	});

    	var activeIndex1 = 1;
    	function activateTab1(index){
    		if(activeIndex1 != index){
    			document.getElementById("tab1li" + activeIndex1).parentNode.className = "";
    			document.getElementById("tab1s" + activeIndex1).style.display = "none";
    			activeIndex1 = index
    			document.getElementById("tab1li" + activeIndex1).parentNode.className = "over";
    			document.getElementById("tab1s" + activeIndex1).style.display = "block";
    		}
    	}
    
});