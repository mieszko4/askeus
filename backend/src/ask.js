const QnaMakerClient = require('./qna-maker-client');

module.exports = async (req, res) => {
  const { query } = req;
  const { question } = query;
  const answer = await QnaMakerClient.ask(question);
  res.send(answer);
};
