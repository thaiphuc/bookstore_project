const Notification = require('../models/Notification');

const updateRead = async (req, res) => {
  try {
    const { notificationId } = req.body;  

    if (!notificationId) {
      return res.status(400).json({ message: 'Notification ID is required' }); 
    }


    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId, 
      { isRead: true }, 
      { new: true } 
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });  
    }

    res.status(200).json(updatedNotification);  
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

const getNotificationsByUser = async (req, res) => {
    try {
      const {userEmail } = req.query; 
  
      if (!userEmail) {
        return res.status(400).json({ message: "userEmail is required" }); 
      }
  
      const notifications = await Notification.find({ userEmail }).sort({ createdAt: -1 }); 
      res.status(200).json(notifications); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };
  
  const notifyOrderCreated = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log dữ liệu từ client

        const { userEmail } = req.body;

        if (!userEmail) {
            console.error('Error: userEmail is required');
            return res.status(400).json({ message: 'userEmail is required' });
        }

        const notification = new Notification({
            userEmail,
            content: "Bạn đã đặt hàng thành công.",
        });

        await notification.save();
        console.log('Notification saved successfully');
        res.status(201).json({ message: 'Notification created successfully' });
    } catch (error) {
        console.error('Error creating notification:', error); // Log lỗi chi tiết
        res.status(500).json({ message: 'Internal server error' });
    }
};


  const notifyOrderCanceled = async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      if (!userEmail) {
        return res.status(400).send();
      }
  
      const notification = new Notification({
        userEmail,
        content: "Đơn đặt hàng của bạn đã bị hủy.",
      });
  
      await notification.save();
      res.status(201).send(); 
    } catch (error) {
      res.status(500).send(); 
    }
  };
  
  const notifyOrderShipped = async (req, res) => {
    try {
      const { userEmail } = req.body;
  
      if (!userEmail) {
        return res.status(400).send();
      }
  
      const notification = new Notification({
        userEmail,
        content: "Đơn đặt hàng của bạn đã được chuẩn bị và giao đến bạn.",
      });
  
      await notification.save();
      res.status(201).send(); 
    } catch (error) {
      res.status(500).send(); 
    }
  };
  
module.exports = { 
    getNotificationsByUser,
    notifyOrderCreated,
    notifyOrderCanceled,
    notifyOrderShipped,
    updateRead
    };
  