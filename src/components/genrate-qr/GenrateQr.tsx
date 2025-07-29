import { compressToEncodedURIComponent } from 'lz-string';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react'



const GenrateQr = ({ data }) => {
    const base = process.env.NEXT_PUBLIC_BASE_URL!;
    const payload = compressToEncodedURIComponent(JSON.stringify(data));
    const url = `${base}/qr?d=${encodeURIComponent(payload)}`;   
    
    console.log("172.20.10.3",url);
    
    return (

        <QRCodeSVG value={url} size={256} level="M" includeMargin />

    )
}

export default GenrateQr