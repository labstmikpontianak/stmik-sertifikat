<?php

namespace App\Imports;

use App\Models\Certificate;
use Maatwebsite\Excel\Concerns\ToModel;

class CertificateImport implements ToModel
{

    protected $request;

    public function __construct($request)
    {
        $this->request = $request;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Certificate([
            'category_id' => $this->request->input('category_id'),
            'nim' => $row[0],
            'nama_lengkap' => $row[1],
            'program_studi' => $row[2],
            'link' => $row[3]
        ]);
    }
}
