const NewsCard = ({ article }) => {
  return (
    <div className="card">
      <h3>{article.title}</h3>

      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
