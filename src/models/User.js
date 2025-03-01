const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number, // Auto-incremented manually
  name: { type: String, required: true },
  type: { type: String, enum: ["doctor", "hospital"], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  phone: { type: String, required: true },
  age: { type: Number },
  experience: { type: String },
  education: { type: String },
  languages: { type: String },
  specialty: { type: String },
  certifications: { type: String },
  publications: { type: String },
  researchInterests: { type: String },
  professionalMemberships: { type: String },
  awards: { type: String },
  isApproved: { type: Boolean, default: false },
  
  documents: [
    {
      name: String,
      url: String,
    },
  ],
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.id) {
    const lastUser = await mongoose.model("User").findOne().sort({ id: -1 });
    this.id = lastUser ? lastUser.id + 1 : 1;
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
