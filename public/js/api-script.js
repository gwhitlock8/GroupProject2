$(document).ready(function() {
    /* -----------  AJAX CALLS ---------- */
    $.get("/api/user", (data) => {
        console.log(data);
        var username = data.firstname + " " + data.lastname;
        $("#profile h3").html(username);
        $("nav .phone span").html(data.phone);
        $("nav .email span").html(data.email);
    });


})