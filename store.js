import { create } from 'zustand';

const useStore = create((set) => ({
  // Başlangıç Durumu
  avaxPrice: 30, // B2
  aUSDInCirculation: 2000000, // B6
  xAVAXInCirculation: 575802, // B9
  // Değişmeyen Sabit Değer
  amountOfAVAXDepositedIntoProtocol: 90000, // B3
  amountOfAVAXDepositedByUser: 100, // Trading Simulation için
  changeInAVAXPrice: 0.1, // Trading Simulation için (Ondalık olarak)

  // Fonksiyonlar:
  setAVAXPrice: (newPrice) => set({ avaxPrice: newPrice }),
  setAUSDInCirculation: (newAmount) => set({ aUSDInCirculation: newAmount }),
  setXAVAXInCirculation: (newAmount) => set({ xAVAXInCirculation: newAmount }),
  setAmountOfAVAXDepositedByUser: (newAmount) =>
    set({ amountOfAVAXDepositedByUser: newAmount }),
  setChangeInAVAXPrice: (newChange) =>
    set({ changeInAVAXPrice: newChange / 100 }), // Trading Simulation için (Yüzde olarak girdi alınırken ondalık sayıya dönüştür)

  setAmountOfAVAXDepositedIntoProtocol: (newAmount) =>
    set({ amountOfAVAXDepositedIntoProtocol: newAmount }), // Yeni fonksiyon
  // Hesaplama Fonksiyonları (Exceldeki Formüllere Göre)
  calculateTotalValueAVAXCollateral: () => {
    // B4 = AVAX Price x Amount of AVAX Deposited into the Protocol
    const { avaxPrice, amountOfAVAXDepositedIntoProtocol } =
      useStore.getState();
    return avaxPrice * amountOfAVAXDepositedIntoProtocol;
  },
  calculateAUSDMarketCap: () => {
    // B5 = IF(B12>100%;B6;B4)
    const {
      aUSDInCirculation,
      calculateTotalValueAVAXCollateral,
      calculateCollateralizationRatio,
    } = useStore.getState();
    const collateralizationRatio =
      calculateCollateralizationRatio() * 100; // Yüzde olarak hesaplamak için
    return collateralizationRatio > 100
      ? aUSDInCirculation
      : calculateTotalValueAVAXCollateral();
  },
  calculateAUSDPrice: () => {
    // B7 = IF(B4 > B5 ;1 ; B4/B6)
    const {
      aUSDInCirculation,
      calculateTotalValueAVAXCollateral,
      calculateAUSDMarketCap,
    } = useStore.getState();
    const totalValueAVAXCollateral = calculateTotalValueAVAXCollateral();
    const aUSDMarketCap = calculateAUSDMarketCap();
    return totalValueAVAXCollateral > aUSDMarketCap
      ? 1
      : totalValueAVAXCollateral / aUSDInCirculation;
  },
  calculateXAVAXMarketCap: () => {
    // B8 = IF (B4- (B6x1) > 0 ;B4-B5 ; 0)
    const {
      aUSDInCirculation,
      calculateTotalValueAVAXCollateral,
      calculateAUSDMarketCap,
    } = useStore.getState();
    const totalValueAVAXCollateral = calculateTotalValueAVAXCollateral();
    const aUSDMarketCap = calculateAUSDMarketCap();
    return totalValueAVAXCollateral - aUSDInCirculation * 1 > 0
      ? totalValueAVAXCollateral - aUSDMarketCap
      : 0;
  },
  calculateXAVAXPrice: () => {
    // B10 = if(B4 >= B5; B8/B9; 0)
    const {
      xAVAXInCirculation,
      calculateTotalValueAVAXCollateral,
      calculateAUSDMarketCap,
      calculateXAVAXMarketCap,
    } = useStore.getState();
    const totalValueAVAXCollateral = calculateTotalValueAVAXCollateral();
    const aUSDMarketCap = calculateAUSDMarketCap();
    const xAVAXMarketCap = calculateXAVAXMarketCap();
    return totalValueAVAXCollateral >= aUSDMarketCap
      ? xAVAXMarketCap / xAVAXInCirculation
      : 0;
  },
  calculateLeverage: () => {
    // B11 = IF (B8 <= 0 ; "Infinite" ; ((B5+B8)/B8))
    const { calculateXAVAXMarketCap, calculateAUSDMarketCap } = useStore.getState();
    const xAVAXMarketCap = calculateXAVAXMarketCap();
    const aUSDMarketCap = calculateAUSDMarketCap();
    return xAVAXMarketCap <= 0
      ? 'Infinite'
      : (aUSDMarketCap + xAVAXMarketCap) / xAVAXMarketCap;
  },
  calculateCollateralizationRatio: () => {
    // B12 = B4/B6
    const {
      avaxPrice,
      aUSDInCirculation,
      amountOfAVAXDepositedIntoProtocol,
    } = useStore.getState();
    return (
      (avaxPrice * amountOfAVAXDepositedIntoProtocol) / aUSDInCirculation
    );
  },
  calculateXAVAXMinted: () => {
    // E3 = (E2xB2)/B10
    const { amountOfAVAXDepositedByUser, avaxPrice } = useStore.getState();
    const xAVAXPrice = useStore.getState().calculateXAVAXPrice();
    return (amountOfAVAXDepositedByUser * avaxPrice) / xAVAXPrice;
  },
  calculateValueXAVAXPosition: () => {
    // E4 = E3xB10
    const xAVAXMinted = useStore.getState().calculateXAVAXMinted();
    const xAVAXPrice = useStore.getState().calculateXAVAXPrice();
    return xAVAXMinted * xAVAXPrice;
  },
  calculateNewAVAXPrice: () => {
    // E6 = ((B4+B4xE5)-B5)/B9
    const { changeInAVAXPrice } = useStore.getState();
    const totalValueAVAXCollateral = useStore.getState().calculateTotalValueAVAXCollateral();
    const aUSDMarketCap = useStore.getState().calculateAUSDMarketCap();
    const xAVAXInCirculation = useStore.getState().xAVAXInCirculation;
    return ((totalValueAVAXCollateral + totalValueAVAXCollateral * changeInAVAXPrice) - aUSDMarketCap) / xAVAXInCirculation; 
  },
  calculateNewXAVAXPositionValue: () => {
    // E7 = E6xE3
    const newAVAXPrice = useStore.getState().calculateNewAVAXPrice();
    const xAVAXMinted = useStore.getState().calculateXAVAXMinted();
    return newAVAXPrice * xAVAXMinted;
  },
  calculateAmountOfAVAXUserHave: () => {
    // E8 = E7 / (B2 + (B2 x E5))
    const { avaxPrice, changeInAVAXPrice } = useStore.getState();
    const newValueXAVAXPosition = useStore.getState().calculateNewXAVAXPositionValue();
    return newValueXAVAXPosition / (avaxPrice + (avaxPrice * changeInAVAXPrice));
  },
  calculateIncreaseDecreaseDollarValue: () => {
    // E9 =(E7-E4)/E4
    const newValueXAVAXPosition = useStore.getState().calculateNewXAVAXPositionValue();
    const valueXAVAXPosition = useStore.getState().calculateValueXAVAXPosition();
    return ((newValueXAVAXPosition - valueXAVAXPosition) / valueXAVAXPosition) * 100;
  },
  calculateIncreaseDecreaseAVAXValue: () => {
    // E10 =(E8-E2)/E2
    const { amountOfAVAXDepositedByUser } = useStore.getState();
    const amountOfAVAXUserHave = useStore.getState().calculateAmountOfAVAXUserHave();
    return ((amountOfAVAXUserHave - amountOfAVAXDepositedByUser) / amountOfAVAXDepositedByUser) * 100;
  },
}));

export default useStore;