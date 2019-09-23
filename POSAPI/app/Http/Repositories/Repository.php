<?php namespace App\Http\Repositories;

use Illuminate\Database\Eloquent\Model;

class Repository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function GetAll()
    {
        return $this->model->all();
    }

    public function Insert(array $data)
    {
        return $data = $this->model->create($data);
    }

    public function Update(array $data, $id)
    {
        $data["updated_on"] = date('Y-m-d H:i:s');
        return $this->model->where('id', $id)->update($data);
    }

    public function Delete($id)
    {
        return $this->model->where('id', $id)->delete();
    }

    public function GetById($id)
    {
        if ($id == 0) {
                return $this->model;
            } else {
                return $this->model->findOrFail($id);
            }
    }

    public function GetModel()
    {
        return $this->model;
    }

    public function Exists($columnName, $Opratore, $Value)
    {
        return $this->model->where($columnName, $Opratore, $Value)->count();
    }

    public function Inculde($relations)
    {
        return $this->model->with($relations);
    }
}
