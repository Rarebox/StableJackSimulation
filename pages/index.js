import React from 'react';
import ProtocolSimulation from './protocol-simulation';
import TradingSimulation from './trading-simulation';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Stable Jack Simulations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Protocol Simulation */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <ProtocolSimulation />
        </div>

        {/* Trading Simulation */}
        <div className="bg-white p-4 rounded-md shadow-md">
          <TradingSimulation />
        </div>
      </div>
    </div>
  );
};

export default Index;