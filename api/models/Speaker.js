import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lecture_title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    yt_link: {
      type: String,
    },
    type: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming'
    },
    priority_number: {
      type: Number,
      default: 0
    },
    cloudinaryId: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Speaker', SpeakerSchema);
