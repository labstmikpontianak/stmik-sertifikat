<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nim" => ['required', 'string', 'max:10'],
            "nama_lengkap" => ['required', 'string', 'max:100'],
            "program_studi" => ['required', 'string',],
            "link" => ['required', 'string']
        ];
    }
}
