import { FC, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from "react-router";

export const QrScanner: FC = () => {
    const navigate = useNavigate();
    const [scan, setScan] = useState({type: '', data: {}});
    const handleScan = (result) => {
        const raw = result?.[0]?.rawValue || '';
        const scan = JSON.parse(raw);

        if (scan.type === 'TRANSFER') {
            let link = `/bank/new#`;
            if (scan.data.amount) link += `amount=${scan.data.amount}&`;
            if (scan.data.title) link += `title=${scan.data.title}&`;
            if (scan.data.handle) link += `handle=${scan.data.handle}&`;
            navigate(link);
        }

        setScan(scan);
    }

    return (
        <div>
            <Scanner allowMultiple onScan={handleScan} />
            <p>{scan.type}</p>
        </div>
    )
};