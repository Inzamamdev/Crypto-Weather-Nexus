const CryptoCard = ({ crypto, name }) => {
  return (
    <div className="card">
      <h3>{name.toUpperCase()}</h3>
      <p>💰 Price: ${crypto.usd.toFixed(2)}</p>
      <p>📉 24h Change: {crypto.usd_24h_change.toFixed(2)}%</p>
      <p>🏦 Market Cap: ${Math.round(crypto.usd_market_cap / 1e9)}B</p>
    </div>
  );
};

export default CryptoCard;
