require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Obtener todos los pacientes (sin signos vitales ni medicamentos)
app.get('/patients', async (req, res) => {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Obtener un paciente por ID con sus signos vitales y medicamentos
app.get('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data: patient, error: patientError } = await supabase.from('patients').select('*').eq('id', id).single();
        if (patientError || !patient) return res.status(404).json({ error: "Paciente no encontrado" });

        const { data: vitals, error: vitalsError } = await supabase.from('vitals').select('*').eq('patient_id', id);
        const { data: medications, error: medicationsError } = await supabase.from('medications').select('*').eq('patient_id', id);

        if (vitalsError || medicationsError) return res.status(500).json({ error: "Error al obtener datos relacionados" });

        res.json({ patient, vitals, medications });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Agregar un nuevo paciente
app.post('/patients', async (req, res) => {
    const { nombre, apellido, edad, estado_salud } = req.body;
    const { data, error } = await supabase.from('patients').insert([{ nombre, apellido, edad, estado_salud }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// Editar la información de un paciente
app.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, estado_salud } = req.body;
    const { data, error } = await supabase.from('patients').update({ nombre, apellido, edad, estado_salud }).eq('id', id).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// Eliminar un paciente y sus relaciones
app.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await supabase.from('vitals').delete().eq('patient_id', id);
        await supabase.from('medications').delete().eq('patient_id', id);
        const { error } = await supabase.from('patients').delete().eq('id', id);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ message: "Paciente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el paciente" });
    }
});

// Registrar una medición vital
app.post("/vitals", async (req, res) => {
    const { patient_id, pulso, frecuencia_respiratoria, presion_arterial, temperatura, oxigenacion, peso, estatura, nivel_glucosa } = req.body;
    const { data, error } = await supabase.from("vitals").insert([
        { patient_id, pulso, frecuencia_respiratoria, presion_arterial, temperatura, oxigenacion, peso, estatura, nivel_glucosa }
    ]).select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// Obtener la última medición de signos vitales de un paciente
// Obtener la última medición de signos vitales de un paciente con información del paciente
app.get("/vitals/last/:patient_id", async (req, res) => {
    const { patient_id } = req.params;

    try {
        // Obtener la última medición de signos vitales
        const { data: vitals, error: vitalsError } = await supabase.from("vitals")
            .select("*")
            .eq("patient_id", patient_id)
            .order("fecha_registro", { ascending: false })
            .limit(1);

        if (vitalsError) return res.status(500).json({ error: vitalsError.message });
        if (vitals.length === 0) return res.status(404).json({ error: "No hay registros para este paciente" });

        // Obtener la información del paciente
        const { data: patient, error: patientError } = await supabase.from("patients")
            .select("nombre, apellido, edad, estado_salud")
            .eq("id", patient_id)
            .single();

        if (patientError || !patient) return res.status(404).json({ error: "Paciente no encontrado" });

        // Devolver la información combinada
        res.json({ ...vitals[0], paciente: patient });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Obtener tendencias de signos vitales
app.get("/vitals/trends/:patient_id", async (req, res) => {
    const { patient_id } = req.params;

    const { data, error } = await supabase.from("vitals")
        .select("fecha_registro, pulso, frecuencia_respiratoria , presion_arterial, temperatura, oxigenacion, peso, estatura, nivel_glucosa")
        .eq("patient_id", patient_id)
        .order("fecha_registro", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (data.length === 0) return res.status(404).json({ error: "No hay registros suficientes para calcular tendencia" });

    res.json({ tendencia: data });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
