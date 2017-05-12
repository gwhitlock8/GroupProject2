$(document).ready(function(){
    var url = window.location.href;
    var eventId;
    var guests;
    var guestContainer = $(".guest-container");
    if(url.indexOf("/dashboard/") !== -1) {
        eventId = url.split("/")[2];
        getGuests(eventId);
    }

    //grabs guests from the user_event table that have the same eventId as the query
    function getGuests (events) {
        eventId = events || "";
        if(eventId) {
            eventId = "/dashboard/" + eventId;
        }
        $.get("/api/guests" + eventId, function(data){
            console.log("Guests", data);
            guests = data;
            if(!guests || !guests.length) {
                displayEmpty(events);
            } else {
                initializeRows();
            }
        });
    }

    //adds another guest to the table and updates the database
    $(".add-row").click(function(){
        var guestFirstName = $("#firstname").val();
        var guestLastName = $("#lastname").val();
        var phone = $("#phone").val();
        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + guestFirstName + "</td><td>" + guestLastName + "</td><td>" + phone + "</td></tr>";
        $("table tbody").append(markup);
    });



    //selects the guests that we want to send a message
    //then pulls up a modal to construct a message to the selected guests
    $("#btn-send").click(function(){
        $("table tbody").find('input[name="record"]').each(function(){
            if($(this).is(":checked")){
                var markup = $(this).parents("tr");
                
                $("#guestTable").append(markup);
            }
        });
    });

    


    //builds the table of existings guests in the UI
    function initializeRows() {
        guestContainer.empty();
        var guestsToAdd = [];
        for(i-0; i < guests.length; i++) {
            guestsToAdd(addExistingGuestList(guests[i]));
        }
        guestContainer.append(guestsToAdd);
    };

    //populates guest lists if there are exisiting guests attached to event
    function addExistingGuestList(guest) {
        var guestRow = $("<tr>");
        var guestColumnSelect = $("<td>");
        guestColumnSelect.attr('id','select');
        guestColumnSelect.append('<input type="checkbox" name="record">');
        var guestColumnFirstName = $("<td>");
        guestColumnFirstName.attr('id','first_name');
        guestColumnFirstName.text(guest.firstname);
        var guestColumnLastName = $("<td>");
        guestColumnLastName.attr('id','last_name');
        guestColumnLastName.text(guest.lastname);
        var guestColumnPhone = $("<td>");
        guestColumnPhone.attr('id','guest_phone');
        guestColumnPhone.text(guest.phone);
        var guestColumnAttending = $("<td>");
        guestColumnAttending.attr('id','attending');
        guestColumnAttending.text(guest.attending);
        guestRow.append(guestColumnSelect);
        guestRow.append(guestColumnFirstName);
        guestRow.append(guestColumnLastName);
        guestRow.append(guestColumnPhone);
        guestRow.append(guestColumnAttending);
        
        return guestRow;
    }

    getGuests();

});