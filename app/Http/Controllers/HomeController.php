<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $dataCategories = Category::all();
        $dataCertificates = Certificate::all();

        $view = [
            'dataCategories' => $dataCategories,
            'dataCertificates' => $dataCertificates
        ];

        return Inertia::render('HomePage', compact('view'));
    }
}
