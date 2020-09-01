$(document).ready(function(){
    getAllGuests();
    var token = $('#csrf_token').attr('content');

    $('#search').on('keyup',function(){
        var search = $(this).val();
        if(search != ""){
            $.ajax({
                type: 'POST',
                cache: false,
                headers: {'X-CSRF-TOKEN' : token}, 
                url: "search",
                data: {search:search},
                success: function (data) {      
                    resetAll();
                    buildGuestsTable(data); 
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });
        }else{
            getAllGuests();
        }
    });
    
});

function createNewGest(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var gender = $('#gender').val();
    var intend = $('#intend').val();
    var token = $('#csrf_token').attr('content');
    
    if(first_name && last_name && email && phone && gender){
         var guest = {first_name:first_name,last_name:last_name,email:email,phone:phone,gender:gender,intend:intend};
        $.ajax({
            type: 'POST',
            cache: false,
            headers: {'X-CSRF-TOKEN' : token}, 
            url: "createNewGest",
            data: guest,
            success: function (data) {      
                console.log(data);
                resetAll();
                getAllGuests();
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }
}

function getAllGuests(){
    $.ajax({
            type: 'GET',
            url: "getGuests",
            success: function (data) {  
                buildGuestsTable(data);    
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
}

function buildGuestsTable(guests){
    if(guests.length > 0){
        var html = "<table class='guests_table'>";
                html += "<tr>";
                    html += "<th class='edit_col'>Del</th><th class='edit_col'>Edit</th><th>First Name</th><th>Last Name</th><th>Phone</th><th>Email</th><th>Gender</th><th>Intend</th>";
                html += "</tr>";
                $(guests).each(function(){
                    var intend = (this.intend)?'yes':'no';
                    html += "<tr>";
                        html += "<td><a onclick=del("+ this.id +");><i class='fa fa-trash'></i></a></td><td><a onclick=edit("+ this.id +");><i class='fa fa-edit'></i></a></td><td>"+ this.first_name +"</td><td>"+ this.last_name +"</td><td>"+ this.phone +"</td><td>"+ this.email +"</td><td>"+ this.gender +"</td><td>"+ intend +"</td>";
                    html += "</tr>";
                });
            html += "</table>";
            $('.table_con').html(html);
    }
}

function edit(guest_id){
    var token = $('#csrf_token').attr('content');
    $.ajax({
            type: 'POST',
            cache: false,
            headers: { 'X-CSRF-TOKEN' : token }, 
            url: "getGuestById",
            data:{guest_id:guest_id},
            success: function (data) {  
                $('#edit_id').val(data[0].id);
                $('#first_name').val(data[0].first_name);
                $('#last_name').val(data[0].last_name);
                $('#email').val(data[0].email);
                $('#phone').val(data[0].phone);
                $('#gender').val(data[0].gender);
                $('#intend').val(data[0].intend);
                $('#create_btn').hide();
                $('#update_btn').show();
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
}

function del(guest_id){
    var token = $('#csrf_token').attr('content');
    if(confirm("Are you sure you want to delete this record??")){
        $.ajax({
            type: 'POST',
            cache: false,
            headers: { 'X-CSRF-TOKEN' : token }, 
            url: "delGuestById",
            data:{guest_id:guest_id},
            success: function (data) {  
                resetAll();
                if($('#search').val() != ''){
                    $('#search').trigger('keyup');
                }else{
                    getAllGuests();
                }   
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
    }
}

function updateGest(){
    var guest_id = $('#edit_id').val();
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var gender = $('#gender').val();
    var intend = $('#intend').val();
    var token = $('#csrf_token').attr('content');

     if(first_name && last_name && email && phone && gender && guest_id){
        var guest = {id:guest_id,first_name:first_name,last_name:last_name,email:email,phone:phone,gender:gender,intend:intend};
        $.ajax({
            type: 'POST',
            cache: false,
            headers: {'X-CSRF-TOKEN' : token}, 
            url: "updateGest",
            data: guest,
            success: function (data) {      
                resetAll();
                if($('#search').val() != ''){
                    $('#search').trigger('keyup');
                }else{
                    getAllGuests();
                }         
            },
            error: function (xhr) {
                console.log(xhr);
            }
        });
     }
}

function resetAll(){
    $('#edit_id').val("");
    $('#first_name').val("");
    $('#last_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#gender').val('Unspecified');
    $('#intend').val(1);
    $('#create_btn').show();
    $('#update_btn').hide();
}
