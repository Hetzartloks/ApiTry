const express = require('express');
const router = express.Router();

//Importacion del controlador de categorias
const CategoriesController = require('../controllers/CategoriesController');


//GET Categories por nombre
router.get('/', (req, res) => {
    try{
        //Se llama a la funcion del controlador pasando el parámetro de busqueda
        const categories = CategoriesController.getCategoryByName(req.query.name);

        //Se retornara las categorias en formato JSON
        res.json(categories);

    }catch (error) {
        //Manejo de errores general
        res.status(500).json({error: 'Error al obtener las categorias', details: error.message});
    }
});


//GET categories por ID (no utilizable en el futuro, solo para evaluacion)
router.get('/:id', (req, res) => {
    try{
        const id = parseInt(req.params.id, 10); //Convierte el ID a un numero
        const categories = CategoriesController.getAllCategories(); //Obtiene TOOOOODAS las categoriias
        const category = categories.find(c => c.id === id); //La categoria que se encuentra por el ID

        if (!category) {
            return res.status(404).json({error: 'categoria no encontrada'});
        }

        res.json(category); //Retorna la categoria en formato JSON

    }catch (error){
        //Manejo de errores General
        res.status(500).json({error: 'Error al obtener la categoria', details: error.message});
    }
});


//POST categories - para crear una nueva categoria en caso de ser necesario
router.post('/', (req, res) => {
    try{
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({error: 'Faltan Datos para ingresar la categoria (Nombre y Descripcion necesarios)'})
        }

        const newCategory = CategoriesController.createCategory({ nombre, descripcion }); //Llamamos a la funcion del controlador para ahcer POST
        res.status(201).json(newCategory); //Retorna la categoria creada en formato JSON

    }catch(error){
        res.status(500).json({error: 'Error al crear la categoria', details: error.message});
    }
});


//PUT categories - Para actualizar una categoria ya existente 
router.put('/:id', (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const updatedCategory = CategoriesController.updateCategory(id, req.body);

        if(!updatedCategory) {
            return res.status(404).json({error: 'categoria no encontrada'})
        }

        res.json(updatedCategory);
    }catch (error){
        res.status(500).json({error: 'error al actualizar la categoria', details: error.message})
    }
});

//DELETE categories - para eliminar una categoria de ser necesario (no utilizable en el futuro, solo para evaluacion)
router.delete('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = CategoriesController.deleteCategory(id);

        if(!success){
            return res.status(404).json({error: 'categoria no encontrada'})
        }

        res.json({ message: 'categoria eliminada satifactoriamente'});

    }catch (error){
        res.status(500).json({ error: 'Error al eliminar la categoria', details: error.message})
    }
})

//Exportacion del router para el uso en Index.js
module.exports = router;