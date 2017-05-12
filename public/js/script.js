$(function() {
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});

$(document).ready(function() {
    console.log("front-end js loaded");
        $('#phoneModal').modal('show');
    $(".alert").hide();
    $("#event-details").hide();
    $("#event-create").hide();
    $("#meal-choices").hide();
    var newInput = '<div class="input-group"><input type="text" class="form-control new-input"><span class="input-group-addon input-group-delete"><i class="fa fa-times-circle" aria-hidden="true"></i></span></div>'

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

    function goToEvents() {
        $("#user-menu").show();
        $("#event-details").hide();
    }

    function goToEventDetails() {
        $("#user-menu").hide();
        $("#event-details").show();
    }

    function createEvent() {
        $("#user-menu").hide();
        $("#event-create").show();
    }

    /* -----------   DATE PICKER ---------- */
    $("#container-new-event-datetime").datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss'
    });

    /* ----------------------------------------
    ------------  CLICK EVENTS  ------------*/

    $("#btn-login").on("click", function() {
        $("#btn-navmenu").removeClass('disabled');
        goToEvents();
    });

    $("#btn-789").on("click", function() {
        goToEventDetails();
    });

    $("#btn-events").on("click", function() {
        $("#btn-navmenu").click();
        goToEvents();
    });

    $(".submit").on("click", function() {
        $(".modal").modal("hide");
        goToEvents();
    });

    $("#modal-event-delete button").on("click", function() {
        goToEvents();
    });

    $("#btn-event-create").on("click", function() {
        createEvent();
    });

    $("#event-create #meal-start").change(function() {
        if (this.checked) {
            $("#meal-choices").prepend(newInput);
            $("#meal-choices").prepend(newInput);
            $("#meal-choices").show();
        } else {
            $("#meal-choices input").val('');
            $("#meal-choices").hide();
            $("#meal-choices .new-input").parent().remove();
        }
    });


    /* -----------  RE-USEABLE CLICK EVENTS ---------- */
    $(".add-one").on("click", function() {
        $(".add-one").parent().prepend(newInput);
    });

    $(document).on("click", ".input-group-delete", function() {
        $(this).parent().remove();
    });
    
});
