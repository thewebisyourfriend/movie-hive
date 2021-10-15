import TMDBConstants from "../../../shared/routes/tmdbApi";
const { TRENDING } = TMDBConstants;

export default async function handler(req, res) {
  const { page } = req.query;
  try {
    const response = await fetch(`${TRENDING.MOVIES}&page=${page}`);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ err });
  }
}
