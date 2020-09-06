<?php



namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use Validator;


  



class HomeController extends Controller

{
    public static $rules = [
        'first_name' => 'string|required',
        'last_name' => 'string|required',
        'phone' => 'required|numeric',
        'email' => 'email|string|required',
        'gender' => 'string|required',
        'intend' => 'string|required'
    ];


    public function createNewGest(Request $request)

    {     
        if(isset($request)){
            $validator = Validator::make($request->all(), $this::$rules);
            if ($validator->fails()) {
                return response()->json(['res' => 0, 'ans' => $validator->errors()]);
            }
            DB::table('guests')->insert($request->all());
            return response()->json(['res' => 1, 'ans' => $request->all()]);
        }

    }



    public function updateGest(Request $request)

    {     

        if(isset($_REQUEST['id'])){
            $validator = Validator::make($request->all(), $this::$rules);
            if ($validator->fails()) {
                return response()->json(['res' => 0, 'ans' => $validator->errors()]);
            }
            DB::table('guests')->where('id',$_REQUEST['id'])->update($request->all());
            return response()->json(['res' => 1, 'ans' => $request->all()]);
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
