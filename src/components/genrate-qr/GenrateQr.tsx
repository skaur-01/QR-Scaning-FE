// "useClient"
// import { compressToEncodedURIComponent } from 'lz-string';
// import { QRCodeSVG } from 'qrcode.react';
// import React from 'react'
// import { InferType } from 'yup';
// import { schema } from '../Crusher-form/CrusherWeightmentForm';
// import { useRouter } from 'next/router';
// type Props = {
//     data: InferType<typeof schema> | null;
//   };
  


// const GenrateQr: React.FC<Props> = ({ data }) => {
//     const base = window && window.location.origin;
//     console.log("---------------------router-------aaa------")
//     const payload = compressToEncodedURIComponent(JSON.stringify(data));
//     const url = `${base}/qr?d=${encodeURIComponent(payload)}`;   
    
//     console.log("172.20.10.3",url);
    
//     return (

//         <QRCodeSVG value={url} size={256} level="M" includeMargin />

//     )
// }

// export default GenrateQr


"use client"; // if using Next 13+, this must be at the top exactly like this

import { compressToEncodedURIComponent } from 'lz-string';
import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { InferType } from 'yup';
import { schema } from '../Crusher-form/CrusherWeightmentForm';

type Props = {
  data: InferType<typeof schema> | null;
};

const GenerateQr: React.FC<Props> = ({ data }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && data) {
      const base = window.location.origin;
      const payload = compressToEncodedURIComponent(JSON.stringify(data));
      const fullUrl = `${base}/qr?d=${encodeURIComponent(payload)}`;
      console.log("QR URL:", fullUrl);
      setUrl(fullUrl);
    }
  }, [data]);

  if (!url) return null; // or a loading indicator

  return <QRCodeSVG value={url} size={256} level="M" includeMargin />;
};

export default GenerateQr;
