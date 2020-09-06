<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="../resources/css/style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js'></script>   
        <meta id='csrf_token' name="csrf-token" content="{{ csrf_token() }}">

    </head>
    <body>
        <div class="container">
            <h2 class='main_title'>Wedding Guests List</h2>
            <div class='inputs_div row'>
                <div class='col-lg-2 col-sm-12'>
                    <label for="first_name">First Name</label>
                    <input type="text" id='first_name'>
                </div>
                <div class='col-lg-2 col-sm-12'>
                    <label for="last_name">Last Name</label>
                    <input type="text" id='last_name'>
                </div>
                <div class='col-lg-2 col-sm-12'>
                    <label for="email">Email</label>
                    <input type="text" id='email'>
                </div>
                <div class='col-lg-2 col-sm-12'>
                    <label for="phone">Phone</label>
                    <input type="text" id='phone'>
                </div>
                <div class='col-lg-2 col-sm-12'>
                    <label for="gender">Gender</label>
                    <select id="gender">
                        <option value="Unspecified">Unspecified</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class='col-lg-2 col-sm-12'>
                    <label for="intend">Intend</label>
                    <select id="intend">
                        <option value="1">YES</option>
                        <option value="0">NO</option>
                    </select>
                </div>
                <input type="hidden" class='form-control' id='edit_id'>
                <button type='button' class='btn btn-success' id='create_btn' onclick='createNewGest();' disabled>Create New Guest</button>
                <button type='button' class='btn btn-primary' id='update_btn' onclick='updateGest();'>Update Guest</button>
                <div class="error_div">
                    
                </div>
            </div> 
            <div class='search_div row'>
                <label for="intend">Search For Guest</label>
                <input type="text" id='search'>
            </div>
            <div class='table_con row'>

            </div>   
        </div>
    </body>
</html>

<script src='../resources/js/guest.js'></script>
