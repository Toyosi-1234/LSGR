const getServices = async (req, res) => {
    try {
        const services = [
            {
                name: "Reservation",
                description: "Standard train reservation service"
            },
            {
                name: "Business",
                description: "Business class train service"
            },
            {
                name: "Economy",
                description: "Affordable economy train service"
            }
        ];

        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get services",
            error: error.message
        });
    }
};

module.exports = {
    getServices
};