import db from "../config/db.js"
import response from "../responses/response.js"

export async function getAllNotes(req,res){
    try {
        const sql = "SELECT * FROM tb_notes";
        const [rows] = await db.execute(sql);

        response(200,"Success", rows, res)
    } catch (err) {
        console.error(err);
        response(500, "Error", null, res)
    }
}

export async function getNotesById(req,res) {
    try {
        const { id, title } = req.params;

        let sql = "SELECT * FROM tb_notes WHERE 1=1";
        const params = [];

        if (id) {
            sql += " AND id = ?";
            params.push(id);
        }

        if (title) {
            sql += " AND title = ?";
            params.push(title);
        }

        const [rows] = await db.execute(sql, params);

        if (rows.length > 0) {
            response(200, "Success",rows, res);
        } else {
            response(404,"Error",null, res)
        }
    } catch (err) {
        console.error(err);
        response(500, "Server error", null, res) 
    }
}

export async function createNote(req,res){
    try {
        const {title, note} = req.body
        
        if (
            !title || 
            !note || 
            typeof title !== "string" || 
            typeof note !=="string" ||
            !title.trim() ||
            !note.trim()
        ) {
            return response(400,"Empty title and note", null, res)
        }

        const sql = "INSERT INTO tb_notes (title, note) VALUES(?,?)";
        const [result] = await db.execute(sql, [title.trim(), note.trim()]);

        if (result.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId
            };
            response(200, "Success",data, res);
        } else {
            response(404,"Error",null, res)
        }
    } catch (err) {
        console.error(err);
        response(500, "Server error", null, res)
        
    }
}

export async function updateNote(req,res){
    try {
        const { id } = req.params;
        const {title, note} = req.body;
        
        const sql = "UPDATE tb_notes SET title = ?, note = ? WHERE id = ?";
        const [result] = await db.execute(sql, [ title, note, id ])
        
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId
            };
            response(200, "Success", data, res);
        } else {
            response(404,"Error", null, res)
        }
    } catch (err) {
        console.error(err);
        response(500,"Server Error", null, res)
    }
}

export async function deleteNote(req,res){
    try {
    
        // DELETE requests should use URL params to identify the resource.
        // Request bodies are unreliable for DELETE operations.
        
        const { id } = req.params;

        const sql = "DELETE FROM tb_notes WHERE id = ?";
        const [result] = await db.execute(sql, [ id ])
        
        if (result?.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId
            };
            response(200, "Success", data, res);
        } else {
            response(404,"Error", null, res)
        }
    } catch (err) {
        console.error(err);
        response(500,"Server Error", null, res)
    }
}