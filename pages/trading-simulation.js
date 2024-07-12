import React from 'react';
import useStore from '../store';
import Input from '../components/Input';
import Output from '../components/Output';

const TradingSimulation = () => {
  const {
    amountOfAVAXDepositedByUser,
    setAmountOfAVAXDepositedByUser,
    changeInAVAXPrice,
    setChangeInAVAXPrice,
    // Fonksiyonları store'dan al
    calculateXAVAXMinted,
    calculateValueXAVAXPosition,
    calculateNewAVAXPrice,
    calculateNewXAVAXPositionValue,
    calculateAmountOfAVAXUserHave,
    calculateIncreaseDecreaseDollarValue,
    calculateIncreaseDecreaseAVAXValue,
  } = useStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trading Simulation</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Input Alanları */}
        <Input
          label="Amount of AVAX Deposited by the User"
          value={amountOfAVAXDepositedByUser}
          setValue={setAmountOfAVAXDepositedByUser}
          type="number"
        />
        <Input
          label="Change in AVAX Price (%)"
          value={changeInAVAXPrice * 100} // Yüzde olarak göster
          setValue={setChangeInAVAXPrice} 
          type="number"
          onChange={(e) => setChangeInAVAXPrice(parseFloat(e.target.value) / 100)} // Değeri yüzdeden ondalık sayıya dönüştür
        />

        {/* Output Alanları */}
        <Output label="xAVAX Minted" value={calculateXAVAXMinted()} />
        <Output
          label="Value of the xAVAX Position of the User"
          value={calculateValueXAVAXPosition()}
        />
        <Output label="New xAVAX Price" value={calculateNewAVAXPrice()} />
        <Output
          label="New Value of the xAVAX Position of the User"
          value={calculateNewXAVAXPositionValue()}
        />
        <Output
          label="Amount of AVAX User Have"
          value={calculateAmountOfAVAXUserHave()}
        />
        <Output
          label="Increase/Decrease in Dollar Value"
          value={`${calculateIncreaseDecreaseDollarValue().toFixed(2)}%`}
        />
        <Output
          label="Increase/Decrease in AVAX Value"
          value={`${calculateIncreaseDecreaseAVAXValue().toFixed(2)}%`}
        />
      </div>
    </div>
  );
};

export default TradingSimulation;