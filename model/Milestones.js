import mongoose from "mongoose";


const milestonesSchema = new mongoose.Schema({

    bid: { type: String, required: true  },

    milestones: { type: String, required: true},


}, { timestamps: true });





const Milestones = mongoose.model("Milestones", milestonesSchema);

export default Milestones;