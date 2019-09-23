<?php

namespace App\Http\Repositories;

interface RepositoryInterface
{
    public function GetAll();

    public function Insert(array $data);

    public function Update(array $data, $id);

    public function Delete($id);

    public function GetById($id);
    
    public function GetModel();
    public function Inculde($relations);
}
