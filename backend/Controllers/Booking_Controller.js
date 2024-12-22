const Booking = require("../Models/Booking");

module.exports.AddBooking = async (req, res) => {
    const { bname, baddress, bdistrict, bpincode, bphone } = req.body;
    if (!bname || !baddress || !bdistrict || !bpincode || !bphone) {
        return res.status(400).send({ status: "error", message: "All fields are required" });
    }

    try {
        const newBooking = await Booking.create({
            bname,
            baddress,
            bdistrict,
            bpincode,
            bphone
        });

        return res.status(201).send({ status: "ok", data: newBooking });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", message: "Error occurred while adding booking" });
    }
};



