require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Permite solo el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_KEY
);

// Obtener todos los pacientes (sin signos vitales ni medicamentos)
app.get('/patients', async (req, res) => {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Obtener un paciente por ID con sus vitales y medicamentos
app.get('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const patient = await supabase.from('patients').select('*').eq('id', id).single();
    const vitals = await supabase.from('vitals').select('*').eq('patient_id', id);
    const medications = await supabase.from('medications').select('*').eq('patient_id', id);
    
    if (patient.error) return res.status(404).json({ error: "Paciente no encontrado" });
    
    res.json({ patient: patient.data, vitals: vitals.data, medications: medications.data });
});

// Agregar un nuevo paciente
app.post('/patients', async (req, res) => {
    const { nombre, apellido, edad, estado_salud } = req.body;
    const { data, error } = await supabase.from('patients').insert([{ nombre, apellido, edad, estado_salud }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
});

// Editar la información de un paciente
app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, estado_salud } = req.body;
    const { data, error } = await supabase.from('patients').update({ nombre, apellido, edad, estado_salud }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Eliminar un paciente y sus relaciones
app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;
    await supabase.from('vitals').delete().eq('patient_id', id);
    await supabase.from('medications').delete().eq('patient_id', id);
    const { data, error } = await supabase.from('patients').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Paciente eliminado correctamente" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
