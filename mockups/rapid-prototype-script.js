$(document).ready(function() {
    console.log("front-end js loaded");
    $("#user-menu").hide();
    $("#event-details").hide();

    $('#toggle-rsvp').bootstrapToggle({
        on: 'Enabled',
        off: 'Disabled',
        height: 34,
        width: 70
    });

    //Registration Modal
    function registerValidate() {
        //check if both passwords match, if not: return "Error: Passwords do not match"
        //check if any field is empty, if yes: return "Error: Some information is missing"
    }
    /* -------------------------------------------
    ---------------    NAVIGATION    -----------*/
    function goToSplash() {
        $("#splash").show();
        $("#user-menu").hide();
        $("#event-details").hide();
    }

    function goToEvents() {
        $("#splash").hide();
        $("#user-menu").show();
        $("#event-details").hide();
    }

    function goToEventDetails() {
        $("#splash").hide();
        $("#user-menu").hide();
        $("#event-details").show();
    }

    /* ----------------------------------------
    ------------  CLICK EVENTS  ------------*/

    $("#btn-login").on("click", function() {
        $("#btn-navmenu").removeClass('disabled');
        goToEvents();
    });

    $("#btn-789").on("click", function() {
        goToEventDetails();
    });

    $("#events").on("click", function() {
        goToEvents();
    });

    $("#btn-events").on("click", function() {
        $("#btn-navmenu").click();
        goToEvents();
    });

    $("#btn-logout").on("click", function() {
        $("#btn-navmenu").click();
        goToSplash();
    });

    $(".submit").on("click", function(){
    	$(".modal").modal("hide");
    	goToEvents();
    });



});
