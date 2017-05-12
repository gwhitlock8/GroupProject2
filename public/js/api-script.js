$(document).ready(function () {
    /* -----------  AJAX CALLS ---------- */
    $.get("/api/user", (data) => {
        console.log(data);

        var userName = data.firstname + " " + data.lastname;
        var userPicture = "<img src='" + data.facebookPicture + "' alt='profile picture' />";

        $("#profile h3").html(userName);
        $("nav .phone span").html(data.phone);
        $("nav .email span").html(data.email);
        if (data.facebookPicture) {
            $("#user-picture").html(userPicture);
        }
    });

    $("#edit-email").on("click", function () {

        $.ajax({
            method: "PUT",
            url: "/api/email",
            data: email
        })
            .done(function () {
                window.location.href = "/dashboard";
            });

    });
});