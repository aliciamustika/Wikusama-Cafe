import React from 'react';
import Navbar from '../../components/navbar'; // Naik dua level ke src dan kemudian ke components

function Nota() {
    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white p-8 border border-black w-[600px]">
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h1 class="text-2xl font-bold text-red-800">Wikusama <span class="text-black">Cafe</span></h1>
                        <p class="text-sm">Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang,<br/>Kota Malang, Jawa Timur</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm">Cashier: Narendra Tama</p>
                        <p class="text-sm">12 September 2024</p>
                    </div>
                </div>
                <div class="border-t border-b border-black py-2 mb-4">
                    <p>Pemesan: Sachiadra Dewi | ID: 5</p>
                </div>
                <table class="w-full border-collapse border border-black mb-4">
                    <thead>
                        <tr>
                            <th class="border border-black p-2">NO</th>
                            <th class="border border-black p-2">ITEM</th>
                            <th class="border border-black p-2">QTY</th>
                            <th class="border border-black p-2">PRICE</th>
                            <th class="border border-black p-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-black p-2 text-center">1</td>
                            <td class="border border-black p-2">COFFEE</td>
                            <td class="border border-black p-2 text-center">1</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">2</td>
                            <td class="border border-black p-2">DESERTS</td>
                            <td class="border border-black p-2 text-center">1</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">3</td>
                            <td class="border border-black p-2">MAIN COURSE</td>
                            <td class="border border-black p-2 text-center">1</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                            <td class="border border-black p-2 text-right">IDR 0.000</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2">&nbsp;</td>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2">&nbsp;</td>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2">&nbsp;</td>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2">&nbsp;</td>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2">&nbsp;</td>
                            <td class="border border-black p-2 text-center">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                            <td class="border border-black p-2 text-right">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-between mb-2">
                    <p class="text-sm">Sub Total</p>
                    <p class="text-sm">IDR 0.000</p>
                </div>
                <div class="flex justify-between mb-4">
                    <p class="font-bold text-lg">Total Amount</p>
                    <p class="font-bold text-lg">IDR 0.000</p>
                </div>
                <p class="text-center">TERIMA KASIH SUDAH MEMESAN</p>
            </div>
        </div>
    );
}

export default Nota;