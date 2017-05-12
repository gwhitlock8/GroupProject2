$(document).ready(function () {
    /* -----------  AJAX CALLS ---------- */
    $.get("/api/user", (data) => {
        console.log(data);
        
    });


})