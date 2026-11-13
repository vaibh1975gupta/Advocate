
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEnquiry extends Document {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  practiceArea: string;
  preferredTime: string;
  message: string;
  disclaimerConsent: boolean;
  status: "New" | "Contacted" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    practiceArea: {
      type: String,
      required: true,
      trim: true,
    },

    preferredTime: {
      type: String,
      default: "Anytime",
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    disclaimerConsent: {
      type: Boolean,
      required: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Completed"],
      default: "New",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry: Model<IEnquiry> =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
