import { Router } from "express";
const router = Router();
// import controller functions for thought
import { getThoughts,
    getThoughtById,
    createThought,
    updateThought,deleteThought,
    addReaction,
    deleteReaction

 } from "../../controllers/thoughtController.js";

router.route('/').get(getThoughts);
router.route('/:thoughtId').get(getThoughtById).post(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
router.route('/').post(createThought);

export { router as ThoughtRouter} ;