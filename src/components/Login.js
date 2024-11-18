// src/components/Login.js
import React from 'react';
import LComponent1 from './LComponent1'; // Ensure these paths are correct
import LComponent2 from './LComponent2';

const Login = () => { // Rename to Login to match the export
    return (
        <React.Fragment>
            <section>
                <div className="layout text-2xl text-white">
                    <div className="LComponent1 centered">
                        <LComponent1 />
                    </div>
                    <div className="LComponent2 centered"> {/* Ensure this matches your component name */}
                        <LComponent2 />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Login; // Export the Login component
