<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;

  

class HomeController extends Controller

{

    public function createNewGest()
    {     
        if(isset($_REQUEST)){
            DB::table('guests')->insert($_REQUEST);
        }
    }

    public function updateGest()
    {     
        if(isset($_REQUEST['id'])){
            DB::table('guests')->where('id',$_REQUEST['id'])->update($_REQUEST);
        }
    }

    public function delGuestById()
    {     
        $guest_id = isset($_POST['guest_id'])?$_POST['guest_id']:"";
        if($guest_id != ""){
            DB::table('guests')->where('id',$guest_id)->update(['active' => 0, 'deleted_at' => DB::raw('CURRENT_TIMESTAMP')]);
        }
    }

    public function getGuests()
    {     
        $res = DB::table('guests')->where('active', 1)->get();
        return $res;
    }

    public function getGuestById()
    {     
        $guest_id = isset($_POST['guest_id'])?$_POST['guest_id']:"";
        if($guest_id != ""){
            $res = DB::table('guests')->where('id',$guest_id)->get();
            return $res;
        }
    }

    public function search(){
        $search = isset($_POST['search'])?$_POST['search']:"";
        if($search != ""){
            $res = DB::table('guests')->where(function($query) use ($search){
                $query->where('first_name', 'like',  $search . '%');
                $query->orWhere('last_name', 'like',  $search . '%');
            })->where('active', 1)->get();
            return $res;
        }
    }
}