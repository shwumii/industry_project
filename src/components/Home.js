import React from 'react';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Component5 from './Component5';
import Component6 from './Component6';
import Component7 from './Component7';
import Component8 from './Component8';

const Home = () => {
    return (
        <React.Fragment>
        <section>
            <div className="layout text-2xl text-white">
                <div className="Component1 centered">
                    <Component1 />
                </div>
                <div className="Component2 centered">
                    <Component2 />
                </div>
                <div className="Component3 centered">
                    <Component3 />
                </div>
                <div className="Component4 centered">
                    <Component4 />
                </div>
                <div className="Component5 centered">
                    <Component5 />
                </div>
                <div className="Component6 centered">
                    <Component6 />
                </div>
                <div className="Component7 centered">
                    <Component7 />
                </div>
                <div className="Component8 centered">
                    <Component8 />
                </div>
            </div>
        </section>
        </React.Fragment>
    )
}

export default Home