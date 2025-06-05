import { AIService } from "../services/index.js";

export class AIController {
  static async getQuestions(req, res) {
    try {
      const result = await AIService.getQuestions(req, res);

      if (result) {
        if (result.statusCode) {
          return res.status(result.statusCode).json(result.json);
        } else {
          return res.json(result.json);
        }
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong.",
      });
    }
  }

  static async getReport(req, res) {
    try {
      const result = await AIService.getReport(req, res);

      if (result) {
        if (result.statusCode) {
          return res.status(result.statusCode).json(result.json);
        } else {
          return res.json(result.json);
        }
      } else {
        return res.status(500).json({
          success: false,
          message: "Something went wrong.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong.",
      });
    }
  }
}
