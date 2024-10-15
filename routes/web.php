<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home.index');

Route::prefix('dashboard')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('AdminHome');
    })->name('dashboard.home');
    Route::get('/kategori', [CategoryController::class, 'index'])->name('kategori.index');
    Route::post('/kategori', [CategoryController::class, 'store'])->name('kategori.store');
    Route::patch('/kategori/{id}', [CategoryController::class, 'update'])->name('kategori.update');
    Route::delete('/kategori/{id}', [CategoryController::class, 'destroy'])->name('kategori.destroy');
    Route::get('/sertifikat', [CertificateController::class, 'index'])->name('sertifikat.index');
    Route::get('/downloadtemplatesertifikat', [CertificateController::class, 'downloadTemplate'])->name('sertifikat.downloadTemplate');
    Route::post('/sertifikatOne', [CertificateController::class, 'storeOne'])->name('sertifikat.storeOne');
    Route::post('/sertifikat', [CertificateController::class, 'store'])->name('sertifikat.store');
    Route::patch('/sertifikat/{id}', [CertificateController::class, 'update'])->name('sertifikat.update');
    Route::delete('/sertifikat/{id}', [CertificateController::class, 'destroy'])->name('sertifikat.destroy');
})->middleware('auth');

require __DIR__ . '/auth.php';
