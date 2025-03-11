import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card';


const SubmissionTimer = () => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        const startDate = new Date('2025-03-11T00:00:00Z').getTime();
        const endDate = startDate + 24 * 60 * 60 * 1000;

        const updateTimer = () => {
            const now = new Date().getTime();
            let target = startDate;
            let prefix = 'Starts in: ';

            if (now >= startDate) {
                target = endDate;
                prefix = 'Time left: ';
                if (now >= endDate) {
                    setTimeLeft('Hackathon has ended');
                    return;
                }
            }

            const distance = target - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(
                `${prefix}${days}d ${hours}h ${minutes}m ${seconds}s`
            );
        };

        updateTimer(); // Initial call
        const interval = setInterval(updateTimer, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="absolute top-20 right-44">
            <Card className="bg-gray-900 border-gray-800 shadow-lg">
                <CardContent className="p-2">
                    <p className="text-sm text-white">{timeLeft}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default SubmissionTimer