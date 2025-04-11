import { useState } from "react";
import { Button, TextField, Alert, Stack } from "@mui/material";
import { createNote } from "../services/notes";

export default function CreateNoteForm({ onNoteCreated }) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            setError("Название заметки обязательно");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const newNote = await createNote({
                title: formData.title,
                description: formData.description
            });
            
            onNoteCreated(newNote);
            setFormData({ title: "", description: "" });
        } catch (err) {
            setError(err.message || "Ошибка при создании заметки");
            console.error("Детали ошибки:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
            <TextField
                name="title"
                label="Название заметки *"
                value={formData.title}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
            />
            
            <TextField
                name="description"
                label="Описание"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
                fullWidth
            />
            
            {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {error}
                </Alert>
            )}
            
            <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !formData.title.trim()}
                sx={{ alignSelf: "flex-start" }}
            >
                {isLoading ? "Создание..." : "Создать заметку"}
            </Button>
        </Stack>
    );
}