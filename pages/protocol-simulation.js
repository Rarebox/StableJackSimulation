import React from 'react';
import useStore from '../store';
import Input from '../components/Input';
import Output from '../components/Output';

const ProtocolSimulation = () => {
  const {
    avaxPrice,
    setAVAXPrice,
    aUSDInCirculation,
    setAUSDInCirculation,
    xAVAXInCirculation,
    setXAVAXInCirculation,
    calculateTotalValueAVAXCollateral,
    calculateAUSDMarketCap,
    calculateAUSDPrice,
    calculateXAVAXMarketCap,
    calculateXAVAXPrice,
    calculateLeverage,
    calculateCollateralizationRatio,
    amountOfAVAXDepositedIntoProtocol, // Store'dan alınıyor
  } = useStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Protocol Simulation</h1>
      <p className="mb-4">
        You can change the AVAX price, the amount of aUSD in circulation, and the
        amount of xAVAX in circulation to see different scenarios.
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Input Alanları */}
        <Input label="AVAX Price" value={avaxPrice} setValue={setAVAXPrice} />
        <Input
          label="Amount of aUSD in circulation"
          value={aUSDInCirculation}
          setValue={setAUSDInCirculation}
          type="number"
        />
        <Input
          label="Number of xAVAX in circulation"
          value={xAVAXInCirculation}
          setValue={setXAVAXInCirculation}
          type="number"
        />

        {/* Output Alanları */}
        <Output
          label="Amount of AVAX Deposited into the Protocol"
          value={amountOfAVAXDepositedIntoProtocol} // Sabit değer gösteriliyor
        />
        <Output
          label="Total Value of AVAX Collateral of the Protocol"
          value={calculateTotalValueAVAXCollateral()}
        />
        <Output label="aUSD Market Cap" value={calculateAUSDMarketCap()} />
        <Output label="aUSD Price" value={calculateAUSDPrice()} />
        <Output label="xAVAX Market Cap:" value={calculateXAVAXMarketCap()} />
        <Output label="xAVAX Price" value={calculateXAVAXPrice()} />
        <Output label="Leverage" value={calculateLeverage()} />
        <Output
          label="Collateralization Ratio"
          value={`${(calculateCollateralizationRatio() * 100).toFixed(2)}%`} // Yüzde olarak göster
        />
      </div>
    </div>
  );
};

export default ProtocolSimulation;