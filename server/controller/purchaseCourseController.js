import Stripe from 'stripe';
import { Course } from '../models/coursemodels.js';
import { CoursePurchase } from '../models/purchaseCourseModels.js';
import { Lecture } from "../models/lecturemodels.js";
import  User  from "../models/usermodels.js";




const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheeckoutSession =async(req,res)=>{
    try {
       const userId =req.id;
       const {courseId} =req.body;
      
       
       const course =await Course.findById(courseId);
       if (!course) {
          return res.status(404).json({
            message:"course not found"
          })
       }

       const newPurchase= new CoursePurchase({
           courseId,
           userId,
           amount:course.coursePrice,
       });
      
       

       const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: course.courseTitle,
                images: [course.courseThumbnail],
              },
              unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
        cancel_url: `http://localhost:5173/course-details/${courseId}`,
        metadata: {
          courseId: courseId,
          userId: userId,
        },
        shipping_address_collection: {
          allowed_countries: ["IN"], // Optionally restrict allowed countries
        },
      });

  
      if (!session.url) {
        return res
          .status(400)
          .json({ success: false, message: "Error while creating session" });
      }
      
     
      // Save the purchase record
      newPurchase.paymentId = session.id;
      await newPurchase.save();
  
      return res.status(200).json({
        success: true,
        url: session.url, // Return the Stripe checkout URL
      });

    } catch (error) {
        console.log(error)
    }
}

export const stripeWebhook = async (req, res) => {
  
  
    let event;
    const userId =req.id;
    try {

      const payloadString = JSON.stringify(req.body, null, 2);
      const secret = process.env.WEBHOOK_ENDPOINT_SECRET;
      if (!secret) {
        console.error("❌ WEBHOOK_ENDPOINT_SECRET is not set");
        return res.status(500).send("Webhook secret not configured");
      }
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });
  
      event = stripe.webhooks.constructEvent(payloadString, header, secret);
      console.log(event.type);
    } catch (error) {
      console.error("Webhook error:", error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
  
    // Handle the checkout session completed event
    // event.type === "checkout.session.completed" orginal if condition
    if (event.type === "checkout.session.completed") {
      console.log("check session complete is called");
  
      try {
        const session = event.data.object;
  
        const purchase = await CoursePurchase.findOne({
           paymentId: session.id,
        }).populate({ path: "courseId" });  
  
        if (!purchase) {
          return res.status(404).json({ message: "Purchase not found" });
        }
  
        if (session.amount_total) {
          purchase.amount = session.amount_total / 100;
        }
        purchase.status = "completed";
  
        // Make all lectures visible by setting `isPreviewFree` to true
        if (purchase.courseId && purchase.courseId.lectures.length > 0) {
          await Lecture.updateMany(
            { _id: { $in: purchase.courseId.lectures } },
            { $set: { isPreviewFree: true } }
          );
        }
  
        await purchase.save();
       
        // Update user's enrolledCourses
        await User.findByIdAndUpdate(
          purchase.userId,
          { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
          { new: true }
        );
  
        // Update course to add user ID to enrolledStudents
        await Course.findByIdAndUpdate(
          purchase.courseId._id,
          { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
          { new: true }
        );
      } catch (error) {
        console.error("Error handling event:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    res.status(200).send();
  };

  export const getCourseDetailsPurchaseStatus =async(req,res)=>{
      try {
         const {courseId} =req.params;
         const userId =req.id;

         const course = await Course.findById(courseId)
          .populate({path:"creator"})
          .populate({ path:"lectures"});
           
          const purchased =await CoursePurchase.findOne({userId,courseId});
          
          if (!course) {
              return res.status(404).json({
                message:"course not found for this id"
              })
          };

          const purchase =purchased?.status;
         
           let change =false;
          
          if (purchase === "completed") {
              change =true;
          }
          

          return res.status(200).json({
             course,
             purchased: change , // true if purchsed other false
             message:"course found successfully"
          });

      } catch (error) {
         console.log(error);
         return res.status(500).json({
           message:"course not found"
         })
      }
  }

  export const getAllPurchasedCourse = async (req, res) => {
    try {
      const userId =req.id;
      console.log(userId);
      const purchasedCourse = await CoursePurchase.find({
        status: "completed",
        userId:userId,
      }).populate("courseId");
      if (!purchasedCourse) {
        return res.status(404).json({
          purchasedCourse: [],
          message:"not course purchased"
        });
      }
      return res.status(200).json({
        purchasedCourse,
        message:"purchse course get successfully"
      });
    } catch (error) {
      console.log(error);
    }
  };

