<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\StoreOneCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Imports\CertificateImport;
use App\Models\Category;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = Certificate::with('categories')->orderBy('created_at', 'DESC')->get();
        $cdata = Category::latest()->get();
        return Inertia::render('AdminCertificate', compact('data', 'cdata'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeOne(StoreOneCertificateRequest $request): RedirectResponse
    {
        Certificate::create([
            "category_id" => $request->category_id,
            "nim" => $request->nim,
            "nama_lengkap" => $request->nama_lengkap,
            "program_studi" => $request->program_studi,
            "link" => $request->link
        ]);

        return Redirect::route('sertifikat.index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request): RedirectResponse
    {
        Excel::import(new CertificateImport($request), $request->file('file'));

        return Redirect::route('sertifikat.index');
    }

    /**
     * Download Excel Template
     */
    public function downloadTemplate()
    {
        $path = public_path('assets/Template-Upload.xlsx');

        return response()->download($path);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, $id): RedirectResponse
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->update($request->all());

        return Redirect::route('sertifikat.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();

        return Redirect::route('sertifikat.index');
    }
}
