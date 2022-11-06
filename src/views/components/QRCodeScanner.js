import React, { useState, useCallback, useEffect, memo } from "react";
import QrScanner from "qr-scanner";


function QrCodeScanner({
    onDecode,
    onDecodeError,
    options = {
        width: 320,
        height: 280,
        maxScansPerSecond: 1,
        returnDetailedScanResult: true,
        preferredCamera: "environment",
    }
}) {

    const [ videoRef, setVideoRef ] = useState(null);

    const ref = useCallback(node => {
        setVideoRef(node);
    }, []);


    useEffect(()=> {
        if (!videoRef) return;

        const scanner = new QrScanner(videoRef, onDecode, {
            ...options,
            onDecodeError,
        }); 
        scanner.start();

        return ()=> {
            scanner.stop(); 
        };
    }, [videoRef, onDecode, onDecodeError, options]);


    return <>
        <video 
            ref={ref} 
            style={{ width: options.width, height: options.height }} 
        />
    </>
}


export default memo(QrCodeScanner);