const Point = require("../models/Points");

const getPointUser = async (req, res) => {
    const { userEmail } = req.query; 

    try {
        const user = await Point.findOne({ userEmail });
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
};

const savePointUser = async (req, res) => {
    const { userEmail, point } = req.body;

    if (!userEmail || point === undefined) {
        return res.status(400).json({ error: 'Missing userEmail or point value' });
    }

    try {
        const userPoint = await Point.findOneAndUpdate(
        { userEmail },
        { point }, 
        { upsert: true, new: true } 
        );

        res.status(200).json({
        message: 'Point saved successfully',
        user: userPoint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateVoucher = async (req, res) => {
    const { userEmail, voucher } = req.body;

    if (!userEmail || !voucher) {
        return res.status(400).json({ error: 'Missing userEmail or voucher value' });
    }

    try {
        const userPoint = await Point.findOneAndUpdate(
        { userEmail },
        { $addToSet: { voucher } }, 
        { upsert: true, new: true } 
        );

        res.status(200).json({
        message: 'Voucher updated successfully',
        user: userPoint,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getPointUser,
    savePointUser,
    updateVoucher
};