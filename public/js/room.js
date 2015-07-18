$(function() {
    $('#add-button').on('click', function(e){
        var formData = [];
        formData.push({name:"cuisine", value:$('#cuisine-input').val()});

        $.ajax({
            url: '/rooms/' + $('#cuisine-input').data('room'),
            type: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
            	console.log('success');
            }
        });
        e.preventDefault();
    });
});