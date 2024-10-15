<?php

namespace App\Imports;

use App\Models\Certificate;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CertificateImport implements ToModel, WithHeadingRow
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
            'nim' => $row['nim'],
            'nama_lengkap' => $row['nama_lengkap'],
            'program_studi' => $row['program_studi'],
            'link' => $row['link']
        ]);
    }
}
