import DBconnection  from '../../../utils/DBConnection';
import Milestones  from '../../../model/Milestones';

import Joi from "joi";
import bcrypt from "bcrypt";

const schema = Joi.object({
    bid: Joi.string().required(),
    milestones: Joi.string().required(),
});



export default async (req, res) => {
    await DBconnection();
    const { bid, milestones } = req.body;
    console.log("serbid", bid);

    const { error } = schema.validate({ bid, milestones });
    if (error) {
        return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
    }

    try {
        console.log("bid", bid);
        const findcamp = await Milestones.findOne({ bid });
        console.log("findcamp", findcamp);

        if (findcamp) {
            return res.status(401).json({ success: false, message: "Camp already exists, Please retry" });
        }

        const newMilestone = await Milestones.create({ bid, milestones });
        console.log("newMilestone", newMilestone);

        if (newMilestone) {
            return res.status(200).json({ success: true, message: "Milestone created successfully" });
        }
    } catch (error) {
        console.log("Error in creating milestone =>", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
}
