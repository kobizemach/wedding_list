$(document).ready(function(){
    client_side_validator = 1;
    getAllGuests();
    var token = $('#csrf_token').attr('content');
    $('#intend, #gender').on('change', function(){
        $(this).attr('touched',true);
        checkEvent();
    });
    $('#first_name, #last_name, #email, #phone').on('keyup', function(){
        $(this).attr('touched',true);
        checkEvent();
    });
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

function clientSideVal(){
    if(client_side_validator){
        client_side_validator = 0;
        $('#client_side_validator').html('Enable client side validation');
        $('#client_side_validator').removeClass("btn-info");
        $('#client_side_validator').addClass("btn-warning");
        $('.error_div').html("");
        checkEvent();
    }else{
        client_side_validator = 1;
        $('#client_side_validator').html('Disable client side validation');
        $('#client_side_validator').removeClass("btn-warning");
        $('#client_side_validator').addClass("btn-info");
        checkEvent();
    }
}

function checkEvent(){
    if(client_side_validator){
        if(formValidation()){
            var g = formValidation();
            if(g.first_name != '' && g.last_name != '' && g.email != '' && g.phone != '' && g.gender != '' && g.intend != ''){
                $("#create_btn, #update_btn").attr('disabled', false);
            }else{
                $("#create_btn, #update_btn").attr('disabled', true);
            }
        }else{
            $("#create_btn, #update_btn").attr('disabled', true);
        }
    }else{
        $("#create_btn, #update_btn").attr('disabled', false);
    }
}

function createNewGest(){

    var first_name = $('#first_name').val();

    var last_name = $('#last_name').val();

    var email = $('#email').val();

    var phone = $('#phone').val();

    var gender = $('#gender').val();

    var intend = $('#intend').val();

    var token = $('#csrf_token').attr('content');

    var guest = {first_name:first_name,last_name:last_name,email:email,phone:phone,gender:gender,intend:intend};

    $.ajax({

        type: 'POST',

        cache: false,

        headers: {'X-CSRF-TOKEN' : token}, 

        url: "createNewGest",

        data: guest,

        success: function (data) {      
            if(!data.res){
                buildErrorDiv(data);
            }else{
                resetAll();
                getAllGuests();
            }
        },

        error: function (xhr) {

            console.log(xhr);

        }

    });
}

function buildErrorDiv(data){
    var html = "<div class='alert alert-danger'>";
    var ans = data.ans;
    for (var k in ans) {
        if (ans.hasOwnProperty(k)) {
            html += "<div>"+ k + ': '+ ans[k] +"</div>";
        }
    }
    html += "</div>";
    $('.error_div').html(html);
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

                $('.error_div').html("");

                $("#create_btn, #update_btn").attr('disabled', false);

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

    var guest = {id:guest_id,first_name:first_name,last_name:last_name,email:email,phone:phone,gender:gender,intend:intend};

        $.ajax({

            type: 'POST',

            cache: false,

            headers: {'X-CSRF-TOKEN' : token}, 

            url: "updateGest",

            data: guest,

            success: function (data) {        
                if(!data.res){
                    buildErrorDiv(data);
                }else{
                    resetAll();
                    if($('#search').val() != ''){
                        $('#search').trigger('keyup');
                    }else{
                        getAllGuests();
                    }   
                }                              
            },

            error: function (xhr) {

                console.log(xhr);

            }

        });

}



function resetAll(){
    $('.error_div').html("");

    $('#edit_id').val("");

    $('#first_name').val("");

    $('#last_name').val("");

    $('#email').val("");

    $('#phone').val("");

    $('#gender').val('Unspecified');

    $('#intend').val(1);

    $('#create_btn').show();

    $('#update_btn').hide();

    $('#first_name, #last_name, #email, #phone, #intend, #gender').attr('touched',false);

    if(client_side_validator){
        $("#create_btn, #update_btn").attr('disabled', true);
    }else{
        $("#create_btn, #update_btn").attr('disabled', false);
    }
    

}

function formValidation(){
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var gender = $('#gender').val();
    var intend = $('#intend').val();

    var err = "<div class='alert alert-danger'>";
    var check = 0;
    if(first_name == "" && $('#first_name').attr('touched') == 'true'){
        err += "<div>first name: first name is required</div>";
        check = 1;
    }
    if(last_name == "" && $('#last_name').attr('touched') == 'true'){
        err += "<div>last name: last name is required</div>";
        check = 1;
    }
    if(!validateEmail(email) && $('#email').attr('touched') == 'true'){
        err += "<div>last name: email is not valid</div>";
        check = 1;
    }
    if(Number.isInteger(phone) && $('#phone').attr('touched') == 'true'){
        err += "<div>phone: phone is required</div>";
        check = 1;
    }
    if(gender == "" && $('#gender').attr('touched') == 'true'){
        err += "<div>gender: gender is required</div>";
        check = 1;
    }
    if(intend == "" && $('#intend').attr('touched') == 'true'){
        err += "<div>intend: intend is required</div>";
        check = 1;
    }
    err += "</div>";
    if(check){
        $('.error_div').html(err);
        return false;
    }else{
        $('.error_div').html("");
        var guest = {first_name:first_name,last_name:last_name,email:email,phone:phone,gender:gender,intend:intend};
        return guest;
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
