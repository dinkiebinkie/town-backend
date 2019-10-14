module.exports = (sequelize, DataTypes) => {
  const Tweet = sequelize.define("Tweet", {
    sha: { type: DataTypes.STRING(40), allowNull: false },
    job_id: { type: DataTypes.BIGINT(15), allowNull: false },
    tweet_id: { type: DataTypes.BIGINT(15), allowNull: false },
    tweet: { type: DataTypes.STRING(500), allowNull: false },
    time_created: { type: DataTypes.DATE(), allowNull: false },
    time_tweeted: { type: DataTypes.DATE(), allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: true } // tweeted true false
  });
};
