import React from 'react';

const NotFound = () => {
    return (
        <main className={"flex flex-col items-center justify-center h-screen"}>
            <h1 className={"text-4xl font-bold text-center"}>404 - Page Not Found</h1>
            <p className={"text-lg text-center"}>The page you are looking for does not exist.</p>
        </main>
    );
};

export default NotFound;