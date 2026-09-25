const express = require("express")
const router = express.Router();
const pool = require("../config/db");
const random_id_generator = require("../scripts/idGenerator")

router.get("/get/all/project/data", async (req, res)=>{
    try{
        const result = await pool.query(`SELECT * FROM projects`)
        res.json({
            status: "successfull",
            message: "Data Fetched Successfully",
            body: result.rows
        })
    } catch(error) {
        console.error(error)
        res.send({
            status: "rejected",
            message: "Unable to fetch Data"
        })
    }
})

router.post("/add/new/project", async (req, res)=>{
    const {project_name, project_details} = req.body;
    const project_id = await random_id_generator(project_name, 10);
    console.log(project_id)
    try{
        const result = await pool.query(
            `INSERT INTO projects (project_id, project_name, project_details) VALUES ($1, $2, $3)`,
            [project_id, project_name,project_details]
        )
        res.json({
            status: "successfull",
            message: "Data Added Successfully"
        })
    } catch (error){
        console.error(error)
        res.status(405).json({
            message: "Bad Request: Unable to Add Data"
        })
    }
})

router.get("/project-view/:project_id", async (req, res)=>{
    const project_id = req.params.project_id;
    try{
        const result = await pool.query(
            `SELECT * FROM projects WHERE project_id = $1`,
            [project_id]
        )
        res.json({
            message: "data fetched",
            body: result.rows
        })
    } catch (error){
        console.error(error)
        res.json({
            message: "Unable to fetch Data"
        })
    }
})

router.post("/add/project-detail/message", async(req, res)=>{
    const {project_id, message_title, message_content} = req.body;
    const message_id = await random_id_generator(message_title, 10);
    try{
        const result = await pool.query(
            `INSERT INTO project_message (message_id, project_id, message_title, message_content) VALUES ($1, $2, $3, $4)`,
            [message_id, project_id, message_title, message_content]
        )
        res.json({
            message: "Message Data Added Successfully"
        })
    } catch (error) {
        console.error(error)
        res.json({
            message: "Unable to add Message"
        })
    } 
})

router.post("/get/project-detail/message/:project_id", async (req, res)=>{
    const project_id = req.params.project_id
    try {
        const result = await pool.query(
            `SELECT * FROM project_message WHERE project_id = $1`,
            [project_id]
        )
        res.json({
            message: "Data Fetched Successfully",
            body: result.rows
        })
    } catch (error) {
        console.error(error)
        res.json({
            message: "Unable To Fetch Data"
        })
    }
})

router.get("/view/project-detail/message/:message_id", async (req, res)=>{
    const message_id = req.params.message_id
    try {
        const result = await pool.query(
            `SELECT * FROM project_message WHERE message_id = $1`,
            [message_id]
        )
        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Message not found"
            })
        }
        res.json({
            message: "Data Fetched Successfully",
            body: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Unable To Fetch Data"
        })
    }
})

router.put("/update/project-detail/message/:message_id", async (req, res)=>{
    const message_id = req.params.message_id
    const {message_title, message_content} = req.body;
    try {
        const result = await pool.query(
            `UPDATE project_message SET message_title = $1, message_content = $2 WHERE message_id = $3 RETURNING *`,
            [message_title, message_content, message_id]
        )
        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Message not found"
            })
        }
        res.json({
            message: "Message Updated Successfully",
            body: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Unable to update message"
        })
    }
})

router.delete("/delete/project-detail/message/:message_id", async (req, res)=>{
    const message_id = req.params.message_id
    try {
        const result = await pool.query(
            `DELETE FROM project_message WHERE message_id = $1`,
            [message_id]
        )
        if(result.rowCount === 0){
            return res.status(404).json({
                message: "Message not found"
            })
        }
        res.json({
            message: "Message Deleted Successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Unable to delete message"
        })
    }
})

router.post("/add/project-detail/todo", async (req, res)=>{
    const {project_id, todo_title, todo_notes, todo_priority, todo_due_date} = req.body;
    if(!project_id || !todo_title){
        return res.status(400).json({
            message: "Project and task title are required"
        })
    }
    try{
        const todo_id = await random_id_generator(todo_title, 10);
        const result = await pool.query(
            `INSERT INTO project_todos (todo_id, project_id, todo_title, todo_priority, todo_notes, todo_due_date) VALUES($1, $2, $3, $4, $5, $6)`,
            [todo_id, project_id, todo_title, todo_priority || "medium", todo_notes, todo_due_date || ""]
        )
        res.json({
            message: "ToDo Data Added Successully"
        })
    } catch(error) {
        console.error(error)
        res.status(500).json({
            message: "Unable to add todo data"
        })
    }
})

router.get("/get/project-detail/todo/:project_id", async (req, res)=>{
    const project_id = req.params.project_id
    try {
        const result = await pool.query(
            `SELECT * FROM project_todos WHERE project_id = $1 ORDER BY todo_timestamp DESC`,
            [project_id]
        )
        res.json({
            message: "Data Fetched Successfully",
            body: result.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Unable To Fetch Data"
        })
    }
})

router.delete("/delete/project-detail/todo", async (req, res)=>{
    const {project_id, todo_id} = req.body;
    try{
        const result = await pool.query(
            `DELETE FROM project_todos WHERE project_id = $1 AND todo_id = $2`,
            [project_id, todo_id]
        )
        res.json({
            message: "Data Deleted Successfully"
        })

    } catch (error){
        console.error(error)
        res.json({
            message: "Unable to delete Todo Data"
        })
    }
})


module.exports = router;