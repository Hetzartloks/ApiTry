
//Controlador de Categorieas 
//En este archivo se definiran las operaciones/funciones CRUD para las categorias
//Se utiliza un archivo JSON como almacenamiento de datos

const fs = require('fs');        //importacion de FileSystem
const path = require('path');   //importacion de Path

// definicion de la ruta para el archivo JSON
const dataPath = path.join(__dirname, '../data/categories.json');


function getAllCategories() {
    //Lee el archivo JSON y los convierte a un objeto de JavaScript
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};


//funcion para obtener una categoria por el nombre o extracto de un nombre
function getCategoryByName(name){
    const categories = getAllCategories();

    if(!name) return categories; //si no se pasa un nombre, retorna todas las categorias
    const term = name.toLowerCase(); //convierte el nombre a minusculas
    return categories.filter(category => 
        category.nombre.toLowerCase().includes(term)
    );
};


function createCategory(data) {
    //obtiene todas las categorias existentes
    const categories = getAllCategories();

    //Crea un objeto con ID autoincrementado
    const newCategory = {
        id: categories.length ? categories[categories.length - 1].id + 1 : 1,
        nombre: data.nombre,
        descripcion: data.descripcion
    };

    //añade la nueva categoria al array y actualiza el JSON
    categories.push(newCategory);
    fs.writeFileSync(dataPath, JSON.stringify(categories, null, 2), 'utf8');
    return newCategory;
};


function updateCategory(id, data) {
    const categories = getAllCategories();
    //busca la categoria por ID
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) return null; //Si no existe la categoria retorna Null

    //actualiza la categoria con los nuevos datos
    categories[index] = { ...categories[index], ...data};
    fs.writeFileSync(dataPath, JSON.stringify(categories, null, 2));
    return categories[index];
};


function deleteCategory(id) {
    let categories = getAllCategories();
    const exist = categories.some(c => c.id === id);
    //verifica si la categoria existe
    if (!exist) return false;

    //filtra la categoria por ID y la elimina del array
    categories = categories.filter(c => c.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(categories, null, 2));
    return true;
};


//exportacion de las funciones para utilizarlas desde otros modulos
module.exports ={
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByName
};