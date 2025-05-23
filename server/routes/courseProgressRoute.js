import express from 'express';
import isAuthenticated from '../middlewares/Authinticate.js';
import { getCourseProgress, markAsCompleted, markAsIncompleted, updateLectureProgress, Updatescore } from '../controller/courseProgressController.js';

const router =express.Router();

router.route("/:courseId").get(isAuthenticated,getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated,updateLectureProgress);
router.route("/:courseId/complete").post(isAuthenticated,markAsCompleted);
router.route("/:courseId/incomplete").post(isAuthenticated,markAsIncompleted);
router.route("/:courseId/game").post(isAuthenticated,Updatescore);


export default router;