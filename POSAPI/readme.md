
## Setup
    1. composer update
    2. change env file as per ypur database configuration
    3. open file "*\vendor\laravel\framework\src\Illuminate\Database\Schema\Blueprint.php"
    Add below function 
    public function BaseEntity()
    {
        $this->bigIncrements("id");
        $this->bigInteger("created_by_id");
        $this->dateTime("created_on")->useCurrent();
        $this->bigInteger("updated_by_id")->nullable();
        $this->dateTime("updated_on")->nullable();
        $this->bigInteger("company_id")->default(0);
    }
    4. php artisam migrate
    5. php artisan db:seed
    6. username : sadmin password : 123
