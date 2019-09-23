<?php

namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use App\Http\Model\user;
use App\Http\Repositories\Repository;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $model;

    public function __construct(user $usermodel)
    {
        $this->model = new Repository($usermodel);
    }

    public function UserList()
    {
        $imgstring='data:image/jpeg;base64, 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al1qO+8P3V5bKU8uZYzz33J/Q1s2Tl7SNj1IrnLmztNL8N3VpFcxu7zI5UMM53Jxj6Cui0//AI8YvpQBZooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCrfajaabB513Msa9ADyWPoB1J+leT+M/iB/aMcllaAJbdCDgl/8Ae7fh09fSue8QahfXt1c3Sz3Nza/6oTtnAHoD/hXNmIbSzuqY6DqT9BQBWZmY8j5R0BNbOieGrzxCxXTlZmHZxgfnUmjeG7vV7mNPLYK5wFHVq948NeHoPD+nLCir5pHzsO3sKAPHk+GPiQvta3A994/xrd0z4T3pcNeyxoB1BbP8q9fooAxdF8MWGiovlJ5kg/jYdPoK2qKKACiiigAooooAKKKKACiiigAooooAKKKKACudvtFNxrH2rtx/KuiooA47X/Caai8bqOVqZvDW/Slg/iUcV1dFAHnaeGL1pBG7Hywelbl34bWTTBCv3gK6jA9KKAOS0DSbuwk2ux2V1Ui74WX1FPxRQBzVtoRi1Jpz0Jqrrnhx7ifz4OH9q6+igDhdN8MTtdLLcknHrUuteF5JpVkt+CPSu1xRQB53ZeE7r7Yk0zE49a238Ps15HL/AHa6nFFAHM6hoRubmN/7tUdX8MSTBHhOHFdpRQB53aeFbw3iSzMTtPeu/to/Kt0T0FS4ooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8E1TxExhexsot5fKE7flA9hWnofg46lHbCK3BkRf3sz9BXtFFAGVo2g2miwbYV3ykfNKw5P09BWrRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//Z';
        //    $ext='jpeg';
        //    $imgstring = trim( str_replace('data:image/'.$ext.';base64,', "", $imgstring ) );
        //    $imgstring = str_replace( ' ', '+', $imgstring );
        //    $res = base64_decode( $imgstring );
       $data = $this->model->GetAll();
        return response($data);
    }
    public function UserById($id)
    {
        $data = $this->model->GetById($id);
        return response($data);
    }
    public function UserInsert(Request $request)
    {
        try {
            $result = $this->model->Insert($request->only($this->model->GetModel()->fillable));
            $result['password'] = Hash::make($data['password']);
            $result['api_token'] = Str::random(60);
            return response(["Type" => "S", "Message" => "User inserted successfully", "AdditionalData" => [], "Id" => $result["id"]]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function UserUpdate(Request $request, $id)
    {
        try {
            $this->model->Update($request->only($this->model->GetModel()->fillable), $id);
            return response(["Type" => "S", "Message" => "User updated successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }
    public function UserDelete($id)
    {
        try {
            $this->model->Delete($id);
            return response(["Type" => "S", "Message" => "User deleted successfully"]);
        } catch (QueryException $exception) {
            return response(["Type" => "E", "Message" => $exception]);
        }
    }

    public function ValidateUser(Request $request)
    {
        $usermodel = $request->only($this->model->GetModel()->fillable);
        $data = $this->model->GetAll()->where('user_name', "=", $usermodel["user_name"])->where('password', "=", $usermodel["password"]);
        if (!$data->isEmpty()) {
            return response(["Type" => "S", "Message" => "Login successfully", "AdditionalData" => $data]);
        } else {
            return response(["Type" => "E", "Message" => "Login Failed", "AdditionalData" => ""]);
        }
    }
}
