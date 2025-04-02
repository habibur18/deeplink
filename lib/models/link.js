import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    customSlug: {
      type: Boolean,
      default: false,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domain: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
)

// Check if the model is already defined to prevent overwriting during hot reloads
const Link = mongoose.models.Link || mongoose.model("Link", LinkSchema)

export default Link

