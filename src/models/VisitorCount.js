// models/VisitorCount.js
import mongoose from "mongoose";

const VisitorCountSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  visitors: [
    {
      id: { type: String, required: true, unique: true },
      date: { type: Date, required: true },
    }
  ],
});

export default mongoose.models.VisitorCount || mongoose.model("VisitorCount", VisitorCountSchema);
