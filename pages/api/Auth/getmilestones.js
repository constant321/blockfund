import DBconnection from '../../../utils/DBConnection';
import Milestones from '../../../model/Milestones';

import Joi from "joi";

const schema = Joi.object({
    bid: Joi.string().required(),
});

export default async (req, res) => {
    await DBconnection();

    const { error } = schema.validate({ bid });
    if (error) {
        return res.status(401).json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });
    }

    try {
        const allMilestones = await Milestones.find();
        console.log("allMilestones", allMilestones);

        return res.status(200).json({ success: true, milestones: allMilestones });
    } catch (error) {
        console.log("Error in fetching milestones =>", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};