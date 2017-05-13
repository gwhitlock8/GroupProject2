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


//Registration Modal
function registerValidate(formId) {
    //check if both passwords match, if not: return "Error: Passwords do not match"
    //check if any field is empty, if yes: return "Error: Some information is missing"
    var thisEmail = "#" + formId + " " + "input[type='email']";
    var thisEmailval = $(thisEmail).val();
    console.log("formId: " + formId);
    console.log("thisemailval: " + thisEmailval);

    if (validator.isEmail(thisEmailval)) {
        console.log("email ok");
        $('#modal-signup').modal('hide');
    } else {
        console.log("email error");
    }

}

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


    /* ----------------------------------------------------------
    --------  PROFILE: EDIT PHONE NUMBER AND EMAIL  --------- */
    $("#navbar .error").hide();

    function editPhone() {
        var phoneVal = $("#navbar .phone span").text();
        var phoneInput = $("<input type='text'>");
        var phoneP = $("<span>")
        var saveBtn = $("<a class='btn btn-default save'><i class='fa fa-check' aria-hidden='true'></i></a>");
        var editBtn = $("<a class='btn btn-default edit'><i class='fa fa-pencil' aria-hidden='true'></i></a>");
        var cancelBtn = $("<a class='btn btn-default cancel'><i class='fa fa-times' aria-hidden='true'></i></a>");
        phoneInput.val(phoneVal);
        $("#navbar .phone span").replaceWith(phoneInput);
        $("#navbar .phone a.edit").replaceWith(saveBtn);
        $("#navbar .phone").append(cancelBtn);

        $(document).on("click", "#navbar .phone a.save", function() {
            var newVal = $("#navbar .phone input").val();
            if (validator.isMobilePhone(newVal, "en-US")) {
                $(".error").text('').hide();
                phoneP.text(newVal);
                $(phoneInput).replaceWith(phoneP);
                $(saveBtn).replaceWith(editBtn);
                $(cancelBtn).remove();
            } else {
                $(".error").text("Invalid Phone number, please try again");
                $(".error").show();
            }
        });
        $(document).on("click", "#navbar .phone a.cancel", function() {
            $(".error").text('').hide();
            phoneP.text(phoneVal);
            $(phoneInput).replaceWith(phoneP);
            $(saveBtn).replaceWith(editBtn);
            $(cancelBtn).remove();
        });
    }

    /* --- */
    // I know there is a better way

    function editEmail() {
        var emailVal = $("#navbar .email span").text();
        var emailInput = $("<input type='text'>");
        var emailP = $("<span>")
        var saveBtn = $("<a class='btn btn-default save'><i class='fa fa-check' aria-hidden='true'></i></a>");
        var editBtn = $("<a class='btn btn-default edit'><i class='fa fa-pencil' aria-hidden='true'></i></a>");
        var cancelBtn = $("<a class='btn btn-default cancel'><i class='fa fa-times' aria-hidden='true'></i></a>");
        emailInput.val(emailVal);
        $("#navbar .email span").replaceWith(emailInput);
        $("#navbar .email a.edit").replaceWith(saveBtn);
        $("#navbar .email").append(cancelBtn);

        $(document).on("click", "#navbar .email a.save", function() {
            var newVal = $("#navbar .email input").val();
            if (validator.isEmail(newVal)) {
                $(".error").text('').hide();
                emailP.text(newVal);
                $(emailInput).replaceWith(emailP);
                $(saveBtn).replaceWith(editBtn);
                $(cancelBtn).remove();
            } else {
                $(".error").text("Invalid email address, please try again");
                $(".error").show();
            }
        });
        $(document).on("click", "#navbar .email a.cancel", function() {
            $(".error").text('').hide();
            emailP.text(emailVal);
            $(emailInput).replaceWith(emailP);
            $(saveBtn).replaceWith(editBtn);
            $(cancelBtn).remove();
        });
    }

    $(document).on("click", "#navbar .phone .edit", function() {
        editPhone();
    });

    $(document).on("click", "#navbar .email .edit", function() {
        editEmail();
    });

    /* ----------------------------------------
    ------------  CLICK EVENTS  ------------*/

    $("#signup .submit").on("click", function() {
        event.preventDefault();
        registerValidate("signup");
    });

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

    /* -- Meal Selection -- */

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

    //the document.on is needed for manipulated elements created on the fly
    $(document).on("click", ".input-group-delete", function() {
        $(this).parent().remove();
    });

});