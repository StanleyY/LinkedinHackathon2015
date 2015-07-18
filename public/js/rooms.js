$(function() {
    $('#room-button').on('click', function(e){
    	console.log('test');
        var loginData = [];
        loginData.push({name:"name", value:$('#room-input').val()});

        $.ajax({
            url: '/rooms',
            type: "POST",
            data: loginData,
            dataType: "json",
            success: function(response) {
            	console.log('success');
            }
        });
        e.preventDefault();
    });
});