import * as universitiesService from './universities.service.js';

export const listUniversities = async (req, res) => {
  const result = await universitiesService.listUniversities();
  return res.status(result.status).json(result.body);
};

export const listScholarships = async (req, res) => {
  const result = await universitiesService.listScholarships();
  return res.status(result.status).json(result.body);
};