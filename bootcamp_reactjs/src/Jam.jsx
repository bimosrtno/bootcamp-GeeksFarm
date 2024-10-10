// lifecyle method


// useEffect
import React, { useState, useEffect } from 'react';

// jam 
const JAM = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString()); // Inisialisasi state dengan waktu saat ini
    // toLocaleTimeString() untuk menampilkan waktu sesuai dengan pengaturan lokal.

    // useEffect 
    useEffect(() => {
        // Memperbarui state setiap detik
        const timerID = setInterval(() => {
            setTime(new Date().toLocaleTimeString()); // Mengupdate state dengan waktu terbaru
        }, 1000); // 1 detik

        // Clean up timer ketika di-unmount
        return () => {
            clearInterval(timerID);
        };
    }, []); // Empty dependency array: useEffect hanya berjalan sekali saat mount

    return (
        <div> {time} </div> // Menampilkan waktu
    );
};


export default JAM;
