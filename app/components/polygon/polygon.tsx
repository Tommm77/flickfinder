import React from 'react';

type PositionProps = {
    leftPercentage: number;
    topPercentage: number;
    opacity?: number;
};

export const CustomPolygon = ({ leftPercentage, topPercentage }: PositionProps) => {
    const leftValue = `calc(${leftPercentage}%+3rem)`;
    const leftValueSm = `calc(${leftPercentage}%+36rem)`;
    const topValue = `calc(${topPercentage}%-13rem)`;
    const topValueSm = `calc(${topPercentage}%-30rem)`;

    return (
        <div
            className={`absolute inset-x-0 top-[${topValue}] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[${topValueSm}]`}
            aria-hidden="true"
        >
            <div
                className={`relative left-[${leftValue}] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#00ff00] via-[#00cc00] to-[#009900] opacity-15 sm:left-[${leftValueSm}] sm:w-[72.1875rem]`}
                style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div>
    );
};
