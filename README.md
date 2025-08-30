# 🐱 api de gatitos

> una api simple y adorable para gestionar información de gatitos ✨

## 🌟 características

- **crud completo** para gatitos
- **base de datos sqlite** ligera y rápida
- **api restful** con endpoints intuitivos
- **validación de datos** para campos requeridos
- **respuestas json** estructuradas

## 🚀 instalación

```bash
# instalar dependencias
npm install

# ejecutar la base de datos
node db.js

# iniciar el servidor
node server.js
```

## 📡 endpoints

### 🐾 obtener todos los gatitos
```
get /cats
```

### 🆕 crear un gatito
```
post /cats
```
**body requerido:**
```json
{
  "name": "string (requerido)",
  "breed": "string (requerido)", 
  "gender": "string (requerido)",
  "age": "number (opcional)"
}
```

### 🔍 obtener un gatito específico
```
get /cat/:id
```

### ✏️ actualizar un gatito
```
put /cat/:id
```
**body requerido:**
```json
{
  "name": "string (requerido)",
  "breed": "string (requerido)", 
  "gender": "string (requerido)",
  "age": "number (opcional)"
}
```

### 🗑️ eliminar un gatito
```
delete /cat/:id
```

## 🗄️ estructura de la base de datos

la tabla `cats` contiene:
- `id` - identificador único
- `name` - nombre del gatito
- `breed` - raza del gatito  
- `gender` - género del gatito
- `age` - edad del gatito (opcional)

## 🌍 configuración

el servidor corre por defecto en:
- **puerto:** 8001
- **host:** 0.0.0.0
- **base de datos:** cats.sqlite

## 🛠️ tecnologías utilizadas

- **node.js** - runtime de javascript
- **express** - framework web minimalista
- **sqlite3** - base de datos ligera
- **es modules** - sintaxis moderna de javascript

## 📝 notas

- la base de datos se crea automáticamente al ejecutar `db.js`
- todos los campos excepto `age` son obligatorios
- las respuestas incluyen códigos de estado http apropiados
- la api incluye manejo de errores básico

---

*hecho con 💗 para todos los amantes de gatitos* 🐈‍⬛
